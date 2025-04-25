import Header from '@/components/pages/Header';
import Footer from '@/components/pages/Footer';
import Head from 'next/head';
import Contact from '@/components/pages/Contact';

export const metadata = {
  title: 'System Hardening - VulneraX',
  description: 'VulneraX offers comprehensive System Hardening services to fortify your IT infrastructure against cyber threats. By applying industry best practices and tailored security configurations, we eliminate vulnerabilities and reduce your attack surface. Whether it’s securing servers, workstations, or network components, our system hardening solutions ensure your business runs with optimal security and resilience against cyber attacks.',
  openGraph: {
    title: 'System Hardening - VulneraX',
    description: 'Strengthen your IT infrastructure with VulneraX System Hardening services. Reduce vulnerabilities and enhance the security of your systems, networks, and applications against emerging threats.',
    image: 'https://vulnerax.com/img/logo.png',
    url: 'https://vulnerax.com/service/SystemHardening',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'System Hardening - VulneraX',
    description: 'Strengthen your IT infrastructure with VulneraX System Hardening services. Reduce vulnerabilities and enhance the security of your systems, networks, and applications against emerging threats.',
    image: 'https://vulnerax.com/img/logo.png',
  },
};

export default function SystemHardening() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content="System Hardening, Vulnerability, Cyber Security, Cyber Security Service" />
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
                <h3>System Hardening</h3>
                <p>
                  In an increasingly complex cyber threat environment, system hardening is a crucial step to protect your IT infrastructure from exploitation. System hardening involves strengthening systems and applications by reducing the attack surface and minimizing the risk of security vulnerabilities. This approach helps maintain data integrity, protect business assets, and ensure compliance with international security standards such as CIS Benchmarks and NIST SP 800-53.
                </p>
                <p>
                  System resilience is not just about defense but also about reducing attack opportunities. Our System Hardening services leverage a layered approach to protect your IT infrastructure from exploitation. VulneraX helps you implement optimal settings and best practices to strengthen your system's integrity.
                </p>
                <p>
                  System Hardening is the process of improving security by eliminating vulnerabilities caused by default configurations, unnecessary software, or insecure services. The goal is to ensure that your systems are protected from cyber threats through systematic and proactive measures.
                </p>

                <h5><b>Key Objectives of System Hardening:</b></h5>
                <ul>
                  <li><i className="bi bi-check"></i> <span>Reducing the attack surface of systems and applications.</span></li>
                  <li><i className="bi bi-check"></i> <span>Enhancing system strength to combat security threats.</span></li>
                  <li><i className="bi bi-check"></i> <span>Ensuring configurations align with security standards such as CIS Benchmarks.</span></li>
                  <li><i className="bi bi-check"></i> <span>Assisting in meeting regulatory security and audit requirements.</span></li>
                </ul>
              </div>

              <div className="container">
                <br /><br />
                <h5><b>Our Methodology:</b></h5>
                <p>
                  Our system hardening services follow internationally recognized methodologies to deliver reliable and comprehensive results. Below are the main stages in the system hardening process:
                </p>
                <ul>
                  <li><i className="bi bi-check-circle"></i> <span><b>Configuration Assessment (Security Standard Compliance):</b></span></li>
                  <p>We evaluate system configurations to identify non-compliance with security standards such as CIS Benchmarks and NIST SP 800-53. This stage includes an in-depth analysis of your servers, operating systems, software, and applications.</p>

                  <li><i className="bi bi-check-circle"></i> <span><b>Implementation of Security Controls:</b></span></li>
                  <p>Based on the assessment results, we implement security controls such as removing unnecessary services, configuring access policies, and strengthening software configurations. This process follows CIS and NIST guidelines to ensure optimal security.</p>

                  <li><i className="bi bi-check-circle"></i> <span><b>Validation and Verification:</b></span></li>
                  <p>After implementation, we conduct testing to verify that the applied measures effectively reduce security risks. This validation includes light penetration testing to ensure no security gaps remain.</p>

                  <li><i className="bi bi-check-circle"></i> <span><b>Security Maintenance:</b></span></li>
                  <p>We assist in developing procedures for maintaining security configurations to ensure your systems remain secure over time. This includes routine monitoring, system updates, and periodic audits to sustain ongoing security.</p>
                </ul>

                <h5><b>Benefits of this Service:</b></h5>
                <ul>
                  <li><i className="bi bi-1-circle-fill"></i> <span>Reduce the attack surface with proper security configurations.</span></li>
                  <li><i className="bi bi-2-circle-fill"></i> <span>Protect critical systems from unauthorized access.</span></li>
                  <li><i className="bi bi-3-circle-fill"></i> <span>Provide guidelines for long-term security maintenance.</span></li>
                </ul>

                <h5><b>Resources Used:</b></h5>
                <p>
                  We utilize global security standard guidelines to ensure effective system hardening implementation, including:
                </p>
                <ul>
                  <li><i className="bi bi-dot"></i> <span><b>CIS Benchmarks:</b> Security configuration standards for hardware, operating systems, and applications.</span></li>
                  <li><i className="bi bi-dot"></i> <span><b>NIST SP 800-53:</b> A framework of security controls to protect federal information systems.</span></li>
                </ul>

                <h5><b>Benefits of System Hardening:</b></h5>
                <ul>
                  <li><i className="bi bi-dot"></i> <span>Reduce the risk of security vulnerability exploitation.</span></li>
                  <li><i className="bi bi-dot"></i> <span>Improve system reliability and performance.</span></li>
                  <li><i className="bi bi-dot"></i> <span>Increase customer trust in your organization's security.</span></li>
                  <li><i className="bi bi-dot"></i> <span>Fulfill regulatory and security audit requirements.</span></li>
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