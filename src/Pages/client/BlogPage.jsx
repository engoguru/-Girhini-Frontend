import React, { useState, useEffect } from "react";
import "./BlogPage.css"
import Footer from "../../component/client/common/Footer";
import Navbar from "../../component/client/common/Navbar";
import BlogSection from "../../component/client/blog/BlogSection";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBlog } from "../../store/slice/blogSlice";
import { Facebook } from "lucide-react";
import { fetchAllProgram } from "../../store/slice/programSlice";
function BlogPage() {
  const dispatch = useDispatch();
  const { blogAll } = useSelector((state) => state?.blog)
  const { Allprogram, loading } = useSelector((state) => state.program);


  const featuredCause = Allprogram?.data?.find(
    (cause) => cause.programType === "Feature"
  );

  // === Fetch all programs on mount ===
  useEffect(() => {
   dispatch(fetchAllProgram());
    dispatch(fetchAllBlog())
  }, [dispatch]);
  console.log(blogAll, "hgrth")

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section
        className="hero-section position-relative"
        style={{
          backgroundColor: "#0b3b2e",
          borderBottomLeftRadius: "80px",
          borderBottomRightRadius: "80px",
          paddingBottom: "100px",
          overflow: "hidden",
        }}
      >
        <div className="navbar-wrapper">
          <Navbar />
        </div>

        <div className="container text-center text-white mt-3 pt-5 hero-content">
          <h2 className="fw-bold display-6" style={{ lineHeight: "1.4" }}>
            Let’s make the world a better place by <br />
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

      {/* ===== MAIN BLOG CONTENT ===== */}
      <div className="container my-5">
        <div className="row g-5">
          {/* ===== LEFT: BLOG LIST ===== */}
          <div className="col-lg-8">
            {/* Main Featured Blog */}
            {/* === Featured Campaign Section === */}
            {featuredCause && (
              <div className="featured-campaign py-3 px-4 rounded-4 shadow-sm bg-light">
                <div className="row align-items-center">
                  <div className="col-md-4 text-center">
                    <img
                      src={featuredCause?.programImage[0]?.url}
                      alt={featuredCause.programHeading}
                      className="img-fluid rounded-4"
                    />
                  </div>

                  <div className="col-md-8 mt-2 mt-md-0">
                    <h4 className="fw-bold mb-3">Featured Campaign</h4>
                    <h5 className="fw-semibold text-dark">
                      {featuredCause.programHeading}
                    </h5>
                    <p className="text-muted small mb-4">
                      {featuredCause.programDescription
                        ?.replace(/<[^>]+>/g, "")
                        .split(" ")
                        .slice(0, 30)
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

            {/* ===== BLOG SECTION ===== */}
            <BlogSection blogData={blogAll} />
          </div>

          {/* ===== RIGHT: SIDEBAR ===== */}
          <div className="col-lg-4">
            {/* Search Box */}
            {/* <div className="card border-0 shadow-sm p-4 mb-4 rounded-4">
              <h5 className="fw-bold mb-3">Search for blogs</h5>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control rounded-start-pill"
                  placeholder="Search Now"
                />
                <button className="btn btn-success rounded-end-pill">
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </div> */}

            {/* Recent Savers */}
      <div className="card border-0 shadow-sm p-4 mb-4 rounded-4">
  <h5 className="fw-bolder mb-3 text-dark">Recent Savers</h5>
  <ul className="list-unstyled mb-0">
    <li className="mb-2">
      <strong className="font-sm text-dark">Jeff Bezos</strong> <br />
      <small className="text-muted">$40M Donated</small>
    </li>
    <li className="mb-2">
      <strong className="font-sm text-dark">Mark Zuckerberg</strong> <br />
      <small className="text-muted">$30M Donated</small>
    </li>
    <li>
      <strong className="font-sm text-dark">Bill Gates</strong> <br />
      <small className="text-muted">$50M Donated</small>
    </li>
  </ul>
</div>


            {/* Categories */}
            {/* <div className="card border-0 shadow-sm p-4 mb-4 rounded-4">
              <h5 className="fw-bold mb-3">Categories</h5>
              <ul className="list-unstyled">
                <li>Education</li>
                <li>Health</li>
                <li>Humanitarian</li>
                <li>Environment</li>
                <li>Animal Welfare</li>
              </ul>
            </div> */}

            {/* Tags */}
            <div className="card border-0 shadow-sm p-4 mb-4 rounded-4">
              <h5 className="fw-bold mb-3">Tags</h5>
              <div className="d-flex flex-wrap gap-2">
                {["Education", "Health", "Environment", "Animal Welfare", "Humanitarian"].map(
                  (tag, i) => (
                    <span key={i} className="badge bg-success-subtle text-dark px-3 py-2 rounded-pill border">
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* About NGO */}
            <div className="card border-0 shadow-sm p-4 mb-4 rounded-4 text-center">
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&q=80"
                alt="About NGO"
                className="img-fluid rounded-4 mb-3"
              />
              <h6 className="fw-bold mb-2">About NGO</h6>
              <p className="text-muted small">
                Find the blog by its last entering any keyword you want to read.
              </p>
         <button className="btn btn-outline-warning text-white rounded-pill">
  <a
    href="https://www.facebook.com/share/v/1FsxeN2uo8/"
    target="_blank"
    rel="noopener noreferrer"
  >
    Follow Us On <Facebook size={22} strokeWidth={1.5} />
  </a>
</button>

            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default BlogPage;
