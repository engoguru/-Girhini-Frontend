import React from "react";
import "./Gallery.css";
import { Link } from "react-router-dom";

function GalleryPic({ gallery }) {

  // console.log(gallery,"gal")
  return (
    <section className="gallery-section">
      {/* Header */}

      <div className="text-center mb-2">
        <h3 className="fw-bolder">
          <span className="text-warning">Gallery:</span>Transforming Lives, Together
        </h3>
        <p className="text-muted fw-semibold">Every photo tells a story of hope, empowerment, and community-driven change.</p>
      </div>
      {/* Gallery Grid */}
      <div className="container py-3">
        <div className="d-flex mb-2">
          <Link to="/gallery" className="ms-auto btn donate-btn px-4 py-2 rounded-pill fw-semibold">
            View More.
          </Link>
        </div>

        <div className="gallery-grid">
          {gallery[0]?.
            galleryImage?.slice(0, 5).map((img, index) => (
              <div className="gallery-item" key={index}>
                <img src={img?.url} alt={`Gallery ${index + 1}`} className="img-fluid rounded-4 shadow-sm" />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default GalleryPic;
