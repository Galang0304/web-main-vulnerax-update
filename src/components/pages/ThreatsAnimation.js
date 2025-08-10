'use client';
import { motion } from 'framer-motion';
import { FaLock, FaExclamationTriangle, FaServer, FaUserSecret, FaBug, FaCloud, FaLaptopCode, FaHandshakeSlash, FaMicrochip, FaRobot, FaFingerprint } from 'react-icons/fa';

// Array baru yang menggabungkan teks ancaman dan ikon yang relevan, dengan deskripsi singkat
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
    x: ['-100%', '100%'],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: 100, // Durasi lebih panjang karena item lebih banyak
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
    background: 'url(/img/RansomwareAttackPict.jpg) no-repeat fixed center center / cover',
    position: 'relative',
    borderTop: '1px solid #ff4d4d',
    borderBottom: '1px solid #ff4d4d',
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

  const motionDivStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
    zIndex: 2,
  };
  
  const glassItemStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    margin: '0 10px',
    padding: '15px 15px',
    borderRadius: '15px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    whiteSpace: 'normal',
    width: '200px',
    flexShrink: 0,
  };

  const textHeadingStyle = {
    fontSize: '0.7rem',
    fontWeight: '500',
    whiteSpace: 'nowrap',
    color: '#fff',
    textTransform: 'uppercase',
  };

  const textDescriptionStyle = {
    fontSize: '0.6rem',
    fontWeight: '200',
    color: 'rgba(255, 255, 255, 0.7)',
    whiteSpace: 'nowrap',
    marginTop: '5px',
  };

  const iconStyle = {
    fontSize: '1.5rem',
    color: '#fff',
  };

  return (
    <div style={containerStyle}>
      <div style={overlayStyle}></div>
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