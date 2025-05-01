// /src/app/ransomware-test/page.js
'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Card, Button, Form, Alert, OverlayTrigger, Tooltip, Dropdown } from 'react-bootstrap';
import { questionTest } from '@/app/pages/api/question';
import useTestStore from '@/store/report-store';
import { useRouter } from 'next/navigation';
import ContactFormModal from './CompanyForm';

const BASE_URL = 'https://vulnerax.id';

// Objek terjemahan untuk teks statis
const translations = {
  en: {
    title: 'Ransomware Readiness Assessment',
    previous: 'Previous',
    next: 'Next',
    finish: 'Finish',
    selectReadinessLevel: 'Select readiness level:',
    notReady: 'Not ready',
    inProgress: 'In progress',
    ready: 'Ready',
    warningMessage: 'Please complete all questions before proceeding.',
    allQuestionsNotAnswered: 'Please answer all questions in all categories before finishing the test.',
    tooltip: (current, total) => `Category ${current} of ${total} completed`,
  },
  id: {
    title: 'Penilaian Kesiapan Ransomware',
    previous: 'Sebelumnya',
    next: 'Berikutnya',
    finish: 'Selesai',
    selectReadinessLevel: 'Pilih tingkat kesiapan:',
    notReady: 'Tidak siap',
    inProgress: 'Sedang berlangsung',
    ready: 'Siap',
    warningMessage: 'Harap lengkapi semua pertanyaan sebelum melanjutkan.',
    allQuestionsNotAnswered: 'Harap jawab semua pertanyaan di semua kategori sebelum menyelesaikan tes.',
    tooltip: (current, total) => `Kategori ${current} dari ${total} selesai`,
  },
};

const ReadinessSlider = ({ value, onChange, questionCode, language = 'en', resetTrigger }) => {
  const [sliderValue, setSliderValue] = useState(0); // Awalnya selalu 0
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);

  const t = translations[language];

  // Map nilai slider ke tingkat kesiapan (tanpa label)
  const getReadinessLevel = (val) => {
    if (val <= 33) return { score: 10, color: '#EF4444', icon: 'bi-x-circle-fill' };
    if (val <= 66) return { score: 20, color: '#FBBF24', icon: 'bi-hourglass-split' };
    return { score: 30, color: '#10B981', icon: 'bi-check-circle-fill' };
  };

  const readiness = getReadinessLevel(sliderValue);

  // Konversi nilai score ke posisi slider (0-100)
  const scoreToSliderValue = (score) => {
    if (score === 30) return 100;
    if (score === 20) return 50;
    return 0;
  };

  // Reset slider ke 0 saat resetTrigger (currentCategoryIndex) berubah
  useEffect(() => {
    setSliderValue(0); // Reset ke 0 setiap kali kategori berubah
  }, [resetTrigger]);

  // Update slider value berdasarkan score dari store (jika ada perubahan dari radio button)
  useEffect(() => {
    if (value !== readiness.score) {
      setSliderValue(scoreToSliderValue(value));
    }
  }, [value]);

  // Handle interaksi mouse
  const handleMouseDown = (e) => {
    setIsDragging(true);
    updateSliderPosition(e);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      updateSliderPosition(e);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle interaksi touch (mobile)
  const handleTouchStart = (e) => {
    setIsDragging(true);
    updateSliderPosition(e.touches[0]);
  };

  const handleTouchMove = (e) => {
    if (isDragging) {
      updateSliderPosition(e.touches[0]);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const updateSliderPosition = (e) => {
    const rect = sliderRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    let newValue = (offsetX / rect.width) * 100;
    newValue = Math.max(0, Math.min(100, newValue)); // Batasi antara 0-100
    setSliderValue(newValue);

    // Tentukan score berdasarkan posisi slider
    const readinessLevel = getReadinessLevel(newValue);
    onChange(questionCode, readinessLevel.score);
  };

  return (
    <div className="readiness-slider-container" style={{ position: 'relative', margin: '20px 0' }}>
      {/* CSS Kustom untuk Slider */}
      <style jsx>{`
        /* Efek Pulse pada Ikon */
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 0.7;
          }
        }

        /* Efek Partikel pada Thumb */
        @keyframes sparkle {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(var(--x), var(--y)) scale(0);
            opacity: 0;
          }
        }

        /* Efek Trail pada Thumb */
        @keyframes trailFade {
          0% {
            opacity: 0.8;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(0.5);
          }
        }

        /* Efek Ripple saat Dragging Mulai */
        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 0.5;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        /* Efek Bounce saat Thumb Berhenti */
        @keyframes bounce {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }

        .readiness-slider-track {
          transition: background 0.3s ease;
        }

        .readiness-slider-thumb {
          position: relative;
          overflow: visible !important;
          transition: all 0.3s ease;
        }

        .readiness-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 0 15px ${readiness.color}cc;
        }

        .readiness-slider-thumb.dragging {
          animation: pulse 1s infinite;
        }

        .readiness-slider-thumb:not(.dragging) {
          animation: ${isDragging ? 'none' : 'bounce 0.5s ease'};
        }

        .sparkle {
          position: absolute;
          width: 6px;
          height: 6px;
          background: ${readiness.color};
          border-radius: 50%;
          animation: sparkle 1s ease-out infinite;
          pointer-events: none;
        }

        .trail {
          position: absolute;
          width: 10px;
          height: 10px;
          background: ${readiness.color}80;
          border-radius: 50%;
          animation: trailFade 0.5s ease-out;
          pointer-events: none;
        }

        .ripple {
          position: absolute;
          width: 40px;
          height: 40px;
          background: ${readiness.color}40;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: ripple 0.8s ease-out;
          pointer-events: none;
        }

        .readiness-icon {
          animation: ${isDragging ? 'pulse 1.5s infinite' : 'none'};
        }
      `}</style>

      {/* Track Slider */}
      <div
        ref={sliderRef}
        className="readiness-slider-track"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          height: '12px',
          background: `linear-gradient(to right, #EF4444 0%, #EF4444 33%, #FBBF24 33%, #FBBF24 66%, #10B981 66%, #10B981 100%)`,
          borderRadius: '6px',
          position: 'relative',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Thumb Slider */}
        <div
          className={`readiness-slider-thumb ${isDragging ? 'dragging' : ''}`}
          style={{
            position: 'absolute',
            left: `calc(${sliderValue}% - 12px)`,
            top: '-6px',
            width: '25px',
            height: '25px',
            background: `linear-gradient(145deg, #FFFFFF, ${readiness.color}20)`, 
            border: `3px solid ${readiness.color}`,
            borderRadius: '20%', 
            boxShadow: `0 0 10px ${readiness.color}80, 0 0 20px ${readiness.color}40`, 
            transition: 'left 0.3s ease, border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'grab',
          }}
        >
          {/* Efek Ripple saat Mulai Dragging */}
          {isDragging && (
            <div className="ripple" />
          )}

          {/* Efek Partikel (Sparkle) */}
          {isDragging && (
            <>
              <div
                className="sparkle"
                style={{
                  '--x': '15px',
                  '--y': '-5px',
                  animationDelay: '0s',
                }}
              />
              <div
                className="sparkle"
                style={{
                  '--x': '-10px',
                  '--y': '10px',
                  animationDelay: '0.2s',
                }}
              />
              <div
                className="sparkle"
                style={{
                  '--x': '5px',
                  '--y': '-15px',
                  animationDelay: '0.4s',
                }}
              />
              <div
                className="sparkle"
                style={{
                  '--x': '-15px',
                  '--y': '-5px',
                  animationDelay: '0.6s',
                }}
              />
            </>
          )}

          {/* Efek Trail (Jejak) */}
          {isDragging && (
            <>
              <div
                className="trail"
                style={{
                  left: '-10px',
                  animationDelay: '0s',
                }}
              />
              <div
                className="trail"
                style={{
                  left: '-15px',
                  animationDelay: '0.1s',
                }}
              />
              <div
                className="trail"
                style={{
                  left: '-20px',
                  animationDelay: '0.2s',
                }}
              />
            </>
          )}
        </div>
      </div>

      {/* Ikon di Bawah Slider */}
      <div
        className="readiness-icon"
        style={{
          position: 'absolute',
          top: '20px', // Posisi di bawah track slider
          left: `calc(${sliderValue}% - 12px)`, // Sejajar dengan thumb
          transform: 'translateX(-50%)',
          opacity: isDragging ? 1 : 0, // Hanya muncul saat dragging
          transition: 'opacity 0.3s ease',
        }}
      >
        <i
          className={`bi ${readiness.icon}`}
          style={{
            color: readiness.color,
            fontSize: '20px', // Ukuran ikon lebih besar untuk visibilitas
          }}
        />
      </div>
    </div>
  );
};

const RansomwareTest = () => {
  const router = useRouter();
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [warningMessage, setWarningMessage] = useState('');
  const { scores, setScore, companyData, setCompanyData } = useTestStore();
  const [show, setShow] = useState(false);
  const [apiKey, setApiKey] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [language, setLanguage] = useState('en'); // State untuk bahasa

  const t = translations[language]; // Ambil terjemahan berdasarkan bahasa

  const fetchApiKey = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/latest-key`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to fetch API key');
      const data = await response.json();
      return data.key || data.apiKey || data.api_key || data.accessKey;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch API key.');
    }
  };

  useEffect(() => {
    const getApiKey = async () => {
      try {
        const key = await fetchApiKey();
        setApiKey(key);
      } catch (error) {
        setErrorMessage(error.message || 'Failed to fetch API key.');
      }
    };
    getApiKey();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Terjemahkan kategori dan pertanyaan berdasarkan bahasa
  const categories = [...questionTest.strategic, ...questionTest.tactic].map((category) => ({
    ...category,
    category: category[`category_${language}`] || category.category_en,
    detail: category.detail.map((q) => ({
      ...q,
      question: q[`question_${language}`] || q.question_en,
      hint: q[`hint_${language}`] || q.hint_en,
    })),
  }));

  const currentCategory = categories[currentCategoryIndex];
  const totalQuestions = currentCategory.detail.length;
  const answeredInCategory = currentCategory.detail.filter((q) =>
    scores.hasOwnProperty(q.code) && [10, 20, 30].includes(scores[q.code])
  ).length;

  // Hitung total pertanyaan di semua kategori
  const totalQuestionsAllCategories = categories.reduce((total, category) => total + category.detail.length, 0);
  const answeredAllCategories = Object.keys(scores).filter((code) =>
    scores[code] && [10, 20, 30].includes(scores[code])
  ).length;

  // Hitung persentase kemajuan berdasarkan kategori
  const progressPercentage = ((currentCategoryIndex + 1) / categories.length) * 100;

  const handleScoreChange = (code, value) => {
    setScore(code, value);
    setWarningMessage('');
  };

  const handleNext = () => {
    if (answeredInCategory !== totalQuestions) {
      setWarningMessage(t.warningMessage);
      return;
    }
    if (currentCategoryIndex < categories.length - 1) {
      setCurrentCategoryIndex((prev) => prev + 1);
    } else {
      // Verifikasi bahwa semua pertanyaan di semua kategori telah dijawab
      if (answeredAllCategories !== totalQuestionsAllCategories) {
        setWarningMessage(t.allQuestionsNotAnswered);
        return;
      }
      handleShow();
    }
  };

  // Tooltip untuk progress bar
  const renderTooltip = (props) => (
    <Tooltip id="progress-tooltip" {...props}>
      {t.tooltip(currentCategoryIndex + 1, categories.length)}
    </Tooltip>
  );

  return (
    <div className="container-fluid p-5" style={{ background: 'linear-gradient(135deg, #F9FAFB, #FFFFFF)', minHeight: '100vh' }}>
      <style jsx global>{`
        /* Kustomisasi warna radio button saat dipilih */
        .form-check-input[type="radio"] {
          width: 20px;
          height: 20px;
          border: 2px solid #6B7280;
          background-color: #FFFFFF;
          transition: all 0.3s ease;
        }

        .form-check-input[type="radio"]:checked {
          background-color: #FFFFFF;
          border-width: 6px;
        }

        .form-check-input[name$="not-ready"]:checked {
          border-color: #EF4444 !important;
          box-shadow: 0 0 8px rgba(239, 68, 68, 0.5) !important;
        }

        .form-check-input[name$="in-process"]:checked {
          border-color: #FBBF24 !important;
          box-shadow: 0 0 8px rgba(251, 191, 36, 0.5) !important;
        }

        .form-check-input[name$="ready"]:checked {
          border-color: #10B981 !important;
          box-shadow: 0 0 8px rgba(16, 185, 129, 0.5) !important;
        }

        .form-check-input[type="radio"]:hover {
          cursor: pointer;
          transform: scale(1.1);
        }

        .form-check-label {
          margin-left: 8px;
          font-size: 14px;
          font-weight: 500;
          color: #4B5563;
          transition: color 0.3s ease;
        }

        .form-check-input[name$="not-ready"]:checked + .form-check-label {
          color: #EF4444 !important;
        }

        .form-check-input[name$="in-process"]:checked + .form-check-label {
          color: #FBBF24 !important;
        }

        .form-check-input[name$="ready"]:checked + .form-check-label {
          color: #10B981 !important;
        }

        /* Progress Bar Styles */
        .progress-container {
          position: relative;
          width: 100%;
          height: 12px;
          background-color: #E5E7EB;
          border-radius: 20px;
          overflow: hidden;
          margin-bottom: 20px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #D32F2F, #EF4444, #FBBF24, #10B981);
          background-size: 200% 100%;
          border-radius: 20px;
          position: relative;
          transition: width 0.5s ease-in-out;
          animation: gradientMove 3s linear infinite, pulse 2s ease-in-out infinite;
        }

        /* Efek gradient bergerak */
        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }

        /* Efek pulse */
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(211, 47, 47, 0.5);
          }
          50% {
            box-shadow: 0 0 10px 5px rgba(211, 47, 47, 0.3);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(211, 47, 47, 0.5);
          }
        }

        /* Efek sparkle di ujung progress bar */
        .progress-bar::after {
          content: '';
          position: absolute;
          right: 0;
          top: 50%;
          width: 8px;
          height: 8px;
          background: #FFFFFF;
          border-radius: 50%;
          transform: translateY(-50%);
          box-shadow: 0 0 10px 5px rgba(255, 255, 255, 0.8);
          animation: sparkle 1.5s ease-in-out infinite;
        }

        @keyframes sparkle {
          0% {
            opacity: 1;
            transform: translateY(-50%) scale(1);
          }
          50% {
            opacity: 0.5;
            transform: translateY(-50%) scale(1.5);
          }
          100% {
            opacity: 1;
            transform: translateY(-50%) scale(1);
          }
        }

        /* Hover effect pada progress bar */
        .progress-container:hover {
          transform: scale(1.02);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
        }

        /* Tooltip styling */
        .tooltip-inner {
          background-color: #D32F2F;
          color: #FFFFFF;
          font-size: 12px;
          border-radius: 8px;
          padding: 6px 12px;
        }

        .tooltip-arrow::before {
          border-top-color: #D32F2F !important;
        }

        /* Dropdown Language */
        .language-dropdown .btn {
          background: linear-gradient(90deg, #D32F2F, #EF4444);
          color: #FFFFFF;
          border: none;
          border-radius: 12px;
          padding: 8px 16px;
          font-weight: bold;
          transition: transform 0.2s ease;
        }

        .language-dropdown .btn:hover {
          transform: scale(1.05);
        }

        .language-dropdown .dropdown-menu {
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .language-dropdown .dropdown-item {
          font-size: 14px;
          padding: 8px 16px;
          transition: background-color 0.3s ease;
        }

        .language-dropdown .dropdown-item:hover {
          background-color: #EF4444;
          color: #FFFFFF;
        }
      `}</style>

      <div className="d-flex justify-content-between align-items-center mb-5">
        <h1
          style={{
            color: '#D32F2F',
            fontFamily: 'Roboto, sans-serif',
            fontWeight: '700',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
            margin: 0,
          }}
        >
          {t.title}
        </h1>
        <div className="d-flex align-items-center gap-3">
          {/* Dropdown untuk pemilihan bahasa */}
          <Dropdown className="language-dropdown">
            <Dropdown.Toggle variant="success" id="dropdown-language">
              {language === 'en' ? 'English' : 'Indonesia'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setLanguage('en')}>English</Dropdown.Item>
              <Dropdown.Item onClick={() => setLanguage('id')}>Indonesia</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <img
            src="/favicon.ico"
            alt="Vulnerax Logo"
            style={{ width: '60px', height: '60px' }}
          />
        </div>
      </div>

      {/* Progress Bar */}
      <OverlayTrigger placement="top" overlay={renderTooltip}>
        <div className="progress-container">
          <div
            className="progress-bar"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </OverlayTrigger>

      {errorMessage && (
        <Alert variant="danger" onClose={() => setErrorMessage('')} dismissible style={{ backgroundColor: 'rgba(211, 47, 47, 0.9)', color: '#FFFFFF', borderRadius: '10px' }}>
          {errorMessage}
        </Alert>
      )}

      {warningMessage && (
        <Alert variant="warning" onClose={() => setWarningMessage('')} dismissible style={{ backgroundColor: 'rgba(251, 191, 36, 0.9)', color: '#4B5563', borderRadius: '10px' }}>
          {warningMessage}
        </Alert>
      )}

      <Card
        className="shadow-lg"
        style={{
          borderRadius: '20px',
          backgroundColor: '#FFFFFF',
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(211, 47, 47, 0.3), 0 4px 16px rgba(211, 47, 47, 0.2)',
        }}
      >
        <Card.Header className="p-4" style={{ backgroundColor: '#E5E7EB', color: '#4B5563', borderBottom: '2px solid #D32F2F' }}>
          <div className="d-flex justify-content-between align-items-center">
            <span style={{ fontSize: '1.5rem', fontWeight: '600' }}>
              {currentCategory.category} ({currentCategoryIndex + 1}/{categories.length})
            </span>
            <img src={currentCategory.icon} alt={`${currentCategory.category} icon`} style={{ width: '50px', height: '50px' }} />
          </div>
        </Card.Header>
        <Card.Body className="p-5" style={{ background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(5px)' }}>
          {currentCategory.detail.map((question, qIndex) => (
            <div key={qIndex} className="mb-5">
              <h5 style={{ color: '#4B5563', fontFamily: 'Roboto, sans-serif', fontWeight: '600' }}>
                {question.code}: {question.question}
              </h5>
              <p style={{ color: '#6B7280', fontFamily: 'Roboto, sans-serif' }}>{question.hint}</p>
              <Form>
                <Form.Group>
                  <Form.Label style={{ color: '#D32F2F', fontWeight: '500' }}>{t.selectReadinessLevel}</Form.Label>
                  <div className="d-flex justify-content-between mb-3">
                    <Form.Check
                      type="radio"
                      label={t.notReady}
                      name={`question-${question.code}`}
                      id={`question-${question.code}-not-ready`}
                      checked={scores[question.code] === 10}
                      onChange={() => handleScoreChange(question.code, 10)}
                      className="me-3"
                    />
                    <Form.Check
                      type="radio"
                      label={t.inProgress}
                      name={`question-${question.code}`}
                      id={`question-${question.code}-in-process`}
                      checked={scores[question.code] === 20}
                      onChange={() => handleScoreChange(question.code, 20)}
                      className="me-3"
                    />
                    <Form.Check
                      type="radio"
                      label={t.ready}
                      name={`question-${question.code}`}
                      id={`question-${question.code}-ready`}
                      checked={scores[question.code] === 30}
                      onChange={() => handleScoreChange(question.code, 30)}
                    />
                  </div>
                  <ReadinessSlider
                    value={scores[question.code] || 10}
                    onChange={handleScoreChange}
                    questionCode={question.code}
                    language={language}
                    resetTrigger={currentCategoryIndex} 
                  />
                </Form.Group>
              </Form>
            </div>
          ))}
        </Card.Body>
      </Card>

      <div className="d-flex justify-content-between mt-4">
        <Button
          onClick={() => setCurrentCategoryIndex((prev) => (prev > 0 ? prev - 1 : 0))}
          disabled={currentCategoryIndex === 0}
          className="px-5 py-2"
          style={{
            background: 'linear-gradient(90deg, #D32F2F, #EF4444)',
            border: 'none',
            borderRadius: '12px',
            color: '#FFFFFF',
            fontWeight: 'bold',
            transition: 'transform 0.2s ease',
          }}
          onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
        >
          {t.previous}
        </Button>
        <Button
          onClick={handleNext}
          disabled={answeredInCategory !== totalQuestions}
          className="px-5 py-2"
          style={{
            background: 'linear-gradient(90deg, #D32F2F, #EF4444)',
            border: 'none',
            borderRadius: '12px',
            color: '#FFFFFF',
            fontWeight: 'bold',
            transition: 'transform 0.2s ease',
          }}
          onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
        >
          {currentCategoryIndex === categories.length - 1 ? t.finish : t.next}
        </Button>
      </div>
      <ContactFormModal show={show} handleClose={handleClose} apiKey={apiKey} onSuccess={() => router.push('/report')} />
    </div>
  );
};

export default RansomwareTest;