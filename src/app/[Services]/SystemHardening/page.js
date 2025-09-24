// app/service/SystemHardening/SystemHardeningClient.jsx
'use client';

import { useState } from "react";
import Header from '@/components/pages/Header';
import Footer from '@/components/pages/Footer';
import Contact from '@/components/pages/Contact';
import { ShieldCheck, Settings, CheckCircle2 } from "lucide-react";
import { FaChevronDown } from "react-icons/fa";



export default function SystemHardening() {
  const activities = [
    {
      icon: "bi-gear", // 🔧 untuk assessment
      title: "Configuration Assessment",
      desc: "Evaluate system configurations for compliance with CIS Benchmarks and NIST SP 800-53."
    },
    {
      icon: "bi-slash-circle", // 🚫 untuk remove
      title: "Remove Unnecessary Services",
      desc: "Disable unused ports/services, remove unnecessary packages and reduce attack surface."
    },
    {
      icon: "bi-shield-lock", // 🛡️ untuk secure policies
      title: "Secure Defaults & Policies",
      desc: "Harden default settings, enforce least privilege and strong authentication mechanisms."
    },
    {
      icon: "bi-arrow-repeat", // 🔄 untuk maintenance
      title: "Verification & Continuous Maintenance",
      desc: "Automate configuration checks, vulnerability scanning, and patching cadence."
    },
  ];


  const [openIndexes, setOpenIndexes] = useState([]);

  const toggleFAQ = (index) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };
  
  // FAQ
  const faqs = [
    {
      q: "What is system hardening?",
      a: "System hardening is the process of securing systems by reducing their attack surface, disabling unnecessary services, applying secure configurations, and aligning with standards such as CIS Benchmarks and NIST SP 800-53."
    },
    {
      q: "Why is system hardening important?",
      a: "Hardening reduces the risk of exploitation, improves resilience against attacks, helps meet regulatory requirements, and lowers the cost and impact of security incidents."
    },
    {
      q: "Which standards does VulneraX follow for hardening?",
      a: "We align our hardening with CIS Benchmarks, NIST SP 800-53, ISO/IEC 27001 controls, and relevant industry baselines (e.g., PCI DSS) as required by the client's compliance posture."
    },
    {
      q: "How often should hardening be reviewed and updated?",
      a: "Review hardening post major platform updates or architecture changes; otherwise perform a formal review at least annually and whenever threat models change."
    },
    {
      q: "Will hardening impact system performance?",
      a: "Proper hardening focuses on removing unnecessary services and tightening configs; when performed correctly it typically has minimal performance impact and often improves stability."
    },
  ];

  return (
    <>
      <Header />

      <main className="main">
        {/* HERO */}
        <section
          className="hero-section d-flex align-items-center text-light position-relative"
          style={{
            backgroundImage: "url('/threatHunting.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "90vh",
            padding: "100px 20px",
          }}
          aria-hidden="true"
        >
          <div className="container text-center position-relative z-2">
            <h1
              className="display-3 fw-bold mb-3"
              style={{
                color: "#ffffff",
                textShadow: "2px 2px 6px rgba(0,0,0,0.9)",
                background: "rgba(0,0,0,0.4)",
                display: "inline-block",
                padding: "10px 20px",
                borderRadius: "8px",
              }}
            >
              System <span style={{ color: "#e63946" }}>Hardening</span>
            </h1>

            <p className="lead mb-5" style={{ color: "#f1faee", maxWidth: "800px", margin: "0 auto" }}>
              Strengthen your IT infrastructure by minimizing vulnerabilities and aligning configurations with global security standards.
            </p>
          </div>

          <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: "rgba(0,0,0,0.65)" }} />
        </section>

        {/* ABOUT */}
        <section id="about-hardening" className="py-8 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="container">
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="row g-0 align-items-center">
                <div className="col-md-4 d-flex justify-content-center align-items-center p-4 bg-gradient-to-br from-red-500 to-red-700">
                  <img src="/img/rra-icon/icon-1.png" alt="System Hardening" className="img-fluid" style={{ width: 160, height: 150 }} />
                </div>

                <div className="col-md-8 p-4 bg-white">
                  <h4 className="fw-bold text-dark mb-3">About System Hardening</h4>
                  <p className="text-muted small lh-base mb-2" style={{ textAlign: "justify" }}>
                    In an increasingly complex cyber threat environment, system hardening is a crucial step to protect your IT infrastructure from exploitation.
                    It involves strengthening systems and applications by reducing the attack surface and minimizing security misconfigurations.
                  </p>
                  <p className="text-muted small lh-base mb-0" style={{ textAlign: "justify" }}>
                    Our services implement industry best practices and automated controls to ensure systems remain secure, compliant, and resilient over time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* OBJECTIVES TIMELINE (kept as-is) */}
        <section className="container py-5">
          <h3 className="fw-bold text-center mb-5">Key Objectives of System Hardening</h3>

          <div className="position-relative" style={{ maxWidth: 900, margin: "0 auto" }}>
            <div className="position-absolute top-0 bottom-0 start-50 translate-middle-x border-start border-2 border-danger" />

            <div className="row g-0 mb-5 align-items-center position-relative">
              <div className="col-md-6 text-end pe-4">
                <div className="bg-white shadow-sm rounded-3 p-4 d-inline-block text-start">
                  <h6 className="fw-bold text-danger mb-1">Reducing Attack Surface</h6>
                  <p className="text-muted mb-0 small">Minimizing vulnerabilities in systems and applications to reduce entry points for attackers.</p>
                </div>
              </div>
              <div className="col-md-6 ps-4 d-none d-md-block" />
              <div className="position-absolute top-50 start-50 translate-middle bg-danger text-white d-flex align-items-center justify-content-center rounded-circle shadow" style={{ width: 45, height: 45, zIndex: 1 }}>
                <i className="bi bi-shield-lock-fill fs-5" />
              </div>
            </div>

            <div className="row g-0 mb-5 align-items-center position-relative">
              <div className="col-md-6 d-none d-md-block" />
              <div className="col-md-6 ps-4">
                <div className="bg-white shadow-sm rounded-3 p-4 d-inline-block text-start">
                  <h6 className="fw-bold text-danger mb-1">Enhancing System Strength</h6>
                  <p className="text-muted mb-0 small">Improving system resilience to withstand and mitigate security threats effectively.</p>
                </div>
              </div>
              <div className="position-absolute top-50 start-50 translate-middle bg-danger text-white d-flex align-items-center justify-content-center rounded-circle shadow" style={{ width: 45, height: 45, zIndex: 1 }}>
                <i className="bi bi-shield-check fs-5" />
              </div>
            </div>

            <div className="row g-0 mb-5 align-items-center position-relative">
              <div className="col-md-6 text-end pe-4">
                <div className="bg-white shadow-sm rounded-3 p-4 d-inline-block text-start">
                  <h6 className="fw-bold text-danger mb-1">Compliance with Standards</h6>
                  <p className="text-muted mb-0 small">Ensuring configurations align with CIS Benchmarks and best security practices.</p>
                </div>
              </div>
              <div className="col-md-6 ps-4 d-none d-md-block" />
              <div className="position-absolute top-50 start-50 translate-middle bg-danger text-white d-flex align-items-center justify-content-center rounded-circle shadow" style={{ width: 45, height: 45, zIndex: 1 }}>
                <i className="bi bi-journal-check fs-5" />
              </div>
            </div>

            <div className="row g-0 align-items-center position-relative">
              <div className="col-md-6 d-none d-md-block" />
              <div className="col-md-6 ps-4">
                <div className="bg-white shadow-sm rounded-3 p-4 d-inline-block text-start">
                  <h6 className="fw-bold text-danger mb-1">Regulatory & Audit Readiness</h6>
                  <p className="text-muted mb-0 small">Helping organizations meet regulatory requirements and pass audits smoothly.</p>
                </div>
              </div>
              <div className="position-absolute top-50 start-50 translate-middle bg-danger text-white d-flex align-items-center justify-content-center rounded-circle shadow" style={{ width: 45, height: 45, zIndex: 1 }}>
                <i className="bi bi-file-earmark-text-fill fs-5" />
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-5 bg-light">
          <div className="container">
           <h3 className="fw-bold text-center mb-4">How Does System Hardening Work?</h3>
            <div className="d-flex flex-column gap-3">
              {activities.map((step, i) => (
              <div
              key={i}
              className="card border-0 shadow-sm p-4 d-flex flex-row align-items-center"
              style={{ borderLeft: "5px solid #e63946" }}
              >
              <i className={`bi ${step.icon} text-danger fs-1 me-3`} />
              <div>
              <h6 className="fw-bold mb-1">{step.title}</h6>
              <p className="small text-muted mb-0">{step.desc}</p>
              </div>
            </div>
            ))}
          </div>
          </div>
        </section>


        {/* FEATURES */}
        <section className="py-5">
          <div className="container">
            <h3 className="fw-bold text-center mb-4">Industry-leading Features</h3>
            <div className="row g-4 text-center">
              {[
                { icon: <Settings className="text-danger" size={40} />, text: "Compromise assessment offers a full picture of incidents, reducing investigation time." },
                { icon: <ShieldCheck className="text-danger" size={40} />, text: "Memory forensics and behavior analysis to detect unknown malicious programs." },
                { icon: <CheckCircle2 className="text-danger" size={40} />, text: "Active threat hunting with visualization to correlate compromised endpoints." },
              ].map((f, i) => (
                <div className="col-md-4" key={i}>
                  <div className="card border-0 shadow-sm p-4 h-100 rounded-3">
                    <div className="mb-3">{f.icon}</div>
                    <p className="small text-muted mb-0">{f.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FAQ Section ===== */}
      <section className="container my-5">
        <h3 className="fw-bold mb-4 text-center">
          Frequently Asked Questions (FAQs)
        </h3>
        <div className="faq-wrapper">
          {faqs.map((item, i) => {
            const isOpen = openIndexes.includes(i);
            return (
              <div
                key={i}
                className="faq-item mb-3 shadow-sm rounded-3 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(i)}
                  className={`faq-question w-100 d-flex justify-content-between align-items-center`}
                >
                  {item.q}
                  <span className={`faq-icon ${isOpen ? "open" : ""}`}>
                    <FaChevronDown />
                  </span>
                </button>
                <div className={`faq-answer ${isOpen ? "show" : ""}`}>
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
      </main>
      <Contact />
      <Footer />
    </>
  );
}