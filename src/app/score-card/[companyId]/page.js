// /src/app/score-card/[companyId]/page.js
'use client';

import Head from 'next/head';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import useTestStore from '@/store/report-store';
import ScoreCard from '@/components/multi/score-card';
import { questionTest } from '@/app/pages/api/question';
import Contact from '@/components/pages/Contact';
import Header from '@/components/pages/Header';
import Footer from '@/components/pages/Footer';

const BASE_API_URL = 'https://vulnerax.id';
const BASE_SHARE_URL = 'https://vulnerax.id'; 

export default function ScoreCardPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const companyId = params.companyId;
  const { apiKey, setCompanyId } = useTestStore();
  const [companyName, setCompanyName] = useState('Unknown Company');
  const [fetchedScores, setFetchedScores] = useState(null);
  const [fetchedApiKey, setFetchedApiKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const scoreCardRef = useRef(null);

  const questionCodes = [
    ...questionTest.strategic.flatMap(cat => cat.detail.map(q => q.code)),
    ...questionTest.tactic.flatMap(cat => cat.detail.map(q => q.code)),
  ];

  const fetchApiKey = async () => {
    try {
      const response = await fetch(`${BASE_API_URL}/api/latest-key`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to fetch API key');
      const data = await response.json();
      return data.key || data.apiKey || data.api_key || data.accessKey;
    } catch (error) {
      throw new Error('Failed to fetch API key.');
    }
  };

  const fetchCompanyData = async (apiKeyToUse) => {
    if (!companyId || !apiKeyToUse) {
      throw new Error('Missing company ID or API key.');
    }
    try {
      const response = await fetch(`${BASE_API_URL}/api/v1/companies/${companyId}`, {
        headers: { 'Content-Type': 'application/json', 'X-Api-Key': apiKeyToUse },
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setCompanyName(data.company_name || data.companyName || 'Unknown Company');
    } catch (error) {
      throw new Error('Failed to fetch company data.');
    }
  };

  const verifyScores = (scores) => {
    if (!scores || typeof scores !== 'object') {
      throw new Error('Scores data is invalid or empty.');
    }
    const validValues = [10, 20, 30];
    for (const code of questionCodes) {
      if (!scores.hasOwnProperty(code)) {
        throw new Error('Missing score for question code.');
      }
      if (!validValues.includes(scores[code])) {
        throw new Error('Invalid score value.');
      }
    }
    return true;
  };

  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      setError(null);
      setShouldRedirect(false);

      try {
        const encodedScores = searchParams.get('scores');
        let scoresFromUrl = null;
        if (encodedScores) {
          try {
            const byteString = atob(encodedScores);
            const byteArray = new Uint8Array(byteString.length);
            for (let i = 0; i < byteString.length; i++) {
              byteArray[i] = byteString.charCodeAt(i);
            }
            let bitString = '';
            for (const byte of byteArray) {
              bitString += byte.toString(2).padStart(8, '0');
            }
            const scoresArray = [];
            for (let i = 0; i < bitString.length; i += 2) {
              const bits = bitString.slice(i, i + 2);
              if (bits === '00') scoresArray.push(10);
              else if (bits === '01') scoresArray.push(20);
              else if (bits === '10') scoresArray.push(30);
              else throw new Error('Invalid bits.');
            }
            scoresFromUrl = {};
            for (let i = 0; i < questionCodes.length; i++) {
              if (i < scoresArray.length) {
                scoresFromUrl[questionCodes[i]] = scoresArray[i];
              }
            }
            verifyScores(scoresFromUrl);
            setFetchedScores(scoresFromUrl);
          } catch (err) {
            throw new Error('Invalid scores data in URL. Redirecting to test page...');
          }
        } else {
          setError('Scores not found in URL. Redirecting to test page...');
          setShouldRedirect(true);
          setLoading(false);
          return;
        }

        let apiKeyToUse = apiKey;
        if (!apiKeyToUse) {
          try {
            apiKeyToUse = await fetchApiKey();
            setFetchedApiKey(apiKeyToUse);
            setCompanyId(companyId);
          } catch (err) {
            throw new Error('Failed to fetch API key. Redirecting to test page...');
          }
        }

        await fetchCompanyData(apiKeyToUse);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setShouldRedirect(true);
        setLoading(false);
      }
    };

    initializeData();
  }, [companyId, apiKey, searchParams, setCompanyId]);

  const finalScores = fetchedScores || {};

  const calculateCategoryScore = (categories) =>
    !categories || !Array.isArray(categories)
      ? 0
      : categories.reduce((total, cat) => total + (cat.detail || []).reduce((sum, q) => sum + (finalScores[q.code] || 0), 0), 0);

  const strategicScoreActual = calculateCategoryScore(questionTest.strategic);
  const tacticScoreActual = calculateCategoryScore(questionTest.tactic);
  const strategicMaxScore = 570;
  const tacticMaxScore = 750;

  const safeDivide = (num, denom) => (denom === 0 || isNaN(denom) || isNaN(num) ? 0 : (num / denom) * 100);
  const strategicScorePercentage = safeDivide(strategicScoreActual, strategicMaxScore);
  const tacticScorePercentage = safeDivide(tacticScoreActual, tacticMaxScore);
  const overallScore = strategicScorePercentage * 0.4 + tacticScorePercentage * 0.6;

  const getRating = (score) => (score >= 70 ? 'A' : score >= 40 ? 'B' : 'C');
  const rating = getRating(overallScore);

  const getScoreMessage = (score) => {
    if (score >= 70) {
      return {
        message: 'Excellent! Your organization is well-prepared against ransomware threats.',
        color: '#006400',
        detailedMessage: `With a score of ${score.toFixed(2)}%, your organization demonstrates a strong defense against ransomware threats. This indicates robust strategic and tactical measures in place. To maintain this level of readiness, continue to monitor emerging threats and ensure all security protocols are up to date.`,
      };
    } else if (score >= 40) {
      return {
        message: 'Needs Improvement. Consider addressing the key recommendations to enhance your readiness.',
        color: '#cc0000',
        detailedMessage: `Your score of ${score.toFixed(2)}% suggests that while some measures are in place, there are significant gaps in your ransomware readiness. Focus on improving both strategic planning and tactical execution, particularly in areas highlighted in the score card below. Implementing the recommended actions can significantly boost your resilience.`,
      };
    } else {
      return {
        message: 'Critical! Immediate action is required to improve your ransomware readiness.',
        color: '#8B0000',
        detailedMessage: `A score of ${score.toFixed(2)}% indicates a critical vulnerability to ransomware attacks. Your organization needs urgent improvements in both strategic and tactical areas. Review the detailed breakdown in the score card below and prioritize the recommended actions to mitigate risks immediately.`,
      };
    }
  };

  const scoreMessage = getScoreMessage(overallScore);

  useEffect(() => {
    if (shouldRedirect) {
      const timer = setTimeout(() => {
        router.push('/quiz');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [shouldRedirect, router]);

  const handleDownload = () => {
    if (scoreCardRef.current) {
      scoreCardRef.current.download();
    }
  };

  let encodedScores = '';
  if (fetchedScores && Object.keys(fetchedScores).length > 0) {
    try {
      const scoresArray = questionCodes.map(code => fetchedScores[code] || 0);
      const bitString = scoresArray
        .map(score => {
          if (score === 10) return '00';
          if (score === 20) return '01';
          if (score === 30) return '10';
          throw new Error(`Invalid score value: ${score}`);
        })
        .join('');
      const byteArray = [];
      for (let i = 0; i < bitString.length; i += 8) {
        const byte = bitString.slice(i, i + 8).padEnd(8, '0');
        byteArray.push(parseInt(byte, 2));
      }
      encodedScores = btoa(String.fromCharCode(...byteArray));
    } catch (error) {
      console.error('Failed to encode scores for imageUrl:', error);
    }
  }

  const title = `Ransomware Readiness Score: ${rating} (${overallScore.toFixed(2)}%)`;
  const description = `Check out ${companyName}'s ransomware readiness score: ${rating} with ${overallScore.toFixed(2)}%! See how we stack up against cyber threats.`;
  const shareUrl = `${BASE_SHARE_URL}/score-card/${companyId}${encodedScores ? `?scores=${encodedScores}` : ''}`;
  const imageUrl = `${BASE_SHARE_URL}/pages/api/score-card-image/${companyId}${encodedScores ? `?scores=${encodedScores}` : ''}`;
  const fallbackImageUrl = 'https://dev.vulnerax.com/static/default-scorecard.jpg'; // Ganti dengan URL gambar default Anda

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        fontFamily: 'Arial, sans-serif',
      }}>
        <div style={{
          textAlign: 'center',
          padding: '20px',
          background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          maxWidth: '90%',
        }}>
          <h2 style={{ color: '#990000', marginBottom: '10px', fontSize: '1.5em' }}>Loading...</h2>
          <p style={{ color: '#2d2d2d', fontSize: '1em' }}>Please wait while we fetch your score card.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        fontFamily: 'Arial, sans-serif',
      }}>
        <div style={{
          textAlign: 'center',
          padding: '20px',
          background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          maxWidth: '90%',
        }}>
          <h2 style={{ color: '#cc0000', marginBottom: '10px', fontSize: '1.5em' }}>Error</h2>
          <p style={{ color: '#2d2d2d', fontSize: '1em' }}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:alt" content="Ransomware Readiness Score Card" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={shareUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />
        {/* Fallback untuk crawler yang tidak menjalankan JS */}
        <meta name="image" content={fallbackImageUrl} />
      </Head>

      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        fontFamily: 'Arial, sans-serif',
        color: '#2d2d2d',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Header />
        <main style={{
          flex: 1,
          padding: '40px 20px',
          maxWidth: '1280px',
          margin: '0 auto',
          width: '100%',
          boxSizing: 'border-box',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h1 style={{
              color: '#990000',
              fontSize: '2.5em',
              fontWeight: 'bold',
              marginBottom: '10px',
              marginTop: '70px'
            }}>
              Score Card for {companyName}
            </h1>
            <p style={{
              color: scoreMessage.color,
              fontSize: '1.2em',
              fontWeight: '500',
              margin: 0,
            }}>
              {scoreMessage.message}
            </p>
          </div>
          <section style={{
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '20px',
            borderRadius: '15px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            marginBottom: '30px',
            textAlign: 'justify',
          }}>
            <p style={{ fontSize: '1em', color: '#2d2d2d', lineHeight: '1.6', marginBottom: '15px' }}>
              The Ransomware Readiness Score Card provides a comprehensive assessment of your organization's preparedness against ransomware threats. By evaluating both strategic and tactical aspects of your cybersecurity framework, this score card highlights strengths and identifies critical areas for improvement, empowering you to take proactive steps in safeguarding your digital assets.
            </p>
            <p style={{ fontSize: '1em', color: '#2d2d2d', lineHeight: '1.6', marginBottom: '15px' }}>
              {scoreMessage.detailedMessage}
            </p>
            <p style={{ fontSize: '1em', color: '#2d2d2d', lineHeight: '1.6', marginBottom: 0 }}>
              For a deeper analysis or to discuss tailored strategies to enhance your cybersecurity posture, our team at Vulnerax is here to assist. Reach out to us through the contact section below to schedule a consultation and take the next step toward a more secure future.
            </p>
          </section>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '15px',
            marginBottom: '30px',
            flexWrap: 'wrap',
          }}>
            <button
              onClick={handleDownload}
              style={{
                background: '#cc0000',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '25px',
                fontSize: '1em',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
                transition: 'background 0.3s',
              }}
              onMouseOver={(e) => (e.target.style.background = '#b30000')}
              onMouseOut={(e) => (e.target.style.background = '#cc0000')}
            >
              Download Scorecard
            </button>
          </div>
          <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '20px',
            borderRadius: '15px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            width: '100%',
            boxSizing: 'border-box',
            overflowX: 'auto',
          }}>
            <ScoreCard
              ref={scoreCardRef}
              apiKey={fetchedApiKey || apiKey}
              scores={finalScores}
              isPublic={true}
            />
          </div>
          <section style={{ marginTop: '40px' }}>
            <Contact />
          </section>
        </main>
        <Footer />
      </div>

      <style jsx global>{`
        main { padding: 40px 20px; }
        h1 { font-size: 2.5em; }
        p { font-size: 1em; }
        button { padding: 10px 20px; font-size: 1em; }
        section { padding: 20px; }
        section p { font-size: 1em; }
        div[style*="background: rgba(255, 255, 255, 0.9); padding: 20px; border-radius: 15px"] {
          width: 100% !important;
          max-width: 100% !important;
          overflow-x: auto;
        }
        div[style*="background: rgba(255, 255, 255, 0.9); padding: 20px; border-radius: 15px"] > * {
          width: 100% !important;
          max-width: 100% !important;
          box-sizing: border-box;
        }
        div[style*="background: rgba(255, 255, 255, 0.9); padding: 20px; border-radius: 15px"] canvas {
          width: 100% !important;
          height: auto !important;
          max-width: 100% !important;
        }
        div[style*="background: rgba(255, 255, 255, 0.9); padding: 20px; border-radius: 15px"] p,
        div[style*="background: rgba(255, 255, 255, 0.9); padding: 20px; border-radius: 15px"] span,
        div[style*="background: rgba(255, 255, 255, 0.9); padding: 20px; border-radius: 15px"] h1,
        div[style*="background: rgba(255, 255, 255, 0.9); padding: 20px; border-radius: 15px"] h2,
        div[style*="background: rgba(255, 255, 255, 0.9); padding: 20px; border-radius: 15px"] h3 {
          font-size: 1em !important;
          white-space: normal !important;
          word-wrap: break-word !important;
        }
        @media (max-width: 768px) {
          main { padding: 20px 10px; }
          h1 { font-size: 1.8em !important; }
          p { font-size: 0.9em !important; }
          button { padding: 8px 15px !important; font-size: 0.9em !important; }
          section { padding: 15px !important; }
          section p { font-size: 0.9em !important; }
          div[style*="display: flex; justify-content: center; gap: 15px"] {
            flex-direction: column;
            gap: 10px;
          }
          div[style*="background: rgba(255, 255, 255, 0.9); padding: 20px; border-radius: 15px"] {
            padding: 15px !important;
          }
          div[style*="background: rgba(255, 255, 255, 0.9); padding: 20px; border-radius: 15px"] p,
          div[style*="background: rgba(255, 255, 255, 0.9); padding: 20px; border-radius: 15px"] span,
          div[style*="background: rgba(255, 255, 255, 0.9); padding: 20px; border-radius: 15px"] h1,
          div[style*="background: rgba(255, 255, 255, 0.9); padding: 20px; border-radius: 15px"] h2,
          div[style*="background: rgba(255, 255, 255, 0.9); padding: 20px; border-radius: 15px"] h3 {
            font-size: 0.9em !important;
          }
        }
        @media (max-width: 480px) {
          main { padding: 15px 5px; }
          h1 { font-size: 1.5em !important; }
          p { font-size: 0.85em !important; }
          button { padding: 6px 12px !important; font-size: 0.8em !important; width: 100%; box-sizing: border-box; }
          section { padding: 10px !important; }
          section p { font-size: 0.85em !important; }
          div[style*="background: rgba(255, 255, 255, 0.9); padding: 20px; border-radius: 15px"] {
            padding: 10px !important;
          }
          div[style*="background: rgba(255, 255, 255, 0.9); padding: 20px; border-radius: 15px"] p,
          div[style*="background: rgba(255, 255, 255, 0.9); padding: 20px; border-radius: 15px"] span,
          div[style*="background: rgba(255, 255, 255, 0.9); padding: 20px; border-radius: 15px"] h1,
          div[style*="background: rgba(255, 255, 255, 0.9); padding: 20px; border-radius: 15px"] h2,
          div[style*="background: rgba(255, 255, 255, 0.9); padding: 20px; border-radius: 15px"] h3 {
            font-size: 0.8em !important;
          }
        }
      `}</style>
    </>
  );
}