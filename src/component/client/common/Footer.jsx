import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin,Youtube } from "lucide-react";
function Footer() {
  return (
    <footer className=" text-light pt-5 pb-3" style={{ backgroundColor: "#0b3b2e" }}>
      <div className="container-fluid">
        <div className="row align-items-start">

          {/* Logo and Description */}
          
<div className="col-md-4 mb-4 text-center text-md-start">
  <h4 className="text-warning fw-bold mb-3">
    Girhini Sawyam<span className="text-light"> Swarojgar Sangh</span>
  </h4>

  <p className="small text-secondary mb-2">
    <a
      href="https://www.google.com/maps?q=V.P.O+Malahri,+Teh.+Indora,+Dist.+Kangra,+H.P+176401"
      target="_blank"
      rel="noopener noreferrer"
      className="text-secondary text-decoration-none d-block"
    >
      📍 V.P.O Malahri, Teh. Indora, Dist. Kangra, H.P 176401
    </a>
    <a
      href="mailto:iacashokpathania.hp@gmail.com"
      className="text-secondary text-decoration-none d-block mt-1"
    >
      ✉️ iacashokpathania.hp@gmail.com
    </a>
  </p>

  <div className="d-flex justify-content-center justify-content-md-start gap-3 mt-3">
    <a
      href="https://www.facebook.com/share/v/1FsxeN2uo8/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-warning"
    >
      <Facebook size={22} strokeWidth={1.5} />
    </a>

    {/* <a
      href="https://twitter.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-warning"
    >
      <Twitter size={22} strokeWidth={1.5} />
    </a> */}

    <a
      href="https://www.instagram.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-warning"
    >
      <Instagram size={22} strokeWidth={1.5} />
    </a>
       <a
      href="https://www.youtube.com/@grihinisawyamswarojgarsang6002"
      target="_blank"
      rel="noopener noreferrer"
      className="text-warning"
    >
      <Youtube size={22} strokeWidth={1.5} />
    </a>

  <a
  href="https://www.linkedin.com/posts/grihinisawyamswarojgar-sangh-817113373_%E0%A5%90-%E0%A4%B8%E0%A4%B5%E0%A4%B0%E0%A4%9C%E0%A4%97%E0%A4%B0-%E0%A4%95%E0%A4%B0%E0%A4%A8%E0%A4%A4-%E0%A5%90-%E0%A4%B8%E0%A4%AF%E0%A4%95%E0%A4%A4-%E0%A4%97%E0%A4%B0%E0%A4%AE%E0%A4%A3-activity-7371441873581752320-f3pg?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAAFxjJdMB_2iowxqD2jK_Nvt2t3CXjnu5DsM&utm_campaign=whatsapp"
  target="_blank"
  rel="noopener noreferrer"
  className="text-warning"
>
  <Linkedin size={22} strokeWidth={1.5} />
</a>
  </div>
</div>

          {/* About Us */}
          <div className="col-md-2 mb-4">
            <h6 className="text-uppercase fw-bold mb-3 text-start">About Us</h6>
            <ul className="text-start">
              <li>
                <Link to="/" className="text-secondary text-decoration-none">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-secondary text-decoration-none">
                  About
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-secondary text-decoration-none">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="text-secondary text-decoration-none">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/popular-ngo-program" className="text-secondary text-decoration-none">
                  Events / Programs
                </Link>
              </li>
              <li>
                <Link to="/trending-blog" className="text-secondary text-decoration-none">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/auth-user" className="text-secondary text-decoration-none">
                  Join Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Partners */}
          <div className="col-md-3 mb-4">
            <h6 className="text-uppercase fw-bold mb-3 text-start">Our Partners</h6>
            <ul className=" small text-start">
              <li>
                <Link to="/donate" className="text-secondary text-decoration-none">
                  Donate
                </Link>
              </li>
              <li>
                <Link to="/education" className="text-secondary text-decoration-none">
                  Education
                </Link>
              </li>
              <li>
                <Link to="/save-children" className="text-secondary text-decoration-none">
                  Save Children
                </Link>
              </li>
              <li>
                <Link to="/sustainable-development" className="text-secondary text-decoration-none">
                  Sustainable Development
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-md-3 mb-4">
            <h6 className="text-uppercase fw-bold mb-3 text-start">Services</h6>
            <ul className="text-start">
              <li>
                <Link to="/educate-a-child" className="text-secondary text-decoration-none">
                  Educate a child
                </Link>
              </li>
              <li>
                <Link to="/medical-support" className="text-secondary text-decoration-none">
                  Medical support
                </Link>
              </li>
              <li>
                <Link to="/women-programs" className="text-secondary text-decoration-none">
                  Women programs
                </Link>
              </li>
              <li>
                <Link to="/model-programs" className="text-secondary text-decoration-none">
                  Model programs
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <hr className="border-secondary" />

        {/* Copyright */}
    <div className="text-center small text-secondary">
  © {new Date().getFullYear()} Girhini Swayam Swarojgar Sangh. All Rights Reserved.
</div>

      </div>
    </footer>
  );
}

export default Footer;
