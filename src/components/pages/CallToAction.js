'use client'; 

export default function CallToAction() {
    return (
      <section id="call-to-action" className="call-to-action section">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row content justify-content-center align-items-center position-relative">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="display-4 mb-4">Have questions?</h2>
              <p className="mb-4">Get direct advice and actionable solutions from our team.</p>
              <a href="#contact" className="btn btn-cta">Talk to Us</a>
            </div>
          </div>
        </div>
      </section>
    );
  }