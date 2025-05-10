import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaBook, FaFileUpload, FaCalendarAlt, FaSearch, FaFilter, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import axios from 'axios';

const StudentAssignmentsPage = () => {
  const [assignments, setAssignments] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentAssignment, setCurrentAssignment] = useState(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        const response = await axios.get(`/api/assignments/student`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAssignments(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load assignments');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  const filteredAssignments = assignments.filter(assignment => {
    if (filter === 'submitted' && !assignment.submitted) return false;
    if (filter === 'pending' && assignment.submitted) return false;
    if (searchTerm && !assignment.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const openSubmitModal = (assignment) => {
    setCurrentAssignment(assignment);
    setShowSubmitModal(true);
    setSelectedFile(null);
  };

  const handleSubmitAssignment = async () => {
    if (!selectedFile) {
      alert('Please select a file to upload');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('comments', 'Submitted via student portal');

      const token = localStorage.getItem('token');
      const response = await axios.post(
        `/api/assignments/${currentAssignment._id}/submit`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setAssignments(assignments.map(a => 
        a._id === currentAssignment._id ? { 
          ...a, 
          submitted: true,
          submission: response.data 
        } : a
      ));

      setShowSubmitModal(false);
      alert('Assignment submitted successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Submission failed');
    }
  };

  const downloadAttachment = async (filename) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/assignments/download/${filename}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert('Failed to download file: ' + (err.response?.data?.message || err.message));
    }
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <FaSpinner className="spinner" size={30} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger m-4">
        {error}
      </div>
    );
  }

  return (
    <div className="assignments-container">
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">
            <FaBook className="me-2 text-primary" />
            My Assignments
          </h2>
        </div>

        {/* Filters and Search */}
        <div className="row mb-4">
          <div className="col-md-6 mb-3 mb-md-0">
            <div className="input-group">
              <span className="input-group-text bg-white">
                <FaSearch />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search assignments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text bg-white">
                <FaFilter />
              </span>
              <select
                className="form-select"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Assignments</option>
                <option value="submitted">Submitted</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
        </div>

        {/* Assignments List */}
        <div className="row">
          {filteredAssignments.length > 0 ? (
            filteredAssignments.map(assignment => (
              <div key={assignment._id} className="col-md-6 col-lg-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-header bg-white">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">{assignment.title}</h5>
                      {assignment.submitted ? (
                        <span className="badge bg-success">
                          <FaCheckCircle className="me-1" />
                          Submitted
                        </span>
                      ) : (
                        <span className="badge bg-warning text-dark">
                          Pending
                        </span>
                      )}
                    </div>
                    <small className="text-muted">{assignment.class?.title}</small>
                  </div>
                  <div className="card-body">
                    <p className="card-text">{assignment.description}</p>
                    <div className="mb-3">
                      <h6>Materials:</h6>
                      <ul className="list-unstyled">
                        {assignment.attachments.map((file, index) => (
                          <li key={index}>
                            <button 
                              className="btn btn-link text-decoration-none p-0 text-start"
                              onClick={() => downloadAttachment(file.filename)}
                            >
                              <FaFileUpload className="me-2" />
                              {file.originalname}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {assignment.submitted && (
                      <div className="mb-3">
                        <h6>Your Submission:</h6>
                        <p>
                          <FaFileUpload className="me-2" />
                          {assignment.submission.file.originalname} (Submitted on {new Date(assignment.submission.submittedAt).toLocaleDateString()})
                        </p>
                        {assignment.submission.grade && (
                          <div className="alert alert-success">
                            <strong>Grade: {assignment.submission.grade}</strong>
                            {assignment.submission.tutorFeedback && (
                              <div className="mt-1">{assignment.submission.tutorFeedback}</div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="card-footer bg-white">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <FaCalendarAlt className="me-2 text-muted" />
                        <small className="text-muted">Due: {new Date(assignment.dueDate).toLocaleDateString()}</small>
                      </div>
                      {!assignment.submitted ? (
                        <button 
                          className="btn btn-sm btn-primary"
                          onClick={() => openSubmitModal(assignment)}
                        >
                          Submit
                        </button>
                      ) : (
                        <button 
                          className="btn btn-sm btn-outline-secondary"
                          disabled
                        >
                          Submitted
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <h4 className="text-muted">No assignments found</h4>
              <p>Try adjusting your filters or search term</p>
            </div>
          )}
        </div>
      </div>

      {/* Submit Assignment Modal */}
      {showSubmitModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Submit Assignment: {currentAssignment?.title}</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowSubmitModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="submissionFile" className="form-label">Upload your file</label>
                  <input 
                    id="submissionFile"
                    type="file" 
                    className="form-control" 
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.txt,.zip"
                  />
                  <div className="form-text">Accepted formats: PDF, DOC, DOCX, TXT, ZIP (Max 10MB)</div>
                </div>
                {selectedFile && (
                  <div className="alert alert-info mt-3">
                    Selected file: <strong>{selectedFile.name}</strong> ({Math.round(selectedFile.size / 1024)} KB)
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowSubmitModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  onClick={handleSubmitAssignment}
                  disabled={!selectedFile}
                >
                  Submit Assignment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentAssignmentsPage;