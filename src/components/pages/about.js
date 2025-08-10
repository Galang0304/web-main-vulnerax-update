'use client';
import Image from "next/image";
import { FaShieldAlt, FaCheckCircle, FaPhoneAlt, FaEnvelope, FaUsers, FaChartLine, FaTrophy, FaHandshake } from "react-icons/fa";

export default function About() {
  const aboutSectionStyle = {
    padding: '80px 0',
    background: '#f8f9fa',
  };

  const aboutMetaStyle = {
    fontWeight: '600',
    color: '#E60040',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontSize: '0.9em',
  };

  const aboutTitleStyle = {
    fontFamily: "'Poppins', sans-serif",
    fontSize: '2.5rem',
    fontWeight: '700',
    marginTop: '10px',
  };

  const aboutDescriptionStyle = {
    lineHeight: '1.8',
    color: '#555',
  };

  const featureListStyle = {
    listStyleType: 'none',
    paddingLeft: '0',
    marginTop: '20px',
  };

  const featureListItemStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    marginBottom: '15px',
    color: '#333',
  };
  
  // Gaya ikon yang seragam untuk semua ikon
  const sharedIconStyle = {
    color: '#E60040',
    fontSize: '1.2em', // Ukuran ikon standar
    marginTop: '4px',
  };

  const glassBoxStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.08)',
  };

  const infoWrapperStyle = {
    marginTop: '40px',
    padding: '25px',
    borderRadius: '15px',
    background: '#E60040',
    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.2)',
    color: '#fff',
  };

  const contactInfoStyle = {
    padding: '25px',
    borderRadius: '15px',
    ...glassBoxStyle,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  };

  const contactIconStyle = {
    color: '#fff',
    fontSize: '1.5em', // Ukuran ikon kontak tetap lebih besar untuk menonjol
  };

  const imageWrapperStyle = {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  };

  const mainImageStyle = {
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  };

  const floatingBadgeStyle = {
    position: 'absolute',
    bottom: '-20px',
    left: '50%',
    transform: 'translateX(-50%)',
    ...glassBoxStyle,
    padding: '15px 25px',
    borderRadius: '10px',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  };

  const floatingSecondaryBadgeStyle = {
    position: 'absolute',
    top: '20%',
    left: '-20px',
    ...glassBoxStyle,
    padding: '10px 15px',
    borderRadius: '10px',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  return (
    <section id="about" className="about section" style={aboutSectionStyle}>
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4 align-items-center justify-content-between">
          <div className="col-xl-7" data-aos="fade-up" data-aos-delay="200">
            <span style={aboutMetaStyle}>MORE ABOUT US</span>
            <h2 className="about-title" style={aboutTitleStyle}>vulneraX</h2>
            <p className="about-description" style={aboutDescriptionStyle}>VulneraX is a leading startup in Information Technology services, focusing on delivering innovative solutions to enhance security and operational efficiency. We transform risks into strengths with cutting-edge technology, ensuring the safety and sustainability of your business operations.</p>
            <p style={{ marginTop: '20px' }}><b>Why Choose Us?</b></p>
            <div className="row feature-list-wrapper">
              <div className="col-md-6">
                <ul className="feature-list" style={featureListStyle}>
                  <li style={featureListItemStyle}><FaCheckCircle style={sharedIconStyle} /> Advanced security solutions tailored to your needs.</li>
                  <li style={featureListItemStyle}><FaCheckCircle style={sharedIconStyle} /> Trusted by clients across diverse industries.</li>
                  <li style={featureListItemStyle}><FaCheckCircle style={sharedIconStyle} /> Innovative approaches for maximum operational efficiency.</li>
                </ul>
              </div>
              <div className="col-md-6">
                <ul className="feature-list" style={featureListStyle}>
                  <li style={featureListItemStyle}><FaTrophy style={sharedIconStyle} /> Secure</li>
                  <li style={featureListItemStyle}><FaHandshake style={sharedIconStyle} /> Reliable</li>
                  <li style={featureListItemStyle}><FaShieldAlt style={sharedIconStyle} /> Responsible</li>
                </ul>
              </div>
            </div>
            <div className="info-wrapper" style={infoWrapperStyle}>
              <div className="row gy-4">
                <div className="col-lg-5">
                  <div className="profile d-flex align-items-center gap-3">
                    <FaEnvelope style={contactIconStyle} />
                    <div>
                      <h4 className="profile-name" style={{ margin: 0, fontSize: '1.2rem', fontWeight: '600', color: '#fff' }}>Send us a Message</h4>
                      <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.7)' }}>
                          <span style={{ display: 'block', fontWeight: 'bold' }}>business@vulnerax.com</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="contact-info d-flex align-items-center gap-2" style={contactInfoStyle}>
                    <FaPhoneAlt style={contactIconStyle} />
                    <div>
                      <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.7)' }}>Call us anytime</p>
                      <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: '600', color: '#fff' }}>+62 8524 0791 254</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4" data-aos="fade-up" data-aos-delay="300">
            <div className="image-wrapper" style={imageWrapperStyle}>
              <div className="images position-relative" data-aos="zoom-out" data-aos-delay="400">
                <img src="/img/red-icon.svg" alt="Business Meeting" className="img-fluid main-image" style={mainImageStyle} />
              </div>
              <div className="experience-badge floating" style={floatingBadgeStyle}>
                <FaUsers style={{ fontSize: '1.5em', color: '#E60040' }} />
                <div>
                  <p style={{ margin: '0', fontSize: '1.2em', color: '#000000ff', fontWeight: 'bold' }}>50+</p>
                  <p style={{ margin: '0', fontSize: '0.9em', color: '#555' }}>Happy Clients</p>
                </div>
              </div>
              <div className="floating-secondary-badge" style={floatingSecondaryBadgeStyle}>
                <FaChartLine style={{ fontSize: '1.5em', color: '#E60040' }} />
                <div>
                  <p style={{ margin: '0', fontSize: '1.2em', fontWeight: 'bold' }}>5+</p>
                  <p style={{ margin: '0', fontSize: '0.9em', color: '#555' }}>Years of Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}