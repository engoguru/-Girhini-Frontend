import React, { useEffect, useState } from 'react';
import Sidebar from '../../component/admin/Common/Sidebar';
import Header from '../../component/admin/Common/Header';
import { useDispatch, useSelector } from 'react-redux';
// import { createreview, getAllreview, deletereview } from '../../redux/slices/reviewSlice';
import { createreview,getAllreview,deletereview } from '../../store/slice/reviewSlice';

function Review() {
  const [collapsed, setCollapsed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    organization: '',
    rating: '',
    description: '',
    profileImage: null,
  });

  const dispatch = useDispatch();
  const { reviewFetch, loading } = useSelector((state) => state.review);

  useEffect(() => {
    dispatch(getAllreview());
  }, [dispatch]);

  const toggleSidebar = () => setCollapsed(!collapsed);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profileImage') {
      setFormData({ ...formData, profileImage: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCreateReview = (e) => {
    e.preventDefault();
    const newForm = new FormData();
    for (let key in formData) {
      newForm.append(key, formData[key]);
    }
    dispatch(createreview(newForm)).then(() => {
      setShowModal(false);
      setFormData({
        name: '',
        country: '',
        organization: '',
        rating: '',
        description: '',
        profileImage: null,
      });
      dispatch(getAllreview());
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      dispatch(deletereview(id));
    }
  };

  return (
    <div className="bg-black text-white min-vh-100">
      <Header onToggleSidebar={toggleSidebar} />

      <div className="d-flex">
        <Sidebar collapsed={collapsed} onToggle={toggleSidebar} />

        <main className="flex-grow-1 p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>All Reviews</h2>
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
              Add Review
            </button>
          </div>

          <div className="table-responsive">
            <table className="table table-dark table-striped table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Country</th>
                  <th>Organization</th>
                  <th>Rating</th>
                  <th>Description</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="8" className="text-center">Loading...</td>
                  </tr>
                ) : reviewFetch.length > 0 ? (
                  reviewFetch.map((review, index) => (
                    <tr key={review._id}>
                      <td>{index + 1}</td>
                      <td>{review.name}</td>
                      <td>{review.country}</td>
                      <td>{review.organization}</td>
                      <td>{review.rating}</td>
                      <td>{review.description}</td>
                      <td>
                        <img
                          src={review.profileImage?.url}
                          alt="Profile"
                          style={{ width: "50px", height: "50px", objectFit: "cover" }}
                          className="rounded-circle"
                        />
                      </td>
                      <td>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(review._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center">No reviews found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* Bootstrap Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content bg-dark text-white">
              <div className="modal-header">
                <h5 className="modal-title">Add New Review</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleCreateReview} encType="multipart/form-data">
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Name</label>
                      <input type="text" name="name" className="form-control" required value={formData.name} onChange={handleInputChange} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Country</label>
                      <input type="text" name="country" className="form-control" required value={formData.country} onChange={handleInputChange} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Organization</label>
                      <input type="text" name="organization" className="form-control" value={formData.organization} onChange={handleInputChange} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Rating (1–5)</label>
                      <input type="number" name="rating" className="form-control" required min="1" max="5" value={formData.rating} onChange={handleInputChange} />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Description</label>
                      <textarea name="description" className="form-control" required rows="3" value={formData.description} onChange={handleInputChange}></textarea>
                    </div>
                    <div className="col-12">
                      <label className="form-label">Profile Image</label>
                      <input type="file" name="profileImage" className="form-control" accept="image/*" required onChange={handleInputChange} />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Save Review</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Review;
