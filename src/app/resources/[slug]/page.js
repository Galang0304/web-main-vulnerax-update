import Header from '@/components/pages/Header';
import Footer from '@/components/pages/Footer';
import DynamicContent from '@/components/resources/DynamicContent';
import styles from "@/styles/article.module.css";
import { getArticleBySlugAsync, relatedArticlesList, generateStaticParams } from './server';

// Force dynamic rendering for API articles
export const dynamic = 'force-dynamic';

// Ekspor generateStaticParams untuk SSG
export { generateStaticParams };

// Generate metadata untuk SEO
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  try {
    const article = await getArticleBySlugAsync(slug);
    if (!article) {
      return {
        title: "Article Not Found | VulneraX",
        description: "The requested article could not be found.",
      };
    }
    const contentText = Array.isArray(article.content) 
      ? article.content[0] 
      : article.content;
    return {
      title: `${article.title} | VulneraX`,
      description: contentText.replace(/<[^>]+>/g, '').slice(0, 160),
    };
  } catch (error) {
    return {
      title: "Article Not Found | VulneraX",
      description: "The requested article could not be found.",
    };
  }
}

export default async function ResourceDetail({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const article = await getArticleBySlugAsync(slug);
  
  if (!article) {
    return (
      <div>
        <Header />
        <main className="main" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', padding: '4rem 0 2rem 0' }}>
          <div className="container">
            <h1 style={{ color: '#1c2f41', fontSize: '2.5rem', fontWeight: '700', textAlign: 'center', marginTop: '100px' }}>
              Article Not Found
            </h1>
            <p style={{ color: '#212529', fontSize: '1.2rem', textAlign: 'center' }}>
              The article you are looking for does not exist.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedArticles = relatedArticlesList
    .filter((item) => item.slug !== slug)
    .sort(() => 0.5 - Math.random())
    .slice(0, 2);

  // Format image URL - support http, data:image base64, and local paths
  const imageUrl = article.image?.startsWith('http') || article.image?.startsWith('data:')
    ? article.image 
    : article.image?.startsWith('/') 
      ? article.image 
      : `/img/blog/${article.image}`;

  return (
    <div style={{ backgroundColor: '#ffffff' }}>
      <Header />
      <main
        className="main"
        style={{
          minHeight: '100vh',
          padding: 'clamp(2rem, 8vw, 4rem) 0 4rem 0',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div className={styles.container}>
          <article className={styles.articleContent} data-aos="fade-up">
            {/* HERO with Overlay */}
            <div style={{ position: 'relative' }}>
              <img
                src={imageUrl}
                alt={article.title}
                className={styles.heroImage}
                data-aos="zoom-in"
                data-aos-delay="120"
              />

              <div className={styles.heroAbsolute}>
                <div className={styles.tagLabel}>{article.category}</div>

                <h1 className={styles.heroTitle}>
                  {article.title}
                </h1>

                <div className={styles.heroMeta}>
                  <span style={{ fontWeight: 600 }}>By {article.author}</span>
                  <span style={{ opacity: 0.6 }}>•</span>
                  <span>Published: {article.date}</span>
                </div>
              </div>
            </div>

            {/* ARTICLE BODY */}
            <div className={styles.articleBody} data-aos="fade-up" data-aos-delay="200">
              {article.isFromAPI ? (
                <div 
                  dangerouslySetInnerHTML={{ 
                    __html: (() => {
                      const content = Array.isArray(article.content) 
                        ? article.content.join('') 
                        : article.content;
                      // Fix image URLs - convert relative paths to absolute API URLs
                      return content
                        .replace(/src="\/uploads\//g, 'src="http://localhost:5000/uploads/')
                        .replace(/src="\/img\//g, 'src="http://localhost:5000/img/')
                        .replace(/src="http:\/\/100\.125\.224\.53:5000/g, 'src="http://localhost:5000');
                    })()
                  }}
                />
              ) : (
                <DynamicContent
                  content={article.content}
                  style={{
                    color: '#0b1220',
                    lineHeight: '1.8',
                    fontSize: '1.05rem',
                    fontFamily: "Georgia, serif",
                  }}
                  styleOverrides={{
                    h2: {
                      marginTop: 0,
                      marginBottom: '12px',
                      fontSize: '1.25rem',
                      color: '#0b1220',
                      borderBottom: '3px solid #de1a34',
                      paddingBottom: '10px',
                      display: 'inline-block',
                    },
                    h3: {
                      color: '#0b1220',
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      margin: '2rem 0 0.8rem 0',
                    },
                    p: {
                      marginBottom: '16px',
                    },
                    strong: {
                      color: '#de1a34',
                      fontWeight: '700',
                    },
                    ul: {
                      marginTop: '12px',
                      paddingLeft: '18px',
                      marginBottom: '16px',
                    },
                    li: {
                      marginBottom: '8px',
                    },
                  }}
                />
              )}
            </div>

            {/* FOOTER */}
            <footer className={styles.articleFooter}>
              <div className={styles.footerAuthor}>
                <div className={styles.authorIcon}>
                  {(article.author || 'A').charAt(0).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontWeight: 700 }}>{article.author}</div>
                  <div className={styles.footerMeta}>
                    {article.report_type || 'Cybersecurity Report'} ({article.date})
                  </div>
                </div>
              </div>
              <div className={styles.footerBottom}>
                <a href="/resources" className={styles.linkBack}>← Back to Resources</a>
                <div className={styles.shareContainer}>
                  <span style={{ color: '#6b7280' }}>Share</span>
                  <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://vulnerax.id/resources/${article.slug}`)}&text=${encodeURIComponent(article.title)}`} target="_blank" rel="noopener noreferrer" className={styles.shareLink}>Twitter</a>
                  <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://vulnerax.id/resources/${article.slug}`)}`} target="_blank" rel="noopener noreferrer" className={styles.shareLink}>LinkedIn</a>
                </div>
              </div>
            </footer>
          </article>

          {/* Related Articles */}
          <section
            className="related-articles"
            data-aos="fade-up"
            data-aos-delay="400"
            style={{ marginTop: '3rem' }}
          >
            <h3
              style={{
                color: '#1c2f41',
                fontSize: '2rem',
                fontWeight: '700',
                marginBottom: '1.5rem',
                position: 'relative',
                textAlign: 'center',
              }}
            >
              Related Articles
              <span
                style={{
                  position: 'absolute',
                  bottom: '-5px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '50px',
                  height: '3px',
                  backgroundColor: '#DE1A34',
                }}
              ></span>
            </h3>
            <div className="row" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              {relatedArticles.map((relatedArticle) => (
                <div key={relatedArticle.slug} style={{ flex: '1 1 300px', maxWidth: '50%' }}>
                  <a
                    href={`/resources/${relatedArticle.slug}`}
                    style={{ display: 'block', textDecoration: 'none' }}
                  >
                    <div
                      style={{
                        border: 'none',
                        borderRadius: '15px',
                        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
                        backgroundColor: '#ffffff',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        padding: '1.5rem',
                      }}
                    >
                      <h5
                        style={{
                          fontSize: '1.25rem',
                          fontWeight: '600',
                          color: '#1c2f41',
                          margin: '0',
                        }}
                      >
                        {relatedArticle.title}
                      </h5>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
