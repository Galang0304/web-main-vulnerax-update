'use client';

import Link from 'next/link';

export default function FeaturedPosts({ articles }) {
  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <section className="featured-section mb-5">
      <h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '2rem', color: '#1a1a1a' }}>
        Featured Posts
      </h2>
      <div className="row g-4">
        {/* Main Featured Article */}
        <div className="col-lg-6 col-md-12">
          <div>
            {/* Image Card */}
            <div
              className="featured-main"
              data-aos="fade-up"
              style={{
                position: 'relative',
                borderRadius: '15px',
                overflow: 'hidden',
                height: 'clamp(250px, 40vw, 300px)',
                background: `url(${articles[0].image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease',
                marginBottom: '1.5rem',
              }}
            >
              {/* Category badge overlay */}
              <div style={{
                position: 'absolute',
                top: '15px',
                left: '15px',
                backgroundColor: '#DE1A34',
                color: 'white',
                padding: '6px 12px',
                borderRadius: '15px',
                fontSize: '0.75rem',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                boxShadow: '0 4px 12px rgba(222, 26, 52, 0.3)',
              }}>
                {articles[0].category}
              </div>
              
              <Link
                href={`/resources/${articles[0].slug}`}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  textDecoration: 'none',
                  zIndex: 3,
                }}
              />
            </div>
            
            {/* Title and Date outside card */}
            <div style={{ paddingLeft: '0.5rem' }}>
              <h3
                style={{
                  fontSize: 'clamp(1rem, 2.5vw, 1.8rem)',
                  fontWeight: '700',
                  margin: '0 0 0.75rem 0',
                  lineHeight: '1.2',
                  color: '#1a1a1a',
                }}
              >
                {articles[0].title}
              </h3>
              <p style={{ 
                fontSize: '0.9rem', 
                color: '#666', 
                margin: '0',
                fontWeight: '500'
              }}>
                {articles[0].date} • By {articles[0].author}
              </p>
            </div>
          </div>
        </div>
        
        {/* Side Featured Articles */}
        <div className="col-lg-6 col-md-12">
          <div className="row g-3">
            {articles.slice(1, 3).map((article, index) => (
              <div key={article.slug} className="col-12" data-aos="fade-up" data-aos-delay={(index + 1) * 100}>
                {/* Image Card */}
                <div
                  style={{
                    position: 'relative',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    height: '160px',
                    background: `url(${article.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s ease',
                    marginBottom: '1rem',
                  }}
                >
                  {/* Category badge overlay */}
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    backgroundColor: '#DE1A34',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '8px',
                    fontSize: '0.65rem',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    boxShadow: '0 2px 8px rgba(222, 26, 52, 0.3)',
                  }}>
                    {article.category}
                  </div>
                  
                  <Link
                    href={`/resources/${article.slug}`}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      textDecoration: 'none',
                      zIndex: 2,
                    }}
                  />
                </div>
                
                {/* Title and Date outside card */}
                <div style={{ paddingLeft: '0.5rem' }}>
                  <h4
                    style={{
                      fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                      fontWeight: '600',
                      margin: '0 0 0.5rem 0',
                      lineHeight: '1.2',
                      color: '#1a1a1a',
                    }}
                  >
                    {article.title}
                  </h4>
                  <p style={{ 
                    fontSize: '0.8rem', 
                    color: '#666', 
                    margin: '0',
                    fontWeight: '500'
                  }}>
                    {article.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
