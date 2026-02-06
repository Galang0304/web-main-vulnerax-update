'use client';

import Link from 'next/link';

export default function RecentPosts({ articles }) {
  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <section className="articles-section mb-5">
      <h3 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', fontWeight: '700', marginBottom: '2rem', color: '#1a1a1a' }}>
        Recent Posts
      </h3>
      <div className="row g-4">
        {articles.map((article, index) => (
          <div key={article.slug} className="col-lg-4 col-md-6 col-sm-12" data-aos="fade-up" data-aos-delay={index * 100}>
            <article
              className="card h-100"
              style={{
                border: 'none',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                backgroundColor: '#fff',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)';
              }}
            >
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img
                  src={article.image}
                  className="card-img-top"
                  alt={article.title}
                  style={{
                    width: '100%',
                    height: '220px',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
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
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#E4334B';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#DE1A34';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  {article.category}
                </div>
              </div>
              
              <div
                className="card-body d-flex flex-column"
                style={{ 
                  padding: '2rem 1.75rem',
                  gap: '1rem',
                  flex: '1'
                }}
              >
                <div className="mb-2">
                  <h5
                    className="card-title"
                    style={{
                      fontSize: 'clamp(1rem, 2.2vw, 1.3rem)',
                      fontWeight: '700',
                      color: '#1a1a1a',
                      margin: '0',
                      lineHeight: '1.2',
                      display: '-webkit-box',
                      WebkitLineClamp: '2',
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      minHeight: '2.4rem',
                    }}
                  >
                    {article.title}
                  </h5>
                </div>
                
                <div 
                  className="d-flex align-items-center text-muted"
                  style={{
                    fontSize: '0.85rem',
                    gap: '0.5rem',
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    fill="currentColor"
                    className="bi bi-calendar3"
                    viewBox="0 0 16 16"
                    style={{ opacity: 0.7 }}
                  >
                    <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z" />
                    <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                  </svg>
                  <span>{article.date}</span>
                  <span style={{ opacity: 0.5 }}>•</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    fill="currentColor"
                    className="bi bi-person"
                    viewBox="0 0 16 16"
                    style={{ opacity: 0.7 }}
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                  </svg>
                  <span>{article.author}</span>
                </div>
                
                <p
                  className="card-text flex-grow-1"
                  style={{
                    fontSize: '0.95rem',
                    color: '#666',
                    lineHeight: '1.6',
                    display: '-webkit-box',
                    WebkitLineClamp: '3',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    margin: '0',
                  }}
                >
                  {article.excerpt || 'Read more to discover the full article...'}
                </p>
                
                <div className="mt-auto pt-3">
                  <Link
                    href={`/resources/${article.slug}`}
                    className="btn w-100"
                    style={{
                      backgroundColor: '#DE1A34',
                      color: '#ffffff',
                      padding: '12px 24px',
                      borderRadius: '25px',
                      fontWeight: '600',
                      fontSize: '0.9rem',
                      textDecoration: 'none',
                      textAlign: 'center',
                      transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      boxShadow: '0 4px 15px rgba(222, 26, 52, 0.25)',
                      border: 'none',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#E4334B';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(222, 26, 52, 0.35)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#DE1A34';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(222, 26, 52, 0.25)';
                    }}
                  >
                    Read Article
                  </Link>
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
