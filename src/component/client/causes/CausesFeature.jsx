import React from "react";
import "./Causes.css";

function CausesFeature({ causes }) {
  const featuredCause = causes?.find(
    (cause) => cause.programType === "Feature"
  );

  return (
    <section className="causes-section py-5">
      <div className="container">
        {/* === Causes Header === */}
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

        {/* === Causes Cards === */}
        <div className="row g-4 mb-5">
          {causes
            ?.filter((cause) => cause.programType === "Causes")
            .map((cause, index) => (
              <div className="col-lg-4 col-md-6 col-sm-12" key={index}>
                <div className=" cause-card border-0 shadow-sm rounded-4 h-100">
                  <img
                    src={cause?.programImage[0]?.url}
                    className="card-img-top rounded-top-4"
                    alt={cause.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title fw-semibold text-dark">
                      {cause.programHeading}
                    </h5>
                    <p className="card-text text-muted small">
                      {cause.programDescription
                        ?.replace(/<[^>]+>/g, "")
                        .split(" ")
                        .slice(0, 30)
                        .join(" ")}
                      ...
                    </p>
                    <div className="d-flex justify-content-between small text-secondary mb-3">
                      <span className="text-black">Fund Raised: {cause.raisedFund}</span>
                      <span className="text-black">Target: {cause.targetFund}</span>
                    </div>
                    <div className="px-5">
                      <button className="btn donate-btn w-100 py-2 rounded-pill fw-semibold ">
                        HELP US TO DONATE NOW →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* === Featured Campaign Section === */}
        {featuredCause && (
          <div className="featured-campaign py-5 px-4 rounded-4 shadow-sm bg-light">
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
      </div>
    </section>
  );
}

export default CausesFeature;
