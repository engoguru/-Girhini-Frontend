import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./About.css";

function AboutReviewSection({review}) {
 

  return (
    <section className="review-section py-5">
      <div className="container text-center text-white mb-5">
        <h2 className="fw-bold">
          See words from our <span className="text-warning">wellbeing</span>
        </h2>
      </div>

      <div className="container">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="mySwiper"
        >
          {review.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="review-card p-4 text-start rounded-4">
                {/* Profile */}
                <div className="d-flex align-items-center mb-3">
                  <img
                    src={review?.profileImage?.url}
                    alt={review.name}
                    className="rounded-circle me-3"
                    style={{ width: "60px", height: "60px", objectFit: "cover" }}
                  />
                  <div>
                    <div className="stars text-warning mb-1">
                      {"★".repeat(review.rating)}
                    </div>
                  </div>
                </div>

                {/* Text */}
                <p className="text-light opacity-75">{review.description}</p>

                {/* Footer */}
                <p className="fw-semibold text-warning mt-3">{review.name}-{review.country}-{review.organization}</p>
           
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default AboutReviewSection;
