'use client';
import { useState } from "react";
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShieldAlt, FaHandshake, FaUserShield } from 'react-icons/fa';

export default function Features() {
  const [activeTab, setActiveTab] = useState('secure');

  const featuresData = {
    secure: {
      title: "Secure",
      icon: FaShieldAlt,
      text: "We prioritize your safety by implementing advanced security measures to protect your data and systems. With cutting-edge technologies and constant monitoring, we ensure your information is safeguarded from potential threats, providing you peace of mind in every interaction.",
      image: "/img/shield_8877473.png",
    },
    reliable: {
      title: "Reliable",
      icon: FaHandshake,
      text: "Count on us to deliver consistent and dependable solutions tailored to your needs. From robust performance to timely support, we strive to maintain the highest standards of reliability, ensuring you can focus on what matters most.",
      image: "/img/chat_5253804.png",
    },
    responsible: {
      title: "Responsible",
      icon: FaUserShield,
      text: "Our commitment goes beyond providing services—we uphold ethical practices and sustainable approaches in every aspect of our work. By being socially and environmentally conscious, we ensure our solutions benefit not just you, but also the broader community and future generations.",
      image: "/img/hand_11146125.png",
    },
  };

  const sectionStyle = {
    padding: '80px 0',
    backgroundColor: '#fff',
    fontFamily: "'Inter', sans-serif",
  };

  const titleContainerStyle = {
    textAlign: 'center',
    marginBottom: '50px',
  };

  const mainTitleStyle = {
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

  const navItemStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px 30px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  };

  const activeNavItemStyle = {
    color: '#E60040',
    borderBottom: '3px solid #E60040',
  };

  const navIconStyle = {
    fontSize: '1.2rem',
    marginRight: '10px',
  };

  const navTextStyle = {
    fontSize: '1.2rem',
    fontWeight: '600',
  };

  const contentVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.5 } },
  };

  const imageWrapperStyle = {
    position: 'relative',
    width: '200px',
    height: '200px',
    margin: '0 auto',
  };

  const imageStyle = {
    objectFit: 'contain',
  };

  const contentTitleStyle = {
    fontFamily: "'Poppins', sans-serif",
    fontSize: '2rem',
    fontWeight: '700',
    color: '#343a40',
    marginBottom: '15px',
  };

  const contentTextStyle = {
    fontSize: '1.1rem',
    lineHeight: '1.8',
    color: '#555',
    marginBottom: '20px',
  };

  return (
    <section id="features" className="features section" style={sectionStyle}>
      <div className="container" data-aos="fade-up">
        <div style={titleContainerStyle}>
          <h2 style={mainTitleStyle}>Features</h2>
          <p style={subtitleStyle}>Vulnerax prioritize your safety, trust, and long-term success through our dedicated approach. Learn more about our core principles.</p>
        </div>

        <div className="d-flex justify-content-center">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
            <div className="d-flex justify-content-center" style={{ marginBottom: '40px' }}>
              {Object.keys(featuresData).map((key) => {
                const feature = featuresData[key];
                const isActive = activeTab === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    style={{ ...navItemStyle, ...(isActive ? activeNavItemStyle : {}) }}
                  >
                    <feature.icon style={{ ...navIconStyle, color: isActive ? '#E60040' : '#ccc' }} />
                    <span style={{ ...navTextStyle, color: isActive ? '#E60040' : '#888' }}>{feature.title}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="row align-items-center justify-content-between">
              <div className="col-lg-6 order-2 order-lg-1 mt-3 mt-lg-0 d-flex flex-column justify-content-center">
                <h3 style={contentTitleStyle}>{featuresData[activeTab].title}</h3>
                <p style={contentTextStyle}>{featuresData[activeTab].text}</p>
              </div>
              <div className="col-lg-6 order-1 order-lg-2 text-center">
                <div style={imageWrapperStyle}>
                  <Image src={featuresData[activeTab].image} alt={`${featuresData[activeTab].title} Icon`} fill style={imageStyle} />
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}