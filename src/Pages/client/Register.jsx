import React, { useState } from "react";
import Navbar from "../../component/client/common/Navbar";
import Footer from "../../component/client/common/Footer";
import { useDispatch } from "react-redux";
import { createUser, loginUser, verifyOtp } from "../../store/slice/userSlice";
import './Register.css';

const navbarFooterStyle = {
  backgroundColor: "rgb(11, 59, 46)",
  color: "white",
};

const btnStyle = {
  backgroundColor: "rgb(11, 59, 46)",
  color: "white",
  border: "1.5px solid rgb(11, 59, 46)",
  padding: "6px 14px",
  margin: "20px",
  fontSize: "0.875rem",
  borderRadius: "0.25rem",
  cursor: "pointer",
  transition: "background-color 0.3s, color 0.3s",
};

const btnHoverStyle = {
  backgroundColor: "white",
  color: "rgb(11, 59, 46)",
};

function Register() {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({ name: "", email: "", whatsAppNumber: "", password: "" });
  const [message, setMessage] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [userId, setUserId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [btnHover, setBtnHover] = useState(false);

  const handleLoginChange = (e) => setLoginData({ ...loginData, [e.target.name]: e.target.value });
  const handleRegisterChange = (e) => setRegisterData({ ...registerData, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await dispatch(loginUser(loginData));
      if (res.meta.requestStatus === "fulfilled") {
        setMessage("Login successful!");
        localStorage.setItem("userToken", res.payload.token);
      } else {
        setMessage(res.payload || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Server error, please try again.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await dispatch(createUser(registerData));
      if (res?.meta?.requestStatus === "fulfilled") {
        setMessage("OTP sent to your WhatsApp number");
        setUserId(res?.payload?.userId);
        setShowOtp(true);
        setRegisterData({ name: "", email: "", whatsAppNumber: "", password: "" });
      } else {
        setMessage(res.payload || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      setMessage("Server error, please try again.");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await dispatch(verifyOtp({ userId, otp }));
      if (res.meta.requestStatus === "fulfilled") {
        setMessage("Verification successful! You can now login.");
        setShowOtp(false);
        setIsLogin(true);
      } else {
        setMessage(res.payload || "OTP verification failed.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Server error, please try again.");
    }
  };

  const togglePassword = () => setShowPassword(prev => !prev);

  return (
    <>
      <div style={navbarFooterStyle}><Navbar /></div>

      <section className="hero-section position-relative bg-light min-vh-100 d-flex flex-column">
        <div className="container py-5 flex-grow-1">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-9 col-md-8 col-lg-7 shadow rounded-4 bg-white overflow-hidden">
              <div className="row g-0 py-3">

                {/* Left Side */}
                <div className="col-md-5 d-flex flex-column justify-content-center text-white" style={{ backgroundColor: "rgba(11, 59, 46, 0.81)" }}>
                  <h2 className="mb-3 fw-bold">{isLogin ? "WELCOME BACK!" : "HELLO, FRIEND!"}</h2>
                  <p className="mb-4" style={{ lineHeight: 1.4 }}>
                    {isLogin ? "Connect with us, login with your info." : "Enter your details and start your journey with us."}
                  </p>
                  <button
                    style={btnStyle}
                    onMouseEnter={() => setBtnHover(true)}
                    onMouseLeave={() => setBtnHover(false)}
                    onClick={() => { setMessage(""); setShowOtp(false); setIsLogin(!isLogin); }}
                    {...(btnHover ? { style: { ...btnStyle, ...btnHoverStyle } } : {})}
                  >
                    {isLogin ? "Register" : "Login"}
                  </button>
                </div>

                {/* Right Side */}
                <div className="col-md-7 p-4">
                  {message && <div className="alert alert-info text-center">{message}</div>}

                  <div style={{ fontWeight: "600", fontSize: "1.1rem", marginBottom: "1rem", color: "rgb(11, 59, 46)" }}>
                    {isLogin ? "Login" : "Register"}
                    <p className="text-gray-600 mt-2" style={{ fontSize: "10px" }}>
                      {isLogin ? "Welcome back! Please log in to continue." : "Join us today! Create your account to start exploring."}
                    </p>
                  </div>

                  {/* LOGIN FORM */}
                  {isLogin && (
                    <form onSubmit={handleLogin}>
                      <input type="email" name="email" className="form-control mb-3" value={loginData.email} onChange={handleLoginChange} placeholder="Email address" required />
                      <div className="password-wrapper">
                        <input type={showPassword ? "text" : "password"} name="password" className="form-control mb-3 password-input" value={loginData.password} onChange={handleLoginChange} placeholder="Password" required />
                        <span className="show-hide-btn" onClick={togglePassword}>{showPassword ? "Hide" : "Show"}</span>
                      </div>
                      <button type="submit" className="btn-submit">Login</button>
                    </form>
                  )}

                  {/* REGISTER FORM */}
                  {!isLogin && !showOtp && (
                    <form onSubmit={handleRegister}>
                      <input type="text" name="name" className="form-control mb-3" value={registerData.name} onChange={handleRegisterChange} placeholder="Name" required />
                      <input type="email" name="email" className="form-control mb-3" value={registerData.email} onChange={handleRegisterChange} placeholder="Email address" required />
                      <input type="tel" name="whatsAppNumber" className="form-control mb-3" value={registerData.whatsAppNumber} onChange={handleRegisterChange} placeholder="WhatsApp Number (+919876543210)" required />
                      <div className="password-wrapper">
                        <input type={showPassword ? "text" : "password"} name="password" className="form-control mb-3 password-input" value={registerData.password} onChange={handleRegisterChange} placeholder="Password" required />
                        <span className="show-hide-btn" onClick={togglePassword}>{showPassword ? "Hide" : "Show"}</span>
                      </div>
                      <button type="submit" className="btn-submit">Register</button>
                    </form>
                  )}

                  {/* OTP FORM */}
                  {!isLogin && showOtp && (
                    <form onSubmit={handleVerifyOtp}>
                      <input type="text" name="otp" className="form-control mb-3" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP sent to your WhatsApp" maxLength={6} required />
                      <button type="submit" className="btn-submit">Verify OTP</button>
                    </form>
                  )}

                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={navbarFooterStyle}><Footer /></div>
      </section>
    </>
  );
}

export default Register;
