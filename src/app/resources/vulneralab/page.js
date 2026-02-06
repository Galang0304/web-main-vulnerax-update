'use client';

import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from '@/components/pages/Header';
import Footer from '@/components/pages/Footer';
import Link from 'next/link';

// API Base URL - localhost for dev, empty for production (same origin)
const API_BASE_URL = typeof window !== 'undefined' && window.location.hostname === 'localhost' 
  ? 'http://localhost:5000' 
  : '';

export default function VulneraLabPage() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/vulneralab/public/list`);
      const data = await response.json();
      
      if (data.success && data.documents.length > 0) {
        // Map API data to match the format
        const apiDocs = data.documents.map(doc => ({
          id: doc.id,
          date: doc.date,
          author: doc.author,
          title: doc.title,
          description: doc.description,
          link: `${API_BASE_URL}${doc.file_url}`,
          image_url: doc.image_url || '',
          category: doc.category,
          downloads: doc.downloads,
          isFromAPI: true
        }));
        setDocuments(apiDocs);
      } else {
        setDocuments([]);
      }
    } catch (error) {
      console.error('Failed to fetch documents:', error);
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (doc) => {
    if (doc.isFromAPI && doc.id) {
      try {
        await fetch(`${API_BASE_URL}/api/vulneralab/public/download/${doc.id}`, {
          method: 'POST'
        });
      } catch (error) {
        console.error('Failed to track download:', error);
      }
    }
    window.open(doc.link, '_blank');
  };

  return (
    <div>
      <Header />
      <main className="main" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', padding: 'clamp(1.5rem, 5vw, 3rem) 0 2rem 0' }}>
        <div className="container-fluid" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(1rem, 3vw, 2rem)' }}>
          {/* Hero Section */}
          <section
            className="hero-section text-center mb-5"
            data-aos="fade-up"
            style={{
              padding: 'clamp(1.5rem, 4vw, 3rem) clamp(1rem, 3vw, 2rem)',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              borderRadius: '20px',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              marginTop: '80px',
            }}
          >
            <h1
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                fontWeight: '700',
                color: '#1a1a1a',
                marginBottom: '1rem',
                letterSpacing: '-0.5px',
              }}
            >
              VulneraLab
            </h1>
            <p
              className="lead"
              style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                color: '#666',
                maxWidth: '800px',
                margin: '0 auto',
                lineHeight: '1.7',
                fontWeight: '400',
              }}
            >
              Explore VulneraLab comprehensive space of cutting-edge research papers, technical guides and authoritative documents, carefully curated to empower your cybersecurity strategy and advance innovation in the digital realm.
            </p>
          </section>

          {/* Documents List */}
          {loading ? (
            <div className="text-center py-5">
              <div style={{ 
                width: '48px', 
                height: '48px', 
                border: '4px solid #f3f3f3',
                borderTop: '4px solid #de1a34',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto'
              }} />
              <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            </div>
          ) : (
          <section className="documents-section mb-5">
            <div className="row g-4 justify-content-center">
              {documents.map((doc, index) => (
                <div
                  key={doc.id || `${doc.title}-${index}`}
                  className="col-xl-4 col-lg-6 col-md-6 col-12"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <article
                    className="card h-100"
                    style={{
                      border: 'none',
                      borderRadius: '24px',
                      overflow: 'hidden',
                      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.1)',
                      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      backgroundColor: '#fff',
                      position: 'relative',
                      transform: 'translateY(0)',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleDownload(doc)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px)';
                      e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.1)';
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 2,
                      }}
                    />
                    
                    {/* PDF Icon Header or Cover Image */}
                    <div style={{ 
                      position: 'relative', 
                      overflow: 'hidden',
                      height: '180px',
                      background: doc.image_url ? 'transparent' : 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      {doc.image_url ? (
                        <img 
                          src={doc.image_url} 
                          alt={doc.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.style.background = 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)';
                          }}
                        />
                      ) : (
                        <svg
                          width="70"
                          height="70"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#de1a34"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                          <line x1="16" y1="13" x2="8" y2="13" />
                          <line x1="16" y1="17" x2="8" y2="17" />
                          <polyline points="10 9 9 9 8 9" />
                        </svg>
                      )}
                      
                      {/* Category Badge */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '15px',
                          right: '15px',
                          backgroundColor: '#DE1A34',
                          color: '#ffffff',
                          padding: '6px 12px',
                          borderRadius: '15px',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          boxShadow: '0 4px 12px rgba(222, 26, 52, 0.3)',
                        }}
                      >
                        {doc.category || 'PDF'}
                      </div>
                      
                      {/* Download Icon */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '15px',
                          right: '15px',
                          background: 'rgba(255,255,255,0.95)',
                          borderRadius: '50%',
                          width: '40px',
                          height: '40px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        }}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#de1a34"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                      </div>
                    </div>
                    
                    <div
                      className="card-body d-flex flex-column"
                      style={{ 
                        padding: 'clamp(1.5rem, 3vw, 2rem)',
                        gap: 'clamp(0.75rem, 2vw, 1rem)',
                        flex: '1',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div className="mb-2">
                        <h5
                          className="card-title"
                          style={{
                            fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                            fontWeight: '700',
                            color: '#1a1a1a',
                            margin: '0 0 0.5rem 0',
                            lineHeight: '1.3',
                            display: '-webkit-box',
                            WebkitLineClamp: '2',
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            minHeight: '2.6rem',
                          }}
                        >
                          {doc.title}
                        </h5>
                      </div>
                      
                      <div 
                        className="d-flex align-items-center text-muted"
                        style={{
                          fontSize: 'clamp(0.8rem, 1.8vw, 0.9rem)',
                          gap: '0.5rem',
                          marginBottom: '0.75rem',
                        }}
                      >
                        <span style={{ fontWeight: '500' }}>{doc.date}</span>
                      </div>
                      
                      <p
                        className="card-text"
                        style={{
                          fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                          color: '#666',
                          lineHeight: '1.6',
                          flex: '1',
                          margin: '0 0 1rem 0',
                          display: '-webkit-box',
                          WebkitLineClamp: '3',
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {doc.description}
                      </p>
                      
                      <a
                        href={doc.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          backgroundColor: '#DE1A34',
                          color: '#ffffff',
                          padding: 'clamp(8px, 2vw, 12px) clamp(20px, 4vw, 28px)',
                          borderRadius: '30px',
                          fontWeight: '600',
                          fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                          textDecoration: 'none',
                          textAlign: 'center',
                          transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                          boxShadow: '0 6px 20px rgba(222, 26, 52, 0.3)',
                          zIndex: 3,
                          position: 'relative',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'inline-block',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#C41629';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 8px 25px rgba(222, 26, 52, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#DE1A34';
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 6px 20px rgba(222, 26, 52, 0.3)';
                        }}
                      >
                        Get eBook
                      </a>
                    </div>
                  </article>
                </div>
              ))}
            </div>
            
            {/* Empty State */}
            {documents.length === 0 && (
              <div className="text-center py-5">
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ccc"
                  strokeWidth="1"
                  style={{ margin: '0 auto 1rem', display: 'block' }}
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                <h4 style={{ color: '#666' }}>No Documents Available</h4>
                <p style={{ color: '#999' }}>Check back later for new research papers and documents.</p>
              </div>
            )}
          </section>
          )}

          {/* Back Link */}
          <div className="text-center mt-4 mb-5">
            <Link
              href="/resources"
              style={{
                color: '#de1a34',
                fontWeight: '600',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              ← Back to Resources
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
