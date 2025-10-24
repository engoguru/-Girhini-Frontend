import React from "react";
import "./Blog.css";
  import { Link, useLocation } from "react-router-dom";
function BlogSection({blogData}) {
// console.log(blogData,"hh")
  const location = useLocation();
  const blogs = [
    {
      image:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&q=80",
      title:
        "Even the all-powerful pointing has no control about the blind texts",
      subtitle:
        "Igniting change through compassion: Empowering children for a brighter tomorrow.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&q=80",
      title: "A Journey with our NGO through different saviours",
      subtitle:
        "Empowering the vulnerable: Our NGO’s unwavering commitment to creating positive change.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=600&q=80",
      title: "Empowering the future: Building hope and opportunity for children",
      subtitle:
        "Join us on a transformative journey, together with our NGO, as we impact lives through various initiatives.",
    },
  ];

  return (
    <section className="blog-section py-5">
      <div className="container">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap text-center text-md-start">
          <h2 className="fw-bold blog-heading">
            Blogs to <span className="text-warning">read</span>
          </h2>
            {location?.pathname!=="/trending-blog" &&
          <Link to={"/trending-blog"} target="top" className="btn btn-dark rounded-pill px-4 py-2 mt-3 mt-md-0">
            READ MORE
          </Link>
          }
        </div>

        {/* Blogs Grid */}
        <div className="row g-4">
          {blogData?.blogs?.map((blog, index) => (
            <div className="col-md-4 col-sm-12" key={index}>
              <div className="blog-card text-center text-md-start">
                <img
                  src={blog?.blogImage?.url}
                  alt={blog.heading}
                  className="img-fluid rounded-4 mb-3"
                />
                <h5 className="fw-semibold">{blog.heading}</h5>
             <div
  className="text-muted"
  dangerouslySetInnerHTML={{ __html: blog.description }}
></div>

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
