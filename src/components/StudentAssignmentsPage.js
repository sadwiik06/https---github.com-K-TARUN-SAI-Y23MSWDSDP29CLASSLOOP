import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
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

=======
import { 
  FaBook, FaFileUpload, FaCalendarAlt, FaSpinner, 
  FaCheck, FaTimes, FaFileDownload, FaUserTie 
} from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StudentAssignmentsPage = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
>>>>>>> b4b2c8c1abf4516ff065ddb8b69d14ed5b04e531
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const res = await axios.get('/api/assignments/student', config);
      setAssignments(res.data);
    } catch (error) {
      toast.error('Failed to fetch assignments');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
<<<<<<< HEAD
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
=======
    setFile(e.target.files[0]);
  };

  const handleSubmitAssignment = async (assignmentId) => {
    if (!file) {
      toast.error('Please select a file to submit');
>>>>>>> b4b2c8c1abf4516ff065ddb8b69d14ed5b04e531
      return;
    }

    try {
<<<<<<< HEAD
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
=======
      setSubmitting(assignmentId);
      const formData = new FormData();
      formData.append('submission', file);

      const token = localStorage.getItem('token');
      const res = await axios.post(`/api/assignments/${assignmentId}/submit`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      setAssignments(assignments.map(a => 
        a._id === assignmentId ? res.data : a
      ));
      setFile(null);
      document.getElementById(`file-input-${assignmentId}`).value = '';
      toast.success('Assignment submitted successfully');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to submit assignment');
      console.error('Error:', error);
    } finally {
      setSubmitting(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getFileIcon = (filename) => {
    if (!filename) return 'text-secondary';
    const ext = filename.split('.').pop().toLowerCase();
    if (['pdf'].includes(ext)) return 'text-danger';
    if (['doc', 'docx'].includes(ext)) return 'text-primary';
    if (['ppt', 'pptx'].includes(ext)) return 'text-warning';
    if (['xls', 'xlsx'].includes(ext)) return 'text-success';
    return 'text-secondary';
  };

  const getStatusBadge = (assignment, submission) => {
    const now = new Date();
    const dueDate = new Date(assignment.dueDate);
    
    if (submission) {
      return submission.grade ? (
        <span className="badge bg-success">Graded: {submission.grade}</span>
      ) : (
        <span className="badge bg-info">Submitted</span>
      );
    } else if (now > dueDate) {
      return <span className="badge bg-danger">Past Due</span>;
    } else {
      return <span className="badge bg-warning text-dark">Pending</span>;
>>>>>>> b4b2c8c1abf4516ff065ddb8b69d14ed5b04e531
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
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          <FaBook className="me-2 text-primary" />
          My Assignments
        </h2>
      </div>

<<<<<<< HEAD
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
=======
      {loading ? (
        <div className="text-center py-5">
          <FaSpinner className="fa-spin me-2" size={24} />
          <span>Loading assignments...</span>
>>>>>>> b4b2c8c1abf4516ff065ddb8b69d14ed5b04e531
        </div>
      ) : assignments.length > 0 ? (
        <div className="row">
<<<<<<< HEAD
          {filteredAssignments.length > 0 ? (
            filteredAssignments.map(assignment => (
              <div key={assignment._id} className="col-md-6 col-lg-4 mb-4">
                <div className="card h-100 shadow-sm">
=======
          {assignments.map(assignment => {
            const submission = assignment.submissions.find(
              sub => sub.student._id === JSON.parse(localStorage.getItem('user'))._id
            );
            const isPastDue = new Date() > new Date(assignment.dueDate);
            
            return (
              <div key={assignment._id} className="col-md-6 mb-4">
                <div className={`card h-100 shadow-sm ${isPastDue && !submission ? 'border-danger' : ''}`}>
>>>>>>> b4b2c8c1abf4516ff065ddb8b69d14ed5b04e531
                  <div className="card-header bg-white">
                    <h5 className="mb-1">{assignment.title}</h5>
                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-muted">
                        <FaUserTie className="me-1" />
                        {assignment.tutor?.name}
                      </small>
                      {getStatusBadge(assignment, submission)}
                    </div>
<<<<<<< HEAD
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
=======
                  </div>
                  <div className="card-body">
                    <p className="card-text">{assignment.description}</p>
                    
                    {/* Assignment Materials */}
                    {assignment.attachments.length > 0 && (
                      <div className="mb-4">
                        <h6 className="d-flex align-items-center">
                          <FaFileDownload className="me-2" />
                          Assignment Files
                        </h6>
                        <div className="list-group">
                          {assignment.attachments.map((file, index) => (
                            <a 
                              key={index}
                              href={file.startsWith('uploads/') ? `/${file}` : `/uploads/${file}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="list-group-item list-group-item-action d-flex align-items-center"
                            >
                              <span className={`me-2 ${getFileIcon(file)}`}>
                                <FaFileDownload />
                              </span>
                              {file.split('/').pop()}
                            </a>
                          ))}
                        </div>
>>>>>>> b4b2c8c1abf4516ff065ddb8b69d14ed5b04e531
                      </div>
                    )}

                    {/* Submission Section */}
                    <div className="mb-3">
                      <h6 className="d-flex align-items-center">
                        <FaFileUpload className="me-2" />
                        Your Submission
                      </h6>
                      {submission ? (
                        <div className="card bg-light">
                          <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              <strong>Submitted File:</strong>
                            <a 
                              href={submission.file && submission.file.startsWith('uploads/') ? `/${submission.file}` : `/uploads/${submission.file}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-sm btn-outline-primary"
                            >
                              <FaFileDownload className="me-1" />
                              Download
                            </a>
                            </div>
                            <div className="mb-2">
                              <small className="text-muted">
                                Submitted on: {formatDate(submission.submittedAt)}
                              </small>
                            </div>
                            {submission.grade && (
                              <div className="alert alert-success mb-0">
                                <strong>Grade:</strong> {submission.grade}
                                {submission.comments && (
                                  <div className="mt-2">
                                    <strong>Feedback:</strong>
                                    <p className="mb-0">{submission.comments}</p>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="card bg-light">
                          <div className="card-body">
                            {isPastDue ? (
                              <div className="alert alert-danger mb-0">
                                This assignment is past the due date
                              </div>
                            ) : (
                              <>
                                <div className="mb-3">
                                  <input
                                    id={`file-input-${assignment._id}`}
                                    type="file"
                                    className="form-control"
                                    onChange={handleFileChange}
                                  />
                                </div>
                                <button
                                  className="btn btn-primary w-100"
                                  onClick={() => handleSubmitAssignment(assignment._id)}
                                  disabled={!file || submitting === assignment._id}
                                >
                                  {submitting === assignment._id ? (
                                    <>
                                      <FaSpinner className="fa-spin me-2" />
                                      Submitting...
                                    </>
                                  ) : (
                                    <>
                                      <FaCheck className="me-2" />
                                      Submit Assignment
                                    </>
                                  )}
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="card-footer bg-white">
                    <div className="d-flex justify-content-between align-items-center">
<<<<<<< HEAD
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
=======
                      <small className="text-muted">
                        <FaCalendarAlt className="me-1" />
                        Due: {formatDate(assignment.dueDate)}
                      </small>
>>>>>>> b4b2c8c1abf4516ff065ddb8b69d14ed5b04e531
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
<<<<<<< HEAD
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
=======
      ) : (
        <div className="text-center py-5">
          <h4 className="text-muted">No assignments found</h4>
          <p>You don't have any assignments yet</p>
>>>>>>> b4b2c8c1abf4516ff065ddb8b69d14ed5b04e531
        </div>
      )}
    </div>
  );
};

export default StudentAssignmentsPage;