import React, { useState } from 'react';
import { Home, Inbox, Calendar, Search, Settings, X, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

function Sidebar({ collapsed, onToggle }) {
  const [hidden, setHidden] = useState(false);

const menuItems = [
  { name: "Dashboard", icon: <Home size={18} />, route: "/admin/dashboard" },
   { name: "Program", icon: <Inbox size={18} />, route: "/admin/program" },
  { name: "Contact", icon: <Inbox size={18} />, route: "/admin/contact" },
  { name: "Home", icon: <Calendar size={18} />, route: "/admin/home" },
  { name: "User", icon: <Search size={18} />, route: "/admin/user" },
   { name: "Blog", icon: <Search size={18} />, route: "/admin/blog" },
    { name: "Gallery", icon: <Search size={18} />, route: "/admin/gallery" },
     { name: "Review", icon: <Inbox size={18} />, route: "/admin/review" },
          { name: "About", icon: <Inbox size={18} />, route: "/admin/about" },
  { name: "Settings", icon: <Settings size={18} />, route: "/admin/settings" },
];


  return (
    <>
      {!hidden && (
        <div
          className="bg-dark text-white p-3 vh-100 position-relative shadow-sm"
          style={{
            width: collapsed ? '80px' : '240px',
            transition: 'all 0.3s ease',
            borderRight: '1px solid #222',
            borderRadius: '0px',
            borderTop: '1px solid #e9e9e9ff',
          }}
        >
          {/* Hide Button */}
          <button
            className="btn btn-outline-light btn-sm mb-4 w-25 d-flex align-items-end justify-content-end"
            onClick={() => setHidden(true)}
          >
            {/* <Menu size={20} /> */} Hide
          </button>

          <h6 className="text-muted mb-3">Application</h6>

          <ul className="nav flex-column">
            {menuItems.map((item, i) => (
              <li key={i} className="nav-item mb-2">
                <Link
                to={item?.route}
                  className="nav-link text-white d-flex align-items-center gap-2 p-2 rounded hover-opacity"
                  style={{ transition: '0.2s ease', opacity: 0.9 }}
                >
                  {item.icon}
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Show Button (when hidden) */}
      {hidden && (
        <>
       
          <div
            className="bg-dark text-white p-1 vh-100 position-relative shadow-sm"
            style={{
              width: "60px",
              transition: 'all 0.3s ease',
              borderRight: '1px solid #222',
                borderTop: '1px solid #e9e9e9ff',
              borderRadius: '0px',
            }}
          >

     <button
            className="btn btn-outline-light btn-sm mb-4 w-100 d-flex align-items-end justify-content-end"
            onClick={() => setHidden(false)}
          >
            {/* <Menu size={20} /> */} Show
          </button>
            <h6 className="text-muted mb-3">Application</h6>

            <ul className="nav flex-column">
              {menuItems.map((item, i) => (
                <li key={i} className="nav-item mb-2">
                  <a
                    href="#"
                    className="nav-link text-white d-flex align-items-center gap-2 p-2 rounded hover-opacity"
                    style={{ transition: '0.2s ease', opacity: 0.9 }}
                  >
                    {item.icon}
                    {/* {!collapsed && <span>{item.name}</span>} */}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </>
      )}


    </>
  );
}

export default Sidebar;
