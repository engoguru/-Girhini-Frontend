import React, { useState } from "react";
import baseUrl from "../../utils/baseurl";
import axios from "axios";

const membershipPlans = [
  { type: "1_YEAR", label: "1 Year", fee: 500 },
  { type: "5_YEAR", label: "5 Years", fee: 1100 },
  { type: "10_YEAR", label: "10 Years", fee: 2100 },
  { type: "LIFETIME", label: "Lifetime", fee: 5100 },
];

function MemberShip({ user }) {
  const [loading, setLoading] = useState(false);

  const handleApply = async (plan) => {
    try {
      setLoading(true);

      // Call API to save membership application
      const res = await axios.post(
        `${baseUrl}/api/membership/apply`,
        { type: plan.type },
        { withCredentials: true }
      );

      alert(`Applied for ${plan.label} membership. Payment pending.`);

      // Redirect to payment page or open modal
      window.location.href = `/payment?type=${plan.type}&fee=${plan.fee}`;
    } catch (error) {
      console.error(error);
      alert("Error applying for membership");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row mt-4">
      {membershipPlans.map((plan) => (
        <div className="col-12 col-md-6 col-lg-3 mb-4" key={plan.type}>
          <div className="card h-100 text-center shadow-sm border-0">
            <div className="card-header bg-warning text-dark fw-bold">
              {plan.label} Membership
            </div>
            <div className="card-body">
              <h3 className="card-title">₹{plan.fee}</h3>
              <p className="card-text">
                {plan.label} plan to access exclusive startup & self-employment support, government schemes, training & mentorship.
              </p>
              <button
                className="btn btn-success mt-3"
                onClick={() => handleApply(plan)}
                disabled={loading || user?.membership?.applied}
              >
                {user?.membership?.applied ? "Already Applied" : "Apply"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MemberShip;
