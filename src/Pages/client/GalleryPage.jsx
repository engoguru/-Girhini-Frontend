import React,{useState,useEffect} from "react";
import Footer from '../../component/client/common/Footer'
import Navbar from '../../component/client/common/Navbar'
import GalleryPic from '../../component/client/gallery/GalleryPic'
import { fetchAllGallery } from "../../store/slice/gallerySlice";
import  {useDispatch,useSelector} from "react-redux";
import { Link } from "react-router-dom";
function GalleryPage() {
    const dispatch=useDispatch()
    const { galleryAll } = useSelector((state) => state.gallery);

  // === Fetch all programs on mount ===
   useEffect(() => {

     dispatch(fetchAllGallery());
   
   }, [dispatch]);
    return (
        <>
            {/* ===== HERO SECTION ===== */}
            <section
                className="hero-section position-relative mb-3"
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
                    <h2 className="fw-bold display-6" style={{ lineHeight: "1.4" }}>
                       From Kangra to the World — Inspiring<br />
                        <span className="text-warning"> Change Together </span>
                    </h2>
                    <p
                        className="mt-3 text-light opacity-75 mx-auto"
                        style={{ maxWidth: "700px" }}
                    >
                       Celebrating our journey of self-reliance and community strength in the heart of Himachal Pradesh
                    </p>
                    <Link to={"/contact-us"} className="btn btn-warning text-dark fw-semibold mt-3 px-4 py-2 rounded-pill">
                        EXPLORE MORE
                    </Link>
                </div>
            </section>
            <GalleryPic  gallery={galleryAll}/>
            {/* ===== LISTEN FROM OUR VOLUNTEERS ===== */}
            {/* <div className="listen-section text-center">
                <div className="container py-5">
                    <h2 className="fw-bold mb-4">
                        Listen from our <span className="text-warning">volunteers</span>
                    </h2>
                </div>
            </div> */}

            {/* ===== VIDEO SECTION ===== */}
            {/* <div className="video-wrapper" style={{
                margin: "0 25%"
            }}

            >
                <div className="video-container mx-auto shadow rounded-4 overflow-hidden">
                    <video
                        src="/video.mp4"
                        controls
                        poster="https://m.media-amazon.com/images/I/81EhZofH2RL._UF1000,1000_QL80_.jpg"
                        style={{ objectFit: "cover", width: "100%", height: "100%" }}
                    ></video>
                </div>
            </div> */}
            {/* <GalleryPic /> */}
            <Footer />
        </>
    )
}

export default GalleryPage