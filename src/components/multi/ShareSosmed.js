// /src/app/components/multi/ShareSosmed.js
import { useState, useRef, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, RedditIcon, RedditShareButton, TelegramIcon, TelegramShareButton, ThreadsIcon, ThreadsShareButton, TwitterShareButton, XIcon } from 'react-share';
import ScoreCard from './score-card';
import Spinner from 'react-bootstrap/Spinner';
import { questionTest } from '@/app/pages/api/question';

// Definisikan base URL untuk mode development
const BASE_SHARE_URL = 'https://dev.vulnerax.com';

// Komponen Kustom untuk Slack Share Button
const SlackShareButton = ({ url, title, children }) => {
  const handleClick = () => {
    const shareUrl = `https://slack.com/app_redirect?channel=general&text=${encodeURIComponent(`${title} ${url}`)}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <button onClick={handleClick} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
      {children}
    </button>
  );
};

// Komponen Kustom untuk Microsoft Teams Share Button
const TeamsShareButton = ({ url, title, children }) => {
  const handleClick = () => {
    const shareUrl = `https://teams.microsoft.com/share?href=${encodeURIComponent(url)}&msgText=${encodeURIComponent(title)}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <button onClick={handleClick} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
      {children}
    </button>
  );
};

// Ikon Kustom untuk Slack dan Teams (menggunakan Bootstrap Icons dengan gaya bulat)
const SlackIcon = ({ round }) => (
  <i
    className="bi bi-slack"
    style={{
      fontSize: '32px',
      color: '#4A154B',
      borderRadius: round ? '50%' : '0',
      padding: round ? '8px' : '0',
      backgroundColor: round ? '#fff' : 'transparent',
    }}
  ></i>
);

const TeamsIcon = ({ round }) => (
  <i
    className="bi bi-microsoft-teams"
    style={{
      fontSize: '32px',
      color: '#6264A7',
      borderRadius: round ? '50%' : '0',
      padding: round ? '8px' : '0',
      backgroundColor: round ? '#fff' : 'transparent',
    }}
  ></i>
);

function ShareModal({ scores, companyId }) {
  const [show, setShow] = useState(false);
  const [copyStatus, setCopyStatus] = useState('Copy URL');
  const [isDownloading, setIsDownloading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const scoreCardRef = useRef(null);

  // Daftar kode pertanyaan dalam urutan tetap
  const questionCodes = [
    ...questionTest.strategic.flatMap(cat => cat.detail.map(q => q.code)),
    ...questionTest.tactic.flatMap(cat => cat.detail.map(q => q.code)),
  ];

  // Verifikasi bahwa scores dan companyId tersedia
  useEffect(() => {
    if (!companyId) {
      setErrorMessage('Error: Company ID is missing. Unable to generate share URL.');
      console.warn('Company ID is missing in ShareModal:', companyId);
    } else if (!scores || Object.keys(scores).length === 0) {
      setErrorMessage('Error: Scores are missing. Unable to generate share URL.');
      console.warn('Scores are missing in ShareModal:', scores);
    } else {
      setErrorMessage('');
      console.log('ShareModal props verified - companyId:', companyId, 'scores:', scores);
    }
  }, [scores, companyId]);

  // Encode scores menggunakan skema 2-bit per skor
  let encodedScores = '';
  if (scores && Object.keys(scores).length > 0) {
    try {
      const scoresArray = questionCodes.map(code => scores[code] || 0);
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
      console.log('Scores encoded:', {
        scoresArray,
        bitString,
        byteArray,
        encodedScores,
        encodedLength: encodedScores.length,
      });
    } catch (error) {
      console.error('Failed to encode scores:', error);
      setErrorMessage('Error: Failed to encode scores data.');
    }
  }

  // Gunakan URL dinamis berdasarkan companyId dan sertakan scores sebagai query parameter
  const shareUrl = companyId && scores && Object.keys(scores).length > 0 && encodedScores
    ? `${BASE_SHARE_URL}/score-card/${companyId}?scores=${encodedScores}`
    : BASE_SHARE_URL;

  // Log shareUrl untuk debugging
  useEffect(() => {
    if (shareUrl) {
      console.log('Generated shareUrl:', shareUrl);
    }
  }, [shareUrl]);

  const handleClose = () => {
    setShow(false);
    setIsDownloading(false);
    setErrorMessage('');
  };

  const handleShow = () => setShow(true);

  const copyToClipboard = () => {
    if (!shareUrl || errorMessage) {
      setCopyStatus('Cannot copy URL');
      return;
    }
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopyStatus('Copied!');
      setTimeout(() => setCopyStatus('Copy URL'), 2000);
    }).catch(() => {
      setCopyStatus('Failed to copy');
    });
  };

  const handleDownload = () => {
    if (!scoreCardRef.current) {
      return;
    }

    setIsDownloading(true);

    try {
      scoreCardRef.current.download();
    } catch (error) {
      console.error('Error downloading score-card:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      <button className="btn btn-outline-primary rounded-pill ms-2" onClick={handleShow}>
        Share <i className="bi bi-share"></i>
      </button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Share Your Score Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Tampilkan pesan error jika ada */}
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}

          {/* Tombol Share Sosial Media - Nonaktifkan jika ada error */}
          {!errorMessage && (
            <>
              <div className="row mb-5">
                <div className="col-3 d-flex justify-content-center">
                  <TwitterShareButton url={shareUrl} title="Check out my ransomware readiness score!">
                    <XIcon round />
                  </TwitterShareButton>
                </div>
                <div className="col-3 d-flex justify-content-center">
                  <FacebookShareButton url={shareUrl} quote="Check out my ransomware readiness score!">
                    <FacebookIcon round />
                  </FacebookShareButton>
                </div>
                <div className="col-3 d-flex justify-content-center">
                  <LinkedinShareButton url={shareUrl} title="Ransomware Readiness Score" summary="Check out my organization's ransomware readiness score!">
                    <LinkedinIcon round />
                  </LinkedinShareButton>
                </div>
                <div className="col-3 d-flex justify-content-center">
                  <ThreadsShareButton url={shareUrl}>
                    <ThreadsIcon round />
                  </ThreadsShareButton>
                </div>
              </div>
              <div className="row mb-5">
                <div className="col-3 d-flex justify-content-center">
                  <SlackShareButton url={shareUrl} title="Check out my ransomware readiness score!">
                    <SlackIcon round />
                  </SlackShareButton>
                </div>
                <div className="col-3 d-flex justify-content-center">
                  <RedditShareButton url={shareUrl} title="My Ransomware Readiness Score">
                    <RedditIcon round />
                  </RedditShareButton>
                </div>
                <div className="col-3 d-flex justify-content-center">
                  <TelegramShareButton url={shareUrl} title="Check out my ransomware readiness score!">
                    <TelegramIcon round />
                  </TelegramShareButton>
                </div>
                <div className="col-3 d-flex justify-content-center">
                  <TeamsShareButton url={shareUrl} title="Check out my organization's ransomware readiness score!">
                    <TeamsIcon round />
                  </TeamsShareButton>
                </div>
              </div>
            </>
          )}

          {/* Tombol Download Scorecard */}
          <div className="text-center mb-5">
            <button
              className="btn btn-danger rounded-pill"
              onClick={handleDownload}
              style={{ fontWeight: 'bold', padding: '12px 40px', fontSize: '1.1em' }}
              disabled={isDownloading}
            >
              {isDownloading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="ms-2">Downloading...</span>
                </>
              ) : (
                'Download Scorecard'
              )}
            </button>
          </div>

          {/* Render ScoreCard tetapi sembunyikan */}
          <ScoreCard ref={scoreCardRef} onDownload={handleClose} />
        </Modal.Body>
        <Modal.Footer>
          <div className="w-100">
            <p className="text-start">Or copy link</p>
            <div className="d-flex align-items-center justify-content-between border border-2 rounded p-1">
              <span className="me-2">{errorMessage ? 'N/A' : shareUrl}</span>
              <button
                className="btn btn-danger rounded-pill"
                onClick={copyToClipboard}
                disabled={!!errorMessage}
              >
                {copyStatus}
              </button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ShareModal;