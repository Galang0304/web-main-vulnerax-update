import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";
import ClientOnlyAOS from "./pages/api/clientAOS";

// Gunakan domain dari environment (set NEXT_PUBLIC_SITE_URL) atau fallback ke domain produksi .id
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vulnerax.id";
const siteName = "VulneraX";
const siteDescription = "Transforming Vulnerabilities into Strengths: Expert cybersecurity services (Penetration Testing, Red Teaming, Vulnerability Assessment, System Hardening, Threat Hunting & IR, Ransomware Readiness).";
const ogBanner = `${siteUrl}/img/og-banner.png`;
const ogLogo = `${siteUrl}/img/logo.png`;
const siteKeywords = [
  "Cybersecurity",
  "Penetration Testing",
  "Red Teaming",
  "Vulnerability Assessment",
  "System Hardening",
  "Threat Hunting",
  "Incident Response",
  "Ransomware Readiness"
];

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} – Cybersecurity Services`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: siteKeywords,
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  alternates: {
    canonical: siteUrl,
    languages: {
      'en-US': siteUrl,
    },
    media: {},
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: siteName,
    title: `${siteName} – Expert Cybersecurity Services`,
    description: siteDescription,
    locale: "en_US",
    images: [
      {
        url: ogBanner,
        width: 1200,
        height: 630,
        alt: `${siteName} – Cybersecurity Services Banner`,
        type: 'image/png'
      },
      {
        url: ogLogo,
        width: 512,
        height: 512,
        alt: `${siteName} Logo`,
        type: 'image/png'
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    site: "@VulneraX",
    title: `${siteName} – Expert Cybersecurity Services`,
    description: siteDescription,
    images: [ogBanner],
  },
  icons: {
    icon: [
      { url: "/img/logo.png", type: "image/png" },
      { url: "/favicon.ico" }
    ],
    apple: [{ url: "/img/logo.png" }],
  },
  manifest: "/site.webmanifest",
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      maxSnippet: -1,
      maxImagePreview: "large",
      maxVideoPreview: -1,
    }
  }
};

export default function RootLayout({ children }) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/img/logo.png`,
    sameAs: [
      "https://x.com/vulneraxdotcom",
      "https://www.linkedin.com/company/vulnerax/",
      "https://www.youtube.com/@vulneraxdotcom",
      "https://www.instagram.com/vulneraxdotcom"
    ],
    description: siteDescription,
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
  <link rel="shortcut icon" href="/img/logo.png" />
  {/* Explicit OG basic meta for scrapers that ignore structured metadata API */}
  <meta property="og:title" content={`${siteName} – Expert Cybersecurity Services`} />
  <meta property="og:description" content={siteDescription} />
  {/* Fallback explicit OG/Twitter meta (kadang diperlukan pada beberapa scraper seperti Telegram/WhatsApp) */}
  {/* Primary OG Image (Banner) */}
  <meta property="og:image" content={ogBanner} />
  <meta property="og:image:secure_url" content={ogBanner} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:type" content="image/png" />
  <meta property="og:image:alt" content={`${siteName} – Cybersecurity Services Banner`} />
  {/* Secondary OG Image (Logo) */}
  <meta property="og:image" content={ogLogo} />
  <meta property="og:image:width" content="512" />
  <meta property="og:image:height" content="512" />
  <meta property="og:image:type" content="image/png" />
  <meta property="og:image:alt" content={`${siteName} Logo`} />
  <meta property="og:site_name" content={siteName} />
  <meta name="twitter:image" content={ogBanner} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={`${siteName} – Expert Cybersecurity Services`} />
  <meta name="twitter:description" content={siteDescription} />
        <meta name="theme-color" content="#DE1A34" />
  <link rel="preload" as="image" href={ogBanner} imagesrcset={`${ogBanner} 1200w`} />
      </head>
      <body>
        <ClientOnlyAOS />
        {children}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
