import React, { useState, useEffect } from 'react'
import Footer from '../../component/client/common/Footer'
import Navbar from '../../component/client/common/Navbar'
import UpcomingProgram from '../../component/client/program/UpcomingProgram';
import { createProgramThunk } from '../../store/slice/programSlice';
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProgram } from '../../store/slice/programSlice';
import { Link } from 'react-router-dom';

function ProgramPage() {
  const dispatch = useDispatch();
  const { Allprogram, loading } = useSelector((state) => state.program);


      const featuredCause = Allprogram?.data?.find(
    (cause) => cause.programType === "Feature"
  );

  // === Fetch all programs on mount ===
  useEffect(() => {
    dispatch(fetchAllProgram());
  }, [dispatch]);



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
          <h3 className="fw-bolder display-6" style={{ lineHeight: "1.2" }}>
            Join Our Mission <br />
            <span className="text-warning">to <br /> Support Communities</span>
          </h3>
          <p
            className="mt-3 text-light opacity-75 mx-auto font-medium"
            style={{ maxWidth: "700px" }}
          >
            From past achievements to upcoming programs, we work to uplift communities through education, healthcare, women’s empowerment, and fundraising initiatives. Get involved and help us create positive change in Kangra, Himachal Pradesh.
          </p>

          <button className="btn btn-warning text-dark fw-semibold mt-3 px-4 py-2 rounded-pill">
            Donate-Us
          </button>
        </div>
      </section>


        {/* === Featured Campaign Section === */}
        {featuredCause && (
          <div className="featured-campaign py-5 px-5 rounded-4 shadow-sm bg-light">
            <div className="row align-items-center">
              <div className="col-md-4 text-center">
                <img
                  src={featuredCause?.programImage[0]?.url}
                  alt={featuredCause.programHeading}
                  className="img-fluid rounded-4"
                />
              </div>

              <div className="col-md-8 mt-4 mt-md-0">
                <h4 className="fw-bold mb-3">Featured Campaign</h4>
                <h5 className="fw-semibold text-dark">
                  {featuredCause.programHeading}
                </h5>
                <p className="text-muted small mb-4">
                  {featuredCause.programDescription
                    ?.replace(/<[^>]+>/g, "")
                    .split(" ")
                    .slice(0, 40)
                    .join(" ")}
                  ...
                </p>

                <div className="d-flex justify-content-between text-secondary small mb-1">
                  <span>
                    {featuredCause.raisedFund} <br />{" "}
                    <strong>Funds Raised</strong>
                  </span>
                  <span>
                    {featuredCause.targetFund} <br />{" "}
                    <strong>Target Goal</strong>
                  </span>
                  <span>-- <br /> <strong>Completed</strong></span>
                  <span>-- <br /> <strong>Days Left</strong></span>
                </div>

                <div
                  className="progress rounded-pill"
                  style={{ height: "10px" }}
                >
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{ width: "40%" }} // Placeholder, you can calculate %
                    aria-valuenow="40"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>

                <div className="mt-4">
                  <button className="btn donate-btn px-4 py-2 rounded-pill fw-semibold">
                    DONATE TO THIS CAMPAIGN →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      {/* Upcommming programs section */}
      <UpcomingProgram program={Allprogram?.data} />



       <div className="container">
              <div
  className="text-center mb-5"
  style={{ borderBottom: '2px solid rgb(11, 59, 46)' }}
>
                  <h3 className="fw-bolder text-dark">
                 See the Impact, <span className="text-success"> Join the Change</span>
                  </h3>
                  <p className="text-muted mx-auto">
                  Girhini Swayam Swarojgar Sangh has transformed lives through education, healthcare, and community programs. Join us — connect, support, and make a difference!
                  </p>
                </div>
      
                <div className="row g-4">
                  {Allprogram?.data
                    ?.filter(item => item.programType === "Causes") 
                    .map((item, index) => (
                      <div key={index} className="col-lg-4 col-md-6 col-sm-12 px-1 py-2">
                        <div className=" program-card shadow-sm border-0 rounded-4">
                          <img
                            src={item.programImage[0]?.url}
                            className="card-img-top rounded-top-4 mb-2"
                            alt={item.programHeading}
                          />
                          <div className="card-body px-2">
                            <h6 className="card-title fw-bolder mb-2 ">{item.programHeading}</h6>
                            <p
                              className="card-text text-muted fw-normal text-start"
                              dangerouslySetInnerHTML={{
                                __html:
                                  item.programDescription
                                    ?.replace(/<[^>]+>/g, '') // Remove HTML tags
                                    .split(' ')               // Split into words
                                    .slice(0, 30)             // Take first 30 words
                                    .join(' ') + '...',       // Join and add ellipsis
                              }}
                            ></p>
      
                            <Link
                              to={`/popular-ngo-program/${item?._id}`}
                              className="btn btn-success px-4 py-2 rounded-pill fw-semibold mb-2"
                            >
                              Learn More
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
      
                </div>
              </div>

      <Footer />
    </>
  )
}

export default ProgramPage