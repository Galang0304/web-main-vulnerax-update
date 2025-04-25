import Header from '@/components/pages/Header';
import Footer from '@/components/pages/Footer';
import Contact from '@/components/pages/Contact';
import Head from 'next/head';

export const metadata = {
  title: 'Threat Hunting & Incident Response - VulneraX',
  description: 'VulneraX Threat Hunting & Incident Response services provide proactive measures to detect, analyze, and respond to security incidents. Our expert team hunts for hidden threats, identifies potential vulnerabilities, and ensures rapid detection and mitigation of breaches. We help organizations recover quickly from incidents, minimize impact, and build stronger defenses against future attacks by leveraging the latest threat intelligence and response techniques.',
  openGraph: {
    title: 'Threat Hunting & Incident Response - VulneraX',
    description: 'Detect and respond to advanced threats with VulneraX Threat Hunting & Incident Response services. Proactively identify security risks and mitigate potential breaches through rapid detection and response strategies.',
    image: 'https://vulnerax.com/img/logo.png',
    url: 'https://vulnerax.com/service/ThreatHunting&IR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Threat Hunting & Incident Response - VulneraX',
    description: 'Detect and respond to advanced threats with VulneraX Threat Hunting & Incident Response services. Proactively identify security risks and mitigate potential breaches through rapid detection and response strategies.',
    image: 'https://vulnerax.com/img/logo.png',
  },
};

export default function ThreatHunting() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content="Threat Hunting, Incident Response, Vulnerability, Cyber Security, Cyber Security Service" />
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:image" content={metadata.openGraph.image} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:type" content={metadata.openGraph.type} />          <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:title" content={metadata.twitter.title} />         <meta name="twitter:description" content={metadata.twitter.description} />
        <meta name="twitter:image" content={metadata.twitter.image} />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/favicon.ico" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": metadata.title,
            "description": metadata.description,
            "url": metadata.openGraph.url
          })
        }} />
      </Head>
      <Header />
      <main className="main">
        <br /><br />

        <section id="service-details" className="service-details section">
          <div className="container">
            <div className="row gy-5">
              <div className="col-lg-4" data-aos="fade-up" data-aos-delay="100">
                <div className="help-box d-flex flex-column justify-content-center align-items-center">
                  <br/>
                  <br/>
                  <i className="bi bi-headset help-icon"></i>
                  <h4>Have a Question?</h4>
                  <p className="mb-4">Get direct advice and actionable solutions</p>
                  
                  <p className="d-flex align-items-center mt-2 mb-0">
                    <i className="bi bi-telephone me-2"></i>
                    <span>+62 852 4079 1254</span>
                  </p>
                  <p className="d-flex align-items-center mt-1 mb-0">
                    <i className="bi bi-envelope me-2"></i>
                    <a href="mailto:business@vulnerax.com">business@vulnerax.com</a>
                  </p>
                  <a href="#contact">Talk to us</a>
                  <br/>
                  <br/>
                </div>
              </div>

              <div className="col-lg-8 ps-lg-5" data-aos="fade-up" data-aos-delay="200">
                <br/>
                <h3>Threat Hunting & Incident Response</h3>
                <p>
                  In an increasingly connected world, cyber threats can arise at any time. Our <b>Threat Hunting & Incident Response</b> services are designed to help your organization and business respond to security incidents quickly and effectively. We understand that once an attack has occurred, timing is everything. Therefore, we not only focus on recovery after an incident but also on preventing future incidents by understanding attack patterns and techniques used by perpetrators.
                </p>
                <p>
                  This service is a proactive approach to identifying and addressing threats before they can cause damage. The goal is to provide deep insight into incidents that occur and the steps that need to be taken to improve security.
                </p>
                <p>Main Objectives of <b>Threat Hunting & Incident Response</b>:</p>
                <ul>
                  <li><i className="bi bi-check"></i> <span>Identify and address threats that may not be detected by traditional security systems.</span></li>
                  <li><i className="bi bi-check"></i> <span>Minimize the impact of security incidents on your business.</span></li>
                  <li><i className="bi bi-check"></i> <span>Provide strategic recommendations for security improvements and enhancements.</span></li>
                  <li><i className="bi bi-check"></i> <span>Build a comprehensive incident response plan for future readiness.</span></li>
                </ul>
              </div>

              <div className="container">
                <br /><br />
                <h5><b>Our Methodology:</b></h5>
                <p>
                  Our Threat Hunting & Incident Response services follow a systematic methodology to ensure an effective response to incidents. Below are the key phases:
                </p>
                <ul>
                  <li><i className="bi bi-check-circle"></i> <span>Detection and Analysis:</span></li>
                  <p>Using advanced analytical techniques, we detect suspicious activities and identify potential threats within your system.</p>

                  <li><i className="bi bi-check-circle"></i> <span>Incident Investigation:</span></li>
                  <p>Once an incident is detected, we conduct an in-depth investigation to uncover root causes, attack patterns, and the impact on your business.</p>

                  <li><i className="bi bi-check-circle"></i> <span>Impact Assessment:</span></li>
                  <p>We evaluate the business impact of the incident to plan appropriate recovery actions.</p>

                  <li><i className="bi bi-check-circle"></i> <span>Reporting and Recommendations:</span></li>
                  <p>We deliver detailed reports that include:</p>
                  <ul>
                    <li><i className="bi bi-check"></i> <span>Executive summaries for non-technical stakeholders.</span></li>
                    <li><i className="bi bi-check"></i> <span>Findings and analysis of the incident.</span></li>
                    <li><i className="bi bi-check"></i> <span>Strategic recommendations for remediation and future prevention.</span></li>
                  </ul>
                  <br />
                  <li><i className="bi bi-check-circle"></i> <span>Recovery and Follow-Up:</span></li>
                  <p>We assist in system and data recovery, followed by ensuring that corrective measures have been implemented effectively.</p>

                  <li><i className="bi bi-check-circle"></i> <span>Impact Assessment:</span></li>
                  <p>We collaborate with your team to develop a comprehensive incident response plan, including training and simulations to improve readiness for future threats.</p>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Contact />
      <Footer />
    </>
  );
}