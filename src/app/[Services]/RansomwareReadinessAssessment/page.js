import Header from '@/components/pages/Header';
import Footer from '@/components/pages/Footer';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Contact from '@/components/pages/Contact';

export const metadata = {
  title: 'Ransomeware Readiness Assessment - VulneraX',
  description: 'Ransomware Readiness Assessment by VulneraX will evaluates your organization’s preparedness against ransomware threats. Our experts analyze your current security posture, detect vulnerabilities, and assess the resilience of your backup systems. We provide actionable recommendations to strengthen defenses, ensure continuity, and mitigate the risk of ransomware attacks, protecting your critical assets and sensitive data from encryption or extortion.',
  openGraph: {
    title: 'Ransomeware Readiness Assessment - VulneraX',
    description: 'Prepare for potential ransomware attacks with VulneraX Ransomware Readiness Assessment. Evaluate your defenses, detect weaknesses, and implement strategies to mitigate risks and protect your organization from ransomware threats.',
    image: 'https://vulnerax.com/img/logo.png',
    url: 'https://vulnerax.com/service/RansomewareReadinessAssessment',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ransomeware Readiness Assessment - VulneraX',
    description: 'Prepare for potential ransomware attacks with VulneraX Ransomware Readiness Assessment. Evaluate your defenses, detect weaknesses, and implement strategies to mitigate risks and protect your organization from ransomware threats.',
    image: 'https://vulnerax.com/img/logo.png',
  },
};

export default function RansomwareReadinessAssessment() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content="Ransomeware Assessment, Vulnerability, Cyber Security, Cyber Security Service" />
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:image" content={metadata.openGraph.image} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:type" content={metadata.openGraph.type} />          <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:title" content={metadata.twitter.title} />         <meta name="twitter:description" content={metadata.twitter.description} />
        <meta name="twitter:image" content={metadata.twitter.image} />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/favicon.ico" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": metadata.title,
            "description": metadata.description,
            "url": metadata.openGraph.url
          })
        }} />
      </Head>
      <Header />
      <main className="main">
        <section id="hero" className="hero section">

          <div className="container" data-aos="fade-up" data-aos-delay="100">

            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="hero-content" data-aos="fade-up" data-aos-delay="200">
                  <h1 className="mb-4">
                    Ransomware Readiness
                    <span className="accent-text"> Assessment</span>
                  </h1>

                  <p className="mb-4 mb-md-5">
                    Risk Analysis and Expert Recommendations
                    Get a detailed report on risks and actionable recommendations to enhance your security
                  </p>

                  <div className="hero-buttons">
                    <Link href={'/rra'} className='btn btn-primary me-0 me-sm-2 mx-1'>
                      Take the Test <i className="bi bi-arrow-right h5 ms-2"></i>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="hero-image" data-aos="zoom-out" data-aos-delay="300">
                  <Image
                    src="/img/online-test.svg"
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

        <section id="service-details" className="service-details section">
          <div className="container">
            <div className="row gy-5">
              <div className="col-lg-4" data-aos="fade-up" data-aos-delay="100">
                <div className="help-box d-flex flex-column justify-content-center align-items-center">
                  <br/>
                  <br/>
                  <i className="bi bi-headset help-icon"></i>
                  <h4>Have a Question?</h4>
                  <p className="mb-4">Get direct advice and actionable solutions</p>
                  
                  <p className="d-flex align-items-center mt-2 mb-0">
                    <i className="bi bi-telephone me-2"></i>
                    <span>+62 852 4079 1254</span>
                  </p>
                  <p className="d-flex align-items-center mt-1 mb-0">
                    <i className="bi bi-envelope me-2"></i>
                    <a href="mailto:business@vulnerax.com">business@vulnerax.com</a>
                  </p>
                  <a href="#contact">Talk to us</a>
                  <br/>
                  <br/>
                </div>
              </div>
              

              <div className="col-lg-8 ps-lg-5" data-aos="fade-up" data-aos-delay="200">
                <br/>
                <p>
                  In today's digital age, ransomware has become one of the most dangerous cyber threats, which can cripple business operations in seconds. This attack not only threatens your organization's critical data but also your reputation, customer trust, and business continuity.
                </p>
                <p>
                  <b>Our Ransomware Readiness Assessment (RRA)</b> service is designed to help your organization understand its level of preparedness for ransomware threats. With a simple yet impactful approach, we use an interactive quiz to provide initial insight into the strengths and weaknesses of your security system.
                </p>

                <h5><b>Why is it Important to Conduct an RRA?</b></h5>
                <p>
                  Ransomware is indiscriminate—both large and small organizations can be targeted. However, better-prepared organizations have a better chance of protecting their data and minimizing the impact of an attack. Through this service, we help you:
                </p>
                <ul>
                  <li><i className="bi bi-check"></i> <span>Increase Security Awareness: Recognize potential risks you may have missed.</span></li>
                  <li><i className="bi bi-check"></i> <span>Measure Readiness Practically: Provides a realistic picture of your organization's current security position.</span></li>
                  <li><i className="bi bi-check"></i> <span>Get Customized Recommendations: Provides concrete steps to strengthen your defenses.</span></li>
                </ul>
              </div>
              <div className="container" data-aos="fade-up" data-aos-delay="200">
                <br />
                <h5><b>How is the Process?</b></h5>
                <p>
                  Our Ransomware Readiness Assessment follows a systematic methodology to ensure an effective evaluation of your organization's preparedness.
                  Below are the key steps in the process:
                </p>
                <ul>
                  <li><i className="bi bi-check-circle"></i> <span><b>Step 1: </b> </span></li>
                  <p> Click <b>Take the test</b> button at the top of this page</p>
                  <li><i className="bi bi-check-circle"></i> <span><b>Step 2: </b> </span></li>
                  <p>Answer a series of simple questions by selecting one of the three answers that best describes your organization.</p>
                  <li><i className="bi bi-check-circle"></i> <span><b>Step 3:</b></span></li>
                  <p> The final score will provide an overview of your security strengths and gaps in the areas of prevention, detection, response, and recovery.</p>
                  <li><i className="bi bi-check-circle"></i> <span><b>Step 4:</b> </span></li>
                  <p>Based on the results, you will receive step-by-step guidance in the <b>Report document</b> and key recommendations from <b>Score card</b> to strengthen your preparedness against for ransomware.</p>
                </ul>
                <br />

                <h5><b>Start Your Security Journey Now!</b></h5>
                <p>
                  Prevent risks before it's too late. In just a few minutes, our quiz will help you understand your organization's readiness and provide valuable insights for more proactive action.
                </p>

                <h6><b>Recovery and Follow-Up</b></h6>
                <p>
                  We assist in system and data recovery, followed by ensuring that corrective measures have been implemented effectively.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Contact />
      <Footer />
    </>
  );
}