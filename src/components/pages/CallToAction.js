'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function CallToAction() {
  const ctaSectionStyle = {
    padding: '100px 0',
    position: 'relative',
    color: '#fff',
    textAlign: 'center',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    background: 'url(/img/RansomwareAttackPict.jpg) no-repeat fixed center center / cover',
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1,
  };

  const contentContainerStyle = {
    position: 'relative',
    zIndex: 2,
    maxWidth: '800px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Warna latar belakang transparan
    backdropFilter: 'blur(10px)', 
    padding: '40px',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
  };

  const headingStyle = {
    fontFamily: "'Poppins', sans-serif",
    fontSize: '3rem',
    fontWeight: '700',
    marginBottom: '20px',
    color: '#ffffff',
  };

  const paragraphStyle = {
    fontSize: '1rem',
    lineHeight: '1.6',
    marginBottom: '40px',
  };

  const buttonStyle = {
    padding: '15px 40px',
    borderRadius: '50px',
    background: 'linear-gradient(90deg, #E60040 100%)',
    border: 'none',
    color: '#fff',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    boxShadow: '0 4px 15px rgba(230, 0, 64, 0.4)',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
  };

  return (
    <section id="call-to-action" className="call-to-action section" style={ctaSectionStyle}>
      <div style={overlayStyle}></div>

      <div className="container" data-aos="fade-up" data-aos-delay="100" style={contentContainerStyle}>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 style={headingStyle}>Are you truly prepared for a Ransomware Attack?</h2>
          <p style={paragraphStyle}>Assess your organization's readiness against the most devastating cyber threats with our comprehensive assessment. Don't wait until it's too late.</p>
          <motion.a
            href={'/rra'}
            style={buttonStyle}
            whileHover={{ scale: 1.05, boxShadow: '0 6px 20px rgba(255, 96, 0, 0.6)' }}
            whileTap={{ scale: 0.95 }}
          >
            Ransomware Readiness Assessment
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}