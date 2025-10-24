import React, { useEffect } from 'react';
import Navbar from "../../component/client/common/Navbar";
import AboutMain from "../../component/client/about-us/AboutMain";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./AboutPage.css";
import Footer from "../../component/client/common/Footer";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllAbout } from '../../store/slice/aboutSlice';
import { Link } from 'react-router-dom';

function AboutPage() {
  const dispatch = useDispatch();
  const { aboutAll, loading, error } = useSelector((state) => state.about);

  useEffect(() => {
    dispatch(fetchAllAbout());
  }, [dispatch]);

  // Handle if API returns an array of about entries
  const aboutData = Array.isArray(aboutAll) && aboutAll.length > 0 ? aboutAll[0] : aboutAll || {};



  // Extract volunteer images
  const volunteerList = aboutData?.volunteerImage || [];

  const helpedCards = [
    {
      icon: "❤️",
      title: "Helping humanity",
      text: "Through education, healthcare, sustainable development, and emergency relief, we make a positive impact. Join us now.",
    },
    {
      icon: "🌿",
      title: "Love your ecosystem",
      text: "Through awareness, people join our mission to inspire love and care for our environment to keep balance intact.",
    },
    {
      icon: "🤝",
      title: "Empowering communities",
      text: "Through strategic partnerships and dedicated volunteers, we respond to emergencies, offering shelter and food.",
    },
  ];

  if (loading) return <div className="text-center text-white py-5">Loading...</div>;
  if (error) return <div className="text-center text-danger py-5">{error}</div>;
  // Extract stats safely
  const statsData = aboutData?.achived || {};
  console.log(statsData)
  const stats = [
    { title: `$${statsData.totalRaised || 0}`, subtitle: "Raised Donations" },
    { title: `${statsData.savings || 0}K`, subtitle: "Saving Ones" },
    { title: `${statsData.communityReached || 0}M+`, subtitle: "Community" },
    { title: `${statsData.targetAchived || 0}K+`, subtitle: "Target Achieved" },
  ];
  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section
        className="hero-section position-relative"
        style={{
          backgroundColor: "#0b3b2e",
          borderBottomLeftRadius: "80px",
          borderBottomRightRadius: "80px",
          paddingBottom: "50px",
          overflow: "hidden",
        }}
      >
        <div className="navbar-wrapper">
          <Navbar />
        </div>

        <div className="container text-center text-white mt-3 pt-5 hero-content">
          <h3 className="fw-bolder display-6" style={{ lineHeight: "1.1" }}>
            Committed to Empowering Communities <br />
            <span className="text-warning">and <br />Transforming Lives</span>
          </h3>
          <p
            className="mt-3 text-light opacity-75 mx-auto fw-semibold"
            style={{ maxWidth: "700px" }}
          >
            Girhini Swayam Swarojgar Sangh, Kangra, Himachal Pradesh, works to promote self-reliance, education, and community development. We bring people together to create positive change and a brighter future.
          </p>
          <Link to={"/contact-us"} className="btn btn-warning text-dark fw-semibold mt-3 px-4 py-2 rounded-pill">
            EXPLORE MORE
          </Link>
        </div>
      </section>

      {/* ===== ABOUT MAIN SECTION ===== */}
      <AboutMain aboutMain={aboutData} />

      {/* ===== STATS SECTION ===== */}
      <div className="stats-section py-5 text-center text-white" style={{ backgroundColor: "#0b3b2e" }}>
        <div className="container">
          <div className="row justify-content-center">
            {stats.map((item, i) => (<div className="col-6 col-md-3 mb-4 mb-md-0" key={i}>
              <h3 className="fw-bold display-6">{item.title}</h3>
              <p className="text-uppercase small opacity-75">{item.subtitle}</p>
            </div>))}
          </div>
        </div>
      </div>




      {/* ===== HELPED TILL NOW SECTION ===== */}
      <div className="helped-section py-5 text-center">
        <div className="container">
          <h3 className="fw-bold mb-5">Helped till now</h3>
          <div className="row justify-content-center g-4">
            {helpedCards.map((card, i) => (
              <div className="col-md-4" key={i}>
                <div className="help-card p-4 shadow-sm rounded-4 bg-white h-100">
                  <div className="fs-1 mb-3">{card.icon}</div>
                  <h5 className="fw-semibold mb-2">{card.title}</h5>
                  <p className="text-muted small">{card.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== VIDEO SECTION ===== */}
      {aboutData?.aboutVideo?.url && (
        <div
          className="video-wrapper-about my-5"
          style={{
            margin: "0 auto",
            maxWidth: "800px",
          }}
        >
          <div className="video-container mx-auto shadow rounded-4 overflow-hidden">
            <video
              src={aboutData.aboutVideo.url}
              controls
              poster="https://m.media-amazon.com/images/I/81EhZofH2RL._UF1000,1000_QL80_.jpg"
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            ></video>
          </div>
        </div>
      )}

      {/* ===== MEET OUR VOLUNTEERS ===== */}
      {volunteerList.length > 0 && (
        <div className="meet-section text-center py-5">
          <div className="container">
            <h3 className="fw-bold mb-4">
              Meet our <span className="text-warning">volunteers</span>
            </h3>

            <Swiper
              modules={[Autoplay, Pagination]}
              slidesPerView={4}
              spaceBetween={30}
              loop={true}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              breakpoints={{
                0: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                992: { slidesPerView: 4 },
              }}
              className="volunteer-swiper"
            >
              {volunteerList.map((volunteer, index) => (
                <SwiperSlide key={index}>
                  <div className="volunteer-card text-center">
                    <img
                      src={volunteer.url}
                      alt={`Volunteer ${index}`}
                      className="rounded-circle shadow-sm mb-2"
                      style={{ width: "150px", height: "150px", objectFit: "cover" }}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default AboutPage;
