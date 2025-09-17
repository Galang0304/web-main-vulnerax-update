import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";
import ClientOnlyAOS from "./pages/api/clientAOS";

const siteUrl = "https://vulnerax.com";
const siteName = "VulneraX";
const siteDescription = "Transforming Vulnerabilities into Strengths: Expert cybersecurity services (Penetration Testing, Red Teaming, Vulnerability Assessment, System Hardening, Threat Hunting & IR, Ransomware Readiness).";
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
        url: "/img/logo.png",
        width: 512,
        height: 512,
        alt: `${siteName} Logo`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    site: "@VulneraX",
    title: `${siteName} – Expert Cybersecurity Services`,
    description: siteDescription,
    images: ["/img/logo.png"],
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
        <meta name="theme-color" content="#DE1A34" />
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
