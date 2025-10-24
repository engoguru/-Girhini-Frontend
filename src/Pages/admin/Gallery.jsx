import React, { useEffect, useState } from 'react';
import Sidebar from '../../component/admin/Common/Sidebar';
import Header from '../../component/admin/Common/Header';
import { useDispatch, useSelector } from 'react-redux';
import { createGallery, fetchAllGallery, updateGallery } from '../../store/slice/gallerySlice';

function Gallery() {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const { galleryAll, loading, error } = useSelector((state) => state.gallery);

  const toggleSidebar = () => setCollapsed(!collapsed);

  useEffect(() => {
    dispatch(fetchAllGallery());
  }, [dispatch]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    const previewUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviews(previewUrls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) return alert("Please select at least one image");

    const formData = new FormData();
    files.forEach((file) => formData.append("galleryImage", file));

    if (galleryAll.length === 0) {
      // No gallery exists, create a new one
      await dispatch(createGallery(formData));
    } else {
      // Gallery exists, update the first one
      const galleryId = galleryAll[0]._id;
      await dispatch(updateGallery({ id: galleryId, formData }));
    }

    setFiles([]);
    setPreviews([]);
    setShowModal(false);
    dispatch(fetchAllGallery());
  };

  const handleModalClose = () => {
    setShowModal(false);
    setFiles([]);
    setPreviews([]);
  };

  const handleDeleteImage = async (galleryId, public_id) => {
    const formData = new FormData();
    formData.append("deletePublicIds[]", public_id);
    await dispatch(updateGallery({ id: galleryId, formData }));
    dispatch(fetchAllGallery());
  };

  return (
    <div className="bg-black text-white min-vh-100">
      <Header onToggleSidebar={toggleSidebar} />

      <div className="d-flex">
        <Sidebar collapsed={collapsed} onToggle={toggleSidebar} />

        <main className="flex-grow-1 p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Gallery</h2>
            <button
              className="btn btn-primary"
              onClick={() => setShowModal(true)}
            >
              + {galleryAll.length === 0 ? "Create" : "Add To"} Gallery
            </button>
          </div>

          {loading && <div className="text-light">Loading...</div>}
          {error && <p className="text-danger">{error}</p>}

          {/* Show "No Gallery Yet" */}
          {galleryAll.length === 0 && !loading && (
            <div className="text-center text-muted py-5">
              <h4>No images in the gallery yet.</h4>
              <p>Click the "+ Create Gallery" button to get started.</p>
            </div>
          )}

          {/* Image Gallery Grid */}
          <div className="row g-3">
            {galleryAll?.map((gallery, gIndex) =>
              gallery.galleryImage?.map((img, i) => (
                <div className="col-md-3 position-relative" key={`${gIndex}-${i}`}>
                  <img
                    src={img.url}
                    alt={`Gallery ${gIndex}-${i}`}
                    className="img-fluid rounded shadow"
                  />
                  <button
                    type="button"
                    className="btn btn-danger btn-sm position-absolute top-0 end-0 m-1"
                    style={{ zIndex: 10 }}
                    onClick={() => handleDeleteImage(gallery._id, img.public_id)}
                  >
                    &times;
                  </button>
                </div>
              ))
            )}
          </div>
        </main>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content text-dark">
              <div className="modal-header">
                <h5 className="modal-title">
                  {galleryAll.length === 0 ? "Create Gallery" : "Add Images to Gallery"}
                </h5>
                <button type="button" className="btn-close" onClick={handleModalClose}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Upload Images</label>
                    <input
                      type="file"
                      className="form-control"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>

                  {/* Preview */}
                  {previews.length > 0 && (
                    <div className="mb-3">
                      <label className="form-label">Preview</label>
                      <div className="row g-2">
                        {previews.map((src, i) => (
                          <div className="col-3" key={i}>
                            <img
                              src={src}
                              alt={`Preview ${i}`}
                              className="img-fluid rounded border"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="text-end">
                    <button
                      type="button"
                      className="btn btn-secondary me-2"
                      onClick={handleModalClose}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {galleryAll.length === 0 ? "Create Gallery" : "Add Images"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;
