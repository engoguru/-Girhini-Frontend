import React, { useState, useEffect, useRef } from 'react';
import Header from '../../component/admin/Common/Header';
import Sidebar from '../../component/admin/Common/Sidebar';
import { useDispatch } from 'react-redux';
import { createBlog } from '../../store/slice/blogSlice';
import axios from 'axios';
import JoditEditor from 'jodit-react';

function Blog() {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const editor = useRef(null);

  const [formData, setFormData] = useState({
    heading: '',
    description: '',
    blogImage: null,
    category: '',
  });

  const toggleSidebar = () => setCollapsed(!collapsed);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/api/blogs');
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'blogImage') {
      setFormData({ ...formData, blogImage: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDescriptionChange = (newContent) => {
    setFormData({ ...formData, description: newContent });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append('heading', formData.heading);
      form.append('description', formData.description);
      form.append('blogImage', formData.blogImage);
      form.append('category', formData.category);

      await dispatch(createBlog(form));

      setShowModal(false);
      setFormData({
        heading: '',
        description: '',
        blogImage: null,
        category: '',
      });
      fetchBlogs();
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  return (
    <>
      <div className="bg-black text-white min-vh-100">
        <Header onToggleSidebar={toggleSidebar} />
        <div className="d-flex">
          <Sidebar collapsed={collapsed} onToggle={toggleSidebar} />

          <main className="flex-grow-1 p-4">
            <div className="container">
              <div className="row mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <h2>Blogs</h2>
                  <button
                    className="btn btn-primary"
                    onClick={() => setShowModal(true)}
                  >
                    Create Blog
                  </button>
                </div>
              </div>

              {/* <div className="row">
                <table className="table table-dark table-striped align-middle">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Heading</th>
                      <th>Category</th>
                      <th>Description</th>
                      <th>Image</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogs?.length > 0 ? (
                      blogs.map((blog, index) => (
                        <tr key={blog._id}>
                          <td>{index + 1}</td>
                          <td>{blog.heading}</td>
                          <td>{blog.category}</td>
                          <td>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  blog.description?.substring(0, 100) + '...',
                              }}
                            />
                          </td>
                          <td>
                            <img
                              src={blog.blogImage?.url}
                              alt="Blog"
                              width="100"
                              style={{ objectFit: 'cover' }}
                            />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">
                          No blogs found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div> */}
            </div>
          </main>
        </div>
      </div>

      {/* Modal for creating blog */}
      {showModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content text-black">
              <div className="modal-header">
                <h5 className="modal-title">Create New Blog</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Heading</label>
                    <input
                      type="text"
                      className="form-control"
                      name="heading"
                      value={formData.heading}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Category</label>
                    <select
                      className="form-control"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="Education">Education</option>
                      <option value="Health">Health</option>
                      <option value="Humanitarian">Humanitarian</option>
                      <option value="Environment">Environment</option>
                      <option value="Animal Welfare">Animal Welfare</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <JoditEditor
                      ref={editor}
                      value={formData.description}
                      onChange={handleDescriptionChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Blog Image</label>
                    <input
                      type="file"
                      className="form-control"
                      name="blogImage"
                      accept="image/*"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="submit" className="btn btn-success">
                    Submit
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Blog;
