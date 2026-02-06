// API Base URL untuk artikel dari admin panel
const API_BASE_URL = 'http://localhost:5000/api/public/articles';

// Artikel statis dikosongkan - semua artikel dikelola via web admin
export const staticArticles = [];

// Fungsi untuk parsing tanggal dengan format yang konsisten
const parseDate = (dateString) => {
  const cleanDate = dateString.replace(/,/g, '');
  const date = new Date(cleanDate);
  
  if (isNaN(date.getTime())) {
    const months = {
      'Jan': 0, 'January': 0,
      'Feb': 1, 'February': 1,
      'Mar': 2, 'March': 2,
      'Apr': 3, 'April': 3,
      'May': 4,
      'Jun': 5, 'June': 5,
      'Jul': 6, 'July': 6,
      'Aug': 7, 'August': 7,
      'Sep': 8, 'September': 8,
      'Oct': 9, 'October': 9,
      'Nov': 10, 'November': 10,
      'Dec': 11, 'December': 11
    };
    
    const parts = cleanDate.split(' ');
    if (parts.length >= 3) {
      const month = months[parts[0]];
      const day = parseInt(parts[1]);
      const year = parseInt(parts[2]);
      
      if (month !== undefined && !isNaN(day) && !isNaN(year)) {
        return new Date(year, month, day);
      }
    }
  }
  
  return date;
};

// Featured articles (kosong - akan diisi dari API)
export const featuredArticles = [];

// Semua artikel diurutkan berdasarkan tanggal (kosong - akan diisi dari API)
export const sortedArticles = [];

// Export parseDate untuk digunakan di tempat lain
export { parseDate };
