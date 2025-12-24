import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'

// ✅ Updated Vite glob import
const images = Object.values(
  import.meta.glob('../../../assets/c*.jpg', {
    eager: true,
    query: '?url',
    import: 'default',
  })
)

function Certificate() {
  const [selectedImage, setSelectedImage] = useState(null)

  return (
    <>
      <div className="my-4">
        <div className="mb-4">
          <h2 className="fw-bold display-6" style={{ lineHeight: "1.4" }}>
            Certifications That Reflect Our <span className="text-warning">Commitment</span>
          </h2>
          <p>
            Each certification represents our continued efforts to serve communities
            with integrity, compassion, and responsibility.
          </p>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop={true}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`Certificate ${index + 1}`}
                onClick={() => setSelectedImage(img)}
                style={{
                  width: '100%',
                  height: '300px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 🔹 Fullscreen Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <img
            src={selectedImage}
            alt="Full view"
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              objectFit: 'contain',
              borderRadius: '8px',
            }}
          />

          {/* Close button */}
          <span
            onClick={() => setSelectedImage(null)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '30px',
              fontSize: '30px',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            ✕
          </span>
        </div>
      )}
    </>
  )
}

export default Certificate
