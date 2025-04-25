/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://vulnerax.com',
    generateRobotsTxt: true, 
    exclude: [
        '/quiz',
        '/report',
        '/pdf', 
        '/score-card/*',
        '/_not-found',
        '/404',
        '/pages/api/*',
    ],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
            },
        ],
    },
    // Transform untuk menyesuaikan URL
    transform: async (config, path) => {
        return {
            loc: path, // URL akhir untuk sitemap
            changefreq: 'daily',
            priority: path === '/' ? 1.0 : 0.7,
            lastmod: new Date().toISOString(), // Tanggal modifikasi terakhir
        };
    },
    // Tambahkan rute dinamis untuk layanan (tanpa /score-card)
    additionalPaths: async (config) => {
        const servicesPaths = [
            '/services/PenetrationTesting',
            '/services/ProfessionalRedTeaming',
            '/services/RansomwareReadinessAssessment',
            '/services/SystemHardening',
            '/services/ThreatHunting&IR',
            '/services/VulnerabilityAssessment',
        ].map((path) => ({
            loc: path,
            changefreq: 'daily',
            priority: 0.8,
            lastmod: new Date().toISOString(),
        }));

        return [...servicesPaths];
    },
};