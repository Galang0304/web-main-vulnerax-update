// API URL untuk artikel dari admin panel
// Use environment variable or detect environment
const API_BASE_URL = process.env.API_INTERNAL_URL || 
  (process.env.NODE_ENV === 'development' 
    ? 'http://localhost:5001/api/public/articles'
    : 'http://127.0.0.1:5001/api/public/articles');

// Artikel statis dikosongkan - semua artikel dikelola via web admin
export const resources = {};
  
export const relatedArticlesList = [];

export async function generateStaticParams() {
  return [];
}

// Fetch artikel dari API
export async function fetchArticleFromAPI(slug) {
  try {
    const response = await fetch(`${API_BASE_URL}/${slug}`, {
      cache: 'no-store'
    });
    if (!response.ok) return null;
    const data = await response.json();
    return data.article || null;
  } catch (error) {
    console.log('API not available for article:', slug);
    return null;
  }
}

export function getArticleBySlug(slug) {
  const article = resources[slug];
  if (!article) {
    throw new Error('Article not found');
  }
  return article;
}

// Async version - hanya mengambil dari API
export async function getArticleBySlugAsync(slug) {
  // Cek static resources dulu (kosong)
  if (resources[slug]) {
    return resources[slug];
  }
  
  // Ambil dari API
  const apiArticle = await fetchArticleFromAPI(slug);
  if (apiArticle) {
    return {
      title: apiArticle.title,
      date: apiArticle.date,
      author: apiArticle.author,
      image: apiArticle.image,
      slug: apiArticle.slug,
      category: apiArticle.category,
      tags: [apiArticle.category],
      content: [apiArticle.content],
      isFromAPI: true
    };
  }
  
  return null;
}
