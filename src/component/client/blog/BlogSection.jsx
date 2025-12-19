import React from "react";
import "./Blog.css";
import { Link, useLocation } from "react-router-dom";

function BlogSection({ blogData }) {
  const location = useLocation();

  // Determine which blogs to show based on the current route
  const blogsToShow =
    location.pathname !== "/trending-blog"
      ? blogData?.blogs?.slice(0, 3) // show only first 3 blogs
      : blogData?.blogs; // show all blogs

  return (
    <section className="blog-section py-5">
      <div className="container">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap text-center text-md-start">
          <h2 className="fw-bold blog-heading">
            Blogs to <span className="text-warning">read</span>
          </h2>

          {location.pathname !== "/trending-blog" && (
            <Link
              to={"/trending-blog"}
              target="top"
              className="btn btn-dark rounded-pill px-4 py-2 mt-3 mt-md-0"
            >
              READ MORE
            </Link>
          )}
        </div>

        {/* Blogs Grid */}
        <div className="row g-4">
          {blogsToShow?.map((blog, index) => (
            <div className="col-md-4 col-sm-12" key={index}>
              <div className="blog-card text-center text-md-start">
                <img
                  src={blog?.blogImage?.url}
                  alt={blog.heading}
                  className="img-fluid rounded-4 mb-3"
                />
                <h5 className="fw-semibold">{blog.heading}</h5>

                <Link
                  to={`/trending-blog/${blog?._id}`}
                  className="btn btn-sm btn-success rounded-pill px-3"
                >
                  READ MORE
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BlogSection;
