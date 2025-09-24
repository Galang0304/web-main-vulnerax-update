'use client';
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Head from "next/head";
import Header from "@/components/pages/Header";
import Footer from "@/components/pages/Footer";
import Contact from "@/components/pages/Contact";

export default function ProfessionalRedTeaming() {
  const metadata = {
    title: "Professional Red Teaming - VulneraX",
    description:
      "Vulnerax Professional Red Teaming service offers comprehensive security assessments...",
    url: "https://vulnerax.com/service/ProfessionalRedTeaming",
    image: "https://vulnerax.com/img/logo.png",
  };

  const activities = [
    {
      icon: "bi-search",
      title: "Reconnaissance & Intelligence Gathering",
      desc: "Gathering OSINT, mapping attack surface, monitoring leaks, and dark web exploration.",
    },
    {
      icon: "bi-envelope-open",
      title: "Initial Access",
      desc: "Phishing, exploitation of public-facing assets, or supply chain infiltration.",
    },
    {
      icon: "bi-unlock-fill",
      title: "Persistence & Privilege Escalation",
      desc: "Maintaining long-term access and escalating privileges securely.",
    },
    {
      icon: "bi-arrows-move",
      title: "Lateral Movement",
      desc: "Expanding across networks using SMB, RDP, or administrator credentials.",
    },
    {
      icon: "bi-cloud-arrow-down",
      title: "Exfiltration & Impact",
      desc: "Stealing sensitive data or simulating ransomware attacks.",
    },
  ];

  // FAQ State 
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
      q: "What is the main difference between Red Teaming and Penetration Testing?",
      a: "Penetration testing focuses on identifying and exploiting technical vulnerabilities, while Red Teaming takes a holistic approach to simulate real-world attacks across people, processes, and technology, testing the organization’s overall detection and response capabilities.",
    },
    {
      q: "How does Red Teaming align with international standards?",
      a: "Professional Red Teaming engagements are guided by standards and frameworks such as MITRE ATT&CK, NIST SP 800-115, and PTES to ensure systematic, repeatable, and internationally recognized methodologies.",
    },
    {
      q: "What kind of threats are simulated during Red Teaming?",
      a: "Red Teaming simulates advanced persistent threats (APTs), insider threats, phishing campaigns, supply chain attacks, and lateral movement scenarios to evaluate the resilience of an organization.",
    },
    {
      q: "How often should Red Teaming exercises be conducted?",
      a: "Organizations are recommended to conduct Red Teaming at least annually, or when undergoing significant infrastructure, application, or business process changes that could alter the threat landscape.",
    },
    {
      q: "What are the expected deliverables from a Red Teaming engagement?",
      a: "You will receive an executive summary for management, detailed technical reports, evidence of attack simulations, assessment of detection/response effectiveness, and actionable recommendations for improvements.",
    },
    {
      q: "Does Red Teaming impact business operations?",
      a: "Red Teaming is carefully scoped and executed with minimal business disruption. The engagements are conducted ethically and with prior agreements to ensure that critical systems and services remain operational.",
    },
  ];

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata.image} />
        <meta property="og:url" content={metadata.url} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Header />

      {/* ===== Hero Section ===== */}
      <section
        className="hero-section d-flex align-items-center text-light position-relative"
        style={{
          backgroundImage: "url('/img/red teaming 2.jpg')",
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
            Professional <span style={{ color: "#e63946" }}>Red Teaming</span>
          </h1>

          <p
            className="lead mb-5"
            style={{ color: "#f1faee", maxWidth: "800px", margin: "0 auto" }}
          >
            Simulate real-world cyber-attacks to test your{" "}
            <strong style={{ color: "#e63946" }}>defense</strong>,{" "}
            <strong style={{ color: "#e63946" }}>detection</strong>, and{" "}
            <strong style={{ color: "#e63946" }}>response</strong> capabilities.
          </p>
        </div>

        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ backgroundColor: "rgba(0,0,0,0.65)" }}
        />
      </section>

      <section id="details" className="py-5">
        <div className="container">
          {/* ABOUT*/}
          <h3 className="fw-bold mb-4 text-center">What is Red Teaming?</h3>
          <p className="mx-auto text-center" style={{ maxWidth: "900px" }}>
            Professional Red Teaming is a real-world attack simulation service
            designed to help organizations understand and strengthen their
            security resilience. The service not only focuses on finding
            technical vulnerabilities but also tests the extent to which
            organizations are able to detect, respond to, and address threats
            that have the potential to disrupt operations, damage data, or
            impact reputation. With a holistic approach, we evaluate security
            across all aspects—digital, physical, and human—to provide relevant
            and actionable insights. Our experienced team works with modern
            techniques that are constantly evolving, ensuring simulations that
            are realistic and appropriate to today's security challenges. We
            believe that rock-solid security starts with a deep understanding of
            risk, and that's exactly what we offer: the opportunity to learn,
            improve, and walk away better prepared for the future.
          </p>

          {/*Key Activities*/}
          <h5 className="mt-5 fw-bold text-center">Key Activities</h5>
          <div className="row mt-4 g-4">
            {activities.map((item, idx) => (
              <div key={idx} className={`col-lg-6`}>
                <div
                  className="p-4 bg-white rounded shadow-sm d-flex align-items-start gap-3 h-100"
                  style={{ borderLeft: "6px solid #e63946" }}
                >
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "12px",
                      backgroundColor: "#fff0f0",
                      flexShrink: 0,
                    }}
                  >
                    <i
                      className={`bi ${item.icon} text-danger`}
                      style={{ fontSize: "28px" }}
                    ></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-2">{item.title}</h6>
                    <p className="text-muted small mb-0">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/*Red Teaming vs Penetration Testing*/}
          <h5 className="mt-5 fw-bold text-center text-uLowerCase">
            Red Teaming vs Penetration Testing
          </h5>

          <div
            className="mt-4 p-4 rounded shadow-sm"
            style={{ backgroundColor: "#fdfaf6" }}
          >
            <div className="d-flex">
              <div style={{ flex: 1 }}>
                <h6 className="fw-bold text-danger mb-3">
                  🔍 Red Teaming is more in-depth than Penetration Testing
                </h6>
                <p className="text-muted">
                  While penetration testing evaluates specific vulnerabilities
                  over a limited time,{" "}
                  <span className="fw-bold">Red Teaming</span> takes a holistic
                  approach, focusing on:
                </p>

                <ul className="mb-0 list-unstyled">
                  <li className="mb-3 d-flex align-items-start">
                    <span
                      className="me-3 d-inline-flex align-items-center justify-content-center"
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        backgroundColor: "#e63946",
                        color: "#fff",
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                      aria-hidden="true"
                    >
                      1
                    </span>
                    <div>
                      <span className="fw-semibold">
                        Mimicking Real-World Threats:
                      </span>{" "}
                      <span className="text-muted">
                        Simulations that replicate real attack scenarios.
                      </span>
                    </div>
                  </li>

                  <li className="mb-3 d-flex align-items-start">
                    <span
                      className="me-3 d-inline-flex align-items-center justify-content-center"
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        backgroundColor: "#e63946",
                        color: "#fff",
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                      aria-hidden="true"
                    >
                      2
                    </span>
                    <div>
                      <span className="fw-semibold">
                        Collect & Analyze Evidence:
                      </span>{" "}
                      <span className="text-muted">
                        Gathering critical artifacts to assess impact.
                      </span>
                    </div>
                  </li>

                  <li className="mb-3 d-flex align-items-start">
                    <span
                      className="me-3 d-inline-flex align-items-center justify-content-center"
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        backgroundColor: "#e63946",
                        color: "#fff",
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                      aria-hidden="true"
                    >
                      3
                    </span>
                    <div>
                      <span className="fw-semibold">
                        Identify Compromise Scope:
                      </span>{" "}
                      <span className="text-muted">
                        Understanding how deep the breach can go.
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Deliverables & Results*/}
          <div className="row align-items-center mt-5 g-4">
            {/* Deliverables */}
            <div className="col-lg-6 text-start">
              <h5 className="fw-bold mb-4">Deliverables</h5>
              <ul className="list-unstyled">
                <li className="d-flex align-items-start mb-3">
                  <span className="me-3 text-danger">📌</span>
                  <span>
                    <strong>Executive Report:</strong> High-level summary for
                    senior management
                  </span>
                </li>
                <li className="d-flex align-items-start mb-3">
                  <span className="me-3 text-danger">📌</span>
                  <span>
                    <strong>Technical Report:</strong> Detailed description of
                    TTPs used
                  </span>
                </li>
                <li className="d-flex align-items-start mb-3">
                  <span className="me-3 text-danger">📌</span>
                  <span>
                    <strong>Evaluation of Detection & Response:</strong>
                    Measuring detection and response time
                  </span>
                </li>
                <li className="d-flex align-items-start mb-3">
                  <span className="me-3 text-danger">📌</span>
                  <span>
                    <strong>Mitigation Recommendations:</strong> Technical,
                    operational, and strategic solutions
                  </span>
                </li>
              </ul>
            </div>

            {/* Results */}
            <div className="col-lg-6">
              <div
                className="p-4 rounded shadow-lg position-relative"
                style={{
                  background: "linear-gradient(135deg, #fff 0%, #ffeaea 100%)",
                  border: "1px solid #e63946",
                  boxShadow: "0 6px 20px rgba(230, 57, 70, 0.15)",
                }}
              >
                <div className="text-center mb-3">
                  <div
                    className="d-inline-flex align-items-center justify-content-center"
                    style={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "14px",
                      backgroundColor: "#e63946",
                      color: "white",
                      fontSize: "30px",
                      boxShadow: "0 4px 12px rgba(230, 57, 70, 0.4)",
                    }}
                  >
                    ⚡
                  </div>
                </div>
                <h5
                  className="fw-bold text-center mb-4"
                  style={{ color: "#e63946" }}
                >
                  Results
                </h5>
                <ul className="list-unstyled text-start">
                  <li className="mb-3 d-flex align-items-start">
                    <i
                      className="bi bi-check-circle-fill me-2"
                      style={{ fontSize: "1.2rem", color: "#e63946" }}
                    ></i>
                    <span>
                      Deep understanding of real-world threats that may
                      compromise systems
                    </span>
                  </li>
                  <li className="mb-3 d-flex align-items-start">
                    <i
                      className="bi bi-check-circle-fill me-2"
                      style={{ fontSize: "1.2rem", color: "#e63946" }}
                    ></i>
                    <span>
                      Complete assessment of readiness across technology,
                      people, and processes
                    </span>
                  </li>
                  <li className="mb-3 d-flex align-items-start">
                    <i
                      className="bi bi-check-circle-fill me-2"
                      style={{ fontSize: "1.2rem", color: "#e63946" }}
                    ></i>
                    <span>
                      Prioritized recommendations for stronger overall security
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*FAQ Section*/}
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
      <Contact />
      <Footer />
    </>
  );
}
