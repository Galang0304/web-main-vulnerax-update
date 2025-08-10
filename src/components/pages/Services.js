'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaShieldVirus, FaFingerprint, FaCogs, FaSearch, FaExclamationTriangle, FaLockOpen, FaArrowRight } from 'react-icons/fa';

export default function Services() {
  const services = [
    {
      title: "Penetration Testing",
      description: "Identify, exploit, and secure vulnerabilities with ethical hacking approaches.",
      icon: FaFingerprint,
      link: "/Services/PenetrationTesting",
    },
    {
      title: "Professional Red Teaming",
      description: "Simulate real-world cyber threats to evaluate and enhance your defense mechanisms.",
      icon: FaShieldVirus,
      link: "/Services/ProfessionalRedTeaming",
    },
    {
      title: "System Hardening",
      description: "Strengthen your IT infrastructure with best practices and optimal configurations.",
      icon: FaCogs,
      link: "/Services/SystemHardening",
    },
    {
      title: "Vulnerability Assessment",
      description: "Identify and mitigate vulnerabilities based on business impact.",
      icon: FaSearch,
      link: "/Services/VulnerabilityAssessment",
    },
    {
      title: "Threat Hunting & Incident Response",
      description: "A comprehensive cybersecurity service that proactively detects hidden threats and swiftly responds to security incidents.",
      icon: FaExclamationTriangle,
      link: "/Services/ThreatHunting&IR",
    },
    {
      title: "Ransomware Readiness Assessment",
      description: "Evaluate and enhance your preparedness against ransomware threats.",
      icon: FaLockOpen,
      link: "/Services/RansomwareReadinessAssessment",
    },
  ];

  const sectionStyle = {
    padding: '80px 0',
    backgroundColor: '#fff',
    fontFamily: "'Inter', sans-serif",
  };

  const containerTitleStyle = {
    textAlign: 'center',
    marginBottom: '50px',
  };
  
  const titleStyle = {
    fontFamily: "'Poppins', sans-serif",
    fontSize: '2.5rem',
    fontWeight: '700',
    marginBottom: '10px',
  };

  const subtitleStyle = {
    fontSize: '1.1rem',
    color: '#6c757d',
    maxWidth: '700px',
    margin: '0 auto',
  };

  const cardStyle = {
    backgroundColor: '#f8f9fa',
    borderRadius: '15px',
    padding: '30px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.3s ease',
  };

  const iconContainerStyle = {
    width: '60px',
    height: '60px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E60040',
    borderRadius: '50%',
    marginBottom: '20px',
  };

  const iconStyle = {
    fontSize: '2rem',
    color: '#fff',
  };

  const cardTitleStyle = {
    fontFamily: "'Poppins', sans-serif",
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#343a40',
  };

  const readMoreStyle = {
    marginTop: 'auto',
    color: '#E60040',
    fontWeight: '600',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
  };

  return (
    <section id="services" className="services section" style={sectionStyle}>
      <div className="container" data-aos="fade-up">
        <div className="container-title" style={containerTitleStyle}>
          <h2 style={titleStyle}>Our Services</h2>
          <p style={subtitleStyle}>
            VulneraX provides a comprehensive suite of professional cybersecurity services designed to protect your assets and build resilience against evolving threats.
          </p>
        </div>
        <div className="row g-4">
          {services.map((service, index) => (
            <div className="col-lg-6" key={index} data-aos="fade-up" data-aos-delay={`${index + 1}00`}>
              <motion.div
                className="service-card d-flex flex-column"
                style={cardStyle}
                whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="icon flex-shrink-0" style={iconContainerStyle}>
                  <service.icon style={iconStyle} />
                </div>
                <div>
                  <h3 style={cardTitleStyle}>{service.title}</h3>
                  <p style={{ color: '#555' }}>{service.description}</p>
                  <Link href={service.link || "/default-service"} className="read-more" style={readMoreStyle}>
                    Read More <FaArrowRight />
                  </Link>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}