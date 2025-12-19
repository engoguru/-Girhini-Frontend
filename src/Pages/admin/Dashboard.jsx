import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../component/admin/Common/Sidebar";
import Header from "../../component/admin/Common/Header";

import axios from "axios";
import baseUrl from "../../utils/baseurl";

import { fetchAllProgram } from "../../store/slice/programSlice";
import { getContactsThunk } from "../../store/slice/contactSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
const [user,setUser]=useState(0)
const[logs,setLogs]=useState(null)
  // Redux state
  const { contactAll, loading: contactLoading } = useSelector(
    (state) => state.contact
  );

  const { Allprogram, loading: programLoading } = useSelector(
    (state) => state.program
  );

  const toggleSidebar = () => setCollapsed(!collapsed);

  // Fetch Programs
  useEffect(() => {
    dispatch(fetchAllProgram());
    handleData()
  }, [dispatch]);

  // Fetch Contacts
  useEffect(() => {
    dispatch(getContactsThunk());
  }, [dispatch]);



  const handleData=async(req,res)=>{
    try {
      const loggerData=await axios.get(`${baseUrl}/getAll-log`)
      const totaluser=await axios.get(`${baseUrl}/api/auth/getAll`)
  setUser(totaluser?.data?.totalUsers)
  setLogs(loggerData?.data?.data)

    } catch (error) {
      
    }
  }

  // --- COUNTS ---
console.log(user,logs,"ooo")
  // Total Programs
  const programCount = Allprogram?.data?.length || 0;

  // Total Contacts
  const totalContacts = contactAll?.data?.length || 0;

  // Contacts in the current month
  const currentMonth = new Date().getMonth(); // 0-11
  const currentYear = new Date().getFullYear();

  const monthlyContacts =
    contactAll?.data?.filter((c) => {
      const date = new Date(c.createdAt);
      return (
        date.getMonth() === currentMonth && date.getFullYear() === currentYear
      );
    }).length || 0;

  return (
    <div className="bg-black text-white min-vh-100">
      <Header onToggleSidebar={toggleSidebar} />

      <div className="d-flex">
        <Sidebar collapsed={collapsed} onToggle={toggleSidebar} />

        {/* MAIN CONTENT */}
        <main className="flex-grow-1 p-4">
          <h2 className="mb-4 fw-bold">Dashboard Overview</h2>

          {/* Cards */}
          <div className="row g-4">
            {/* Total Programs */}
            <div className="col-md-4">
              <div className="bg-dark rounded p-4 shadow-lg text-center">
                <h4 className="fw-bold text-primary">Total Programs</h4>
                <p className="display-5 fw-bold">{programCount}</p>
              </div>
            </div>

            {/* Total Contacts */}
            <div className="col-md-4">
              <div className="bg-dark rounded p-4 shadow-lg text-center">
                <h4 className="fw-bold text-success">Total Contacts</h4>
                <p className="display-5 fw-bold">{totalContacts}</p>
              </div>
            </div>

            {/* Monthly Contacts */}
            <div className="col-md-4">
              <div className="bg-dark rounded p-4 shadow-lg text-center">
                <h4 className="fw-bold text-warning">total user</h4>
                <p className="display-5 fw-bold">{user}</p>
              </div>
            </div>
          </div>


<div className="">
     <h3 className="mb-4 fw-bolder text-start mt-3">Donation Overview</h3>
     <h3 className="mb-4 fw-bolder text-start mt-3">Api error Overview</h3>
</div>
          {/*Loading indicator */}
          {(contactLoading || programLoading) && (
            <div className="text-center mt-4">
              <div className="spinner-border text-light"></div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
