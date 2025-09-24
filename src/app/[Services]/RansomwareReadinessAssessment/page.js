'use client';
import { useState } from "react";
import Header from '@/components/pages/Header';
import Footer from '@/components/pages/Footer';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Contact from '@/components/pages/Contact';
import { Lock, ShieldCheck } from "lucide-react";
import { FaChevronDown } from "react-icons/fa";

export default function ProfessionalRedTeaming() {
  const metadata = {
  title: 'Ransomeware Readiness Assessment - VulneraX',
  description: 'Ransomware Readiness Assessment by VulneraX will evaluates your organization’s preparedness against ransomware threats. Our experts analyze your current security posture, detect vulnerabilities, and assess the resilience of your backup systems. We provide actionable recommendations to strengthen defenses, ensure continuity, and mitigate the risk of ransomware attacks, protecting your critical assets and sensitive data from encryption or extortion.',
  openGraph: {
    title: 'Ransomeware Readiness Assessment - VulneraX',
    description: 'Prepare for potential ransomware attacks with VulneraX Ransomware Readiness Assessment. Evaluate your defenses, detect weaknesses, and implement strategies to mitigate risks and protect your organization from ransomware threats.',
    image: 'https://vulnerax.com/img/logo.png',
    url: 'https://vulnerax.com/service/RansomewareReadinessAssessment',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ransomeware Readiness Assessment - VulneraX',
    description: 'Prepare for potential ransomware attacks with VulneraX Ransomware Readiness Assessment. Evaluate your defenses, detect weaknesses, and implement strategies to mitigate risks and protect your organization from ransomware threats.',
    image: 'https://vulnerax.com/img/logo.png',
  },
};

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
      q: "What is a Ransomware Readiness Assessment (RRA)?",
      a: "RRA is a structured evaluation designed to measure an organization's preparedness to prevent, detect, respond to, and recover from ransomware attacks. It aligns with frameworks like NIST Cybersecurity Framework (CSF), ISO/IEC 27001, and CISA Ransomware Readiness Guide.",
    },
    {
      q: "Why is RRA important for organizations today?",
      a: "Ransomware is one of the fastest-growing global threats. An RRA helps organizations identify weaknesses in backup strategies, incident response, and endpoint protection, ensuring resilience against encryption and extortion attempts.",
    },
    {
      q: "Which international standards guide the assessment?",
      a: "Our RRA follows best practices from NIST SP 800-53, ISO/IEC 27035 (Incident Response), ENISA Threat Landscape, and CISA’s Ransomware Readiness Assessment framework.",
    },
    {
      q: "What are the main focus areas of an RRA?",
      a: "Key areas include user awareness and phishing resilience, backup and recovery strategy validation, endpoint and network defenses, patch management, and incident response maturity.",
    },
    {
      q: "What deliverables can we expect from an RRA?",
      a: "Deliverables include a tailored readiness scorecard, executive summary, detailed technical report, detection and response gap analysis, and prioritized recommendations for hardening defenses.",
    },
    {
      q: "How often should an RRA be conducted?",
      a: "It is recommended to conduct an RRA annually, or after major infrastructure changes, mergers, or significant incidents that may affect ransomware resilience.",
    },
    {
      q: "Will the RRA disrupt business operations?",
      a: "No. The assessment is conducted in a non-intrusive way, ensuring zero disruption to production systems. It focuses on evaluating processes, controls, and readiness posture.",
    },
  ];


  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content="Ransomeware Assessment, Vulnerability, Cyber Security, Cyber Security Service" />
      </Head>

      <Header />

      <main className="main">
        {/* HERO */}
        <section
          className="hero-section d-flex align-items-center text-light position-relative"
          style={{
            backgroundImage: "url('/img/RRA.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "90vh",
            padding: "100px 20px",
          }}
        >
          <div className="container text-center position-relative z-2">
            <h1
              className="display-3 fw-bold mb-3"
              style={{
                color: "#ffffff",
                textShadow:
                  "2px 2px 6px rgba(0,0,0,0.9), -2px -2px 6px rgba(0,0,0,0.9)",
                background: "rgba(0,0,0,0.4)",
                display: "inline-block",
                padding: "10px 20px",
                borderRadius: "8px",
              }}
            >
              Ransomware <span style={{ color: "#e63946" }}>Readiness Assessment</span>
            </h1>

            <p
              className="lead mb-5"
              style={{ color: "#f1faee", maxWidth: "800px", margin: "0 auto" }}
            >
              Risk Analysis and Expert Recommendations — Get a detailed report on risks
              and actionable recommendations to enhance your{" "}
              <strong style={{ color: "#e63946" }}>security</strong>.
            </p>

            <div className="hero-buttons">
              <Link
                href={"/rra"}
                className="btn btn-lg text-white"
                style={{ backgroundColor: "#e63946", border: "none" }}
              >
                Take the Test <i className="bi bi-arrow-right h5 ms-2"></i>
              </Link>
            </div>
          </div>

          {/* Overlay */}
          <div
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{ backgroundColor: "rgba(0,0,0,0.65)" }}
          />
        </section>

        {/* ABOUT SECTION */}
        <section id="about-rra" className="py-8 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
                  <div className="row g-0 align-items-center">
                    {/* Icon */}
                    <div className="col-md-4 d-flex justify-content-center align-items-center p-4 bg-gradient-to-br from-blue-500 to-indigo-600">
                      <img
                        src="/img/rra-icon/icon-3.png"
                        alt="About Security Network"
                        className="img-fluid"
                        style={{ width: "160px", height: "150px" }}
                      />
                    </div>

                    {/* Content */}
                    <div className="col-md-8 p-4 bg-white">
                      <h4 className="fw-bold text-dark mb-3">About Ransomware Threats</h4>
                      <p className="text-muted small lh-base mb-2" style={{ textAlign: "justify" }}>
                        In today's digital age, ransomware has become one of the most dangerous cyber threats, which can cripple business operations in seconds.
                        This attack not only threatens your organization's critical data but also your reputation, customer trust, and business continuity.
                      </p>
                      <p className="text-muted small lh-base mb-0" style={{ textAlign: "justify" }}>
                        <b>Our Ransomware Readiness Assessment (RRA)</b> service is designed to help your organization understand its level of preparedness for ransomware threats.
                        With a simple yet impactful approach, we use an interactive quiz to provide initial insight into the strengths and weaknesses of your security system.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card */}
            <div className="row mt-4 gy-3">
              <div className="col-md-6">
                <div
                  className="card text-center border-0 p-3 h-100 rounded-3 transition"
                  style={{
                    border: "2px solid #e63946",
                    boxShadow: "0 0 15px rgba(230, 57, 70, 0.6)",
                    transition: "all 0.3s ease-in-out",
                  }}
                >
                  <div className="d-flex justify-content-center mb-2">
                    <div
                      className="rounded-circle border border-2 border-primary p-2 d-flex align-items-center justify-content-center"
                      style={{ width: "65px", height: "65px" }}
                    >
                      <Lock className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <h6 className="fw-bold mb-2">Why is it Important to Conduct an RRA?</h6>
                  <p className="text-muted small mb-0" style={{ textAlign: "justify" }}>
                    Ransomware is indiscriminate—both large and small organizations can be targeted.
                    However, better-prepared organizations have a better chance of protecting their data
                    and minimizing the impact of an attack. Through this service, we help you:
                  </p>

                  <ul className="text-muted small" style={{ textAlign: "justify" }}>
                    <li><b>Increase Security Awareness</b> : Recognize potential risks you may have missed.</li>
                    <li><b>Measure Readiness Practically</b> : Provides a realistic picture of your organization's current security position.</li>
                    <li><b>Get Customized Recommendations</b> : Provides concrete steps to strengthen your defenses.</li>
                  </ul>
                </div>
              </div>

              <div className="col-md-6">
                <div
                  className="card text-center border-0 p-3 h-100 rounded-3 transition"
                  style={{
                    border: "2px solid #e63946",
                    boxShadow: "0 0 15px rgba(230, 57, 70, 0.6)",
                    transition: "all 0.3s ease-in-out",
                  }}
                >
                  <div className="d-flex justify-content-center mb-2">
                    <div
                      className="rounded-circle border border-2 border-danger p-2 d-flex align-items-center justify-content-center"
                      style={{ width: "65px", height: "65px" }}
                    >
                      <ShieldCheck className="w-6 h-6 text-danger" />
                    </div>
                  </div>
                  <h6 className="fw-bold mb-2">Customized Recommendations</h6>
                  <p className="text-muted small mb-0" style={{ textAlign: "justify" }}>
                    We provide step-by-step guidance tailored to your organization&apos;s
                    security posture, from prevention to recovery, ensuring stronger cyber resilience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IS THE PROCESS */}
        <section id="how-process" className="container py-4" style={{ marginTop: "0", marginBottom: "0" }}>
          <div className="card border-0 rounded-4 shadow-lg p-5 bg-white hover:bg-gray-50 transition hover:-translate-y-2">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h3 className="fw-bold text-dark mb-0">How is the Process?</h3>
              <i className="bi bi-gear-wide-connected text-danger" style={{ fontSize: "2.5rem" }}></i>
            </div>

            <p className="text-muted fs-6 lh-lg mb-3" style={{ textAlign: "justify" }}>
              Our <b>Ransomware Readiness Assessment</b> follows a systematic methodology to ensure an effective evaluation of your organization's preparedness.
              We provide an end-to-end analysis, starting from awareness to recovery, helping you identify vulnerabilities and strengthen your cyber resilience.
            </p>
            <p className="text-muted fs-6 lh-lg mb-4" style={{ textAlign: "justify" }}>
              Below are the key steps in the process:
            </p>

            <div className="row gy-4">
              <div className="col-md-3">
                <div className="card text-center shadow-sm p-4 h-100 hover:shadow-md hover:scale-105 transition">
                  <i className="bi bi-mouse2 fs-1 text-danger mb-3"></i>
                  <h6 className="fw-bold">Step 1</h6>
                  <p className="small">Click <b>Take the Test</b> button at the top of this page.</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card text-center shadow-sm p-4 h-100 hover:shadow-md hover:scale-105 transition">
                  <i className="bi bi-ui-checks fs-1 text-danger mb-3"></i>
                  <h6 className="fw-bold">Step 2</h6>
                  <p className="small">Answer a series of simple questions by selecting the option that best describes your organization.</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card text-center shadow-sm p-4 h-100 hover:shadow-md hover:scale-105 transition">
                  <i className="bi bi-graph-up fs-1 text-danger mb-3"></i>
                  <h6 className="fw-bold">Step 3</h6>
                  <p className="small">Receive your score showing security strengths and gaps in prevention, detection, response, and recovery.</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card text-center shadow-sm p-4 h-100 hover:shadow-md hover:scale-105 transition">
                  <i className="bi bi-file-earmark-text fs-1 text-danger mb-3"></i>
                  <h6 className="fw-bold">Step 4</h6>
                  <p className="small">Get a detailed <b>Report document</b> and <b>Score card</b> with actionable recommendations.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== FAQ Section ===== */}
        <section className="container my-5">
          <h3 className="fw-bold mb-4 text-center">Frequently Asked Questions (FAQs)</h3>
          <div className="faq-wrapper">
            {faqs.map((item, i) => {
              const isOpen = openIndexes.includes(i);
              return (
                <div key={i} className="faq-item mb-3 shadow-sm rounded-3 overflow-hidden">
                  <button
                    onClick={() => toggleFAQ(i)}
                    className="faq-question w-100 d-flex justify-content-between align-items-center"
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

        {/* Closing */}
        <section className="container py-4" style={{ marginTop: "3", marginBottom: "3" }}>
          <h5><b>Start Your Security Journey Now!</b></h5>
          <p>
            Prevent risks before it's too late. In just a few minutes, our quiz will help you understand your organization's readiness and provide valuable insights for more proactive action.
          </p>
          <h6><b>Recovery and Follow-Up</b></h6>
          <p>
            We assist in system and data recovery, followed by ensuring that corrective measures have been implemented effectively.
          </p>
        </section>
      </main>
      <Contact />
      <Footer />
    </>
  );
}
