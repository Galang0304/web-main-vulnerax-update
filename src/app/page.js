import Image from "next/image";
import Header from '@/components/pages/Header';
import About from "@/components/pages/about";
import Services from "@/components/pages/Services";
import Features from "@/components/pages/Features";
import OurTeam from "@/components/pages/Team";
import CallToAction from "@/components/pages/CallToAction";
import Contact from "@/components/pages/Contact";
import Footer from "@/components/pages/Footer";

export default function Home() {
  return (
    <main>

      <Header />
      <section id="hero" className="hero section">

        <div className="container" data-aos="fade-up" data-aos-delay="100">

          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="hero-content" data-aos="fade-up" data-aos-delay="200">
                <div className="company-badge mb-4">
                  <i className="bi bi-gear-fill me-2"></i>
                  Working for your security
                </div>

                <h1 className="mb-4">
                  Transforming Vulnerabilities into
                  <span className="accent-text"> Strengths</span>
                </h1>

                <p className="mb-4 mb-md-5">
                  Innovative security solutions to protect and empower your business in the digital era.
                </p>

                <div className="hero-buttons">
                  <a href="#services" className="btn btn-primary me-0 me-sm-2 mx-1">Explore Our Services</a>
                  <a href="#contact" className="btn btn-link mt-2 mt-sm-0">
                    <i className="bi bi-cursor-fill me-1"></i>
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
      <Features />
      <CallToAction />
      <OurTeam />
      <Contact />
      <Footer />
    </main>
  );
}
