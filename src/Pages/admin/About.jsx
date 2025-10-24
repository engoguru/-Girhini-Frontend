import React, { useEffect, useState, useRef } from 'react';
import Sidebar from '../../component/admin/Common/Sidebar';
import Header from '../../component/admin/Common/Header';
import { useDispatch, useSelector } from 'react-redux';
import { createAbout, fetchAllAbout, deleteAbout, updateAbout } from '../../store/slice/aboutSlice';
import JoditEditor from 'jodit-react';

function About() {
  const [collapsed, setCollapsed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const editor = useRef(null);

  const [formData, setFormData] = useState({
    heading: '',
    content: '',
    savings: '',
    totalRaised: '',
    communityReached: '',
    targetAchived: '',
    aboutImage: null,
    aboutVideo: null,
    volunteerImage: [],
  });

  const dispatch = useDispatch();
  const { aboutAll, loading, error, successMessage } = useSelector((state) => state.about);

  useEffect(() => {
    dispatch(fetchAllAbout());
  }, [dispatch]);

  const handleSidebarToggle = () => setCollapsed(!collapsed);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'volunteerImage') {
      setFormData((prev) => ({ ...prev, [name]: files }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const resetForm = () => {
    setFormData({
      heading: '',
      content: '',
      savings: '',
      totalRaised: '',
      communityReached: '',
      targetAchived: '',
      aboutImage: null,
      aboutVideo: null,
      volunteerImage: [],
    });
    setIsEditing(false);
    setEditId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const submitData = new FormData();
    submitData.append('heading', formData.heading);
    submitData.append('content', formData.content);
    submitData.append('savings', formData.savings);
    submitData.append('totalRaised', formData.totalRaised);
    submitData.append('communityReached', formData.communityReached);
    submitData.append('targetAchived', formData.targetAchived);

    if (formData.aboutImage) submitData.append('aboutImage', formData.aboutImage);
    if (formData.aboutVideo) submitData.append('aboutVideo', formData.aboutVideo);
    if (formData.volunteerImage.length > 0) {
      Array.from(formData.volunteerImage).forEach((file) => {
        submitData.append('volunteerImage', file);
      });
    }

    if (isEditing) {
      // UPDATE MODE
      dispatch(updateAbout({ id: editId, formData: submitData })).then(() => {
        dispatch(fetchAllAbout());
        resetForm();
        setShowModal(false);
      });
    } else {
      // CREATE MODE
      dispatch(createAbout(submitData)).then(() => {
        dispatch(fetchAllAbout());
        resetForm();
        setShowModal(false);
      });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this About entry?')) {
      dispatch(deleteAbout(id));
    }
  };

  const handleEdit = (item) => {
    setIsEditing(true);
    setEditId(item._id);
    setShowModal(true);

    setFormData({
      heading: item.AboutContent?.heading || '',
      content: item.AboutContent?.content || '',
      savings: item.achived?.savings || '',
      totalRaised: item.achived?.totalRaised || '',
      communityReached: item.achived?.communityReached || '',
      targetAchived: item.achived?.targetAchived || '',
      aboutImage: null,
      aboutVideo: null,
      volunteerImage: [],
    });
  };

  return (
    <div className="bg-black text-white min-vh-100">
      <Header onToggleSidebar={handleSidebarToggle} />
      <div className="d-flex">
        <Sidebar collapsed={collapsed} onToggle={handleSidebarToggle} />

        <main className="flex-grow-1 p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4>Manage About Section</h4>
            <button
              className="btn btn-warning"
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
            >
              + Add About Content
            </button>
          </div>

          {loading && <div className="alert alert-info">Loading...</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}

          <div className="table-responsive bg-dark rounded shadow-sm p-3">
            <table className="table table-bordered table-hover text-white align-middle">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Heading</th>
                  {/* <th>Content</th> */}
                  <th>Savings</th>
                  <th>Video</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {aboutAll.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center text-secondary">
                      No About entries found
                    </td>
                  </tr>
                )}
                {aboutAll.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.AboutContent?.heading}</td>
                    {/* <td> */}
                      {/* <div
                        dangerouslySetInnerHTML={{
                          __html:
                            item.AboutContent?.content?.slice(0, 80) +
                            (item.AboutContent?.content?.length > 80 ? '...' : ''),
                        }}
                      /> */}
                    {/* </td> */}
                    <td>{item.achived?.savings}</td>
                    <td>
                      {item.aboutVideo?.url ? (
                        <a href={item.aboutVideo.url} target="_blank" rel="noreferrer">
                          View Video
                        </a>
                      ) : (
                        'No Video'
                      )}
                    </td>
                    <td>
                      {item.aboutImage?.url && (
                        <img
                          src={item.aboutImage.url}
                          alt="about"
                          width="60"
                          height="60"
                          style={{ objectFit: 'cover' }}
                          className="rounded"
                        />
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => handleEdit(item)}
                        className="btn btn-sm btn-info me-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="btn btn-sm btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* Modal (Create / Edit) */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div className="modal-content bg-dark text-white">
              <div className="modal-header">
                <h5 className="modal-title">
                  {isEditing ? 'Edit About Entry' : 'Add About Entry'}
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="modal-body row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Heading</label>
                    <input
                      type="text"
                      className="form-control"
                      name="heading"
                      value={formData.heading}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Jodit Editor for Rich Text */}
                  <div className="col-md-12">
                    <label className="form-label">Content</label>
                    <JoditEditor
                      ref={editor}
                      value={formData.content}
                      tabIndex={1}
                      onBlur={(newContent) =>
                        setFormData((prev) => ({ ...prev, content: newContent }))
                      }
                      onChange={() => {}}
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">Savings</label>
                    <input
                      type="text"
                      className="form-control"
                      name="savings"
                      value={formData.savings}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Total Raised</label>
                    <input
                      type="text"
                      className="form-control"
                      name="totalRaised"
                      value={formData.totalRaised}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Community Reached</label>
                    <input
                      type="text"
                      className="form-control"
                      name="communityReached"
                      value={formData.communityReached}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Target Achieved</label>
                    <input
                      type="text"
                      className="form-control"
                      name="targetAchived"
                      value={formData.targetAchived}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">About Image</label>
                    <input
                      type="file"
                      className="form-control"
                      name="aboutImage"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">About Video</label>
                    <input
                      type="file"
                      className="form-control"
                      name="aboutVideo"
                      accept="video/*"
                      onChange={handleFileChange}
                    />
                  </div>

                  <div className="col-md-12">
                    <label className="form-label">Volunteer Images</label>
                    <input
                      type="file"
                      className="form-control"
                      name="volunteerImage"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="submit" className="btn btn-success">
                    {isEditing ? 'Update' : 'Submit'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default About;
