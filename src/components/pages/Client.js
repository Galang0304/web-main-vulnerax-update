'use client';

import Image from 'next/image';

// Client logos data (bisa dipindah ke config terpisah jika perlu)
const clients = [
  { src: '/img/clients/Client-1.png', alt: 'PT Lontar Riset Indonesia Logo', name: 'PT Lontar Riset Indonesia' },
  { src: '/img/clients/Client-2.png', alt: 'PT. OCBC Sekuritas Indonesia Logo', name: 'PT. OCBC Sekuritas Indonesia' },
  { src: '/img/clients/Client-3.png', alt: 'PT Dimas Jaya Group Logo', name: 'PT Dimas Jaya Group' },
  { src: '/img/clients/Client-4.png', alt: 'Badan Intelijen Negara Logo', name: 'BIN (Badan Intelijen Negara)' },
  { src: '/img/clients/Client-5.png', alt: 'PT Artifisial Teknologi Global Logo', name: 'PT Artifisial Teknologi Global' }
];

// Inline style diselaraskan dengan pola di Certification.js
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

export default function Client() {
  return (
    <section id="clients" className="clients section" style={sectionStyle} data-aos="fade-up" data-aos-delay="100">
      <div className="container" data-aos="fade-up">
        <div className="section-title text-center mb-5">
          <h2 style={titleStyle}>Our Clients</h2>
          <p style={descriptionStyle}>
            We work with forward-thinking organizations across diverse sectors, including finance, technology, government, healthcare, and critical infrastructure. Our clients range from agile startups to enterprises, all unified by a shared commitment to innovation, security, and sustainable growth. Whether enhancing cybersecurity resilience, accelerating digital transformation, or optimizing operational efficiency, we tailor our solutions to meet the unique challenges and goals of each partner.
          </p>
        </div>

        <div className="row gy-4 align-items-center justify-content-center clients-logos-wrapper">
          {clients.map((c, i) => (
            <div
              key={i}
              className="col-6 col-sm-4 col-md-3 col-lg-2 d-flex justify-content-center client-logo-item"
              data-aos="zoom-in"
              data-aos-delay={150 + i * 50}
            >
              <div className="client-logo-box flex-column">
                <Image
                  src={c.src}
                  alt={c.alt}
                  width={260}
                  height={140}
                  className="img-fluid client-logo-img"
                  sizes="(max-width: 575px) 140px, (max-width: 992px) 200px, 260px"
                  priority={i < 2}
                />
                <p className="client-logo-name text-center mb-0 mt-3">{c.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
