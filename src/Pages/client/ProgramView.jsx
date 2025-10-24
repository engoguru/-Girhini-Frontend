import React, { useState, useEffect } from "react";
import Navbar from "../../component/client/common/Navbar";
import Footer from "../../component/client/common/Footer";
import { useDispatch, useSelector, } from "react-redux";
import { fetchOneProgram } from "../../store/slice/programSlice";
import { Link, useParams } from "react-router-dom";
function ProgramView() {
  const dispatch = useDispatch();
  const { id } = useParams()
  const { Oneprogram } = useSelector((status) => status.program)
  useEffect(() => {
    dispatch(fetchOneProgram(id))
  }, [id])
  console.log(Oneprogram, "ggegg")
  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section
        className="hero-section position-relative"
        style={{
          backgroundColor: "#0b3b2e",
          borderBottomLeftRadius: "50px",
          borderBottomRightRadius: "50px",
          paddingBottom: "50px",
          overflow: "hidden",
        }}
      >
        <Navbar />

        <div className="container text-center text-white mt-4 pt-5">
          <h2 className="fw-bold display-6" style={{ lineHeight: "1.4" }}>
            Empowering Change Through Our
            <br />
            <span className="text-warning">Community Programs</span>
          </h2>
          <p
            className="mt-3 text-light opacity-75 mx-auto"
            style={{ maxWidth: "700px" }}
          >
            Discover the impact of our initiatives aimed at uplifting
            communities, supporting education, and promoting sustainability.
          </p>
        </div>
      </section>

      {/* ===== PROGRAM DETAILS ===== */}
      {/* <section className="program-details-section py-5">
        <div className="container">
          <div className="row align-items-center g-5">
               
            {   Oneprogram?.data?.programImage?.map((index,item)=>{
    <div className="col-md-6">

              <img
                src={index?.url}
                alt="Program"
                className="img-fluid rounded-4 shadow"
              />
            </div>
            })}
        
            <div className="col-md-6">
              <h3 className="fw-bold mb-3 text-success">{Oneprogram?.data?.programHeading}</h3>
              <p className="text-muted">
              {Oneprogram?.data?.programDescription}
              </p>
              <ul className="list-unstyled mt-3">
                <li>✅ Sustainable community development</li>
                <li>✅ Education and skill-building workshops</li>
                <li>✅ Access to clean water and healthcare</li>
                <li>✅ Environmental awareness and action</li>
              </ul>
              <button className="btn btn-success mt-4 px-4 py-2 rounded-pill">
                Join the Initiative
              </button>
            </div>
          </div>
        </div>
      </section> */}
      <section className="program-details-section py-5">
        <div className="container">
          <div className="row g-4">
            {/* Image Collage */}

            <div className="col-12 col-md-12">
              <img
                src={Oneprogram?.data?.programImage[0]?.url}
                alt={`Program Image`}
                className="img-fluid rounded-4 shadow"
                style={{ height: "400px", objectFit: "cover", width: "100%" }}
              />
            </div>

          </div>

          <div className="row mt-3 align-items-center g-5">
            <div className="col-12 col-md-12">
              <h3 className="fw-bolder mb-3 text-success">{Oneprogram?.data?.programHeading}</h3>
              <div
                className="text-muted"
                dangerouslySetInnerHTML={{ __html: Oneprogram?.data?.programDescription }}
              ></div>


              <Link to={"/contact-us"} className="btn btn-success mt-4 px-4 py-2 rounded-pill">
                Join the Initiative
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== OBJECTIVES SECTION ===== */}
      <section className="objectives-section py-5 bg-light">
        <div className="container text-center">
          <h3 className="fw-bold mb-4 text-success">Our Key Objectives</h3>
          <div className="row g-4">
            {Oneprogram?.data?.objective?.map((objective, i) => (
              <div key={i} className="col-md-3">
                <div className="p-4 rounded-4 shadow-sm bg-white h-100">
                  <h5 className="fw-semibold text-dark">{objective?.heading}</h5>
                  <p className="text-muted mt-2 small">
                  {objective?.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== IMPACT SECTION ===== */}
      <section className="impact-section py-5">
        <div className="container text-center">
          <h3 className="fw-bold mb-4 text-success">Program Impact</h3>
          <div className="row g-4">
            {Oneprogram?.data?.impacted?.map((item, i) => (
              <div key={i} className="col-md-3">
                <div className="p-4 bg-success text-white rounded-4 shadow h-100">
                  <h2 className="fw-bold">{item.heading}</h2>
                  <p className="mb-0">{item.NumberImapct}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GALLERY SECTION ===== */}
      <section className="gallery-section py-5 bg-light">
        <div className="container">
          <h3 className="fw-bold text-center text-success mb-4">
            Program Gallery
          </h3>
          <div className="row g-3">
            {Oneprogram?.data?.programImage?.map((img, index) => (
              <div className="col-6 col-md-4" key={index}>
                <img
                  src={img?.url}
                  alt={`Program Image ${index + 1}`}
                  className="img-fluid rounded-4 shadow"
                  style={{ height: "200px", objectFit: "cover", width: "100%" }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CALL TO ACTION ===== */}
      <section
        className="cta-section text-center py-5 mb-5 text-white"
       >
        <div className="container text-black">
          <h3 className="fw-bold mb-3">Be Part of the Change</h3>
          <p className="mb-4 text-light opacity-75 text-black">
            Your contribution can transform lives and bring hope to those in
            need.
          </p>
          <button className="btn btn-warning fw-semibold px-4 py-2 rounded-pill">
            Donate Now
          </button>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default ProgramView;
