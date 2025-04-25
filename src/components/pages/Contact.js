"use client";
import { useState, useRef, useEffect } from "react"; 
import emailjs from '@emailjs/browser';
import Alert from 'react-bootstrap/Alert'; 

export default function Contact() {
  const [formStatus, setFormStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const form = useRef();

  // Gunakan useEffect untuk menghilangkan alert setelah beberapa detik
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000); // Alert akan hilang setelah 3 detik
      return () => clearTimeout(timer); // Bersihkan timer jika komponen unmount
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
        // cc: formData.get("cc"),
        // bcc: formData.get("bcc"),
        subject: formData.get("subject"),
        message: formData.get("message"),
      };
  
      console.log("Form Data:", data); // Log the form data
  
      await emailjs.send(
        'service_x3jvll4',
        'template_tialp7h',
        {
          to_name: "VulneraX Team",
          from_name: data.name,
          reply_to: data.email,
          // cc: data.cc,
          // bcc: data.bcc,
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

  return (
    <section id="contact" className="contact section light-background">
      <div className="container section-title" data-aos="fade-up">
        <h2>Contact</h2>
        <p>For inquiries or more information, feel free to get in touch with us through the details below.</p>
      </div>
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row g-4 g-lg-5">
          <div className="col-lg-5">
            <div className="info-box" data-aos="fade-up" data-aos-delay="200">
              <h3>Contact Info</h3>
              <div className="info-item" data-aos="fade-up" data-aos-delay="300">
                <div className="icon-box">
                  <i className="bi bi-geo-alt"></i>
                </div>
                <div className="content">
                  <h4>Our Location</h4>
                  <p>Jln. Mon. Emmy Saelan III No. 70, Karunrung, Kec. Rappocini.</p>
                  <p>Makassar City, South Sulawesi</p>
                </div>
              </div>
              <div className="info-item" data-aos="fade-up" data-aos-delay="400">
                <div className="icon-box">
                  <i className="bi bi-telephone"></i>
                </div>
                <div className="content">
                  <h4>Phone Number</h4>
                  <p>+62 852 4079 1254</p>
                </div>
              </div>
              <div className="info-item" data-aos="fade-up" data-aos-delay="500">
                <div className="icon-box">
                  <i className="bi bi-envelope"></i>
                </div>
                <div className="content">
                  <h4>Email Address</h4>
                  <p>business@vulnerax.com</p>
                </div>
              </div>
              <div className="info-item" data-aos="fade-up" data-aos-delay="600">
                <div className="icon-box">
                  <i className="bi bi-shield-lock"></i> {/* Ikon yang relevan */}
                </div>
                <div className="content">
                  <h4>Why Choose VulneraX?</h4>
                  <p>
                    🛡️ <strong>Your Digital Fortress, Built to Last.</strong> At VulneraX, we combine <strong>proven expertise</strong>, 🚀 <strong>innovative solutions</strong>, and 💡 <strong>actionable insights</strong> to protect your business from evolving cyber threats. From penetration testing to ransomware readiness, our team ensures your systems are unbreakable. <strong>Ready to secure your future?</strong> Let’s create a safer digital ecosystem together.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="contact-form" data-aos="fade-up" data-aos-delay="300">
              <h3>Get In Touch</h3>
              <p>We’d love to hear from you! Drop us a message and we’ll respond promptly.</p>
              <form ref={form} onSubmit={handleSubmit} className="php-email-form" data-aos="fade-up" data-aos-delay="200">
                <div className="row gy-4">
                  <div className="col-md-6">
                    <input type="text" name="user_name" className="form-control" placeholder="Your Name" required />
                  </div>
                  <div className="col-md-6">
                    <input type="email" name="user_email" className="form-control" placeholder="Your Email" required />
                  </div>
                  {/* <div className="col-md-6">
                    <input type="email" name="cc" className="form-control" placeholder="CC (optional)" />
                  </div>
                  <div className="col-md-6">
                    <input type="email" name="bcc" className="form-control" placeholder="BCC (optional)" />
                  </div> */}
                  <div className="col-12">
                    <input type="text" name="subject" className="form-control" placeholder="Subject" required />
                  </div>
                  <div className="col-12">
                    <textarea className="form-control" name="message" rows="6" placeholder="Message" required></textarea>
                  </div>
                  <div className="col-12 text-center">
                    {formStatus === "loading" && <div className="loading">Loading</div>}
                    {formStatus === "error" && <div className="error-message">{errorMessage}</div>}
                    {formStatus === "success" && <div className="sent-message">Your message has been sent. Thank you!</div>}
                    <button type="submit" className="btn" disabled={formStatus === "loading"}>
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Alert dengan posisi fixed di top center */}
      {showAlert && (
        <div style={styles.alertContainer}>
          <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
            {alertMessage}
          </Alert>
        </div>
      )}
    </section>
  );
}

// CSS untuk posisi fixed dan animasi
const styles = {
  alertContainer: {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 9999,
    width: '100%',
    maxWidth: '500px',
    animation: 'fadeIn 0.5s, fadeOut 0.5s 2.5s', // Animasi muncul dan menghilang
  },
};

// Tambahkan animasi CSS ke dalam global styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerText = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }
  `;
  document.head.appendChild(styleSheet);
}