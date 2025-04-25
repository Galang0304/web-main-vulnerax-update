import Header from '@/components/pages/Header';
import Footer from '@/components/pages/Footer';
import Contact from '@/components/pages/Contact';
import Head from 'next/head';

export const metadata = {
  title: 'Penetration Testing - VulneraX',
  description: 'Penetration Testing services by Vulnerax, including web application, mobile application, and IT infrastructure security assessments to identify vulnerabilities and improve cybersecurity.',
  openGraph: {
    title: 'Penetration Testing - VulneraX',
    description: 'Penetration Testing services by Vulnerax, including web application, mobile application, and IT infrastructure security assessments to identify vulnerabilities and improve cybersecurity.',
    image: 'https://vulnerax.com/img/logo.png',
    url: 'https://vulnerax.com/Services/PenetrationTesting',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Penetration Testing - VulneraX',
    description: 'Penetration Testing services by Vulnerax, including web application, mobile application, and IT infrastructure security assessments to identify vulnerabilities and improve cybersecurity.',
    image: 'https://vulnerax.com/img/logo.png',
  },
};

export default function PenetrationTesting() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content="Penetration Testing, Vulnerability, Cyber Security, Cyber Security Service" />
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:image" content={metadata.openGraph.image} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:type" content={metadata.openGraph.type} />
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta name="twitter:description" content={metadata.twitter.description} />
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
        <br />
        <br />

        {/* Service Details Section */}
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

                <h3>Penetration Testing</h3>
                <p>
                  In an era where cyber threats continue to grow in complexity, penetration testing has become an essential component of a robust cybersecurity strategy. Penetration testing, often referred to as ethical hacking, is a proactive approach to identify and mitigate vulnerabilities in IT infrastructure, web applications & mobile applications (Android & iOS). This process helps protect your business assets, ensure compliance with international standards, and build trust with customers.
                </p>
                <p>
                  Penetration Testing is a systematic approach to evaluating the security posture of organizations and businesses by identifying vulnerabilities that can be exploited by attackers. The goal is to simulate real-world cyber-attacks with a specific test scope, to uncover and exploit weaknesses and provide actionable insights into security measures to reduce the risk of cyber-attacks.
                </p>
                <p>Key objectives of penetration testing:</p>
                <ul>
                  <li>
                    <i className="bi bi-check-circle"></i>
                    <span>Identify security weaknesses before attackers do.</span>
                  </li>
                  <li>
                    <i className="bi bi-check-circle"></i>
                    <span>Validate the effectiveness of existing security controls.</span>
                  </li>
                  <li>
                    <i className="bi bi-check-circle"></i>
                    <span>Ensure compliance with industry standards such as OWASP-WSTG, OWASP-MASTG, OSSTM, and others.</span>
                  </li>
                  <li>
                    <i className="bi bi-check-circle"></i>
                    <span>Enhance overall resilience against potential threats.</span>
                  </li>
                </ul>
              </div>

              <div className="container">
                <br />
                <h5>
                  <b>Our Methodology:</b>
                </h5>
                <p>
                  Our penetration testing services follow a systematic, internationally recognized methodology to ensure thorough and reliable results. The methodology is built on frameworks such as OWASP WSTG (Web Security Testing Guide), OWASP MASTG  (Mobile Application Security Testing Guide), PTES (Penetration Testing Execution Standard), OSSTM (Open Source Security Testing Methodology). Below are the key phases:
                </p>
                <ul>
                  <li>
                    <i className="bi bi-check-circle"></i>
                    <span><b>Pre-engagement Interactions</b></span>
                  </li>
                  <p>
                    We collaborate with your team to define test boundaries, objectives, and deliverables. This includes defining the systems and applications to be tested, ensuring alignment with your business and organizational priorities, to ensure all parties agree on the scope and rules of engagement, with some activities such as:
                  </p>
                  <ul>
                    <li><i className="bi bi-check"></i> <span>Scope Definition : Defines the boundaries of the activity, such as the IP network, web application, or wireless network to be tested.</span></li>
                    <li><i className="bi bi-check"></i> <span>Communication    : Establishes communication channels between the pentest team and the client.</span></li>
                    <li><i className="bi bi-check"></i> <span>Legal Process    : Finalize legal requirements, such as non-disclosure agreements (NDAs) and contracts.</span></li>
                    <li><i className="bi bi-check"></i> <span>Schedule         : Establish project start and completion dates.</span></li>
                  </ul>

                  <li>
                    <i className="bi bi-check-circle"></i>
                    <span><b>Intelligence Gathering</b></span>
                  </li>
                  <p>
                    In this phase, we gather information about the target environment. This includes open source intelligence (OSINT), network scanning, and service enumeration to build a comprehensive understanding of the attack surface.
                  </p>

                  <li>
                    <i className="bi bi-check-circle"></i>
                    <span><b>Threat Modeling</b></span>
                  </li>
                  <p>
                    We identify and prioritize threats based on the information collected. This helps us understand how attackers might exploit your system to understand how attackers might exploit your system.
                  </p>

                  <li>
                    <i className="bi bi-check-circle"></i>
                    <span><b>Vulnerability Analysis</b></span>
                  </li>
                  <p>
                    Using advanced tools and manual techniques such as XSS, CSRF, and SQL Injection, we identify potential vulnerabilities in the target system. These include misconfigurations, outdated software, weak authentication mechanisms, and insecure code.
                  </p>

                  <li>
                    <i className="bi bi-check-circle"></i>
                    <span><b>Vulnerability Exploitation</b></span>
                  </li>
                  <p>
                    Our experts simulate real-world attacks to exploit identified vulnerabilities, demonstrating the potential impact of an actual breach. This phase is conducted with the utmost care to prevent disruption to your operations to find exploitable security holes to proving that vulnerabilities can be exploited.
                  </p>

                  <li>
                    <i className="bi bi-check-circle"></i>
                    <span><b>Reporting and Recommendations</b></span>
                  </li>
                  <p>We provide a detailed report that includes:</p>
                  <ul>
                    <li><i className="bi bi-check"></i> <span>An executive summary for non-technical stakeholders.</span></li>
                    <li><i className="bi bi-check"></i> <span>Full list of vulnerabilities with risk ratings.</span></li>
                    <li><i className="bi bi-check"></i> <span>Technical evidence of findings.</span></li>
                    <li><i className="bi bi-check"></i> <span>Customized recommendations for remediation.</span></li>
                  </ul>
                  <br />
                  <li>
                    <i className="bi bi-check-circle"></i>
                    <span><b>Re-pentest</b></span>
                  </li>
                  <p>
                    Once the vulnerabilities have been resolved, we perform a retest to validate the effectiveness of the remediation efforts and ensure all issues have been resolved.
                  </p>
                </ul>
                <br />

                <h5>
                  <b>Types of Penetration Testing</b>
                </h5>
                <p>We offer different types of penetration testing customized to meet your specific needs:</p>
                <ul>
                  <li>
                    <i className="bi bi-1-circle-fill"></i>
                    <span>
                      <b>Black Box Testing</b>
                    </span>
                  </li>
                  <p>
                    Testers have no prior knowledge of the system (Without any authentication and authorization). Simulates an attack by an external hacker and focuses on outward-facing assets such as web applications and network entry points.
                  </p>

                  <li>
                    <i className="bi bi-2-circle-fill"></i>
                    <span>
                      <b>Gray Box Testing</b>
                    </span>
                  </li>
                  <p>
                    Testers have partial knowledge of the system by combining internal and external perspectives (authentication and limited access authorization) to identify vulnerabilities and use the Ideal way to evaluate insider threats and external attacks simultaneously.
                  </p>

                  <li>
                    <i className="bi bi-3-circle-fill"></i>
                    <span>
                      <b>White Box Testing</b>
                    </span>
                  </li>
                  <p>
                    Testers have full knowledge of the system (authentication and authorization with full access) including architecture and source code by providing a comprehensive evaluation of security controls.
                  </p>
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