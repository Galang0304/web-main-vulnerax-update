'use client';

import React from 'react';
import Image from 'next/image';

export default function Certificate() {
  const certifications = [
    {
      id: 1,
      image: '/img/certificate/CEH_Badge.png',
    },
    {
      id: 2,
      image: '/img/certificate/CHFI.png',
    },
    {
      id: 3,
      image: '/img/certificate/CISA.png',
    },
    {
      id: 4,
      image: '/img/certificate/ComptiaSecurity.png',
    },
    {
      id: 5,
      image: '/img/certificate/ComptiaPentest.png',
    },
    {
      id: 6,
      image: '/img/certificate/Opsecx_MAS.png',
    },
    {
      id: 7,
      image: '/img/certificate/Blockchain.png',
    },
    {
      id: 8,
      image: '/img/certificate/CTIA.png',
    },
    {
      id: 9,
      image: '/img/certificate/PMP.png',
    },
    {
      id: 10,
      image: '/img/certificate/OSCP.png',
    },
  ];

  return (
    <section id="our-certification" className="our-certification section py-5 bg-white text-dark">
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        {/* Judul dan Deskripsi */}
        <div className="section-title text-center mb-5">
          <h2>Our Certifications</h2>
          <p>
            At <strong>VulneraX</strong>, our commitment to excellence is demonstrated through the certifications we hold. Our team is composed of cybersecurity professionals certified in globally recognized standards and frameworks, including CISA, CEH, CHFI, OSCP, ISO 27001, and CompTIA Security+, among others. These credentials reflect our expertise in threat detection, incident response, secure architecture, and compliance, ensuring our solutions meet the highest industry standards.
          </p>
        </div>

        {/* Grid Layout untuk Sertifikasi */}
        <div className="row">
          {certifications.map((cert) => (
            <div key={cert.id} className="col-md-3 col-sm-6 mb-4">
              <div
                className="certification-item text-center p-4 bg-white rounded shadow-sm transition-all"
                style={{
                  backgroundClip: 'padding-box',
                  borderImage: 'linear-gradient(90deg, #DE1A34 0%, #E4334B 100%) 1',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <div className="certification-img mb-4">
                  <Image
                    src={cert.image}
                    alt={`${cert.name} badge`}
                    width={150}
                    height={150}
                    className="object-fit-contain"
                    loading="lazy"
                  />
                </div>
                <h4 className="mb-2 text-dark" style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                  {cert.name}
                </h4>
                <p className="certification-description text-secondary" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                  {cert.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}