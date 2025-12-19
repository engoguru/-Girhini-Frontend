import React, { useEffect, useState } from 'react';
import Navbar from '../../component/client/common/Navbar';
import Footer from '../../component/client/common/Footer';
import axios from 'axios';
import baseUrl from '../../utils/baseurl';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../store/slice/userSlice';
function User() {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const [user, setUser] = useState(null);
  const [donations, setDonations] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { meDetail } = useSelector((state) => state?.user)
  useEffect(() => {
    // Simulated auth (replace with actual user ID or token logic)
    const fetchData = async () => {
      try {
        setLoading(true);

        const userRes = await axios.get(`${baseUrl}/api/user/me`);
        const donationRes = await axios.get(`${baseUrl}/api/user/donations`);
        const contactRes = await axios.get(`${baseUrl}/api/user/contacts`);

        setUser(userRes.data);
        setDonations(donationRes.data);
        setContacts(contactRes.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);



 const handleLogout = async () => {
  try {
    // Log out on the server
    await axios.post(`${baseUrl}/api/auth/logout`, {}, { withCredentials: true });

    // Remove token locally
    localStorage.removeItem("userToken");

    // Update your user state/UI after logout
   dispatch(logoutUser());; // make sure fetchUser handles "no token" case correctly

    setShowMenu(false);
    navigate("/");
  } catch (error) {
    console.error("Logout error:", error);
  }
};
  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div>
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

      <div className="container my-5">
      <h2 className="mb-4">Welcome to your dashboard!</h2>


        {/* USER PROFILE DETAILS */}

<div className="container">
  <div className="row">
    <div className="col-12 col-md-9 col-lg-6">
      <div className="mb-3 border">
        <div className="card-body mb-2">
          <h5 className="card-title border-bottom bg-success text-white py-2 px-2">Profile Info</h5>

          <div className="card-text text-start p-2">
            <div className="border-bottom py-2">
              <strong>Name:</strong> {meDetail?.email}
            </div>
            <div className="border-bottom py-2 text-sm">
              <strong>Email:</strong>{meDetail?.whatsAppNumber}
            </div>
            <div className="border-bottom py-2">
              <strong>Role:</strong> {meDetail?.role}
            </div>
          </div>

          <button onClick={handleLogout} className="btn btn-primary mt-2">Logout</button>
        </div>
      </div>
    </div>
  </div>
</div>





        {/* DONATION HISTORY */}
        {/* <div className="card mb-4">
          <div className="card-header">Your Donations</div>
          <div className="card-body">
            {donations.length === 0 ? (
              <p>No donations made yet.</p>
            ) : (
              <ul className="list-group">
                {donations.map((donation) => (
                  <li key={donation._id} className="list-group-item">
                    Amount: ₹{donation.amount} | Date: {new Date(donation.createdAt).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div> */}

        {/* CONTACT SUBMISSIONS */}
        {/* <div className="card">
          <div className="card-header">Your Contact Requests</div>
          <div className="card-body">
            {contacts.length === 0 ? (
              <p>No contact messages sent.</p>
            ) : (
              <ul className="list-group">
                {contacts.map((msg) => (
                  <li key={msg._id} className="list-group-item">
                    <strong>{msg.category}:</strong> {msg.message}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div> */}
      </div>

      <Footer />
    </div>
  );
}

export default User;
