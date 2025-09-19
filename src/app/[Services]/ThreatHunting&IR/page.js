'use client';
import Head from 'next/head';
import Header from '@/components/pages/Header';
import Footer from '@/components/pages/Footer';
import Contact from '@/components/pages/Contact';
import {
  FaSearch,
  FaUserSecret,
  FaExclamationTriangle,
  FaFileAlt,
  FaRedo,
  FaShieldAlt,
} from "react-icons/fa";

export default function ThreatHuntingIR() {
  return (
    <>
      <Head>
        <title>Threat Hunting & Incident Response - VulneraX</title>
      </Head>

      <Header />

      {/* HERO */}
      <section
        className="d-flex align-items-center text-light position-relative"
        style={{
          backgroundImage: "url('/threatHunting.jpg')",
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
            Threat Hunting <span style={{ color: "#e63946" }}>& Incident Response</span>
          </h1>
          <p
            className="lead mt-3"
            style={{ color: "#f1faee", maxWidth: "820px", margin: "0 auto" }}
          >
            Respond to <strong style={{ color: "#e63946" }}>security incidents quickly</strong> and 
            prevent future attacks through proactive <strong style={{ color: "#e63946" }}>threat hunting</strong>.
          </p>
        </div>
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
        />
      </section>

      {/* ABOUT */}
      <section className="container my-5">
        <h3 className="fw-bold mb-4 text-center">Threat Hunting & Incident Response</h3>

        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="about-card shadow-sm border-0 rounded-3 h-100 p-5 text-center">
              {/* ICON BESAR DI TENGAH */}
              <div className="about-icon mb-4">
                <FaShieldAlt size={100} />
              </div>
              {/* TEKS */}
              <p className="text-muted lh-lg mb-0" style={{ textAlign: "justify" }}>
                In an increasingly connected world, cyber threats can arise at any time. 
                Our Threat Hunting & Incident Response services are designed to help your 
                organization and business respond to security incidents quickly and effectively. 
                We understand that once an attack has occurred, timing is everything. Therefore, 
                we not only focus on recovery after an incident but also on preventing future 
                incidents by understanding attack patterns and techniques used by perpetrators.
              </p>
            </div>
          </div>
        </div>

        <style jsx>{`
          .about-card {
            background: #fff;
            transition: all 0.3s ease;
          }
          .about-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 10px 28px rgba(0, 0, 0, 0.2);
          }
          .about-icon {
            color: #e63946;
            transition: transform 0.3s ease, color 0.3s ease;
          }
          .about-card:hover .about-icon {
            transform: scale(1.1);
            color: #b71c1c;
          }
        `}</style>
      </section>

      {/* OBJECTIVES */}
      <section className="container my-5">
        <h3 className="fw-bold mb-4 text-center">
          Main Objectives of Threat Hunting & Incident Response
        </h3>

        <div className="d-flex flex-column gap-3">
          {[
            {
              icon: <FaSearch size={30} style={{ color: "#e63946" }} />,
              title: "Threat Identification",
              text: "Identify and address threats that may not be detected by traditional security systems."
            },
            {
              icon: <FaExclamationTriangle size={30} style={{ color: "#e63946" }} />,
              title: "Impact Minimization",
              text: "Minimize the impact of security incidents on your business."
            },
            {
              icon: <FaShieldAlt size={30} style={{ color: "#e63946" }} />,
              title: "Strategic Recommendations",
              text: "Provide strategic recommendations for security improvements and enhancements."
            },
            {
              icon: <FaUserSecret size={30} style={{ color: "#e63946" }} />,
              title: "Future Readiness",
              text: "Build a comprehensive incident response plan for future readiness."
            }
          ].map((item, i) => (
            <div
              key={i}
              className="d-flex align-items-start bg-white shadow-sm rounded-3 p-3 objective-item"
            >
              <div className="me-3">{item.icon}</div>
              <div>
                <h6 className="fw-bold mb-1">{item.title}</h6>
                <p className="text-muted small mb-0">{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        <style jsx>{`
          .objective-item {
            transition: all 0.3s ease;
            border: 1px solid #f1f1f1;
          }
          .objective-item:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
          }
        `}</style>
      </section>

      {/* METHODOLOGY */}
      <section className="container my-5">
        <h3 className="fw-bold mb-4 text-center">Our Methodology</h3>

        <div className="row g-4">
          {[
            { icon: <FaSearch size={40} />, title: "Detection and Analysis", text: "Using advanced analytical techniques, we detect suspicious activities and identify potential threats within your system." },
            { icon: <FaUserSecret size={40} />, title: "Incident Investigation", text: "Once an incident is detected, we conduct an in-depth investigation to uncover root causes, attack patterns, and the impact on your business." },
            { icon: <FaExclamationTriangle size={40} />, title: "Impact Assessment", text: "We evaluate the business impact of the incident to plan appropriate recovery actions." },
            { icon: <FaFileAlt size={40} />, title: "Reporting and Recommendations", text: "We deliver detailed reports including executive summaries, technical findings, and strategic recommendations." },
            { icon: <FaRedo size={40} />, title: "Recovery and Follow-Up", text: "We assist in system and data recovery, followed by ensuring corrective measures have been implemented effectively." },
            { icon: <FaShieldAlt size={40} />, title: "Future Readiness", text: "We develop a comprehensive incident response plan, including training and simulations to improve readiness." },
          ].map((step, i) => (
            <div className="col-md-6 col-lg-4" key={i}>
              <div className="method-card shadow-sm p-4 text-center h-100">
                <div className="method-icon mb-3">{step.icon}</div>
                <h6 className="fw-bold">{step.title}</h6>
                <p className="text-muted small">{step.text}</p>
              </div>
            </div>
          ))}
        </div>

        <style jsx>{`
          .method-card {
            background: #fff;
            border-radius: 12px;
            transition: all 0.3s ease;
          }
          .method-card:hover {
            transform: translateY(-6px) scale(1.02);
            box-shadow: 0 10px 28px rgba(230, 57, 70, 0.25);
          }
          .method-icon {
            color: #e63946;
            font-size: 32px;
            transition: transform 0.3s ease, color 0.3s ease;
          }
          .method-card:hover .method-icon {
            transform: scale(1.15);
            color: #b71c1c;
          }
        `}</style>
      </section>

      <Contact />
      <Footer />
    </>
  );
}
