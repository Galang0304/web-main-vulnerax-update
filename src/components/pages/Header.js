'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Mobile nav toggle
    const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

    function mobileNavToogle() {
      document.body.classList.toggle('mobile-nav-active');
      mobileNavToggleBtn?.classList.toggle('bi-list');
      mobileNavToggleBtn?.classList.toggle('bi-x');
    }

    if (mobileNavToggleBtn) {
      mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
    }

    return () => {
      if (mobileNavToggleBtn) {
        mobileNavToggleBtn.removeEventListener('click', mobileNavToogle);
      }
    };
  }, []);

  useEffect(() => {
    // Dropdown menu toggle
    const dropdownToggles = document.querySelectorAll('.navmenu .toggle-dropdown');

    function handleDropdownToggle(event) {
      event.preventDefault();
      const parent = event.currentTarget.parentNode;
      parent.classList.toggle('active');
      const dropdownMenu = parent.nextElementSibling;
      if (dropdownMenu) {
        dropdownMenu.classList.toggle('dropdown-active');
      }
      event.stopPropagation();
    }

    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', handleDropdownToggle);
    });

    return () => {
      dropdownToggles.forEach(toggle => {
        toggle.removeEventListener('click', handleDropdownToggle);
      });
    };
  }, []);

  return (
    <header id="header" className="header d-flex align-items-center fixed-top">
      <div className="header-container container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
        <Link href="/" className="logo d-flex align-items-center me-auto me-xl-0">
          <img src="/img/logo.png" alt="VulneraX Logo" width="auto" height="auto" />
        </Link>

        <nav id="navmenu" className={`navmenu ${isOpen ? 'open' : ''}`}>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/#about">About</Link></li>
            <li className="dropdown">
              <a href="/#services">
                <span>Services</span> 
                <i className="bi bi-chevron-down toggle-dropdown"></i>
              </a>
              <ul>
                <li><a href="/service/PenetrationTesting">Penetration Testing</a></li>
                <li><a href="/service/ProfessionalRedTeaming">Professional Red Teaming</a></li>
                <li><a href="/service/SystemHardening">System Hardening</a></li>
                <li><a href="/service/VulnerabilityAssessment">Vulnerability Assessment</a></li>
                <li><a href="/service/ThreatHunting&IR">Threat Hunting & IR</a></li>
                <li><a href="/service/RansomwareReadinessAssessment">Ransomware Readiness Assessment</a></li>
              </ul>
            </li>
            <li className="dropdown">
              <a href="/resources">
                <span>Resources</span> 
                <i className="bi bi-chevron-down toggle-dropdown"></i>
              </a>
              <ul>
                <li><a href="/resources">Articles</a></li>
                <li><a href="/resources/vulneralab">VulneraLab</a></li>
              </ul>
            </li>
            <li><Link href="/#our-certification">Certification</Link></li>
          </ul>
          <i className={`mobile-nav-toggle d-xl-none bi ${isOpen ? 'bi-x' : 'bi-list'}`} onClick={toggleNav}></i>
        </nav>

        <Link href="#contact" className="btn-getstarted">Talk to us</Link>
      </div>
    </header>
  );
}
