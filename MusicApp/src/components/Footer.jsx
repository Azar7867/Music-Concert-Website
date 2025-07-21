import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = ({ companyName, year, links, logo, address, email, phone }) => {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container">
        <div className="row text-center text-md-start align-items-center">
          <div className="col-md-4 mb-3 mb-md-0 d-flex flex-column align-items-center align-items-md-start">
            {logo && (
              <img
                src={logo}
                alt={`${companyName} Logo`}
                style={{ width: '120px', marginBottom: '10px' }}
              />
            )}
            <p className="mb-0 fw-bold">{companyName}</p>
            <small>&copy; {year} All rights reserved</small>
          </div>
          <div className="col-md-4 mb-3 mb-md-0">
            <h6>Contact Us</h6>
            {address && <p className="mb-1">{address}</p>}
            {email && <p className="mb-1">📧 {email}</p>}
            {phone && <p className="mb-0">📞 {phone}</p>}
          </div>
          <div className="col-md-4">
            <h6>Quick Links</h6>
            <ul className="list-unstyled">
              {links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white text-decoration-none"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
