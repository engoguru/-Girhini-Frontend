
import React, { useState, useEffect, useRef } from "react";
import Header from "../../component/admin/Common/Header";
import Sidebar from "../../component/admin/Common/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  createProgramThunk,
  fetchAllProgram,
  updateProgramThunk,
  deleteProgramThunk,
} from "../../store/slice/programSlice";
import JoditEditor from "jodit-react";

function Program() {
  const dispatch = useDispatch();
  const { Allprogram, loading } = useSelector((state) => state.program);
  const editor = useRef(null);

  const [collapsed, setCollapsed] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [processing, setProcessing] = useState(false);

  const [programData, setProgramData] = useState({
    programHeading: "",
    programDescription: "",
    targetFund: "",
    raisedFund: 0,
    lastDate: "",
    programType: "other",
    status: "active",
    programImage: [],
    objective: [],
    impacted: [],
  });

  const [images, setImages] = useState([]);

  const toggleSidebar = () => setCollapsed(!collapsed);
console.log(programData,"programData")
  // === Fetch all programs on mount ===
  useEffect(() => {
    dispatch(fetchAllProgram());
  }, [dispatch]);

  // === Handle input changes ===
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProgramData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages(selectedFiles);
  };

  // === Objective Handlers ===
  const addObjective = () => {
    setProgramData((prev) => ({
      ...prev,
      objective: [...prev.objective, { heading: "", description: "" }],
    }));
  };

  const removeObjective = (index) => {
    setProgramData((prev) => ({
      ...prev,
      objective: prev.objective.filter((_, i) => i !== index),
    }));
  };

  const handleObjectiveChange = (index, field, value) => {
    setProgramData((prev) => {
      const updated = [...prev.objective];
      updated[index][field] = value;
      return { ...prev, objective: updated };
    });
  };

  // === Impact Handlers ===
  const addImpact = () => {
    setProgramData((prev) => ({
      ...prev,
      impacted: [...prev.impacted, { heading: "", NumberImapct: "" }],
    }));
  };

  const removeImpact = (index) => {
    setProgramData((prev) => ({
      ...prev,
      impacted: prev.impacted.filter((_, i) => i !== index),
    }));
  };

  const handleImpactChange = (index, field, value) => {
    setProgramData((prev) => {
      const updated = [...prev.impacted];
      updated[index][field] = value;
      return { ...prev, impacted: updated };
    });
  };

  // === Submit form ===
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const formData = new FormData();

      Object.keys(programData).forEach((key) => {
        if (["objective", "impacted", "programImage"].includes(key)) return;
        formData.append(key, programData[key]);
      });

      // Append complex arrays as JSON
      formData.append("objective", JSON.stringify(programData.objective));
      formData.append("impacted", JSON.stringify(programData.impacted));

      if (editMode && programData.programImage?.length > 0) {
        formData.append("existingImages", JSON.stringify(programData.programImage));
      }

      images.forEach((file) => formData.append("programImage", file));
  
      let res;
      if (editMode && selectedProgram?._id) {
        res = await dispatch(updateProgramThunk({ id: selectedProgram._id, formData }));
      } else {
        res = await dispatch(createProgramThunk(formData));
      }

      if (res.payload?.success) {
        alert(editMode ? "Program updated successfully!" : "Program created successfully!");
        setOpenModal(false);
        resetForm();
        dispatch(fetchAllProgram());
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.error("Error creating/updating program:", error);
      alert("Error creating or updating program");
    } finally {
      setProcessing(false);
    }
  };

  const resetForm = () => {
    setEditMode(false);
    setSelectedProgram(null);
    setProgramData({
      programHeading: "",
      programDescription: "",
      targetFund: "",
      raisedFund: 0,
      lastDate: "",
      programType: "other",
      status: "active",
      programImage: [],
      objective: [],
      impacted: [],
    });
    setImages([]);
  };

  const handleEdit = (program) => {
    setEditMode(true);
    setSelectedProgram(program);
    setProgramData({
      programHeading: program.programHeading,
      programDescription: program.programDescription,
      targetFund: program.targetFund,
      raisedFund: program.raisedFund,
      lastDate: program.lastDate?.split("T")[0],
      programType: program.programType,
      status: program.status,
      programImage: program.programImage || [],
      objective: program.objective || [],
      impacted: program.impacted || [],
    });
    setImages([]);
    setOpenModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this program?")) {
      try {
        const res = await dispatch(deleteProgramThunk(id));
        if (res.payload?.success) {
          alert("Program deleted successfully!");
          dispatch(fetchAllProgram());
        } else {
          alert("Failed to delete program");
        }
      } catch (error) {
        console.error("Delete Error:", error);
        alert("Error deleting program");
      }
    }
  };

  return (
    <div className="bg-dark text-light min-vh-100">
      <Header onToggleSidebar={toggleSidebar} />
      <div className="d-flex">
        <Sidebar collapsed={collapsed} onToggle={toggleSidebar} />

        <main className="flex-grow-1 p-4">
          <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-bold">Programs</h3>
              <button
                className="btn btn-success px-4"
                onClick={() => {
                  resetForm();
                  setOpenModal(true);
                }}
              >
                + Create Program
              </button>
            </div>

            <div className="table-responsive shadow rounded">
              <table className="table table-dark table-hover align-middle mb-0">
                <thead className="table-success text-dark">
                  <tr>
                    <th>#</th>
                    <th>Heading</th>
                    <th>Target</th>
                    <th>Raised</th>
                    <th>Last Date</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Allprogram?.data?.length > 0 ? (
                    Allprogram.data.map((p, index) => (
                      <tr key={p._id}>
                        <td>{index + 1}</td>
                        <td className="fw-semibold">{p.programHeading}</td>
                        <td>₹{p.targetFund.toLocaleString()}</td>
                        <td>₹{p.raisedFund.toLocaleString()}</td>
                        <td>{p.lastDate ? new Date(p.lastDate).toLocaleDateString() : "-"}</td>
                        <td className="text-capitalize">{p.programType}</td>
                        <td>
                          <span
                            className={`badge rounded-pill px-3 py-2 ${
                              p.status === "active" ? "bg-success" : "bg-secondary"
                            }`}
                          >
                            {p.status}
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-primary me-1"
                            onClick={() => handleEdit(p)}
                          >
                            Edit
                          </button>

                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(p._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center py-4">
                        No programs found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* === Modal === */}
      {openModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <div className="modal-dialog modal-xl modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
              <div
                className={`modal-header ${
                  editMode ? "bg-primary" : "bg-success"
                } text-white`}
              >
                <h5 className="modal-title">
                  {editMode ? "Edit Program" : "Create Program"}
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setOpenModal(false)}
                ></button>
              </div>

              <div className="modal-body bg-light text-dark">
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    {/* Program Heading */}
                    <div className="col-md-12">
                      <label className="form-label fw-semibold">Program Heading</label>
                      <input
                        type="text"
                        name="programHeading"
                        className="form-control"
                        placeholder="Enter title"
                        value={programData.programHeading}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Description */}
                    <div className="col-md-12">
                      <label className="form-label fw-semibold">Description</label>
                      <JoditEditor
                        ref={editor}
                        value={programData.programDescription}
                        onChange={(newContent) =>
                          handleChange({
                            target: { name: "programDescription", value: newContent },
                          })
                        }
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Target Fund (₹)</label>
                      <input
                        type="number"
                        name="targetFund"
                        className="form-control"
                        value={programData.targetFund}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Last Date</label>
                      <input
                        type="date"
                        name="lastDate"
                        className="form-control"
                        value={programData.lastDate}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Program Type</label>
                      <select
                        name="programType"
                        className="form-select"
                        value={programData.programType}
                        onChange={handleChange}
                      >
                        <option value="education">Education</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="environment">Environment</option>
                        <option value="animal">Animal</option>
                          <option value="Feature">Feature</option>
                            <option value="Causes">Causes</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Status</label>
                      <select
                        name="status"
                        className="form-select"
                        value={programData.status}
                        onChange={handleChange}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option> "completed", "cancelled",
                          <option value="completed">completed</option>
                            <option value="cancelled">cancelled</option>
                      </select>
                    </div>

                    {/* OBJECTIVES */}
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center">
                        <label className="fw-semibold">Program Objectives</label>
                        <button
                          type="button"
                          className="btn btn-sm btn-success"
                          onClick={addObjective}
                        >
                          + Add Objective
                        </button>
                      </div>
                      {programData.objective.map((obj, index) => (
                        <div key={index} className="row mt-2">
                          <div className="col-md-5">
                            <input
                              type="text"
                              placeholder="Heading"
                              className="form-control"
                              value={obj.heading}
                              onChange={(e) =>
                                handleObjectiveChange(index, "heading", e.target.value)
                              }
                            />
                          </div>
                          <div className="col-md-5">
                            <input
                              type="text"
                              placeholder="Description"
                              className="form-control"
                              value={obj.description}
                              onChange={(e) =>
                                handleObjectiveChange(index, "description", e.target.value)
                              }
                            />
                          </div>
                          <div className="col-md-2 d-flex align-items-center">
                            <button
                              type="button"
                              className="btn btn-sm btn-danger"
                              onClick={() => removeObjective(index)}
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* IMPACTS */}
                    <div className="col-12 mt-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <label className="fw-semibold">Program Impacts</label>
                        <button
                          type="button"
                          className="btn btn-sm btn-success"
                          onClick={addImpact}
                        >
                          + Add Impact
                        </button>
                      </div>
                      {programData.impacted.map((imp, index) => (
                        <div key={index} className="row mt-2">
                          <div className="col-md-5">
                            <input
                              type="text"
                              placeholder="Heading"
                              className="form-control"
                              value={imp.heading}
                              onChange={(e) =>
                                handleImpactChange(index, "heading", e.target.value)
                              }
                            />
                          </div>
                          <div className="col-md-5">
                            <input
                              type="number"
                              placeholder="Number"
                              className="form-control"
                              value={imp.NumberImapct}
                              onChange={(e) =>
                                handleImpactChange(index, "NumberImapct", e.target.value)
                              }
                            />
                          </div>
                          <div className="col-md-2 d-flex align-items-center">
                            <button
                              type="button"
                              className="btn btn-sm btn-danger"
                              onClick={() => removeImpact(index)}
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Images */}
                    <div className="col-md-12 mt-3">
                      <label className="form-label fw-semibold">Program Images</label>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="form-control"
                      />

                      <div className="mt-3 d-flex flex-wrap gap-3">
                        {programData?.programImage?.length > 0 &&
                          programData.programImage.map((img, index) => (
                            <div
                              key={`existing-${index}`}
                              className="position-relative border rounded overflow-hidden"
                              style={{ width: "100px", height: "100px" }}
                            >
                              <img
                                src={img.url}
                                alt="existing"
                                className="w-100 h-100 object-fit-cover"
                              />
                              <button
                                type="button"
                                className="btn btn-sm btn-danger position-absolute top-0 end-0 m-1"
                                onClick={() =>
                                  setProgramData((prev) => ({
                                    ...prev,
                                    programImage: prev.programImage.filter(
                                      (_, i) => i !== index
                                    ),
                                  }))
                                }
                              >
                                ×
                              </button>
                            </div>
                          ))}

                        {images.map((file, index) => {
                          const imageUrl = URL.createObjectURL(file);
                          return (
                            <div
                              key={`new-${index}`}
                              className="position-relative border rounded overflow-hidden"
                              style={{ width: "100px", height: "100px" }}
                            >
                              <img
                                src={imageUrl}
                                alt="new"
                                className="w-100 h-100 object-fit-cover"
                              />
                              <button
                                type="button"
                                className="btn btn-sm btn-danger position-absolute top-0 end-0 m-1"
                                onClick={() =>
                                  setImages((prev) =>
                                    prev.filter((_, i) => i !== index)
                                  )
                                }
                              >
                                ×
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-end mt-4">
                    <button
                      type="button"
                      className="btn btn-outline-secondary me-2 px-4"
                      onClick={() => setOpenModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-success px-4 fw-semibold"
                      disabled={processing}
                    >
                      {processing
                        ? "Processing..."
                        : editMode
                        ? "Update Program"
                        : "Save Program"}
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

export default Program;
