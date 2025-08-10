'use client';
import { motion } from 'framer-motion';
import { FaLock, FaExclamationTriangle, FaServer, FaUserSecret, FaBug, FaCloud, FaLaptopCode, FaHandshakeSlash, FaMicrochip, FaRobot, FaFingerprint } from 'react-icons/fa';

const threatsWithIcons = [
  { text: 'APT', description: 'Stealthy infiltration', icon: FaUserSecret },
  { text: 'STATE-SPONSORED HACKING', description: 'Nation-backed attacks', icon: FaLaptopCode },
  { text: 'RANSOMWARE ATTACKS', description: 'Data encryption', icon: FaLock },
  { text: 'ZERO-DAY EXPLOITS', description: 'Unknown vulnerabilities', icon: FaBug },
  { text: 'SUPPLY CHAIN ATTACKS', description: 'Third-party compromise', icon: FaHandshakeSlash },
  { text: 'DATA BREACHES', description: 'Confidential exposure', icon: FaServer },
  { text: 'DDoS ATTACKS', description: 'Service disruption', icon: FaExclamationTriangle },
  { text: 'INSIDER THREATS', description: 'Internal malicious actors', icon: FaUserSecret },
  { text: 'PHISHING CAMPAIGNS', description: 'Deceptive communication', icon: FaExclamationTriangle },
  { text: 'CLOUD-BASED ATTACKS', description: 'Compromised cloud infrastructure', icon: FaCloud },
  { text: 'IOT VULNERABILITIES', description: 'Exploiting connected devices', icon: FaMicrochip },
  { text: 'AI/ML POISONING', description: 'Corrupting machine learning models', icon: FaRobot },
  { text: 'BIOMETRIC DATA THEFT', description: 'Compromising unique identifiers', icon: FaFingerprint },
];

const textVariants = {
  animate: {
    x: ['0%', '-100%'],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: 90,
        ease: 'linear',
      },
    },
  },
};

export default function ThreatsAnimation() {
  const containerStyle = {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    padding: '30px 0',
    background: 'linear-gradient(90deg, rgba(240, 240, 240, 1) 0%, rgba(240, 240, 240, 0) 15%, rgba(240, 240, 240, 0) 85%, rgba(240, 240, 240, 1) 100%)',
    position: 'relative',
    borderTop: '1px solid #e9ecef',
    borderBottom: '1px solid #e9ecef',
  };
  
  const motionDivStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    width: `${threatsWithIcons.length * 2 * 210}px`,
    transform: `translateX(10%)`,
  };
  
  const glassItemStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    margin: '0 10px',
    padding: '10px 15px',
    borderRadius: '15px',
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Efek glass box yang lebih transparan
    backdropFilter: 'blur(10px)', // Blur yang lebih kuat
    border: '1px solid rgba(255, 255, 255, 0.6)', // Border lebih solid
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)', // Shadow lebih menonjol
    whiteSpace: 'normal',
    width: '200px',
    flexShrink: 0,
  };

  const textHeadingStyle = {
    fontSize: '0.7rem',
    fontWeight: '500',
    whiteSpace: 'nowrap',
    color: '#343a40',
    textTransform: 'uppercase',
  };

  const textDescriptionStyle = {
    fontSize: '0.6rem',
    fontWeight: '200',
    color: '#6c757d',
    whiteSpace: 'nowrap',
    marginTop: '5px',
  };

  const iconStyle = {
    fontSize: '1.5rem',
    color: '#E60040',
  };

  return (
    <div style={containerStyle}>
      <motion.div
        style={motionDivStyle}
        variants={textVariants}
        animate="animate"
      >
        {threatsWithIcons.map((threat, index) => (
          <div key={index} style={glassItemStyle}>
            <threat.icon style={iconStyle} />
            <div style={{ textAlign: 'center' }}>
              <span style={textHeadingStyle}>{threat.text}</span>
              <p style={textDescriptionStyle}>{threat.description}</p>
            </div>
          </div>
        ))}
        {threatsWithIcons.map((threat, index) => (
          <div key={index + threatsWithIcons.length} style={glassItemStyle}>
            <threat.icon style={iconStyle} />
            <div style={{ textAlign: 'center' }}>
              <span style={textHeadingStyle}>{threat.text}</span>
              <p style={textDescriptionStyle}>{threat.description}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}