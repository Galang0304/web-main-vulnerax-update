'use client';
import { useState, useRef, useEffect } from "react";
import emailjs from '@emailjs/browser';
import Alert from 'react-bootstrap/Alert';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaShieldAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formStatus, setFormStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const form = useRef();

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("loading");
  
    try {
      const formData = new FormData(e.target);
      const data = {
        name: formData.get("user_name"),
        email: formData.get("user_email"),
        subject: formData.get("subject"),
        message: formData.get("message"),
      };
  
      await emailjs.send(
        'service_x3jvll4',
        'template_tialp7h',
        {
          to_name: "VulneraX Team",
          from_name: data.name,
          reply_to: data.email,
          subject: data.subject,
          message: data.message,
        },
        {
          publicKey: 'N5TNWRJnTLWrud6EE',
        }
      );
  
      setFormStatus("success");
      setAlertVariant("success");
      setAlertMessage("Your message has been sent successfully.");
      setShowAlert(true);
  
    } catch (error) {
      console.error("Error:", error);
      setFormStatus("error");
      setErrorMessage("Failed to send email. Please try again later.");
      setAlertVariant("danger");
      setAlertMessage("Failed to send email. Please try again later.");
      setShowAlert(true);
    }
  };

  // Styles
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

  const infoBoxStyle = {
    backgroundColor: '#f8f9fa',
    borderRadius: '15px',
    padding: '30px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backdropFilter: 'none'
  };

  const infoItemStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '20px',
    marginBottom: '25px',
  };

  const iconBoxStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#E60040',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  };

  const iconStyle = {
    fontSize: '1.5rem',
    color: '#fff',
  };

  const contentTitleStyle = {
    fontFamily: "'Poppins', sans-serif",
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#343a40',
    marginBottom: '5px',
  };

  const contentTextStyle = {
    fontSize: '1rem',
    color: '#555',
    lineHeight: '1.6',
    margin: '0',
  };

  const formContainerStyle = {
    backgroundColor: '#f8f9fa',
    borderRadius: '15px',
    padding: '40px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
  };

  const formHeadingStyle = {
    fontFamily: "'Poppins', sans-serif",
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '10px',
    color: '#343a40',
  };

  const formSubtitleStyle = {
    fontSize: '1rem',
    color: '#6c757d',
    marginBottom: '30px',
  };

  const formControlStyle = {
    border: '1px solid #dee2e6',
    borderRadius: '8px',
    padding: '12px 15px',
    width: '100%',
    fontSize: '1rem',
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
    cursor: 'pointer',
    marginTop: '20px',
  };

  const alertContainerStyle = {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 9999,
    width: '100%',
    maxWidth: '500px',
  };

  const fadeInOutKeyframes = `
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
  `;

  // Inject keyframes into the document head
  if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = fadeInOutKeyframes;
    document.head.appendChild(styleSheet);
  }

  const alertAnimation = showAlert ? 'fadeIn 0.5s, fadeOut 0.5s 2.5s' : 'none';

  return (
    <section id="contact" className="contact section" style={sectionStyle}>
      <div className="container" data-aos="fade-up">
        <div style={titleContainerStyle}>
          <h2 style={mainTitleStyle}>Contact Us</h2>
          <p style={subtitleStyle}>For inquiries or more information, feel free to get in touch with us through the details below.</p>
        </div>
        <div className="row g-4 g-lg-5">
          <div className="col-lg-5">
            <div style={infoBoxStyle} data-aos="fade-up" data-aos-delay="200">
              <h3 style={formHeadingStyle}>Contact Info</h3>
              <div style={infoItemStyle} data-aos="fade-up" data-aos-delay="300">
                <div style={iconBoxStyle}>
                  <FaMapMarkerAlt style={iconStyle} />
                </div>
                <div>
                  <h4 style={contentTitleStyle}>Our Location</h4>
                  <p style={contentTextStyle}>Ruko Newton, Cileungsi, Jawa Barat</p>
                  <p style={contentTextStyle}>Indonesia</p>
                </div>
              </div>
              <div style={infoItemStyle} data-aos="fade-up" data-aos-delay="400">
                <div style={iconBoxStyle}>
                  <FaPhone style={iconStyle} />
                </div>
                <div>
                  <h4 style={contentTitleStyle}>Phone Number</h4>
                  <p style={contentTextStyle}>+62 852 4079 1254</p>
                </div>
              </div>
              <div style={infoItemStyle} data-aos="fade-up" data-aos-delay="500">
                <div style={iconBoxStyle}>
                  <FaEnvelope style={iconStyle} />
                </div>
                <div>
                  <h4 style={contentTitleStyle}>Email Address</h4>
                  <p style={contentTextStyle}>business@vulnerax.com</p>
                </div>
              </div>
              <div style={infoItemStyle} data-aos="fade-up" data-aos-delay="600">
                <div style={iconBoxStyle}>
                  <FaShieldAlt style={iconStyle} />
                </div>
                <div>
                  <h4 style={contentTitleStyle}>Why Choose VulneraX?</h4>
                  <p style={contentTextStyle}>
                    <strong>Your Digital Fortress, Built to Last.</strong> At VulneraX, we combine <strong>proven expertise</strong>, <strong>innovative solutions</strong>, and <strong>actionable insights</strong> to protect your business from evolving cyber threats. From penetration testing to ransomware readiness, our team ensures your systems are unbreakable. <strong>Ready to secure your future?</strong> Let’s create a safer digital ecosystem together.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-7">
            <div style={formContainerStyle} data-aos="fade-up" data-aos-delay="300">
              <h3 style={formHeadingStyle}>Get In Touch</h3>
              <p style={formSubtitleStyle}>We’d love to hear from you! Drop us a message and we’ll respond promptly.</p>
              <form ref={form} onSubmit={handleSubmit} data-aos="fade-up" data-aos-delay="200">
                <div className="row gy-4">
                  <div className="col-md-6">
                    <input type="text" name="user_name" style={formControlStyle} placeholder="Your Name" required />
                  </div>
                  <div className="col-md-6">
                    <input type="email" name="user_email" style={formControlStyle} placeholder="Your Email" required />
                  </div>
                  <div className="col-12">
                    <input type="text" name="subject" style={formControlStyle} placeholder="Subject" required />
                  </div>
                  <div className="col-12">
                    <textarea style={formControlStyle} name="message" rows="6" placeholder="Message" required></textarea>
                  </div>
                  <div className="col-12 text-center">
                    {formStatus === "loading" && <div className="loading">Loading</div>}
                    {formStatus === "error" && <div className="error-message">{errorMessage}</div>}
                    {formStatus === "success" && <div className="sent-message">Your message has been sent. Thank you!</div>}
                    <motion.button 
                      type="submit" 
                      style={buttonStyle} 
                      disabled={formStatus === "loading"}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Send Message
                    </motion.button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {showAlert && (
        <motion.div 
          style={alertContainerStyle}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
            {alertMessage}
          </Alert>
        </motion.div>
      )}
    </section>
  );
}