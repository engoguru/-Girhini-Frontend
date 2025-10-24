
import React, { useEffect, useState } from 'react';
import Sidebar from '../../component/admin/Common/Sidebar';
import Header from '../../component/admin/Common/Header';
import { getContactsThunk } from '../../store/slice/contactSlice';
import { useDispatch,useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
function Contact() {
  const dispatch=useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  

// Access Redux state
  const { contactAll, loading, error } = useSelector((state) => state.contact);

  // Fetch contacts on mount
  useEffect(() => {
    dispatch(getContactsThunk());
  }, [dispatch]);

  console.log(contactAll, "Fetched Contacts");
  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <div className="bg-black text-white min-vh-100">
      <Header onToggleSidebar={toggleSidebar} />

      <div className="d-flex">
        {/* Sidebar */}
        <Sidebar collapsed={collapsed} onToggle={toggleSidebar} />

        {/* Main Content */}
     
        <main className="flex-grow-1 p-4">

   <div className="container">
    <div className="row ms-auto">
      
     
  <Link to={"/admin/contact/contact-meet"}>Contact-Meet</Link>


    </div>
   </div>

          <div className="row g-5">
<table className="table table-dark table-striped align-middle">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Contact</th>
      <th scope="col">Category</th>
      <th scope="col">Message</th>
    </tr>
  </thead>
  <tbody>
    {contactAll && contactAll?.data?.length > 0 ? (
      contactAll?.data?.map((item, index) => (
        <tr key={item._id}>
          <th scope="row">{index + 1}</th>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td>{item.contact}</td>
          <td>{item.category}</td>
          <td>{item.message}</td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="6" className="text-center py-3">
          No contacts found
        </td>
      </tr>
    )}
  </tbody>
</table>


          </div>
        </main>
      </div>
    </div>
  );
}

export default Contact;
