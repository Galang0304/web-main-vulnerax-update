// /src/app/components/multi/score-card.js
'use client';
import React, { useRef, useImperativeHandle, forwardRef, useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import useTestStore from '@/store/report-store';
import { questionTest } from '@/app/pages/api/question';

// Definisikan base URL untuk mode development
const BASE_API_URL = 'https://vulnerax.id'; // Untuk mengambil data dari API
const BASE_SHARE_URL = 'https://vulnerax.id'; // Untuk URL yang dibagikan di media sosial

// Struktur data rekomendasi (dipertahankan seperti aslinya)
const recommendationsMap = {
  'A.1.1': {
    10: 'Segera buat atau perbarui kebijakan keamanan siber yang mencakup pencegahan, deteksi, respons, dan pemulihan ransomware. Sesuaikan dengan standar NIST SP 800-53 atau ISO/IEC 27001',
    20: 'Percepat proses penyusunan kebijakan dan pastikan mencakup semua aspek keamanan siber',
  },
  'A.1.2': {
    10: 'Libatkan tim lintas fungsi (IT, legal, PR, manajemen) dalam perencanaan risiko siber. Gunakan kerangka kerja NIST CSF',
    20: 'Percepat koordinasi antar-departemen dan pastikan rencana mencakup semua aspek risiko siber',
  },
  'A.1.3': {
    10: 'Lakukan inventarisasi aset digital dan fisik, lalu prioritaskan berdasarkan dampak bisnis. Gunakan pendekatan NIST SP 800-30.',
    20: 'Percepat proses inventarisasi dan pastikan semua aset telah diprioritaskan.',
  },
  'A.2.1': {
    10: 'Pastikan peta risiko mencakup kemungkinan dan dampak serangan ransomware. Gunakan metodologi ISO 27005 atau NIST IRAM',
    20: 'Percepat proses penilaian risiko dan pastikan peta risiko diperbarui secara berkala',
  },
  'A.2.2': {
    10: 'Lakukan penilaian risiko terhadap vendor dan mitra bisnis. Pastikan kontrak mencakup klausul keamanan siber',
    20: 'Percepat proses penilaian risiko dan pastikan semua vendor telah dinilai.',
  },
  'A.3.1': {
    10: 'Pastikan polis asuransi mencakup biaya pemulihan, pembayaran tebusan, dan kerugian bisnis akibat ransomware',
    20: 'Diskusikan dengan broker asuransi untuk memahami cakupan dan pengecualian.',
  },
  'A.4.1': {
    10: 'Lakukan pelatihan rutin untuk meningkatkan kesadaran karyawan tentang ancaman siber seperti phishing',
    20: 'Percepat implementasi program pelatihan dan pastikan semua karyawan telah dilatih',
  },
  'A.4.2': {
    10: 'Siapkan rencana bisnis berkelanjutan (BCP) berdasarkan ISO 22301.',
    20: 'Latih manajemen untuk memahami dampak strategis ransomware.',
  },
  'A.5.1': {
    10: 'Buat atau perbarui rencana respons insiden yang mencakup deteksi, isolasi, pemulihan, dan komunikasi.',
    20: 'Percepat implementasi rencana dan lakukan latihan rutin',
  },
  'A.5.2': {
    10: 'Buat prosedur yang melibatkan tim manajemen, legal, dan keuangan untuk mengevaluasi keputusan membayar tebusan.',
    20: 'Percepat penyusunan prosedur dan pastikan semua tim terlibat.',
  },
  'A.5.3': {
    10: 'Latih tim manajemen krisis untuk mengambil keputusan cepat di bawah tekanan',
    20: 'Percepat pelatihan dan pastikan semua anggota tim telah dilatih.',
  },
  'A.6.1': {
    10: 'Pelajari regulasi seperti GDPR, UU PDP, atau CCPA yang mewajibkan pelaporan insiden siber.',
    20: 'Percepat proses pelaporan dan pastikan sesuai dengan batas waktu dan persyaratan',
  },
  'A.6.2': {
    10: 'Buat protokol untuk melibatkan penegak hukum atau regulator dalam investigasi insiden.',
    20: 'Percepat implementasi protokol dan pastikan tim legal memahami hak dan kewajiban',
  },
  'A.7.1': {
    10: 'Siapkan skrip atau panduan negosiasi yang mencakup pertanyaan kunci, batasan waktu, dan langkah-langkah eskalasi.',
    20: 'Percepat penyusunan prosedur dan pastikan semua tim terlibat.',
  },
  'A.7.2': {
    10: 'Latih tim untuk menghadapi tekanan psikologis seperti ancaman kebocoran data atau tenggat waktu yang ketat',
    20: 'Percepat pelatihan dan pastikan semua anggota tim telah dilatih.',
  },
  'A.8.1': {
    10: 'Bentuk tim yang terdiri dari ahli hukum, IT, dan negosiator profesional.',
    20: 'Percepat pembentukan tim dan pastikan mereka memiliki akses cepat ke informasi yang diperlukan',
  },
  'A.9.1': {
    10: 'Siapkan dana darurat atau pastikan polis asuransi mencakup pembayaran tebusan',
    20: 'Diskusikan dengan tim keuangan untuk memastikan ketersediaan dana.',
  },
  'A.9.2': {
    10: 'Buat kebijakan yang jelas tentang kapan dan bagaimana keputusan membayar tebusan diambil',
    20: 'Percepat penyusunan kebijakan dan pastikan semua tim terlibat.',
  },
  'A.10.1': {
    10: 'Gunakan alat komunikasi terenkripsi seperti Tor atau platform khusus untuk berinteraksi dengan pelaku ransomware.',
    20: 'Percepat implementasi saluran komunikasi aman.',
  },
  'B.1.1': {
    10: 'Terapkan MFA pada semua akun yang memiliki akses ke sistem atau data sensitif',
    20: 'Percepat implementasi MFA dan pastikan semua akun sensitif terlindungi.',
  },
  'B.1.2': {
    10: 'Pastikan kebijakan kata sandi mencakup panjang minimal 12 karakter, kompleksitas, dan frekuensi penggantian setiap 90 hari.',
    20: 'Percepat implementasi kebijakan kata sandi.',
  },
  'B.1.3': {
    10: 'Batasi akses pengguna berdasarkan prinsip least privilege.',
    20: 'Percepat implementasi prinsip least privilege',
  },
  'B.2.1': {
    10: 'Segmentasi jaringan untuk membatasi penyebaran ransomware.',
    20: 'Percepat implementasi segmentasi jaringan',
  },
  'B.2.2': {
    10: 'Isolasi data sensitif dari bagian lain jaringan dengan kontrol akses yang ketat.',
    20: 'Percepat implementasi isolasi data',
  },
  'B.3.1': {
    10: 'Pastikan backup data terenkripsi dan tidak terhubung ke jaringan utama (offline/immutable)',
    20: 'Percepat implementasi backup data.',
  },
  'B.3.2': {
    10: 'Lakukan uji pemulihan backup secara berkala',
    20: 'Percepat proses uji pemulihan',
  },
  'B.4.1': {
    10: 'Gunakan solusi EDR/XDR untuk mendeteksi dan merespons ancaman di tingkat endpoint',
    20: 'Percepat implementasi solusi EDR/XDR',
  },
  'B.4.2': {
    10: 'Pastikan semua perangkat diperbarui dengan patch keamanan terbaru.',
    20: 'Percepat proses pembaruan perangkat lunak',
  },
  'B.5.1': {
    10: 'Implementasikan SIEM untuk memantau dan menganalisis aktivitas jaringan',
    20: 'Percepat implementasi SIEM',
  },
  'B.5.2': {
    10: 'Perbarui IoCs secara berkala berdasarkan ancaman terbaru.',
    20: 'Percepat proses pembaruan IoCs',
  },
  'B.6.1': {
    10: 'Gunakan filter email berbasis AI atau machine learning untuk mendeteksi dan memblokir email phishing',
    20: 'Percepat implementasi filter email',
  },
  'B.6.2': {
    10: 'Lakukan pelatihan simulasi phishing secara berkala.',
    20: 'Percepat implementasi program simulasi phishing',
  },
  'B.7.1': {
    10: 'Siapkan prosedur untuk mengisolasi sistem yang terinfeksi dan membatasi penyebaran ransomware',
    20: 'Percepat implementasi prosedur isolasi',
  },
  'B.7.2': {
    10: 'Buat kebijakan untuk memutus koneksi Internet jika diperlukan selama serangan ransomware',
    20: 'Percepat implementasi kebijakan',
  },
  'B.8.1': {
    10: 'Siapkan prosedur pemulihan data yang terstruktur dan teruji.',
    20: 'Percepat implementasi prosedur pemulihan',
  },
  'B.8.2': {
    10: 'Identifikasi layanan esensial dan buat rencana pemulihan prioritas.',
    20: 'Percepat proses identifikasi dan pembuatan rencana',
  },
  'B.9.1': {
    10: 'Lakukan analisis pasca insiden untuk mengidentifikasi celah keamanan dan area perbaikan',
    20: 'Percepat proses analisis dan pastikan semua insiden dianalisis.',
  },
  'B.9.2': {
    10: 'Perbarui rencana respons insiden berdasarkan pelajaran yang dipetik dari insiden sebelumnya',
    20: 'Percepat proses pembaruan rencana',
  },
  'B.10.1': {
    10: 'Lakukan penilaian risiko terhadap vendor dan mitra untuk memastikan mereka memiliki langkah perlindungan yang memadai',
    20: 'Percepat proses penilaian risiko',
  },
  'B.10.2': {
    10: 'Pastikan kontrak dengan vendor mencakup klausul pelaporan insiden keamanan',
    20: 'Percepat proses penyusunan kontrak',
  },
  'B.11.1': {
    10: 'Buat kebijakan untuk memverifikasi tuntutan pelaku, termasuk meminta "proof of life" data',
    20: 'Percepat penyusunan kebijakan',
  },
  'B.12.1': {
    10: 'Gunakan kerangka kerja MITRE ATT&CK untuk melacak dan menganalisis taktik pelaku',
    20: 'Percepat implementasi kerangka kerja.',
  },
  'B.13.1': {
    10: 'Pertimbangkan menggunakan layanan konsultan ransomware atau alat analisis khusus untuk membantu proses negosiasi',
    20: 'Percepat implementasi alat negosiasi',
  },
  'B.14.1': {
    10: 'Pastikan keputusan negosiasi mematuhi regulasi seperti OFAC atau PPATK.',
    20: 'Percepat proses konsultasi dengan tim legal',
  },
};

// Fungsi untuk mengekstrak key recommendation
const extractKeyRecommendation = (recommendation, code, score) => {
  if (!recommendation) return 'No Recommendation';

  const recommendationKeys = {
    'A.1.1': {
      10: 'Update Security Policy',
      20: 'Accelerate Policy Creation',
    },
    'A.1.2': {
      10: 'Cross-Functional Planning',
      20: 'Accelerate Risk Coordination',
    },
    'A.1.3': {
      10: 'Asset Inventory',
      20: 'Accelerate Inventory',
    },
    'A.2.1': {
      10: 'Risk Mapping',
      20: 'Accelerate Risk Mapping',
    },
    'A.2.2': {
      10: 'Vendor Risk Assessment',
      20: 'Accelerate Vendor Assessment',
    },
    'A.3.1': {
      10: 'Cyber Insurance',
      20: 'Consult Insurance Broker',
    },
    'A.4.1': {
      10: 'Employee Training',
      20: 'Accelerate Employee Training',
    },
    'A.4.2': {
      10: 'Business Continuity Plan',
      20: 'Train Management Impact',
    },
    'A.5.1': {
      10: 'Incident Response Plan',
      20: 'Accelerate Response Plan',
    },
    'A.5.2': {
      10: 'Ransom Payment Policy',
      20: 'Accelerate Ransom Policy',
    },
    'A.5.3': {
      10: 'Crisis Management Training',
      20: 'Accelerate Crisis Training',
    },
    'A.6.1': {
      10: 'Regulatory Compliance',
      20: 'Accelerate Reporting Compliance',
    },
    'A.6.2': {
      10: 'Legal Protocol',
      20: 'Accelerate Legal Protocol',
    },
    'A.7.1': {
      10: 'Negotiation Guidelines',
      20: 'Accelerate Negotiation Guide',
    },
    'A.7.2': {
      10: 'Psychological Training',
      20: 'Accelerate Psychological Training',
    },
    'A.8.1': {
      10: 'Specialized Response Team',
      20: 'Accelerate Team Formation',
    },
    'A.9.1': {
      10: 'Emergency Fund',
      20: 'Consult Financial Team',
    },
    'A.9.2': {
      10: 'Ransom Decision Policy',
      20: 'Accelerate Decision Policy',
    },
    'A.10.1': {
      10: 'Secure Communication',
      20: 'Accelerate Secure Channel',
    },
    'B.1.1': {
      10: 'Implement MFA',
      20: 'Accelerate MFA',
    },
    'B.1.2': {
      10: 'Password Policy',
      20: 'Accelerate Password Policy',
    },
    'B.1.3': {
      10: 'Least Privilege Access',
      20: 'Accelerate Privilege Access',
    },
    'B.2.1': {
      10: 'Network Segmentation',
      20: 'Accelerate Network Segmentation',
    },
    'B.2.2': {
      10: 'Data Isolation',
      20: 'Accelerate Data Isolation',
    },
    'B.3.1': {
      10: 'Secure Backup',
      20: 'Accelerate Secure Backup',
    },
    'B.3.2': {
      10: 'Backup Recovery Test',
      20: 'Accelerate Recovery Test',
    },
    'B.4.1': {
      10: 'Endpoint Detection',
      20: 'Accelerate Endpoint Detection',
    },
    'B.4.2': {
      10: 'Software Updates',
      20: 'Accelerate Software Updates',
    },
    'B.5.1': {
      10: 'SIEM Implementation',
      20: 'Accelerate SIEM',
    },
    'B.5.2': {
      10: 'Update IoCs',
      20: 'Accelerate IoC Updates',
    },
    'B.6.1': {
      10: 'Email Filtering',
      20: 'Accelerate Email Filtering',
    },
    'B.6.2': {
      10: 'Phishing Simulation',
      20: 'Accelerate Phishing Simulation',
    },
    'B.7.1': {
      10: 'System Isolation',
      20: 'Accelerate System Isolation',
    },
    'B.7.2': {
      10: 'Internet Disconnection',
      20: 'Accelerate Disconnection Policy',
    },
    'B.8.1': {
      10: 'Data Recovery Procedure',
      20: 'Accelerate Recovery Procedure',
    },
    'B.8.2': {
      10: 'Essential Services Recovery',
      20: 'Accelerate Services Recovery',
    },
    'B.9.1': {
      10: 'Post-Incident Analysis',
      20: 'Accelerate Incident Analysis',
    },
    'B.9.2': {
      10: 'Update Incident Response',
      20: 'Accelerate Response Update',
    },
    'B.10.1': {
      10: 'Vendor Mitigation Risk',
      20: 'Accelerate Mitigation Assessment',
    },
    'B.10.2': {
      10: 'Vendor Contract Clauses',
      20: 'Accelerate Contract Clauses',
    },
    'B.11.1': {
      10: 'Verify Ransom Demands',
      20: 'Accelerate Ransom Verification',
    },
    'B.12.1': {
      10: 'MITRE ATT&CK Framework',
      20: 'Accelerate MITRE Framework',
    },
    'B.13.1': {
      10: 'Ransomware Consultant',
      20: 'Accelerate Negotiation Tools',
    },
    'B.14.1': {
      10: 'Negotiation Compliance',
      20: 'Accelerate Legal Consultation',
    },
  };

  const key = recommendationKeys[code]?.[score];
  return key || recommendation.split('.')[0];
};

// Komponen ScoreCard
const ScoreCard = forwardRef(({ onDownload, isPublic = false, scores: propScores, apiKey: propApiKey }, ref) => {
  const { scores: storeScores, companyData, companyId, apiKey: storeApiKey } = useTestStore();
  const scoreCardRef = useRef(null);
  const [isRendering, setIsRendering] = useState(false);
  const [companyName, setCompanyName] = useState(companyData?.company_name || 'Unknown Company');
  const [error, setError] = useState(null);

  // Gunakan scores dari prop jika tersedia (untuk halaman publik), jika tidak gunakan dari store
  const finalScores = propScores || storeScores || {};
  const finalApiKey = propApiKey || storeApiKey;

  // Verifikasi scores
  useEffect(() => {
    if (!finalScores || Object.keys(finalScores).length === 0) {
      console.warn('Scores are missing or empty in ScoreCard:', finalScores);
      setError('Scores are missing. Please complete the ransomware test first.');
      return;
    }

    // Daftar semua kode pertanyaan yang diharapkan
    const expectedCodes = [
      ...questionTest.strategic.flatMap(cat => cat.detail.map(q => q.code)),
      ...questionTest.tactic.flatMap(cat => cat.detail.map(q => q.code)),
    ];

    // Verifikasi bahwa semua kode ada dan nilainya valid (10, 20, atau 30)
    const validValues = [10, 20, 30];
    for (const code of expectedCodes) {
      if (!finalScores.hasOwnProperty(code)) {
        console.warn(`Missing score for question code: ${code}`);
        setError(`Missing score for question code: ${code}. Please complete the test.`);
        return;
      }
      if (!validValues.includes(finalScores[code])) {
        console.warn(`Invalid score value for question code ${code}: ${finalScores[code]}`);
        setError(`Invalid score value for question code ${code}: ${finalScores[code]}. Expected 10, 20, or 30.`);
        return;
      }
    }

    console.log('Scores verified successfully in ScoreCard:', finalScores);
    setError(null);
  }, [finalScores]);

  // Ambil data perusahaan dari API
  useEffect(() => {
    const fetchCompanyData = async () => {
      if (!companyId || !finalApiKey) {
        console.warn('Missing companyId or apiKey in ScoreCard:', { companyId, apiKey: finalApiKey });
        setError('Missing company ID or API key. Unable to fetch company data.');
        return;
      }
      try {
        const response = await fetch(`${BASE_API_URL}/api/v1/companies/${companyId}`, {
          headers: { 'Content-Type': 'application/json', 'X-Api-Key': finalApiKey },
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setCompanyName(data.company_name || data.companyName || 'Unknown Company');
        console.log('Company data fetched successfully in ScoreCard:', data);
      } catch (error) {
        console.error('Failed to fetch company data in ScoreCard:', error);
        setError('Failed to fetch company data. Please try again later.');
      }
    };
    fetchCompanyData();
  }, [companyId, finalApiKey]);

  // Fungsi untuk menghitung skor kategori
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
  const riskLevel = rating === 'A' ? 'Low Risk' : rating === 'B' ? 'Medium Risk' : 'High Risk';

  const totalStrategyQuestions = questionTest.strategic.reduce((sum, cat) => sum + (cat.detail?.length || 0), 0);
  const preparedStrategyQuestions = questionTest.strategic.flatMap((cat) => cat.detail || []).filter((q) => finalScores[q?.code] === 30).length;
  const totalTacticQuestions = questionTest.tactic.reduce((sum, cat) => sum + (cat.detail?.length || 0), 0);
  const preparedTacticQuestions = questionTest.tactic.flatMap((cat) => cat.detail || []).filter((q) => finalScores[q?.code] === 30).length;

  const strategyAspectsToImprove = Math.max(0, totalStrategyQuestions - preparedStrategyQuestions);
  const tacticAspectsToImprove = Math.max(0, totalTacticQuestions - preparedTacticQuestions);
  const strategyProgress = safeDivide(preparedStrategyQuestions, totalStrategyQuestions);
  const tacticProgress = safeDivide(preparedTacticQuestions, totalTacticQuestions);

  // Log skor yang dihitung
  useEffect(() => {
    console.log('Calculated scores in ScoreCard:', {
      strategicScoreActual,
      tacticScoreActual,
      strategicScorePercentage: strategicScorePercentage.toFixed(2),
      tacticScorePercentage: tacticScorePercentage.toFixed(2),
      overallScore: overallScore.toFixed(2),
      rating,
    });
  }, [strategicScoreActual, tacticScoreActual, strategicScorePercentage, tacticScorePercentage, overallScore, rating]);

  const allScoresAre30 = () =>
    [...questionTest.strategic, ...questionTest.tactic].flatMap((cat) => cat.detail || []).every((q) => finalScores[q.code] === 30 || finalScores[q.code] === undefined);

  const getRecommendations = (scores) =>
    [...questionTest.strategic, ...questionTest.tactic].flatMap((category) =>
      category.detail
        .filter((q) => {
          const score = scores[q.code] || 0;
          return score === 10 || score === 20;
        })
        .map((q) => {
          const score = scores[q.code] || 0;
          const recommendation = recommendationsMap[q.code] ? recommendationsMap[q.code][score] : 'No specific recommendation available.';
          return {
            category: category.category,
            checklist: q.question,
            code: q.code,
            score,
            recommendation,
            keyRecommendation: extractKeyRecommendation(recommendation, q.code, score),
          };
        })
    );

  const recommendations = getRecommendations(finalScores);
  const keyRecommendations = [...new Set(recommendations.map((rec) => rec.keyRecommendation))];

  const handleDownload = () => {
    if (!scoreCardRef.current) {
      console.error('ScoreCard ref is not available');
      setError('ScoreCard ref is not available. Please try again.');
      return;
    }

    setIsRendering(true);
    // Pastikan elemen ada di DOM dan terlihat sementara untuk html2canvas
    const element = scoreCardRef.current;
    const originalDisplay = element.style.display;
    const originalOpacity = element.style.opacity;
    const originalPosition = element.style.position;

    element.style.display = 'block';
    element.style.opacity = '1';
    element.style.position = 'absolute';

    html2canvas(element, {
      scale: 3,
      backgroundColor: null,
      useCORS: true,
      logging: false,
    })
      .then((canvas) => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/jpeg', 1.0);
        link.download = `RRA-ScoreCard_${companyName}_${new Date().toISOString().split('T')[0]}.jpg`;
        link.click();
        if (onDownload) onDownload();
      })
      .catch((error) => {
        console.error('Failed to download score-card:', error);
        setError('Failed to download score card. Please try again.');
      })
      .finally(() => {
        // Kembalikan style asli setelah selesai
        element.style.display = originalDisplay;
        element.style.opacity = originalOpacity;
        element.style.position = originalPosition;
        setIsRendering(false);
      });
  };

  useImperativeHandle(ref, () => ({ download: handleDownload }));

  useEffect(() => {
    if (scoreCardRef.current) {
      scoreCardRef.current.id = 'scorecard-element';
    }
  }, []);

  if (error) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
        Error: {error}
      </div>
    );
  }

  const getRatingGradient = () => {
    switch (rating) {
      case 'A':
        return 'linear-gradient(45deg, #006400 0%, #228B22 100%)';
      case 'B':
        return 'linear-gradient(45deg, rgb(228, 151, 36) 0%, rgb(244, 197, 96) 100%)';
      case 'C':
        return 'linear-gradient(45deg, #8B0000 0%, #DC143C 100%)';
      default:
        return 'linear-gradient(45deg, #8B0000 0%, #DC143C 100%)';
    }
  };

  const timestamp = new Date().toLocaleString();

  return (
    <div
      ref={scoreCardRef}
      style={{
        width: '1200px',
        minHeight: '800px',
        background: 'linear-gradient(135deg, rgb(212, 9, 9) 0%, rgb(248, 248, 248) 100%)',
        padding: '30px',
        fontFamily: 'Arial, sans-serif',
        color: '#2d2d2d',
        boxSizing: 'border-box',
        position: isPublic ? 'relative' : 'absolute',
        top: isPublic ? 'auto' : '-9999px',
        left: isPublic ? 'auto' : '-9999px',
        opacity: isPublic ? 1 : 0,
        pointerEvents: isPublic ? 'auto' : 'none',
      }}
    >
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.65)',
          padding: '20px',
          borderRadius: '15px',
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
          height: 'auto',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            color: '#7a0000',
            fontSize: '0.9em',
            fontWeight: '600',
            marginBottom: '20px',
          }}
        >
          <span>Company Name: {companyName}</span>
          <span>Timestamp: {timestamp}</span>
        </div>

        {/* Title */}
        <h1
          style={{
            color: '#990000',
            fontSize: '2.5em',
            textAlign: 'center',
            margin: '0 0 20px',
            fontWeight: '900',
          }}
        >
          Ransomware Readiness Assessment
        </h1>

        {/* Overall Summary */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div
            style={{
              background: getRatingGradient(),
              color: 'white',
              padding: '10px 20px',
              borderRadius: '20px',
              fontWeight: 'bold',
              width: 'fit-content',
              margin: '0 auto',
              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
              fontSize: '1.5em',
              textTransform: 'uppercase',
            }}
          >
            {rating} - {riskLevel}
          </div>
          <h3
            style={{
              color: '#990000',
              fontSize: '1.2em',
              fontWeight: '700',
              marginTop: '10px',
            }}
          >
            Overall Score: {overallScore.toFixed(2)}%
          </h3>
        </div>

        {/* Strategy Risk & Tactics Risk */}
        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '30px' }}>
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.65)',
              padding: '15px',
              borderRadius: '10px',
              textAlign: 'center',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              width: '45%',
            }}
          >
            <h3
              style={{
                color: '#cc0000',
                fontSize: '1.5em',
                margin: 0,
                fontWeight: '700',
              }}
            >
              Strategy Risk
            </h3>
            <p style={{ fontSize: '1em', color: '#2d2d2d', margin: '10px 0' }}>
              {strategyAspectsToImprove} Strategy readiness that must be done immediately
            </p>
          </div>
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.65)',
              padding: '15px',
              borderRadius: '10px',
              textAlign: 'center',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              width: '45%',
            }}
          >
            <h3
              style={{
                color: '#cc0000',
                fontSize: '1.5em',
                margin: 0,
                fontWeight: '700',
              }}
            >
              Tactics Risk
            </h3>
            <p style={{ fontSize: '1em', color: 'update', margin: '10px 0' }}>
              {tacticAspectsToImprove} Tactics readiness that must be done immediately
            </p>
          </div>
        </div>

        {/* Summary Result */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.65)',
            padding: '15px',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            marginBottom: '30px',
          }}
        >
          <h2
            style={{
              color: '#cc0000',
              fontSize: '1.5em',
              textAlign: 'center',
              margin: '0 0 15px',
              fontWeight: '700',
            }}
          >
            Summary Result
          </h2>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div style={{ width: '45%' }}>
              <p style={{ fontSize: '1em', color: '#2d2d2d', margin: '0 0 10px' }}>
                • Strategy - {questionTest.strategic.length} Categories
                <br />
                {preparedStrategyQuestions}/{totalStrategyQuestions} ready aspect
              </p>
              <div style={{ background: '#ffe6e6', height: '10px', borderRadius: '5px' }}>
                <div
                  style={{
                    background: 'linear-gradient(90deg, #990000 0%, #cc0000 100%)',
                    height: '100%',
                    borderRadius: '5px',
                    width: `${Math.min(strategyProgress, 100)}%`,
                  }}
                ></div>
              </div>
            </div>
            <div style={{ width: '45%' }}>
              <p style={{ fontSize: '1em', color: '#2d2d2d', margin: '0 0 10px' }}>
                • Tactics - {questionTest.tactic.length} Categories
                <br />
                {preparedTacticQuestions}/{totalTacticQuestions} ready aspect
              </p>
              <div style={{ background: '#ffe6e6', height: '10px', borderRadius: '5px' }}>
                <div
                  style={{
                    background: 'linear-gradient(90deg, rgba(179, 2, 2, 0.62) 0%, #cc0000 100%)',
                    height: '100%',
                    borderRadius: '5px',
                    width: `${Math.min(tacticProgress, 100)}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Recommendations */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.65)',
            padding: '15px',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            marginBottom: '30px',
          }}
        >
          <h2
            style={{
              color: '#cc0000',
              fontSize: '1.5em',
              textAlign: 'center',
              margin: '0 0 15px',
              fontWeight: '700',
            }}
          >
            Key Recommendations
          </h2>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
              gap: '15px',
            }}
          >
            {allScoresAre30() ? (
              <span
                style={{
                  background: '#ffe6e6',
                  color: '#cc0000',
                  padding: '10px 15px',
                  borderRadius: '15px',
                  fontWeight: '600',
                  fontSize: '1em',
                }}
              >
                No Recommendations
              </span>
            ) : keyRecommendations.length > 0 ? (
              keyRecommendations.map((rec, index) => (
                <span
                  key={index}
                  style={{
                    background: '#ffe6e6',
                    color: '#990000',
                    padding: '10px 15px',
                    borderRadius: '10px',
                    fontWeight: '500',
                    fontSize: '1em',
                    boxShadow: '0 2px 6px rgba(192, 22, 22, 0.18)',
                    minWidth: '200px',
                    textAlign: 'center',
                  }}
                >
                  {rec}
                </span>
              ))
            ) : null}
          </div>
        </div>

        {/* Highlight Text */}
        <p
          style={{
            color: '#990000',
            textAlign: 'center',
            margin: '10px 0',
            fontWeight: '700',
            fontSize: '1em',
          }}
        >
          Protect data & comply with international regulations
        </p>

        {/* Footer */}
        <div
          style={{
            textAlign: 'center',
            color: '#7a0000',
            fontSize: '0.9em',
            fontWeight: '600',
            marginTop: '20px',
          }}
        >
          For further details and assistance please reach out to us at{' '}
          <a
            href={BASE_SHARE_URL}
            style={{ color: '#cc0000', textDecoration: 'none', fontWeight: '800' }}
          >
            vulnerax.com
          </a>
        </div>
      </div>
    </div>
  );
});

export default ScoreCard;