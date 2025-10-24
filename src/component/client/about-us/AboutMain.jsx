import React from "react";
import "./About.css";
import { Link, useLocation } from "react-router-dom";

function AboutMain({ aboutMain }) {
  const location = useLocation();

  return (
    <section className="about-section py-4">
      <div className="container">
        <div className="row ">
          
          {/* ===== Left Content ===== */}
          <div className="col-md-6 mb-2 mb-md-0">
            <h2 className="fw-bold mb-3 text-dark">
              About <span className="text-success">Us</span>
            </h2>

            {/* Inject rich text (HTML) safely */}
            <div
              className="text-muted mb-4"
              dangerouslySetInnerHTML={{
                __html:
                  aboutMain?.AboutContent?.content ||
                  "No content available.",
              }}
            ></div>

            {/* Show 'More About-us' only if not already on /about */}
            {location?.pathname !== "/about" && (
              <Link
                to="/about"
                className="btn btn-success px-4 py-2 rounded-pill fw-semibold mt-3"
              >
                More About Us
              </Link>
            )}
          </div>

          {/* ===== Right Image ===== */}
          <div className="col-md-6 text-center">
            <img
              src={aboutMain?.aboutImage?.url || "/placeholder.jpg"}
              alt="About us"
              className="img-fluid rounded-4 shadow about-image"
            />
          </div>

        </div>
      </div>
    </section>
  );
}

export default AboutMain;
