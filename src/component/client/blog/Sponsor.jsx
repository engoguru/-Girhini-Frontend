import React from "react";
import sp1 from "../../../assets/sp1.jpg";
import sp2 from "../../../assets/sp2.jpg";
import sp3 from "../../../assets/sp4.jpg";
import sp4 from "../../../assets/sp35.jpg";
import { Link } from "react-router-dom";

function Sponsor() {
  const sponsorData = [
    {
      id: 2,
      image: sp2,
      name: "Mr. Chandranath",
      description:
        "Lashya Vision supporter, contributing to women empowerment initiatives.",
    },
    {
      id: 3,
      image: sp3,
      name: "Thakur Arjun Singh",
      description:
        "Supporting Lashya Vision’s mission for women empowerment and social growth.",
    },
    {
      id: 4,
      image: sp4,
      name: "Smt. Pragati Singh",
      description:
        "Proud Lashya Vision supporter empowering women through education and opportunity.",
    },
  ];

  return (
    <div className="card border-0 shadow-sm p-4 mb-4 rounded-4">
      {/* Header */}
      <h5 className="fw-bold mb-3 text-center">
        Our Sponsors{" "}
        {/* <Link
          to="/contact-us"
          className="text-secondary text-decoration-none fs-6"
        >
          Become a Sponsor
        </Link> */}
      </h5>

      {/* Sponsor List */}
      <div className="d-flex flex-column gap-3">
        {sponsorData.map((sponsor) => (
          <div
            key={sponsor.id}
            className="d-flex align-items-center gap-3 p-2 border rounded-3"
          >
            <img
              src={sponsor.image}
              alt={sponsor.name}
              className="rounded"
              style={{ width: "60px", height: "60px", objectFit: "contain" }}
            />
            <div>
              <h6 className="mb-1 fw-semibold">{sponsor.name}</h6>
              <p className="mb-0 small text-muted">
                {sponsor.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Button */}
      <div className="text-center mt-4">
        <Link to="/contact-us" className="btn btn-warning rounded-pill px-4 fw-semibold">
       Sponsor Us

        </Link>
      </div>
    </div>
  );
}

export default Sponsor;
