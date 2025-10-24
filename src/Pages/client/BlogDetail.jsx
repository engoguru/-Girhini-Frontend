import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchOneBlog } from '../../store/slice/blogSlice';
import Navbar from '../../component/client/common/Navbar';
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaWhatsapp,
  FaLink,
} from 'react-icons/fa';

function BlogDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { blogOne, loading } = useSelector((state) => state?.blog);
  const [showShare, setShowShare] = useState(false);

  const blog = blogOne?.data || blogOne;

  const shareUrl = window.location.href;
  const shareTitle = blog?.heading || "Check out this blog!";

  useEffect(() => {
    if (id) {
      dispatch(fetchOneBlog(id));
    }
  }, [id, dispatch]);

  // Copy link to clipboard
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
    } catch {
      alert("Failed to copy link");
    }
  };

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section
        className="hero-section position-relative"
        style={{
          backgroundColor: "#0b3b2e",
          borderBottomLeftRadius: "50px",
          borderBottomRightRadius: "50px",
          paddingBottom: "160px",
          overflow: "hidden",
        }}
      >
        <Navbar />

        <div className="container text-center text-white mt-4 pt-5">
          <h2 className="fw-bold display-6" style={{ lineHeight: "1.4" }}>
            Empowering Change Through Our
            <br />
            <span className="text-warning">Community Blogs</span>
          </h2>
          <p
            className="mt-3 text-light opacity-75 mx-auto"
            style={{ maxWidth: "700px" }}
          >
            Explore impactful stories, educational insights, and updates from
            our community-driven initiatives.
          </p>
        </div>
      </section>

      {/* ===== BLOG DETAILS SECTION ===== */}
      <section className="blog-details-section py-5">
        <div className="container">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-success" role="status"></div>
            </div>
          ) : (
            <>
              <div className="row g-4">
                <div className="col-12">
                  <img
                    src={blog?.blogImage?.url}
                    alt={blog?.heading}
                    className="img-fluid rounded-4 shadow"
                    style={{
                      height: "450px",
                      objectFit: "cover",
                      width: "100%",
                    }}
                  />
                </div>
              </div>

              <div className="row mt-5 align-items-start g-5">
                <div className="col-12 col-md-10 mx-auto">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="badge bg-success px-3 py-2">
                      {blog?.category || "General"}
                    </span>
                    <small className="text-muted">
                      {new Date(blog?.createdAt).toLocaleDateString()}
                    </small>
                  </div>

                  <h3 className="fw-bold mb-3 text-success">{blog?.heading}</h3>

                  <div
                    className="text-muted fs-5"
                    dangerouslySetInnerHTML={{
                      __html: blog?.description || "<p>No content available.</p>",
                    }}
                  ></div>

                  {/* Share Button */}
                  <div className="mt-5 position-relative">
                    <button
                      className="btn btn-success px-4 py-2 rounded-pill"
                      onClick={() => setShowShare(!showShare)}
                    >
                      Share This Blog
                    </button>

                    {/* Share Options */}
                    {showShare && (
                      <div
                        className="shadow p-3 rounded-4 mt-3 bg-white d-flex flex-wrap gap-3 justify-content-center"
                        style={{
                          position: "absolute",
                          zIndex: 10,
                          width: "100%",
                          left: 0,
                        }}
                      >
                        <a
                          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                            shareUrl
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline-primary rounded-circle"
                        >
                          <FaFacebook size={20} />
                        </a>

                        <a
                          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                            shareUrl
                          )}&text=${encodeURIComponent(shareTitle)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline-info rounded-circle"
                        >
                          <FaTwitter size={20} />
                        </a>

                        <a
                          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                            shareUrl
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline-primary rounded-circle"
                        >
                          <FaLinkedin size={20} />
                        </a>

                        <a
                          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                            shareTitle + " " + shareUrl
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline-success rounded-circle"
                        >
                          <FaWhatsapp size={20} />
                        </a>

                        <button
                          onClick={copyLink}
                          className="btn btn-outline-secondary rounded-circle"
                        >
                          <FaLink size={20} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default BlogDetail;
