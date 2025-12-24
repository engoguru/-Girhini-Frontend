


// import React from "react";
// import "./Home.css"
// import Navbar from "../../component/client/common/Navbar";
// import Footer from "../../component/client/common/Footer";

// function HomePage() {
//   return (
//     <>
//       {/* Hero Section */}

//       <section
//         className="position-relative mb-5"
//         style={{
//           backgroundColor: "#0b3b2e",
//           borderBottomLeftRadius: "80px",
//           borderBottomRightRadius: "80px",
//           paddingBottom: "100px",

//           overflow: "hidden",
//         }}
//       >
//         {/* Navbar fixed on top */}
//         <div className="navbar-postion z-3 mt-3">
//           <Navbar />
//         </div>

//         {/* Hero Content */}
//         <div className="container text-center text-white mt-5">
//           <h2 className="fw-bold display-6" style={{ lineHeight: "1.4" }}>
//             Let’s make the world a better place by{" "}
//             <br />
//             <span className="text-warning">creating a brighter future</span>
//           </h2>
//           <p className="mt-3 text-light opacity-75 mx-auto" style={{ maxWidth: "700px" }}>
//             Empowering individuals and communities to collaborate, innovate, and
//             solve global challenges, fostering a brighter future for all.
//           </p>
//           <button
//             className="btn btn-warning text-dark fw-semibold mt-3 px-4 py-2 rounded-pill"
//           >
//             EXPLORE MORE
//           </button>
//         </div>

//         {/* Video Section */}
//         <div className="container mt-5 d-flex justify-content-center video-postion">
//           <div
//             className="ratio ratio-16x9 rounded-4 overflow-hidden shadow"
//             style={{ maxWidth: "800px" }}
//           >
//             <video
//               src="/video.mp4"
//               controls
//               poster="https://m.media-amazon.com/images/I/81EhZofH2RL._UF1000,1000_QL80_.jpg"
//               style={{ objectFit: "cover", width: "100%", height: "100%" }}
//             ></video>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <Footer />
//     </>
//   );
// }

// export default HomePage;


import React,{useState,useEffect} from "react";
import "./Home.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useRef } from "react";

import Navbar from "../../component/client/common/Navbar";
import Footer from "../../component/client/common/Footer";
import UpcomingProgram from "../../component/client/program/UpcomingProgram";
import AboutMain from "../../component/client/about-us/AboutMain";
import CausesFeature from "../../component/client/causes/CausesFeature";
import GalleryPic from "../../component/client/gallery/GalleryPic";
import AboutReviewSection from "../../component/client/about-us/AboutReviewSection";
import BlogSection from "../../component/client/blog/BlogSection";
import  {useDispatch,useSelector} from "react-redux";
import { fetchAllProgram } from '../../store/slice/programSlice';
import { fetchAllBlog } from "../../store/slice/blogSlice";
import { fetchAllGallery } from "../../store/slice/gallerySlice";

import { getAllreview } from "../../store/slice/reviewSlice";

import { fetchAllAbout } from '../../store/slice/aboutSlice';



const heroVideos = [
  {
    src: "http://res.cloudinary.com/dorytukim/video/upload/v1766145204/about/qbdycv3ntuycwescz2vr.mp4",
    poster:
      "https://res.cloudinary.com/dorytukim/image/upload/v1766144429/Gallery/lmtzjsopuygwbszaniwn.jpg",
  },
  {
    src: "http://res.cloudinary.com/dorytukim/video/upload/v1766145204/about/video2.mp4",
    poster:
      "https://res.cloudinary.com/dorytukim/image/upload/v1766144429/Gallery/poster2.jpg",
  },
  {
    src: "http://res.cloudinary.com/dorytukim/video/upload/v1766145204/about/video3.mp4",
    poster:
      "https://res.cloudinary.com/dorytukim/image/upload/v1766144429/Gallery/poster3.jpg",
  },
];


function HomePage() {
    const dispatch=useDispatch();
 const { Allprogram, loading } = useSelector((state) => state.program);
 const{blogAll}=useSelector((state)=>state?.blog)
const { galleryAll } = useSelector((state) => state.gallery);
  const { reviewFetch} = useSelector((state) => state.review);
    const { aboutAll, error } = useSelector((state) => state.about);
  // === Fetch all programs on mount ===
   useEffect(() => {
     dispatch(fetchAllProgram());
     dispatch(fetchAllBlog());
     dispatch(fetchAllGallery());
     dispatch (getAllreview())

     dispatch(fetchAllAbout())
   }, [dispatch]);

 // Handle if API returns an array of about entries
  const aboutData = Array.isArray(aboutAll) && aboutAll.length > 0 ? aboutAll[0] : aboutAll || {};
   console.log(reviewFetch,"hgrth")
  return (
    <>
      {/* Hero Section */}
      <section
        className="hero-section position-relative"
        style={{
          backgroundColor: "#0b3b2e",
          borderBottomLeftRadius: "50px",
          borderBottomRightRadius: "50px",
          paddingBottom: "180px", // extra space for video overlap
          overflow: "hidden",
        }}
      >
        {/* Navbar */}
        <div className="navbar-wrapper">
          <Navbar />
        </div>

        {/* Hero Content */}
        <div className="container text-center text-white mt-3 pt-5 hero-content">
          <h2 className="fw-bold display-6" style={{ lineHeight: "1.4" }}>
            Let’s make the world a better place by{" "}
            <br />
            <span className="text-warning">creating a brighter future</span>
          </h2>
          <p
            className="mt-3 text-light opacity-75 mx-auto"
            style={{ maxWidth: "700px" }}
          >
            Empowering individuals and communities to collaborate, innovate, and
            solve global challenges, fostering a brighter future for all.
          </p>
          <button className="btn btn-warning text-dark fw-semibold mt-3 px-4 py-2 rounded-pill">
            EXPLORE MORE
          </button>
        </div>
      </section>

      {/* Video Section */}
      {/* <div className="video-wrapper mx-auto " 
>
        <div
          className="ratio ratio-16x9 rounded-4 overflow-hidden shadow video-size"

        >
          <video
            src="http://res.cloudinary.com/dorytukim/video/upload/v1766145204/about/qbdycv3ntuycwescz2vr.mp4"
            controls
            poster="https://res.cloudinary.com/dorytukim/image/upload/v1766144429/Gallery/lmtzjsopuygwbszaniwn.jpg"
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          ></video>
        </div>
      </div> */}
{/* Video Section */}
{/* Video Section */}
<div className="video-wrapper mx-auto">
  <Swiper
    modules={[Pagination]}
    pagination={{ clickable: true }}
    slidesPerView={1}
    spaceBetween={20}
    loop={true}
    onSwiper={(swiper) => {
      setTimeout(() => {
        const video = document.querySelectorAll(".hero-video")[swiper.activeIndex];
        video?.play();
      }, 300);
    }}
    onSlideChange={(swiper) => {
      document.querySelectorAll(".hero-video").forEach((video, index) => {
        if (index === swiper.activeIndex) {
          video.play();
        } else {
          video.pause();
          video.currentTime = 0;
        }
      });
    }}
  >
    {heroVideos.map((item, index) => (
      <SwiperSlide key={index}>
        <div className="ratio ratio-16x9 rounded-4 overflow-hidden shadow video-size">
          <video
            className="hero-video"
            src={item.src}
            poster={item.poster}
            muted
            playsInline
            controls
            onEnded={(e) => {
              const swiper = e.target.closest(".swiper")?.swiper;
              swiper?.slideNext();
            }}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</div>



      {/* Upcommming programs section */}
    <div className="py-5">  <UpcomingProgram  program={Allprogram?.data}/></div> 

      {/* About */}
      <AboutMain  aboutMain={aboutData}/>

      {/* Causes-section */}
      <CausesFeature causes={Allprogram?.data}/>

      {/* Gallery */}
      <GalleryPic   gallery={galleryAll}/>

      {/* Review About Section */}
      <AboutReviewSection  review={reviewFetch}/>

      {/* blog section */}
      <BlogSection blogData={blogAll}/>
      {/* Footer */}
      <Footer />
    </>
  );
}

export default HomePage;
