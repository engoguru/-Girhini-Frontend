import React from "react";
import './Program.css'
import { Link } from "react-router-dom";

function UpcomingProgram({ program }) {
  

  return (
    <>
      <section className="upcoming-section py-3">
        <div className="container">
                       <div
  className="text-center mb-5"
  style={{ borderBottom: '2px solid rgb(11, 59, 46)' }}
>
            <h3 className="fw-bolder text-dark">
              Upcoming <span className="text-success">Programs</span>
            </h3>
            <p className="text-muted mx-auto">
              Discover our programs designed to empower, educate, and uplift communities. Join us in making a meaningful difference!
            </p>
          </div>

          <div className="row g-1">
             <div className="d-flex mb-2">
                      <Link to="/popular-ngo-program" className="ms-auto btn donate-btn px-4 py-2 rounded-pill fw-semibold">
                        View More.
                      </Link>
                    </div>
            {program
              ?.filter(item => item.programType === "Upcoming") 
               .slice(0, 3)
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
      </section>
    </>
  );
}

export default UpcomingProgram;
