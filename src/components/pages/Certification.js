'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Certificate() {
  const certifications = [
    {
      id: 1,
      image: '/img/certificate/CEH_Badge.png',
      name: 'CEH',
      description: 'Certified Ethical Hacker. Expertise in penetration testing and ethical hacking techniques.',
    },
    {
      id: 2,
      image: '/img/certificate/CHFI.png',
      name: 'CHFI',
      description: 'Computer Hacking Forensic Investigator. Skills in digital forensics and incident response.',
    },
    {
      id: 3,
      image: '/img/certificate/CISA.png',
      name: 'CISA',
      description: 'Certified Information Systems Auditor. Proficiency in information systems auditing and control.',
    },
    {
      id: 4,
      image: '/img/certificate/ComptiaSecurity.png',
      name: 'CompTIA Security+',
      description: 'Foundational knowledge in core security functions and hands-on skills.',
    },
    {
      id: 5,
      image: '/img/certificate/ComptiaPentest.png',
      name: 'CompTIA PenTest+',
      description: 'Intermediate-level skills in penetration testing and vulnerability management.',
    },
    {
      id: 6,
      image: '/img/certificate/Opsecx_MAS.png',
      name: 'OPSECX MAS',
      description: 'Expertise in mobile application security and advanced mobile threats.',
    },
    {
      id: 7,
      image: '/img/certificate/Blockchain.png',
      name: 'Blockchain Security',
      description: 'Specialized knowledge in securing blockchain technology and decentralized systems.',
    },
    {
      id: 8,
      image: '/img/certificate/CTIA.png',
      name: 'CTIA',
      description: 'Certified Threat Intelligence Analyst. Skills in threat intelligence and analysis.',
    },
    {
      id: 9,
      image: '/img/certificate/PMP.png',
      name: 'PMP',
      description: 'Project Management Professional. Expertise in leading and managing projects.',
    },
    {
      id: 10,
      image: '/img/certificate/OSCP.png',
      name: 'OSCP',
      description: 'Offensive Security Certified Professional. Hands-on penetration testing skills.',
    },
  ];

  const sectionStyle = {
    padding: '80px 0',
    backgroundColor: '#f8f9fa',
    fontFamily: "'Inter', sans-serif",
  };

  const titleStyle = {
    fontFamily: "'Poppins', sans-serif",
    fontSize: '2.5rem',
    fontWeight: '700',
    marginBottom: '10px',
  };

  const descriptionStyle = {
    fontSize: '1.1rem',
    color: '#6c757d',
    maxWidth: '800px',
    margin: '0 auto',
    lineHeight: '1.8',
  };
  
  const certificationCardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '15px',
    padding: '20px',
    border: '1px solid #e9ecef',
    transition: 'all 0.3s ease',
  };

  return (
    <section id="our-certification" className="our-certification section" style={sectionStyle}>
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="section-title text-center mb-5">
          <h2 style={titleStyle}>Our Certifications</h2>
          <p style={descriptionStyle}>
            At <strong>VulneraX</strong>, our commitment to excellence is demonstrated through the certifications we hold. Our team is composed of cybersecurity professionals certified in globally recognized standards and frameworks, including CISA, CEH, CHFI, OSCP, ISO 27001, and CompTIA Security+, among others. These credentials reflect our expertise in threat detection, incident response, secure architecture, and compliance, ensuring our solutions meet the highest industry standards.
          </p>
        </div>

        <div className="row justify-content-center">
          {certifications.map((cert) => (
            <div key={cert.id} className="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
              <motion.div
                className="certification-item text-center"
                style={certificationCardStyle}
                whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="certification-img mb-3">
                  <Image
                    src={cert.image}
                    alt={`${cert.name} badge`}
                    width={120}
                    height={120}
                    className="object-fit-contain"
                    style={{ width: '100%', height: 'auto' }}
                  />
                </div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: '600', color: '#333' }}>
                  {cert.name}
                </h4>
                <p style={{ fontSize: '0.75rem', lineHeight: '1.4', color: '#6c757d' }}>
                  {cert.description}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}