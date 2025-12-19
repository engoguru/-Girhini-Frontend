import React, { useState, useRef, useEffect } from "react";
import { Bell, User, Menu } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import baseUrl from "../../../utils/baseurl";
// import { fetchUser } from "../../../store/slice/userSlice";
import { logoutUser } from "../../../store/slice/userSlice";
import { useDispatch } from "react-redux";

function Header({ onToggleSidebar }) {
const dispatch=useDispatch()

  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

  return (
    <header className="d-flex justify-content-between align-items-center bg-dark text-white px-4 py-2 shadow-sm">
      <div className="d-flex align-items-center gap-3">
        <button
          className="btn btn-outline-light btn-sm d-md-none"
          onClick={onToggleSidebar}
        >
          <Menu size={18} />
        </button>
        <h5 className="m-0">Dashboard</h5>
      </div>

      <div
        className="d-flex align-items-center gap-3 position-relative"
        ref={menuRef}
      >
        <Bell size={18} className="cursor-pointer" />

        <User
          size={18}
          className="cursor-pointer"
          onClick={() => setShowMenu((prev) => !prev)}
        />

        {showMenu && (
          <div
            className="position-absolute bg-white text-dark p-2 rounded shadow"
            style={{
              top: "35px",
              right: "0px",
              minWidth: "120px",
              zIndex: 1000,
            }}
          >
            <button className="btn btn-sm btn-danger w-100" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
