import React from "react";
import "./Gallery.css";

function GalleryPic({gallery}) {

// console.log(gallery,"gal")
  return (
    <section className="gallery-section">
      {/* Header */}
      
 <div className="text-center mb-5">
          <h3 className="fw-bolder">
            <span className="text-warning">Gallery:</span>Transforming Lives, Together
          </h3>
          <p className="text-muted fw-semibold">Every photo tells a story of hope, empowerment, and community-driven change.</p>
        </div>
      {/* Gallery Grid */}
      <div className="container py-5">
        <div className="gallery-grid">
          {gallery[0]?.
galleryImage?.map((img, index) => (
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
