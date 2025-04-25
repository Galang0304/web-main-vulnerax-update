import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";
import ClientOnlyAOS from "./pages/api/clientAOS";



export const metadata = {
  title: 'VulneraX - Cybersecurity Services',
  description: 'Transforming Vulnerabilities into Strengths',
  keywords: 'Penetration Testing, Professional Red Teaming, Vulnerability Assessment, System Hardening, Threat Hunting & IR, Ransomware Readiness Assessment',
  canonical: 'https://vulnerax.com',
  author: 'VulneraX',
  openGraph: {
    title: 'VulneraX - Expert Cybersecurity Services',
    description: 'Transforming Vulnerabilities into Strengths: Innovative security solutions to protect and empower your business in the digital era. Our services include Penetration Testing, Professional Red Teaming, Vulnerability Assessment, System Hardening, Threat Hunting & IR, Ransomware Readiness Assessment',
    image: 'https://vulnerax.com/img/logo.png',
    url: 'https://vulnerax.com',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VulneraX - Expert Cybersecurity Services',
    description: 'Transforming Vulnerabilities into Strengths: Innovative security solutions to protect and empower your business in the digital era. Our services include Penetration Testing, Professional Red Teaming, Vulnerability Assessment, System Hardening, Threat Hunting & IR, Ransomware Readiness Assessment',
    image: 'https://www.vulnerax.com/images/vulnerax-banner.jpg',
    site: '@VulneraX',
  },
  robots: {
    index: true,
    follow: true,
  },
  googlebot: {
    index: true,
    follow: true,
  },
  bingbot: {
    index: true,
    follow: true,
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <link rel="canonical" href={metadata.canonical} />
        <meta name="author" content={metadata.author} />

        {/* Open Graph for Social Media */}
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:image" content={metadata.openGraph.image} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:type" content={metadata.openGraph.type} />

        {/* Twitter Card for Social Media */}
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta name="twitter:description" content={metadata.twitter.description} />
        <meta name="twitter:image" content={metadata.twitter.image} />
        <meta name="twitter:site" content={metadata.twitter.site} />

        {/* Robots and Indexing */}
        <meta name="robots" content={`${metadata.robots.index ? 'index' : 'noindex'}, ${metadata.robots.follow ? 'follow' : 'nofollow'}`} />
        <meta name="googlebot" content={`${metadata.googlebot.index ? 'index' : 'noindex'}, ${metadata.googlebot.follow ? 'follow' : 'nofollow'}`} />
        <meta name="bingbot" content={`${metadata.bingbot.index ? 'index' : 'noindex'}, ${metadata.bingbot.follow ? 'follow' : 'nofollow'}`} />

        <link rel="icon" href="/assets/img/logo-icon.png" />
        <link rel="vulnerax" href="/assets/img/logo-icon.png" />


        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
      </Head>
      <body>
        <ClientOnlyAOS />
        {children}
      </body>
    </html>
  );
}
