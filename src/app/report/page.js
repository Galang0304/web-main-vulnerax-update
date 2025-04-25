// /src/app/report/page.js
'use client';
import { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { Nav, ProgressBar, Row, Col, Modal, Button, Dropdown, Alert } from 'react-bootstrap';
import useTestStore from '@/store/report-store';
import { questionTest } from '../pages/api/question';
import MyDocument from '@/components/multi/Document';
import ShareModal from '@/components/multi/ShareSosmed';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Contact from '@/components/pages/Contact';
import Header from '@/components/pages/Header';
import Footer from '@/components/pages/Footer';
import { useRouter } from 'next/navigation';

Chart.register(...registerables);

const BASE_URL = 'https://vulnerax.com';

// Objek terjemahan untuk Bahasa Inggris dan Indonesia
const translations = {
  en: {
    title: {
      all: 'All Score',
      strategic: 'Strategic Score',
      tactic: 'Tactic Score',
    },
    exportReport: 'Export Report',
    chooseLanguage: 'Pilih Bahasa Laporan',
    languagePrompt: 'Select the language for your PDF report download:',
    english: 'English',
    indonesia: 'Indonesia',
    loading: 'Loading...',
    tabs: {
      all: 'All',
      strategic: 'Strategics',
      tactic: 'Tactics',
    },
    benchmarks: 'Benchmarks',
    score: 'Score',
    overallScore: (score) => `Overall Score: ${score}%`,
    categoryScores: 'Category Scores',
    ratingDetails: {
      A: {
        message: "Your organization is a superhero in the fight against ransomware! 🦸‍♂️ Your apps and data are as secure as a bank vault, but don't let your guard down-keep monitoring and updating regularly to keep cybercriminals at bay!",
      },
      B: {
        message: "Your organization is like a student who passed a ransomware exam with a B - not bad, but better! 📚 Prioritize application and data security and train your team to avoid sneaky cyber traps.",
      },
      C: {
        message: "Ouch! Your organization is like a house with the door wide open when the ransomware storm comes. 🌪️ Your applications and data need immediate help-so roll up your sleeves and strengthen security now!",
      },
    },
    totalPopulation: (rating) => `Total Population: ${rating}`,
    industryEducation: (rating) => `Industry: Education: ${rating}`,
    chartTicks: {
      low: (value) => `Low (${value}%)`,
      medium: (value) => `Medium (${value}%)`,
      high: (value) => `High (${value}%)`,
    },
    selectLanguage: 'Select Language',
    errorMessage: 'Error: Scores are missing. Please complete the ransomware test first.',
  },
  id: {
    title: {
      all: 'Skor Keseluruhan',
      strategic: 'Skor Strategi',
      tactic: 'Skor Taktik',
    },
    exportReport: 'Ekspor Laporan',
    chooseLanguage: 'Pilih Bahasa Laporan',
    languagePrompt: 'Pilih bahasa untuk unduhan laporan PDF Anda:',
    english: 'Inggris',
    indonesia: 'Indonesia',
    loading: 'Memuat...',
    tabs: {
      all: 'Semua',
      strategic: 'Strategi',
      tactic: 'Taktik',
    },
    benchmarks: 'Tolok Ukur',
    score: 'Skor',
    overallScore: (score) => `Skor Keseluruhan: ${score}%`,
    categoryScores: 'Skor Kategori',
    ratingDetails: {
      A: {
        message: "Organisasi Anda adalah pahlawan super dalam melawan ransomware! 🦸‍♂️ Aplikasi dan data Anda seaman brankas bank, tapi jangan lengah—tetap pantau dan perbarui rutin agar penjahat siber tak bisa mendekat!",
      },
      B: {
        message: "Organisasi Anda seperti siswa yang lulus ujian ransomware dengan nilai B—lumayan, tapi bisa lebih baik! 📚 Prioritaskan keamanan aplikasi dan data serta latih tim Anda untuk menghindari jebakan siber yang licik.",
      },
      C: {
        message: "Aduh! Organisasi Anda seperti rumah dengan pintu terbuka lebar saat badai ransomware datang. 🌪️ Aplikasi dan data Anda butuh bantuan segera—ayo gulung lengan baju dan perkuat keamanan sekarang juga!",
      },
    },
    totalPopulation: (rating) => `Populasi Total: ${rating}`,
    industryEducation: (rating) => `Industri: Pendidikan: ${rating}`,
    chartTicks: {
      low: (value) => `Rendah (${value}%)`,
      medium: (value) => `Sedang (${value}%)`,
      high: (value) => `Tinggi (${value}%)`,
    },
    selectLanguage: 'Pilih Bahasa',
    errorMessage: 'Kesalahan: Skor tidak ditemukan. Harap selesaikan tes ransomware terlebih dahulu.',
  },
};

const ReportPage = () => {
  const router = useRouter();
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [activeTab, setActiveTab] = useState('all');
  const { scores, companyId, apiKey } = useTestStore();
  const [isClient, setIsClient] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [companyData, setCompanyData] = useState(null);
  const [areChartsSaved, setAreChartsSaved] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [language, setLanguage] = useState('en'); // State untuk bahasa
  const [errorMessage, setErrorMessage] = useState(''); // State untuk pesan error

  const t = translations[language]; // Ambil terjemahan berdasarkan bahasa

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      if (!scores || Object.keys(scores).length === 0) {
        setErrorMessage(t.errorMessage);
        setTimeout(() => router.push('/rra'), 3000); 
      }
    }
  }, [isClient, scores, router, t]);

  const fetchCompanyData = async () => {
    if (!companyId || !apiKey) return;
    try {
      const response = await fetch(`${BASE_URL}/api/v1/companies/${companyId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': apiKey,
        },
      });
      if (!response.ok) throw new Error();
      const data = await response.json();
      setCompanyData(data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchCompanyData();
  }, [companyId, apiKey]);

  const calculateCategoryScore = (categories) => {
    return categories.reduce(
      (total, cat) =>
        total + cat.detail.reduce((sum, question) => sum + (scores[question.code] || 0), 0),
      0
    );
  };

  const strategicScoreActual = calculateCategoryScore(questionTest.strategic);
  const tacticScoreActual = calculateCategoryScore(questionTest.tactic);

  const strategicMaxScore = 570;
  const tacticMaxScore = 750;
  const overallMaxScore = 1320;

  const strategicScorePercentage = (strategicScoreActual / strategicMaxScore) * 100;
  const tacticScorePercentage = (tacticScoreActual / tacticMaxScore) * 100;
  const overallScore = strategicScorePercentage * 0.4 + tacticScorePercentage * 0.6;

  const getRating = (score) => {
    if (score >= 70) return 'A';
    if (score >= 40) return 'B';
    return 'C';
  };

  const rating = getRating(overallScore);

  const ratingDetails = {
    A: {
      message: t.ratingDetails.A.message,
      badgeClass: 'bg-success', // Hijau untuk A
    },
    B: {
      message: t.ratingDetails.B.message,
      badgeClass: 'bg-warning', // Kuning untuk B
    },
    C: {
      message: t.ratingDetails.C.message,
      badgeClass: 'bg-danger', // Merah untuk C
    },
  };

  const { message, badgeClass } = ratingDetails[rating] || {
    message: t.ratingDetails['C'].message,
    badgeClass: 'bg-danger',
  };

  // Buat data kategori dengan terjemahan
  const translatedCategories = {
    strategic: questionTest.strategic.map((category) => ({
      ...category,
      category: category[`category_${language}`] || category.category_en,
      acronym: category.acronym, // acronym biasanya tidak diterjemahkan
    })),
    tactic: questionTest.tactic.map((category) => ({
      ...category,
      category: category[`category_${language}`] || category.category_en,
      acronym: category.acronym,
    })),
  };

  const getChartData = (tab = activeTab) => {
    let categories = [];
    if (tab === 'strategic') categories = translatedCategories.strategic;
    else if (tab === 'tactic') categories = translatedCategories.tactic;
    else categories = [...translatedCategories.strategic, ...translatedCategories.tactic];

    return {
      labels: categories.map((cat) => cat.acronym),
      datasets: [
        {
          label: t.score,
          data: categories.map((cat) =>
            (cat.detail.reduce((sum, question) => sum + (scores[question.code] || 0), 0) /
              (cat.detail.length * 30)) *
            100
          ),
          backgroundColor: 'rgba(211, 47, 47, 0.2)',
          borderColor: '#D32F2F',
          borderWidth: 2,
        },
      ],
    };
  };

  useEffect(() => {
    if (!isClient) return;
    if (!chartRef.current) return;
    if (isInitialized) return;
    if (!scores || Object.keys(scores).length === 0) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
      chartInstanceRef.current = null;
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    const myChart = new Chart(ctx, {
      type: 'radar',
      data: getChartData('all'),
      options: {
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            angleLines: { display: true, color: 'rgba(200, 200, 200, 0.5)' },
            grid: {
              color: (context) => {
                const value = context.tick.value;
                if (value >= 70) return 'rgba(75, 192, 192, 0.2)';
                if (value >= 40) return 'rgba(255, 206, 86, 0.2)';
                return 'rgba(211, 47, 47, 0.2)';
              },
            },
            pointLabels: { font: { size: 12, family: 'Roboto' } },
            ticks: {
              stepSize: 20,
              callback: (value) =>
                value >= 70
                  ? t.chartTicks.low(value)
                  : value >= 40
                  ? t.chartTicks.medium(value)
                  : t.chartTicks.high(value),
            },
          },
        },
        plugins: {
          legend: { display: true, position: 'top', labels: { font: { family: 'Roboto' } } },
        },
      },
    });

    chartInstanceRef.current = myChart;
    setIsInitialized(true);
  }, [isClient, scores, language]);

  const saveCharts = (chart) => {
    if (!chart || !chartRef.current) return;
    const saveChartAsImage = (canvas, key) => {
      if (canvas) {
        localStorage.setItem(key, canvas.toDataURL('image/png'));
        return true;
      }
      return false;
    };
    const waitForRender = () => new Promise((resolve) => setTimeout(resolve, 2000));

    (async () => {
      try {
        let allSaved = true;

        chart.data = getChartData('all');
        chart.update();
        await waitForRender();
        if (!saveChartAsImage(chartRef.current, 'radarChart-all')) {
          allSaved = false;
        }

        chart.data = getChartData('strategic');
        chart.update();
        await waitForRender();
        if (!saveChartAsImage(chartRef.current, 'radarChart-strategic')) {
          allSaved = false;
        }

        chart.data = getChartData('tactic');
        chart.update();
        await waitForRender();
        if (!saveChartAsImage(chartRef.current, 'radarChart-tactic')) {
          allSaved = false;
        }

        chart.data = getChartData(activeTab);
        chart.update();

        const allChartSaved =
          localStorage.getItem('radarChart-all') &&
          localStorage.getItem('radarChart-strategic') &&
          localStorage.getItem('radarChart-tactic');

        if (allSaved && allChartSaved) {
          setAreChartsSaved(true);
        } else {
          setAreChartsSaved(false);
        }
      } catch (error) {
        setAreChartsSaved(false);
      }
    })();
  };

  useEffect(() => {
    if (!isClient || !isInitialized || !chartInstanceRef.current) return;
    saveCharts(chartInstanceRef.current);
  }, [isClient, isInitialized, chartInstanceRef.current, language]);

  useEffect(() => {
    let timeoutId;
    if (isClient && chartInstanceRef.current && isInitialized) {
      timeoutId = setTimeout(() => {
        chartInstanceRef.current.data = getChartData(activeTab);
        chartInstanceRef.current.update();
      }, 100);
    }
    return () => clearTimeout(timeoutId);
  }, [isClient, activeTab, isInitialized, language]);

  const handleExportClick = () => {
    setShowLanguageModal(true);
  };

  // Jika ada pesan error, tampilkan dan hentikan rendering konten utama
  if (errorMessage) {
    return (
      <>
        <Header />
        <section
          className="features section py-5"
          style={{ background: 'linear-gradient(135deg, #F9FAFB, #FFFFFF)', minHeight: '100vh' }}
        >
          <div className="container">
            <Alert variant="danger" onClose={() => setErrorMessage('')} dismissible>
              {errorMessage}
            </Alert>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <section
        className="features section py-5"
        style={{ background: 'linear-gradient(135deg, #F9FAFB, #FFFFFF)', minHeight: '100vh' }}
      >
        {/* Tambahkan CSS kustom untuk tombol dan dropdown */}
        <style jsx global>{`
          /* Dropdown Language */
          .language-dropdown .btn {
            background: linear-gradient(90deg, #D32F2F, #EF4444);
            color: #FFFFFF;
            border: none;
            border-radius: 12px;
            padding: 8px 16px;
            font-weight: bold;
            transition: transform 0.2s ease;
            display: flex;
            align-items: center;
            gap: 8px;
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

          /* Export Report Button */
          .btn-export-report {
            background: linear-gradient(90deg, #D32F2F, #EF4444);
            color: #FFFFFF; /* Warna teks putih */
            border: none;
            border-radius: 12px;
            padding: 8px 16px;
            font-weight: bold;
            transition: transform 0.2s ease;
          }

          .btn-export-report:disabled {
            background: #E5E7EB;
            color: #6B7280;
            cursor: not-allowed;
          }

          .btn-export-report:not(:disabled):hover {
            transform: scale(1.05);
          }

          /* Modal Buttons */
          .modal-language-btn {
            background: linear-gradient(90deg, #D32F2F, #EF4444);
            color: #FFFFFF; /* Warna teks putih */
            border: none;
            border-radius: 12px;
            padding: 8px 16px;
            font-weight: bold;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }

          .modal-language-btn:disabled {
            background: #E5E7EB;
            color: #6B7280;
            cursor: not-allowed;
          }

          .modal-language-btn:not(:disabled):hover {
            transform: scale(1.02);
            box-shadow: 0 4px 12px rgba(211, 47, 47, 0.3);
          }
        `}</style>

        <div className="container section-title d-flex justify-content-between align-items-center mb-5">
          <h2
            style={{
              color: '#4B5563',
              fontFamily: 'Roboto, sans-serif',
              fontWeight: '600',
              textTransform: 'capitalize',
            }}
          >
            {t.title[activeTab]}
          </h2>
          <div className="d-flex gap-2 align-items-center">
            {/* Dropdown untuk memilih bahasa */}
            <Dropdown className="language-dropdown">
              <Dropdown.Toggle id="dropdown-language">
                <i className="bi bi-globe me-2"></i>
                {language === 'en' ? t.english : t.indonesia}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setLanguage('en')}>
                  {t.english}
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setLanguage('id')}>
                  {t.indonesia}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            {isClient && companyData ? (
              <button
                className="btn-export-report"
                onClick={handleExportClick}
                disabled={!areChartsSaved}
              >
                {t.exportReport} <i className="bi bi-file-earmark-pdf-fill ms-2"></i>
              </button>
            ) : (
              <button className="btn-export-report" disabled>
                {t.exportReport} <i className="bi bi-file-earmark-pdf-fill ms-2"></i>
              </button>
            )}

            {/* Modal untuk memilih bahasa PDF */}
            <Modal show={showLanguageModal} onHide={() => setShowLanguageModal(false)} centered>
              <Modal.Header closeButton style={{ borderBottom: 'none', paddingBottom: '0' }}>
                <Modal.Title style={{ fontSize: '1.5rem', fontWeight: '600', color: '#2A4365' }}>
                  {t.chooseLanguage}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ padding: '20px 30px' }}>
                <p style={{ color: '#4A5568', marginBottom: '20px', fontSize: '1rem' }}>
                  {t.languagePrompt}
                </p>
                <div className="d-flex flex-column gap-3">
                  {isClient && companyData ? (
                    <PDFDownloadLink
                      document={<MyDocument companyData={companyData} language="en" />}
                      fileName={`RRA-Report_${companyData?.company_name || 'Unknown'}_${new Date().toISOString().split('T')[0]}.pdf`}
                    >
                      {({ loading }) => (
                        <Button
                          className="modal-language-btn"
                          disabled={loading}
                          onClick={() => setShowLanguageModal(false)}
                        >
                          <i className="bi bi-globe me-2"></i> {loading ? t.loading : t.english}
                        </Button>
                      )}
                    </PDFDownloadLink>
                  ) : (
                    <Button className="modal-language-btn" disabled>
                      <i className="bi bi-globe me-2"></i> {t.english}
                    </Button>
                  )}

                  {isClient && companyData ? (
                    <PDFDownloadLink
                      document={<MyDocument companyData={companyData} language="id" />}
                      fileName={`RRA-Report_${companyData?.company_name || 'Unknown'}_${new Date().toISOString().split('T')[0]}.pdf`}
                    >
                      {({ loading }) => (
                        <Button
                          className="modal-language-btn"
                          disabled={loading}
                          onClick={() => setShowLanguageModal(false)}
                        >
                          <i className="bi bi-globe me-2"></i> {loading ? t.loading : t.indonesia}
                        </Button>
                      )}
                    </PDFDownloadLink>
                  ) : (
                    <Button className="modal-language-btn" disabled>
                      <i className="bi bi-globe me-2"></i> {t.indonesia}
                    </Button>
                  )}
                </div>
              </Modal.Body>
            </Modal>

            <ShareModal scores={scores} companyId={companyId} />
          </div>
        </div>
        <div className="container">
          <Row className="g-4">
            <Col md={7} data-aos="fade-left">
              <div
                className="radar-chart-container"
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(5px)',
                  borderRadius: '20px',
                  padding: '20px',
                  boxShadow: '0 8px 32px rgba(211, 47, 47, 0.2), 0 4px 16px rgba(211, 47, 47, 0.1)',
                }}
              >
                {isClient && <canvas ref={chartRef} id="radar-chart-canvas" />}
              </div>
              <div className="d-flex justify-content-center mt-4">
                <Nav
                  variant="tabs"
                  activeKey={activeTab}
                  onSelect={(key) => setActiveTab(key)}
                  className="nav-pills-custom"
                >
                  <Nav.Item>
                    <Nav.Link
                      eventKey="all"
                      className="nav-link-custom"
                      style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '500' }}
                    >
                      {t.tabs.all}
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      eventKey="strategic"
                      className="nav-link-custom"
                      style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '500' }}
                    >
                      {t.tabs.strategic}
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      eventKey="tactic"
                      className="nav-link-custom"
                      style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '500' }}
                    >
                      {t.tabs.tactic}
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
              <Row className="mt-4 px-2">
                {[...translatedCategories.strategic, ...translatedCategories.tactic].map(
                  (category, index) => (
                    <Col
                      key={index}
                      xs={12}
                      md={6}
                      className="d-flex gap-2 align-items-center mb-2"
                    >
                      <h6
                        style={{
                          color: '#4B5563',
                          fontFamily: 'Roboto, sans-serif',
                          fontWeight: '600',
                        }}
                      >
                        {category.acronym}
                      </h6>
                      <p
                        style={{
                          color: '#6B7280',
                          fontFamily: 'Roboto, sans-serif',
                        }}
                      >
                        {category.category}
                      </p>
                    </Col>
                  )
                )}
              </Row>
            </Col>
            <Col md={5} data-aos="fade-right">
              <div
                className="report-details-container"
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(5px)',
                  borderRadius: '20px',
                  padding: '20px',
                  boxShadow: '0 8px 32px rgba(211, 47, 47, 0.2), 0 4px 16px rgba(211, 47, 47, 0.1)',
                }}
              >
                <div className="mb-4">
                  <h4
                    style={{
                      color: '#4B5563',
                      fontFamily: 'Roboto, sans-serif',
                      fontWeight: '600',
                      borderBottom: '2px solid #E5E7EB',
                      paddingBottom: '10px',
                    }}
                  >
                    {message}
                  </h4>
                </div>
                <div className="mb-4">
                  <h5
                    style={{
                      color: '#4B5563',
                      fontFamily: 'Roboto, sans-serif',
                      fontWeight: '600',
                      borderBottom: '2px solid #E5E7EB',
                      paddingBottom: '10px',
                    }}
                  >
                    {t.benchmarks}
                  </h5>
                  <div className="d-flex align-items-center gap-3 mt-3">
                    <h1>
                      <span
                        className={`badge ${badgeClass}`}
                        style={{
                          fontSize: '2rem',
                          padding: '15px 20px',
                          borderRadius: '10px',
                          color: '#FFFFFF',
                          fontWeight: 'bold',
                        }}
                      >
                        {rating}
                      </span>
                    </h1>
                    <div>
                      <small
                        style={{
                          color: '#6B7280',
                          fontFamily: 'Roboto, sans-serif',
                        }}
                      >
                        {t.totalPopulation(getRating(overallScore))}
                      </small>
                      <br />
                      <small
                        style={{
                          color: '#6B7280',
                          fontFamily: 'Roboto, sans-serif',
                        }}
                      >
                        {t.industryEducation(getRating(overallScore))}
                      </small>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <h5
                    style={{
                      color: '#4B5563',
                      fontFamily: 'Roboto, sans-serif',
                      fontWeight: '600',
                      borderBottom: '2px solid #E5E7EB',
                      paddingBottom: '10px',
                    }}
                  >
                    {t.score}
                  </h5>
                  <div
                    style={{
                      color: '#4B5563',
                      fontFamily: 'Roboto, sans-serif',
                      fontWeight: '500',
                      marginTop: '10px',
                    }}
                  >
                    {t.overallScore(overallScore.toFixed(2))}
                  </div>
                </div>
                <div>
                  <h4
                    style={{
                      color: '#4B5563',
                      fontFamily: 'Roboto, sans-serif',
                      fontWeight: '600',
                      borderBottom: '2px solid #E5E7EB',
                      paddingBottom: '10px',
                    }}
                  >
                    {t.categoryScores}
                  </h4>
                  <div className="mt-3">
                    {(activeTab === 'strategic'
                      ? translatedCategories.strategic
                      : activeTab === 'tactic'
                      ? translatedCategories.tactic
                      : [...translatedCategories.strategic, ...translatedCategories.tactic]
                    ).map((category, index) => {
                      const categoryScoreActual = category.detail.reduce(
                        (sum, question) => sum + (scores[question.code] || 0),
                        0
                      );
                      const categoryMaxScore = category.detail.length * 30;
                      const categoryPercentage = (categoryScoreActual / categoryMaxScore) * 100;
                      return (
                        <div key={index} className="mb-3">
                          <h6
                            style={{
                              color: '#4B5563',
                              fontFamily: 'Roboto, sans-serif',
                              fontWeight: '600',
                            }}
                          >
                            {category.category}
                          </h6>
                          <ProgressBar
                            variant="danger"
                            now={categoryPercentage}
                            label={`${categoryPercentage.toFixed(2)}%`}
                            style={{
                              height: '20px',
                              fontSize: '0.9rem',
                              backgroundColor: '#E5E7EB',
                              borderRadius: '10px',
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>
      <Contact />
      <Footer />
    </>
  );
};

export default ReportPage;