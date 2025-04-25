'use client';

export default function About() {
  return (
    <section id="about" className="about section">
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4 align-items-center justify-content-between">
          <div className="col-xl-7" data-aos="fade-up" data-aos-delay="200">
            <span className="about-meta">MORE ABOUT US</span>
            <h2 className="about-title">vulneraX</h2>
            <p className="about-description">VulneraX is a leading startup in Information Technology services, focusing on delivering innovative solutions to enhance security and operational efficiency. We transform risks into strengths with cutting-edge technology, ensuring the safety and sustainability of your business operations.</p>
            <p><b>Why Choose Us?</b></p>
            <div className="row feature-list-wrapper">
              <div className="col-md-6">
                <ul className="feature-list">
                  <li><i className="bi bi-check-circle-fill"></i> Advanced security solutions tailored to your needs.</li>
                  <li><i className="bi bi-check-circle-fill"></i> Trusted by clients across diverse industries.</li>
                  <li><i className="bi bi-check-circle-fill"></i> Innovative approaches for maximum operational efficiency.</li>
                </ul>
              </div>
              <div className="col-md-6">
                <ul className="feature-list">
                  <li><i className="bi bi-check-circle-fill"></i> Secure</li>
                  <li><i className="bi bi-check-circle-fill"></i> Reliable</li>
                  <li><i className="bi bi-check-circle-fill"></i> Responsible</li>
                </ul>
              </div>
            </div>
            <div className="info-wrapper">
              <div className="row gy-4">
                <div className="col-lg-5">
                  <div className="profile d-flex align-items-center gap-3">
                    <img src="/img/hero-image.svg" alt="Profile" className="profile-image" />
                    <div>
                      <h4 className="profile-name">Send us a Massage</h4>
                      <p className="profile-position">business@vulnerax.com</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="contact-info d-flex align-items-center gap-2">
                    <i className="bi bi-telephone-fill"></i>
                    <div>
                      <p className="contact-label">Call us anytime</p>
                      <p className="contact-number">+62 8524 0791 254</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4" data-aos="fade-up" data-aos-delay="300">
            <div className="image-wrapper">
              <div className="images position-relative" data-aos="zoom-out" data-aos-delay="400">
                <img src="/img/red-icon.svg" alt="Business Meeting" className="img-fluid main-image" />
                <img src="/img/logo.png" alt="Team Discussion" className="img-fluid small-image rounded-4" width="auto" />
              </div>
              <div className="experience-badge floating">
                <p><b>Transforming Vulnerabilities <br /> into Strengths</b></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

