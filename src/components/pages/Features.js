"use client";
import { useState } from "react";
import { Nav, Tab } from 'react-bootstrap';
import Image from 'next/image';

export default function Features() {
  const [activeTab, setActiveTab] = useState('secure'); // State untuk mengelola tab aktif

  return (
    <section id="features" className="features section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Features</h2>
        <p>We prioritize your safety, trust, and long-term success through our dedicated approach.</p>
      </div>

      <div className="container">
        <div className="d-flex justify-content-center">
          <Nav variant="tabs" defaultActiveKey="secure" onSelect={(key) => setActiveTab(key)}>
            <Nav.Item>
              <Nav.Link eventKey="secure" className="features">
                <h4>Secure</h4></Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="reliable">
                <h4>Reliable</h4></Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="responsible">
                <h4>Responsible</h4></Nav.Link>
            </Nav.Item>
          </Nav>
        </div>

        <Tab.Content>
          <Tab.Pane eventKey="secure" active={activeTab === 'secure'}>
            <div className="row">
              <div className="col-lg-6 order-2 order-lg-1 mt-3 mt-lg-0 d-flex flex-column justify-content-center">
                <h3>Secure</h3>
                <p className="fst-italic">
                  We prioritize your safety by implementing advanced security measures to protect your data and systems. With cutting-edge technologies and constant monitoring, we ensure your information is safeguarded from potential threats, providing you peace of mind in every interaction.
                </p>
              </div>
              <div className="col-lg-6 order-1 order-lg-2 text-center">
                <Image src="/img/shield_8877473.png" alt="Shield Icon" width={400} height={300} className="img-fluid" style={{ width: '45%', height: 'auto' }} />
              </div>
            </div>
          </Tab.Pane>

          <Tab.Pane eventKey="reliable" active={activeTab === 'reliable'}>
            <div className="row">
              <div className="col-lg-6 order-2 order-lg-1 mt-3 mt-lg-0 d-flex flex-column justify-content-center">
                <h3>Reliable</h3>
                <p className="fst-italic">
                  Count on us to deliver consistent and dependable solutions tailored to your needs. From robust performance to timely support, we strive to maintain the highest standards of reliability, ensuring you can focus on what matters most.
                </p>
              </div>
              <div className="col-lg-6 order-1 order-lg-2 text-center">
                <Image src="/img/chat_5253804.png" alt="Chat Icon" width={400} height={300} className="img-fluid" style={{ width: '45%', height: 'auto' }} />
              </div>
            </div>
          </Tab.Pane>

          <Tab.Pane eventKey="responsible" active={activeTab === 'responsible'}>
            <div className="row">
              <div className="col-lg-6 order-2 order-lg-1 mt-3 mt-lg-0 d-flex flex-column justify-content-center">
                <h3>Responsible</h3>
                <p className="fst-italic">
                  Our commitment goes beyond providing services—we uphold ethical practices and sustainable approaches in every aspect of our work. By being socially and environmentally conscious, we ensure our solutions benefit not just you, but also the broader community and future generations.
                </p>
              </div>
              <div className="col-lg-6 order-1 order-lg-2 text-center">
                <Image src="/img/hand_11146125.png" alt="Hand Icon" width={400} height={300} className="img-fluid" style={{ width: '45%', height: 'auto' }} />
              </div>
            </div>
          </Tab.Pane>
        </Tab.Content>
      </div>
    </section>
  );
}