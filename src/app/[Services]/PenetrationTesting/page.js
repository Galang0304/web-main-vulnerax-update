'use client';
import Head from 'next/head';
import Header from '@/components/pages/Header';
import Footer from '@/components/pages/Footer';
import Contact from '@/components/pages/Contact';
import { useState } from 'react';
import { FaUserSecret, FaUserShield, FaUserFriends, FaChevronDown } from "react-icons/fa";

export default function PenetrationTesting() {
  const [openIndexes, setOpenIndexes] = useState([]);

  const toggleFAQ = (index) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };

  const faqs = [
    {
      q: "What is penetration testing?",
      a: "Penetration testing, also known as ethical hacking, is a simulated cyberattack to identify vulnerabilities before malicious attackers exploit them."
    },
    {
      q: "Why is penetration testing important for my business?",
      a: "It helps protect critical assets, ensures compliance with regulations (e.g., ISO 27001, PCI DSS, GDPR), and builds trust with customers and partners."
    },
    {
      q: "How often should penetration testing be performed?",
      a: "Best practice recommends conducting penetration tests annually, or whenever significant changes occur in systems, applications, or infrastructure."
    },
    {
      q: "What types of penetration tests are available?",
      a: "Common types include Black Box, Gray Box, and White Box testing, focusing on different levels of system knowledge and access."
    },
    {
      q: "What standards and frameworks guide penetration testing?",
      a: "International standards such as OWASP WSTG, OWASP MASTG, PTES, and OSSTM are widely adopted to ensure systematic and reliable results."
    },
    {
      q: "What deliverables will I receive after a penetration test?",
      a: "You will receive a detailed report with executive summary, technical findings, proof of concepts, and actionable remediation recommendations."
    }
  ];

  return (
    <>
      <Head>
        <title>Penetration Testing - VulneraX</title>
      </Head>

      <Header />

      {/* HERO */}
      <section
        className="d-flex align-items-center text-light position-relative"
        style={{
          backgroundImage: "url('/img/pentes.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "90vh",
          padding: "100px 20px",
        }}
      >
        <div className="container text-center position-relative z-2">
          <h1
            className="display-4 fw-bold mb-3"
            style={{
              color: "#fff",
              textShadow: "0 0 15px rgba(0,0,0,0.7)",
              background: "rgba(0,0,0,0.5)",
              padding: "12px 24px",
              borderRadius: "10px",
              display: "inline-block",
            }}
          >
            Penetration <span style={{ color: "#e63946" }}>Testing</span>
          </h1>
          <p
            className="lead mt-3"
            style={{ color: "#f1faee", maxWidth: "820px", margin: "0 auto" }}
          >
            Uncover hidden flaws by <strong style={{ color: "#e63946" }}>simulating cyberattacks</strong>, before <strong style={{ color: "#e63946" }}>attackers</strong> do.
          </p>
        </div>
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
        />
      </section>

      {/* ABOUT PENETRATION TESTING */}
      <section className="container my-2">
        <h3 className="fw-bold mb-4 text-center">About Penetration Testing</h3>
        <p className="text-muted lh-lg" style={{ textAlign: "justify" }}>
          In an era where cyber threats continue to grow in complexity, penetration testing has become
          an essential component of a robust cybersecurity strategy. Penetration testing, often referred
          to as ethical hacking, is a proactive approach to identify and mitigate vulnerabilities in IT
          infrastructure, web applications & mobile applications (Android & iOS). This process helps
          protect your business assets, ensure compliance with international standards, and build trust
          with customers.
        </p>
        <p className="text-muted lh-lg" style={{ textAlign: "justify" }}>
          Penetration Testing is a systematic approach to evaluating the security posture of organizations
          and businesses by identifying vulnerabilities that can be exploited by attackers. The goal is to
          simulate real-world cyber-attacks with a specific test scope, to uncover and exploit weaknesses
          and provide actionable insights into security measures to reduce the risk of cyber-attacks.
        </p>
      </section>

      {/* KEY OBJECTIVES */}
      <section className="container my-5">
        <h3 className="fw-bold mb-4 text-center">Key Objectives</h3>
        <div className="row g-4 justify-content-center">
          {[
            "Identify and address threats that may not be detected by traditional security systems.",
            "Minimize the impact of security incidents on your business.",
            "Provide strategic recommendations for security improvements and enhancements.",
            "Build a comprehensive incident response plan for future readiness."
          ].map((obj, i) => (
            <div key={i} className="col-md-6 col-lg-5">
              <div className="objective-glow-card rounded-4 h-100 p-4 d-flex align-items-start">
                <div className="objective-number">{i + 1}</div>
                <p className="text-white lh-lg mb-0 ps-3">{obj}</p>
              </div>
            </div>
          ))}
        </div>

        <style jsx>{`
          .objective-glow-card {
            background: linear-gradient(135deg, #e63946, #ff7f50);
            color: #fff;
            box-shadow: 0 0 15px rgba(230, 57, 70, 0.8);
            transition: all 0.3s ease;
          }
          .objective-glow-card:hover {
            transform: translateY(-6px) scale(1.02);
            box-shadow: 0 0 30px rgba(230, 57, 70, 1);
          }
          .objective-number {
            min-width: 38px;
            height: 38px;
            border-radius: 50%;
            background: #fff;
            color: #e63946;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 15px;
            flex-shrink: 0;
          }
        `}</style>
      </section>

      {/* OUR METHODOLOGY */}
      <section className="container my-2">
        <h3 className="fw-bold mb-4 text-center">Our Methodology</h3>
        <p className="text-muted lh-lg text-justify">
          Our penetration testing services follow a systematic, internationally recognized methodology to
          ensure thorough and reliable results. The methodology is built on frameworks such as OWASP WSTG,
          OWASP MASTG, PTES, and OSSTM. Below are the key phases:
        </p>

        <div className="row gy-3">
          {[
            {
              title: "1. Pre-engagement Interactions",
              text: "Define scope, communication channels, legal processes, and schedules to ensure alignment with business priorities."
            },
            {
              title: "2. Intelligence Gathering",
              text: "Collect OSINT, perform network scanning, and enumerate services to understand the attack surface."
            },
            {
              title: "3. Threat Modeling",
              text: "Identify and prioritize threats based on collected intelligence to understand possible attack vectors."
            },
            {
              title: "4. Vulnerability Analysis",
              text: "Detect vulnerabilities using tools and manual techniques such as XSS, CSRF, and SQL Injection."
            },
            {
              title: "5. Vulnerability Exploitation",
              text: "Safely exploit vulnerabilities to demonstrate real-world impact while avoiding service disruption."
            },
            {
              title: "6. Reporting and Recommendations",
              text: "Deliver executive summaries, technical evidence, and actionable remediation steps."
            },
            {
              title: "7. Re-pentest",
              text: "Validate remediation efforts by retesting fixed vulnerabilities to ensure full resolution."
            },
          ].map((item, index) => (
            <div className="col-md-6" key={index}>
              <div className="method-card p-3">
                <h6 className="fw-bold">{item.title}</h6>
                <p className="text-muted small mb-0">{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        <style jsx>{`
          .method-card {
            background: #fff;
            border-radius: 16px;
            transition: transform 0.2s ease, box-shadow 0.3s ease;
            box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08),
                        0 0 12px rgba(255, 0, 0, 0.25);
          }
          .method-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12),
                        0 0 20px rgba(255, 0, 0, 0.4);
          }
        `}</style>
      </section>

      {/* TYPES OF PENETRATION TESTING */}
      <section className="container my-2">
        <h3 className="fw-bold mb-4 text-center">Types of Penetration Testing</h3>
        <div className="row gy-4">
          <div className="col-md-4">
            <div className="card h-100 p-4 shadow-sm border-0 text-center">
              <FaUserSecret className="text-danger fs-1 mb-3" />
              <h5 className="fw-bold">Black Box Testing</h5>
              <p className="text-muted small">
                Testers have no prior knowledge of the system. Simulates external hacker attacks on assets such as web applications and network entry points.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 p-4 shadow-sm border-0 text-center">
              <FaUserFriends  className="text-danger fs-1 mb-3" />
              <h5 className="fw-bold">Gray Box Testing</h5>
              <p className="text-muted small">
                Testers have partial knowledge of the system. Combines internal and external perspectives to evaluate insider threats and external risks simultaneously.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 p-4 shadow-sm border-0 text-center">
              <FaUserShield  className="text-danger fs-1 mb-3" />
              <h5 className="fw-bold">White Box Testing</h5>
              <p className="text-muted small">
                Testers have full knowledge of the system, including architecture and source code, providing the most comprehensive evaluation of security controls.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="container my-5">
        <h3 className="fw-bold mb-4 text-center">Frequently Asked Questions (FAQs)</h3>
        <div className="faq-wrapper">
          {faqs.map((item, i) => {
            const isOpen = openIndexes.includes(i);
            return (
              <div key={i} className="faq-item mb-3 shadow-sm rounded-3 overflow-hidden">
                <button
                  onClick={() => toggleFAQ(i)}
                  className={`faq-question w-100 d-flex justify-content-between align-items-center`}
                >
                  {item.q}
                  <span className={`faq-icon ${isOpen ? "open" : ""}`}>
                    <FaChevronDown />
                  </span>
                </button>
                <div className={`faq-answer ${isOpen ? "show": ""}`}>
                <p>{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>

        <style jsx>{`
        .faq-item {
        background: #fff;
        transition: all 0.3s ease;
        }
        .faq-question {
        background: #f8f9fa;
        border: none;
        padding: 1rem 1.25rem;
        font-weight: 500;
        font-size: 1rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        transition: background 0.3s ease, color 0.3s ease;
        }
        .faq-question:hover { 
        background: #e63946;
        color: #fff;
        }
        .faq-icon {
        transition: transform 0.3s ease;
        display: flex;
        align-items: center;
        }
        .faq-icon.open {
        transform: rotate(180deg);
        }
        .faq-answer {
        max-height: 0;
        overflow: hidden;
        padding: 0 1.25rem;
        background: #f8f9fa;
        transition: all 0.4s ease;
        }
        .faq-answer.show {
        max-height: 500px;
        padding: 1rem 1.25rem;
        }
        .faq-answer p {
        margin: 0;
        font-size: 0.95rem;
        color: #555;
        line-height: 1.6;
        }
        `}</style>
      </section>
    <Contact />
  <Footer />
  </>
);
}
