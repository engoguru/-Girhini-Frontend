import React from "react";
import { Bell, User, Menu } from "lucide-react";

function Header({ onToggleSidebar }) {
  return (
    <header className="d-flex justify-content-between align-items-center bg-dark text-white px-4 py-2 shadow-sm">
      <div className="d-flex align-items-center gap-3">
        <button className="btn btn-outline-light btn-sm d-md-none" onClick={onToggleSidebar}>
          <Menu size={18} />
        </button>
        <h5 className="m-0">Dashboard</h5>
      </div>

      <div className="d-flex align-items-center gap-3">
        <Bell size={18} className="cursor-pointer" />
        <User size={18} className="cursor-pointer" />
      </div>
    </header>
  );
}

export default Header;
