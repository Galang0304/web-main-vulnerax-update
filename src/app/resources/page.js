'use client';

import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from '@/components/pages/Header';
import Footer from '@/components/pages/Footer';
import FeaturedPosts from '@/components/resources/FeaturedPosts';
import RecentPosts from '@/components/resources/RecentPosts';
import { sortedArticles, featuredArticles, staticArticles, parseDate } from '@/data/articles';

// API Base URL - localhost for dev, relative for production
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 
  (typeof window !== 'undefined' && window.location.hostname === 'localhost' 
    ? 'http://localhost:5000/api/public/articles' 
    : '/api/public/articles');

export default function ResourcesPage() {
  const [allArticles, setAllArticles] = useState([]);
  const [displayFeatured, setDisplayFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    // Fetch articles from API and merge with static
    const fetchAndMergeArticles = async () => {
      let merged = [...staticArticles];
      
      try {
        console.log('Fetching articles from API...');
        const response = await fetch(API_BASE_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
        });
        
        if (response.ok) {
          const data = await response.json();
          const apiArticles = data.articles || [];
          console.log('API Articles received:', apiArticles.length, apiArticles);
          
          if (apiArticles.length > 0) {
            // Gabungkan: API articles + static articles (hindari duplikat berdasarkan slug)
            const apiSlugs = new Set(apiArticles.map(a => a.slug));
            const uniqueStaticArticles = staticArticles.filter(a => !apiSlugs.has(a.slug));
            merged = [...apiArticles, ...uniqueStaticArticles];
            console.log('Merged with API, total:', merged.length);
          }
        } else {
          console.log('API response not ok:', response.status);
        }
      } catch (error) {
        console.log('API not available, using static articles:', error.message);
      }
      
      // Sort by date (newest first)
      merged.sort((a, b) => {
        const dateA = parseDate(a.date);
        const dateB = parseDate(b.date);
        return dateB.getTime() - dateA.getTime();
      });
      
      console.log('Final sorted articles:', merged.length, 'First:', merged[0]?.title);
      setAllArticles(merged);
      setDisplayFeatured(merged.slice(0, 3));
      setLoading(false);
    };

    fetchAndMergeArticles();
  }, []);

  return (
    <div>
      <Header />
      <main className="main" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', padding: 'clamp(2rem, 8vw, 4rem) 0 2rem 0' }}>
        <div className="container" style={{ padding: '0 15px', maxWidth: '1200px', margin: '0 auto' }}>
          {/* Hero Section */}
          <section
            className="hero-section text-center mb-5"
            data-aos="fade-up"
            style={{
              padding: '2.5rem 1.5rem',
              background: 'linear-gradient(135deg, #ffffff 50%, #f1f3f5 100%)',
              borderRadius: '15px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
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
              Security Resources
            </h1>
            <p
              className="lead"
              style={{
                fontSize: '1.2rem',
                color: '#666',
                maxWidth: '700px',
                margin: '0 auto',
                lineHeight: '1.6',
              }}
            >
              This will present the latest reports, security incident analysis and global threat trends affecting businesses, organizations and individuals. From major ransomware attacks, corporate data leaks, zero-day exploits, etc. We provide in-depth insights to keep you one step ahead in cybersecurity.
            </p>
          </section>

          {/* Featured Posts */}
          <FeaturedPosts articles={displayFeatured} />

          {/* Recent Posts */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ 
                display: 'inline-block',
                width: '40px',
                height: '40px',
                border: '4px solid #f3f3f3',
                borderTop: '4px solid #DE1A34',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
              <style jsx>{`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}</style>
              <p style={{ marginTop: '1rem', color: '#666' }}>Loading articles...</p>
            </div>
          ) : (
            <RecentPosts articles={allArticles.slice(0, 12)} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
