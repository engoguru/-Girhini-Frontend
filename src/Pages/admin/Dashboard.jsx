import React, { useState } from 'react';
import Sidebar from '../../component/admin/Common/Sidebar';
import Header from '../../component/admin/Common/Header';

function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <div className="bg-black text-white min-vh-100">
      <Header onToggleSidebar={toggleSidebar} />

      <div className="d-flex">
        {/* Sidebar */}
        <Sidebar collapsed={collapsed} onToggle={toggleSidebar} />

        {/* Main Content */}
        <main className="flex-grow-1 p-4">
          <div className="row g-3">
            <div className="col-md-4">
              <div className="bg-dark rounded p-4 shadow-sm">Content Block 1</div>
            </div>
            <div className="col-md-4">
              <div className="bg-dark rounded p-4 shadow-sm">Content Block 2</div>
            </div>
            <div className="col-md-4">
              <div className="bg-dark rounded p-4 shadow-sm">Content Block 3</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
