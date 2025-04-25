'use client';

import Link from 'next/link';

export default function Services() {
  const services = [
    {
      title: "Penetration Testing",
      description: "Identify, exploit, and secure vulnerabilities with ethical hacking approaches.",
      icon: "bi-activity",
      link: "/Services/PenetrationTesting",
    },
    {
      title: "Professional Red Teaming",
      description: "Simulate real-world cyber threats to evaluate and enhance your defense mechanisms.",
      icon: "bi-diagram-3",
      link: "/Services/ProfessionalRedTeaming",
    },
    {
      title: "System Hardening",
      description: "Strengthen your IT infrastructure with best practices and optimal configurations.",
      icon: "bi-easel",
      link: "/Services/SystemHardening",
    },
    {
      title: "Vulnerability Assessment",
      description: "Identify and mitigate vulnerabilities based on business impact.",
      icon: "bi-clipboard-data",
      link: "/Services/VulnerabilityAssessment",
    },
    {
      title: "Threat Hunting & Incident Response",
      description: "A comprehensive cybersecurity service that proactively detects hidden threats and swiftly responds to security incidents.",
      icon: "bi-easel",
      link: "/Services/ThreatHunting&IR",
    },
    {
      title: "Ransomware Readiness Assessment",
      description: "Evaluate and enhance your preparedness against ransomware threats.",
      icon: "bi-easel",
      link: "/Services/RansomwareReadinessAssessment",
    },
  ];

  return (
    <section id="services" className="services section light-background">
      <div className="container section-title" data-aos="fade-up">
        <h2>Services</h2>
      </div>
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row g-4">
          {services.map((service, index) => (
            <div className="col-lg-6" key={index} data-aos="fade-up" data-aos-delay={`${index + 1}00`}>
              <div className="service-card d-flex">
                <div className="icon flex-shrink-0">
                  <i className={`bi ${service.icon}`}></i>
                </div>
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <Link href={service.link || "/default-service"} className="read-more">
                    Read More <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}