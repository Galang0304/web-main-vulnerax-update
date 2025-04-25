import Head from 'next/head';
import Header from '@/components/pages/Header';
import Footer from '@/components/pages/Footer';
import Contact from '@/components/pages/Contact';

export const metadata = {
  title: 'Professional Red Teaming - VulneraX',
  description: 'Vulnerax Professional Red Teaming service offers comprehensive security assessments where our experienced red team acts as real-world adversaries to test your organization defense mechanisms.',
  openGraph: {
    title: 'Professional Red Teaming - VulneraX',
    description: 'Simulate real-world cyber-attacks with Vulnerax Professional Red Teaming service. Our experts work as adversaries to test your defenses, identify gaps, and enhance your security posture with detailed reports and actionable insights.',
    image: 'https://vulnerax.com/img/logo.png',
    url: 'https://vulnerax.com/service/ProfessionalRedTeaming',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professional Red Teaming - VulneraX',
    description: 'Simulate real-world cyber-attacks with Vulnerax Professional Red Teaming service. Our experts work as adversaries to test your defenses, identify gaps, and enhance your security posture with detailed reports and actionable insights.',
    image: 'https://vulnerax.com/img/logo.png',
  },
};


export default function ProfessionalRedTeaming() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content="Professional Red Teaming, Vulnerability, Cyber Security, Cyber Security Service" />
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

        {/* Service Details Section */}
        <section id="service-details" className="service-details section">
          <div className="container">
            <div className="row gy-5">
              <div className="col-lg-4" data-aos="fade-up" data-aos-delay="100">
                <div className="help-box d-flex flex-column justify-content-center align-items-center">
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
                </div>
              </div>

              <div className="col-lg-8 ps-lg-5" data-aos="fade-up" data-aos-delay="200">
                <br/>
                <h3>Professional Red Teaming</h3>
                <p>
                  Professional Red Teaming is a real-world attack simulation service designed to help organizations understand and strengthen their security resilience. The service not only focuses on finding technical vulnerabilities but also tests the extent to which organizations are able to detect, respond to, and address threats that have the potential to disrupt operations, damage data, or impact reputation.
                </p>
                <p>
                  With a holistic approach, we evaluate security across all aspects—digital, physical, and human—to provide relevant and actionable insights. Our experienced team works with modern techniques that are constantly evolving, ensuring simulations that are realistic and appropriate to today's security challenges.
                </p>
                <p>
                  We believe that rock-solid security starts with a deep understanding of risk, and that's exactly what we offer: the opportunity to learn, improve, and walk away better prepared for the future.
                </p>
              </div>

              <div className="container">
                <br/>
                <h5><b>Key Activities in Red Teaming</b></h5>
                <ul>
                  <li><i className="bi bi-check-circle"></i> <span><b>Reconnaissance and Intelligence Gathering</b></span></li>
                  <p>Gathering public and confidential information about the organization, including network structure, digital assets, employees, and vendors. Utilize OSINT (Open Source Intelligence) techniques, such as monitoring social media, searching for leaked data, and dark web exploration. </p>

                  <li><i className="bi bi-check-circle"></i> <span><b>Initial Access</b></span></li>
                  <p>Sending emails designed to trick employees into gaining entry to internal systems (Spear Phishing), attacking web applications or services exposed to the internet, such as VPN portals, email, or custom applications (Exploitation of Public-Facing Assets) & Infiltrating through vendors or business partners connected to your systems (Supply Chain Attacks).</p>

                  <li><i className="bi bi-check-circle"></i> <span><b>Persistence and Privilege Escalation</b></span></li>
                  <p>Embedding a backdoor or malware to maintain long-term access &  exploiting vulnerabilities in operating systems or software to gain elevated privileges.</p>

                  <li><i className="bi bi-check-circle"></i> <span><b>Lateral Movement</b></span></li>
                  <p>Browsing internal networks using protocols such as SMB, RDP, or WinRM to explore other systems & exploit administrator credentials or utilize internal communication protocols to expand the scope of the attack.</p>

                  <li><i className="bi bi-check-circle"></i> <span><b>Exfiltration and Impac</b></span></li>
                  <p>Stealing sensitive data, such as customer information, credentials, or strategic company assets & modify, delete, or encrypt data as part of a simulated ransomware attack.</p> <br />
                </ul>

                <h5><b>Red Teaming vs. Penetration Testing</b></h5>
                <p>
                  Red teaming is more in-depth than penetration testing. While pentesting evaluates specific vulnerabilities over a period of time, red teaming includes a holistic approach, focusing on:
                </p>
                <ul>
                  <li>
                    <i className="bi bi-dot"></i>
                    <span>Mimicking Real-World Threats: Simulations that mimic real attack scenarios.</span>
                  </li>
                  <li>
                    <i className="bi bi-dot"></i>
                    <span>Testing Detection and Response: Evaluating the security team's ability to detect and respond to attacks in progress.</span>
                  </li>
                  <li>
                    <i className="bi bi-dot"></i>
                    <span>End-to-End Simulation: Involves all aspects—from technology, to people, to processes.</span>
                  </li>
                  <br />
                </ul>

                <h5><b>Deliverables</b></h5>
                <p>
                  The deliverables of red teaming include a comprehensive report containing:
                </p>
                <ul>
                  <li>
                    <i className="bi bi-1-circle-fill"></i>
                    <span><b>Executive Report:</b> High-level summary for senior management.</span>
                  </li>
                  <li>
                    <i className="bi bi-2-circle-fill"></i>
                    <span><b>Technical Report:</b> A description of the TTPs (Tactics, Techniques, and Procedures) used during the simulation.</span>
                  </li>
                  <li>
                    <i className="bi bi-3-circle-fill"></i>
                    <span><b>Evaluation of Detection and Response Capabilities:</b> Detection time and response time of the security team.</span>
                  </li>
                  <li>
                    <i className="bi bi-4-circle-fill"></i>
                    <span><b>Mitigation Recommendations:</b> Technical, operational, and strategic measures to address the findings.</span>
                  </li>
                  <br />
                </ul>

                <h5><b>Results</b></h5>
                <p>
                  The end result of our red teaming services provides your organization:
                </p>
                <ul>
                  <li>
                    <i className="bi bi-dot"></i>
                    <span>A deep understanding of the real-world threats that can compromise systems.</span>
                  </li>
                  <li>
                    <i className="bi bi-dot"></i>
                    <span>A complete assessment of security readiness, from technology to incident response teams.</span>
                  </li>
                  <li>
                    <i className="bi bi-dot"></i>
                    <span>Prioritized recommendations to improve overall security.</span>
                  </li>
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