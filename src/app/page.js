import Image from "next/image";
import Header from '@/components/pages/Header';
import About from "@/components/pages/about";
import Services from "@/components/pages/Services";
import ThreatsAnimation from '@/components/pages/ThreatsAnimation';
import Features from "@/components/pages/Features";
import Certification from "@/components/pages/Certification";
import CallToAction from "@/components/pages/CallToAction";
import Client from "@/components/pages/Client";
import Contact from "@/components/pages/Contact";
import Footer from "@/components/pages/Footer";

const heroSectionStyle = {
  paddingTop: '100px',
  paddingBottom: '80px',
  backgroundColor: '#f9f9f9',
  fontFamily: "'Inter', sans-serif",
  color: '#333',
};

const companyBadgeStyle = {
  fontWeight: '500',
  color: '#E60040',
  backgroundColor: '#ffe6e6',
  padding: '8px 16px',
  borderRadius: '50px',
  display: 'inline-block',
  fontSize: '0.9em',
};

const accentTextStyle = {
  color: '#E60040',
};

const btnPrimaryGradientStyle = {
  padding: '12px 30px',
  borderRadius: '50px',
  background: 'linear-gradient(90deg, #E60040 100%)',
  border: 'none',
  color: '#fff',
  fontWeight: '600',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  boxShadow: '0 4px 15px rgba(230, 0, 64, 0.4)',
  transition: 'all 0.3s ease',
};

const btnSecondaryLinkStyle = {
  color: '#333',
  fontWeight: '500',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  transition: 'all 0.3s ease',
};

const btnSecondaryIconStyle = {
  color: '#E60040',
  marginRight: '8px',
};


export default function Home() {
  return (
    <main style={{ fontFamily: "'Inter', sans-serif" }}>
      <Header />
      <section id="hero" className="hero section" style={heroSectionStyle}>
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="hero-content" data-aos="fade-up" data-aos-delay="200">
                <div className="company-badge mb-4" style={companyBadgeStyle}>
                  <i className="bi bi-gear-fill me-2"></i>
                  Working for your security
                </div>

                <h1 className="mb-4">
                  Transforming Vulnerabilities into
                  <span className="accent-text" style={accentTextStyle}> Strengths</span>
                </h1>

                <p className="mb-4 mb-md-5">
                  Innovative security solutions to protect and empower your business in the digital era.
                </p>

                <div className="hero-buttons">
                  <a href="#services" className="btn btn-primary btn-gradient me-3" style={btnPrimaryGradientStyle}>
                    Explore Our Services
                  </a>
                  <a href="#contact" className="btn btn-secondary-link" style={btnSecondaryLinkStyle}>
                    <i className="bi bi-cursor-fill me-1" style={btnSecondaryIconStyle}></i>
                    Talk to us
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="hero-image" data-aos="zoom-out" data-aos-delay="300">
                <Image
                  src="/img/hero-image.svg"
                  alt="Hero Image"
                  width={1080}
                  height={826}
                  className="img-fluid"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <About />
      <Services />
      <ThreatsAnimation />
      <Features />
      <CallToAction />
      <Client />
      <Certification />
      <Contact />
      <Footer />
    </main>
  );
}
