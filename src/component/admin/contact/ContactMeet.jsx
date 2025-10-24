import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../Common/Sidebar';
import Header from '../Common/Header';
// import { getContactMeetThunk } from '../../store/slice/contactMeetSlice'; // Optional if using Redux
// Placeholder data (you can replace this with Redux or API fetch)

const dummyData = [
  {
    _id: '1',
    meet: 'John Meeting',
    image: 'https://via.placeholder.com/50',
    number: '9876543210',
    address: '123 Main St, City',
    email: 'john@example.com',
    heading: 'Support Inquiry',
  },
];

function ContactMeet() {
  const [collapsed, setCollapsed] = useState(false);
  const toggleSidebar = () => setCollapsed(!collapsed);

  // const dispatch = useDispatch();
  // const { contactMeetData, loading, error } = useSelector((state) => state.contactMeet);

  // useEffect(() => {
  //   dispatch(getContactMeetThunk());
  // }, [dispatch]);

  return (
    <div className="bg-black text-white min-vh-100">
      <Header onToggleSidebar={toggleSidebar} />

      <div className="d-flex">
        <Sidebar collapsed={collapsed} onToggle={toggleSidebar} />

        <main className="flex-grow-1 p-4">
          <div className="container">
            <div className="row mb-4">
              <div className="col-md-12">
                <h3 className="text-white">Contact Meet Records</h3>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <table className="table table-dark table-striped table-bordered align-middle">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Meet</th>
                      <th>Image</th>
                      <th>Number</th>
                      <th>Address</th>
                      <th>Email</th>
                      <th>Heading</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dummyData && dummyData.length > 0 ? (
                      dummyData.map((item, index) => (
                        <tr key={item._id}>
                          <td>{index + 1}</td>
                          <td>{item.meet}</td>
                          <td>
                            <img
                              src={item.image}
                              alt="Meet"
                              width="50"
                              height="50"
                              className="rounded"
                            />
                          </td>
                          <td>{item.number}</td>
                          <td>{item.address}</td>
                          <td>{item.email}</td>
                          <td>{item.heading}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center py-3">
                          No records found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ContactMeet;
