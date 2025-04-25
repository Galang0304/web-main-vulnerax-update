'use client'; 

import React from 'react';
import Image from 'next/image';

export default function Team() {
  const teamMembers = [
    {
      id: 1,
      name: 'Abd Rahman',
      role: 'Chief Executive Officer',
      image: '/img/member/member-1.jpg',
      description: '"Turning Vulnerability into Resilience" One security measure at a time. Total commitment to integrity and innovation, ensuring every solution is built to protect the future of businesses and organizations, today and beyond.',
    },
    {
      id: 2,
      name: 'Rezky Amaliah Rusli',
      role: 'Chief Operating Officer',
      image: '/img/member/member-2.jpg',
      description: '“Bridging the business vision with the right security solution, every step counts” Rezky is the link between your business needs and customized security solutions. With a friendly and solution-driven approach - Ensuring every VulneraX service is aligned with your business goals and priorities.',
    },
    {
      id: 3,
      name: 'Muhammad Syarif',
      role: 'Head of Business',
      image: '/img/member/member-3.jpg',
      description: '“Leanding with vision and practicality" Shaping business strategy to deliver security solutions that are both strong and easy to adopt. As Business Head, Syarif ensures services for tackle today digital challenges while empowering organizations to grow with confidence',
    },
    {
      id: 4,
      name: 'M. Dzikri Alfauzan N',
      role: 'Red Team Consultant',
      image: '/img/member/member-4.jpg',
      description: '“Expert in thinking like an attacker to protect like a defender” Dzikri is the creative brain behind real-life attack simulations designed to test the resilience of your systems. With a sharp and strategic approach - Ensuring every security gap is found before real threats emerge.',
    },
    {
      id: 5,
      name: 'Muh. Fikri Haekal',
      role: 'Security Consultant',
      image: '/img/member/member-5.jpg',
      description: '“Uncovering vulnerabilities before they become threats, one system at a time” Fikri is an expert in testing the limits of your system defenses. With a combination of technical acumen and creativity - Finding invisible gaps and turning them into opportunities to strengthen your security.',
    },
  ];

  return (
    <section id="our-team" className="our-team section py-5 bg-white text-dark">
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        {/* Judul tanpa latar belakang merah */}
        <div className="section-title text-center mb-5">
          <h2>Our Team</h2>
          <p><strong>VulneraX</strong> is made up of highly dedicated cybersecurity experts, innovators and professionals. We are a team of individuals passionate about protecting your digital world, with a wide range of experience, deep expertise, and a commitment to excellence. Each team member brings their own uniqueness and strengths, creating a synergy that allows us to deliver exceptional security solutions for you.</p>
        </div>

        {/* Grid Layout untuk Anggota Tim */}
        <div className="row">
          {teamMembers.map((member) => (
            <div key={member.id} className="col-md-4 col-sm-6 mb-4">
              <div className="team-member text-center p-4 bg-white rounded shadow-sm hover-shadow-lg transition-all">
                <div className="team-member-img mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={150}
                    height={150}
                    className="object-fit-cover rounded-circle border border-4 border-danger"
                  />
                </div>
                <h4 className="mb-2 text-dark">{member.name}</h4>
                <p className="text-danger mb-3">{member.role}</p>
                <p className="team-description text-secondary">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}