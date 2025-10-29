'use client';

import Image from 'next/image';

const clients = [
  { src: '/img/clients/Client-1.png' },
  { src: '/img/clients/Client-2.png' },
  { src: '/img/clients/Client-3.png' },
  { src: '/img/clients/Client-4.png' },
  { src: '/img/clients/Client-5.png' }
];

const sectionStyle = {
  padding: '60px 0',
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

const cardStyle = {
  minHeight: '180px',
  height: '180px',
  padding: '20px',
  borderRadius: '12px',
  backgroundColor: '#fff',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
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
              <div style={cardStyle}>
                <Image
                  src={c.src}
                  alt={`Client ${i + 1}`}
                  width={140}
                  height={80}
                  style={{
                    objectFit: 'contain',
                    display: 'block',
                  }}
                  priority={i < 2}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}