import React,{useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../component/client/common/Navbar";
import Footer from "../../component/client/common/Footer";
import './ContactPage.css';
import { createContactThunk } from "../../store/slice/contactSlice";


function ContactPage() {
const dispatch=useDispatch();
const [form, setForm] = useState({
  name: '',
  email: '',
  contact: '',
  category: 'general', // default
  message: '',
  status: 'new' // optional, can be set in backend
});


const handleChange = (e) => {
  const { name, value } = e.target;
  setForm((prev) => ({
    ...prev,
    [name]: value
  }));
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await dispatch(createContactThunk(form)).unwrap(); // unwrap to catch errors directly
    alert('Contact submitted successfully!');
    setForm({
      name: '',
      email: '',
      contact: '',
      category: 'general',
      message: '',
      status: 'new'
    });
  } catch (error) {
    console.error('Error submitting contact:', error);
    alert(error.message || 'Submission failed');
  }
};

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
            Get in touch with us to join hands, support our cause, or inquire
            about our work — together, we can make a difference.
          </p>
        </div>
      </section>

      {/* ===== CONTACT FORM SECTION ===== */}
      <section className="contact-section py-5">
        <div className="container">
          <h3 className="fw-bold mb-4 text-start">
            Let’s hear from <span className="text-success">you</span>
          
          </h3>

         <form className="row g-4" onSubmit={handleSubmit}>
  <div className="col-md-6">
    <label className="form-label fw-semibold text-start d-block">Full Name</label>
    <input
      type="text"
      className="form-control rounded-pill py-2"
      placeholder="Full name"
      name="name"
      value={form.name}
      onChange={handleChange}
      required
    />
  </div>

  <div className="col-md-6">
    <label className="form-label fw-semibold text-start d-block">Email Address</label>
    <input
      type="email"
      className="form-control rounded-pill py-2"
      placeholder="Please Enter Email Address"
      name="email"
      value={form.email}
      onChange={handleChange}
      required
    />
  </div>

  <div className="col-md-6">
    <label className="form-label fw-semibold text-start d-block">Phone No.</label>
    <input
      type="text"
      className="form-control rounded-pill py-2"
      placeholder="Phone"
      name="contact"
      value={form.contact}
      onChange={handleChange}
      required
    />
  </div>

  <div className="col-md-6">
    <label className="form-label fw-semibold text-start d-block">Category</label>
    <select
      className="form-select rounded-pill py-2"
      name="category"
      value={form.category}
      onChange={handleChange}
      required
    >
      <option value="">Select Category</option>
      <option value="donation">Donation</option>
      <option value="volunteering">Volunteering</option>
      <option value="partnership">Partnership</option>
      <option value="other">Other</option>
    </select>
  </div>

  <div className="col-12">
    <label className="form-label fw-semibold text-start d-block">Message</label>
    <textarea
      className="form-control rounded-4"
      rows="4"
      placeholder="Write something here..."
      name="message"
      value={form.message}
      onChange={handleChange}
      required
    ></textarea>
  </div>

  <div className="col-12 text-center">
    <button
      type="submit"
      className="btn btn-success px-5 py-2 rounded-pill fw-semibold"
    >
      FILL DETAILS TO SEND MESSAGE
    </button>
  </div>
</form>

        </div>
      </section>

      {/* ===== DIRECT CONTACT SECTION ===== */}
      <section className="direct-contact-section text-center my-5">
        <div className="container">
          <h4 className="fw-bold mb-4">
            You can directly meet us <span className="text-warning">here</span>
          </h4>

          <div className="card border-0 shadow-sm rounded-4 overflow-hidden p-3">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80"
              alt="Contact Team"
              className="img-fluid rounded-4 "
            />

            <div className="d-flex flex-wrap justify-content-center gap-4 mt-4">
              <div className="contact-info-item d-flex align-items-center gap-2">
                <i className="bi bi-telephone-fill text-success fs-5"></i>
                <span className="fw-semibold">757-999-9466</span>
              </div>
              <div className="contact-info-item d-flex align-items-center gap-2">
                <i className="bi bi-geo-alt-fill text-success fs-5"></i>
                <span className="fw-semibold">California, USA</span>
              </div>
              <div className="contact-info-item d-flex align-items-center gap-2">
                <i className="bi bi-envelope-fill text-success fs-5"></i>
                <span className="fw-semibold">ngo@support.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== JOIN COMMUNITY ===== */}
      <section className="join-community text-center py-5 bg-light rounded-top-5">
        <div className="container">
          <h4 className="fw-bold mb-3">Join our community group</h4>
          <p className="text-muted mx-auto" style={{ maxWidth: "600px" }}>
            Connect with thousands of volunteers, donors, and changemakers who
            are working together to create meaningful impact.
          </p>
          <button className="btn btn-success rounded-pill px-4 py-2">
            JOIN NOW
          </button>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default ContactPage;
