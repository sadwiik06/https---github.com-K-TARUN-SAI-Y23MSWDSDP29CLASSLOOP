import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
  FaBook, FaFileUpload, FaCalendarAlt, FaSearch, 
  FaFilter, FaCheckCircle, FaUserGraduate, FaEdit,
  FaSpinner, FaTimes, FaDownload
} from 'react-icons/fa';
import api from '../api';
=======
import { 
  FaBook, FaFileUpload, FaCalendarAlt, FaSearch, FaFilter, 
  FaUserGraduate, FaEdit, FaSpinner, FaTimes, FaCheck 
} from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
>>>>>>> b4b2c8c1abf4516ff065ddb8b69d14ed5b04e531

const TutorAssignmentsPage = () => {
  const [assignments, setAssignments] = useState([]);
  const [classes, setClasses] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Modals state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showGradeModal, setShowGradeModal] = useState(false);
  
  // Form states
  const [newAssignment, setNewAssignment] = useState({
    title: '',
<<<<<<< HEAD
    description: '',
    class: '',
    dueDate: '',
    attachments: []
  });
  const [gradeData, setGradeData] = useState({
    grade: '',
    feedback: ''
  });
  const [currentSubmission, setCurrentSubmission] = useState(null);
  const [fileUploads, setFileUploads] = useState([]);

  useEffect(() => {
// Remove manual token addition from individual requests and trust the interceptor
const fetchData = async () => {
  try {
    setIsLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user || !user.token) {
      setError('Authentication token not found. Please login again.');
      setIsLoading(false);
      return;
    }

    const [classesRes, assignmentsRes] = await Promise.all([
      api.get(`/classes/tutor/${user._id}`),
      api.get('/assignments/tutor')
    ]);

    setClasses(classesRes.data);
    setAssignments(assignmentsRes.data);
  } catch (err) {
    setError(err.response?.data?.message || 'Failed to load data');
    // Handle 401 specifically
    if (err.response?.status === 401) {
      // Redirect to login or refresh token
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  } finally {
    setIsLoading(false);
  }
};

=======
    class: '',
    description: '',
    dueDate: ''
  });
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [grading, setGrading] = useState(null);

  useEffect(() => {
>>>>>>> b4b2c8c1abf4516ff065ddb8b69d14ed5b04e531
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('token');
      console.log('TutorAssignmentsPage - User:', user);
      console.log('TutorAssignmentsPage - Token:', token);
      if (!user || !token) {
        toast.error('User not authenticated');
        setLoading(false);
        return;
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const [assignmentsRes, classesRes] = await Promise.all([
        axios.get('/api/assignments/tutor', config),
        axios.get(`/api/classes/tutor/${user._id}`, config)
      ]);
      console.log('TutorAssignmentsPage - Assignments response:', assignmentsRes);
      console.log('TutorAssignmentsPage - Classes response:', classesRes);
      setAssignments(assignmentsRes.data);
      setClasses(classesRes.data);
    } catch (error) {
      toast.error('Failed to fetch data');
      console.error('TutorAssignmentsPage - Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAssignments = assignments.filter(assignment => {
<<<<<<< HEAD
    // Filter by grade status
    if (filter === 'graded') {
      return assignment.submissions.every(s => s.grade);
    }
    if (filter === 'ungraded') {
      return assignment.submissions.some(s => !s.grade);
    }
=======
>>>>>>> b4b2c8c1abf4516ff065ddb8b69d14ed5b04e531
    // Filter by search term
    if (searchTerm && !assignment.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    // Filter by grading status
    if (filter === 'graded') {
      return assignment.submissions.every(sub => sub.grade);
    }
    if (filter === 'ungraded') {
      return assignment.submissions.some(sub => !sub.grade);
    }
    return true;
  });

<<<<<<< HEAD
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFileUploads(files);
  };

  const removeUploadedFile = (index) => {
    const newFiles = [...fileUploads];
    newFiles.splice(index, 1);
    setFileUploads(newFiles);
=======
  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
>>>>>>> b4b2c8c1abf4516ff065ddb8b69d14ed5b04e531
  };

  const handleCreateAssignment = async () => {
    try {
<<<<<<< HEAD
      const token = localStorage.getItem('token');
      const formData = new FormData();
      
      // Append basic fields
      formData.append('title', newAssignment.title);
      formData.append('description', newAssignment.description);
      formData.append('classId', newAssignment.class);
      formData.append('dueDate', newAssignment.dueDate);
      
      // Append files
      fileUploads.forEach(file => {
        formData.append('attachments', file);
      });

          const response = await api.post('/assignments', formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          });

      setAssignments([...assignments, response.data]);
      setShowCreateModal(false);
      resetCreateForm();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create assignment');
    }
  };

  const resetCreateForm = () => {
    setNewAssignment({
      title: '',
      description: '',
      class: '',
      dueDate: '',
      attachments: []
=======
      setLoading(true);
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('title', newAssignment.title);
      formData.append('description', newAssignment.description);
      formData.append('dueDate', newAssignment.dueDate);
      formData.append('classId', newAssignment.class);
      
      files.forEach(file => {
        formData.append('attachments', file);
      });

      const res = await axios.post('/api/assignments', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      setAssignments([...assignments, res.data]);
      setShowCreateModal(false);
      setNewAssignment({
        title: '',
        class: '',
        description: '',
        dueDate: ''
      });
      setFiles([]);
      toast.success('Assignment created successfully');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to create assignment');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGradeSubmission = async (assignmentId, submissionId, currentGrade, currentComments) => {
    try {
      setGrading(submissionId);
      const grade = prompt("Enter grade:", currentGrade || '');
      if (grade === null) return;
      
      const comments = prompt("Enter comments:", currentComments || '');
      
      const token = localStorage.getItem('token');
      const res = await axios.put(`/api/assignments/${assignmentId}/grade/${submissionId}`, {
        grade,
        comments
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAssignments(assignments.map(a => 
        a._id === assignmentId ? res.data : a
      ));
      toast.success('Grade updated successfully');
    } catch (error) {
      toast.error('Failed to update grade');
      console.error('Error:', error);
    } finally {
      setGrading(null);
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
>>>>>>> b4b2c8c1abf4516ff065ddb8b69d14ed5b04e531
    });
    setFileUploads([]);
  };

<<<<<<< HEAD
  const openGradeModal = (submission) => {
    setCurrentSubmission(submission);
    setGradeData({
      grade: submission.grade || '',
      feedback: submission.tutorFeedback || ''
    });
    setShowGradeModal(true);
  };

  const handleGradeSubmission = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.put(
        `/submissions/${currentSubmission._id}/grade`,
        gradeData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      // Update local state
      setAssignments(assignments.map(a => {
        if (a._id === currentSubmission.assignment) {
          const updatedSubmissions = a.submissions.map(s => 
            s._id === currentSubmission._id ? response.data : s
          );
          return { ...a, submissions: updatedSubmissions };
        }
        return a;
      }));

      setShowGradeModal(false);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to grade submission');
    }
  };

  const downloadAttachment = async (filename) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get(`/assignments/download/${filename}`, {
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

  const downloadSubmission = async (submission) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get(
        `/assignments/submissions/download/${submission.file.filename}`, 
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: 'blob'
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', submission.file.originalname);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert('Failed to download submission: ' + (err.response?.data?.message || err.message));
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

=======
  const getFileIcon = (filename) => {
    const ext = filename.split('.').pop().toLowerCase();
    if (['pdf'].includes(ext)) return 'text-danger';
    if (['doc', 'docx'].includes(ext)) return 'text-primary';
    if (['ppt', 'pptx'].includes(ext)) return 'text-warning';
    if (['xls', 'xlsx'].includes(ext)) return 'text-success';
    return 'text-secondary';
  };

>>>>>>> b4b2c8c1abf4516ff065ddb8b69d14ed5b04e531
  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          <FaBook className="me-2 text-primary" />
          Manage Assignments
        </h2>
        <button 
          className="btn btn-primary"
          onClick={() => setShowCreateModal(true)}
          disabled={loading}
        >
          <FaFileUpload className="me-2" />
          Create Assignment
        </button>
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
                <option value="graded">Fully Graded</option>
                <option value="ungraded">Pending Grading</option>
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
                      <span className="badge bg-info">
                        {(assignment.submissions?.length ?? 0)} Submission{(assignment.submissions?.length ?? 0) !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <small className="text-muted">{assignment.class?.title}</small>
                  </div>
                  <div className="card-body">
                    <p className="card-text">{assignment.description}</p>
                    
                    {/* Assignment Materials */}
                    <div className="mb-3">
                      <h6>Materials:</h6>
                      <ul className="list-unstyled">
                        {assignment.attachments.map((file, index) => (
                          <li key={index} className="mb-2">
                            <button 
                              className="btn btn-link text-decoration-none p-0 text-start d-flex align-items-center"
                              onClick={() => downloadAttachment(file.filename)}
                            >
                              <FaFileUpload className="me-2 flex-shrink-0" />
                              <span className="text-truncate">{file.originalname}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Submissions */}
                    <div className="mb-3">
                      <h6>Submissions:</h6>
                      {(assignment.submissions?.length ?? 0) > 0 ? (
                        <div className="list-group">
                          {assignment.submissions.map((sub, index) => (
                            <div key={index} className="list-group-item p-3">
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <div className="d-flex align-items-center">
                                  <FaUserGraduate className="me-2 text-primary" />
                                  <strong>{sub.student?.name}</strong>
                                </div>
                                {sub.grade ? (
                                  <span className="badge bg-success">{sub.grade}</span>
                                ) : (
                                  <span className="badge bg-warning text-dark">Pending</span>
                                )}
                              </div>
                              
                              <div className="mb-2">
                                <button 
                                  className="btn btn-link text-decoration-none p-0 d-flex align-items-center"
                                  onClick={() => downloadSubmission(sub)}
                                >
                                  <FaDownload className="me-2 flex-shrink-0" />
                                  <span className="text-truncate">
                                    {sub.file.originalname}
                                  </span>
                                </button>
                                <small className="text-muted d-block mt-1">
                                  Submitted on {new Date(sub.submittedAt).toLocaleDateString()}
                                </small>
                              </div>
                              
                              {sub.tutorFeedback && (
                                <div className="alert alert-light mt-2 mb-2">
                                  <strong>Your Feedback:</strong> {sub.tutorFeedback}
                                </div>
                              )}
                              
                              <button 
                                className="btn btn-sm btn-outline-primary w-100 mt-2"
                                onClick={() => openGradeModal(sub)}
                              >
                                <FaEdit className="me-1" />
                                {sub.grade ? 'Update Grade' : 'Grade Submission'}
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="alert alert-light">
                          No submissions yet
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="card-footer bg-white">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <FaCalendarAlt className="me-2 text-muted" />
                        <small className="text-muted">
                          Due: {new Date(assignment.dueDate).toLocaleDateString()}
                        </small>
                      </div>
                      <small className="text-muted">
                        Created: {new Date(assignment.createdAt).toLocaleDateString()}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <h4 className="text-muted">No assignments found</h4>
              <p>Try adjusting your filters or create a new assignment</p>
            </div>
          )}
=======
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
              <option value="graded">Fully Graded</option>
              <option value="ungraded">Pending Grading</option>
            </select>
          </div>
>>>>>>> b4b2c8c1abf4516ff065ddb8b69d14ed5b04e531
        </div>
      </div>

      {/* Assignments List */}
      {loading ? (
        <div className="text-center py-5">
          <FaSpinner className="fa-spin me-2" size={24} />
          <span>Loading assignments...</span>
        </div>
      ) : filteredAssignments.length > 0 ? (
        <div className="row">
          {filteredAssignments.map(assignment => (
            <div key={assignment._id} className="col-12 mb-4">
              <div className="card shadow-sm">
                <div className="card-header bg-white d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="mb-0">{assignment.title}</h5>
                    <small className="text-muted">
                      {assignment.class?.title} • Due: {formatDate(assignment.dueDate)}
                    </small>
                  </div>
                  <span className={`badge ${assignment.submissions.length === 0 ? 'bg-secondary' : 
                    assignment.submissions.every(s => s.grade) ? 'bg-success' : 'bg-warning'}`}>
                    {assignment.submissions.length} submission{assignment.submissions.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="card-body">
                  <p className="card-text">{assignment.description}</p>
                  
                  {/* Assignment Materials */}
                  {assignment.attachments.length > 0 && (
                    <div className="mb-4">
                      <h6 className="d-flex align-items-center">
                        <FaFileUpload className="me-2" />
                        Assignment Materials
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
                                <FaFileUpload />
                              </span>
                              {file.split('/').pop()}
                            </a>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Submissions */}
                  <div className="mb-3">
                    <h6 className="d-flex align-items-center">
                      <FaUserGraduate className="me-2" />
                      Student Submissions
                    </h6>
                    {assignment.submissions.length > 0 ? (
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th>Student</th>
                              <th>Submission</th>
                              <th>Submitted</th>
                              <th>Grade</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {assignment.submissions.map(submission => (
                              <tr key={submission._id}>
                                <td>{submission.student?.name || 'Student'}</td>
                                <td>
                                  <a 
                                    href={`/uploads/${submission.file}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-decoration-none"
                                  >
                                    {submission.file.split('/').pop()}
                                  </a>
                                </td>
                                <td>{formatDate(submission.submittedAt)}</td>
                                <td>
                                  {submission.grade ? (
                                    <span className="badge bg-success">{submission.grade}</span>
                                  ) : (
                                    <span className="badge bg-warning text-dark">Pending</span>
                                  )}
                                </td>
                                <td>
                                  <button
                                    className="btn btn-sm btn-outline-primary"
                                    onClick={() => handleGradeSubmission(
                                      assignment._id,
                                      submission._id,
                                      submission.grade,
                                      submission.comments
                                    )}
                                    disabled={grading === submission._id}
                                  >
                                    {grading === submission._id ? (
                                      <FaSpinner className="fa-spin me-1" />
                                    ) : (
                                      <FaEdit className="me-1" />
                                    )}
                                    {submission.grade ? 'Update' : 'Grade'}
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="alert alert-info mb-0">
                        No submissions yet
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <h4 className="text-muted">No assignments found</h4>
          <p>Try adjusting your filters or create a new assignment</p>
        </div>
      )}

      {/* Create Assignment Modal */}
      {showCreateModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create New Assignment</h5>
                <button 
                  type="button" 
                  className="btn-close" 
<<<<<<< HEAD
                  onClick={() => {
                    setShowCreateModal(false);
                    resetCreateForm();
                  }}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Title*</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newAssignment.title}
                      onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Class*</label>
                    <select
                      className="form-select"
                      value={newAssignment.class}
                      onChange={(e) => setNewAssignment({...newAssignment, class: e.target.value})}
                      required
                    >
                      <option value="">Select a class</option>
                      {classes.map(c => (
                        <option key={c._id} value={c._id}>{c.title}</option>
                      ))}
                    </select>
                  </div>
=======
                  onClick={() => setShowCreateModal(false)}
                  disabled={loading}
                />
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Title*</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={newAssignment.title}
                    onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
                    required
                  />
>>>>>>> b4b2c8c1abf4516ff065ddb8b69d14ed5b04e531
                </div>
                
                <div className="mb-3">
<<<<<<< HEAD
                  <label className="form-label">Description*</label>
                  <textarea
                    className="form-control"
                    rows={4}
                    value={newAssignment.description}
                    onChange={(e) => setNewAssignment({...newAssignment, description: e.target.value})}
                    required
                  />
                </div>
                
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Due Date*</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      value={newAssignment.dueDate}
                      onChange={(e) => setNewAssignment({...newAssignment, dueDate: e.target.value})}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Attachments</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={handleFileUpload}
                      multiple
                      accept=".pdf,.doc,.docx,.txt,.zip,.jpg,.jpeg,.png"
                    />
                    <small className="form-text text-muted">
                      Max 10MB per file (PDF, DOC, TXT, ZIP, Images)
                    </small>
                  </div>
=======
                  <label className="form-label">Class*</label>
                  <select
                    className="form-select"
                    value={newAssignment.class}
                    onChange={(e) => setNewAssignment({...newAssignment, class: e.target.value})}
                    required
                  >
                    <option value="">Select a class</option>
                    {classes.map(cls => (
                      <option key={cls._id} value={cls._id}>
                        {cls.title} ({cls.subject})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea 
                    className="form-control" 
                    rows="3"
                    value={newAssignment.description}
                    onChange={(e) => setNewAssignment({...newAssignment, description: e.target.value})}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Due Date*</label>
                  <input 
                    type="datetime-local" 
                    className="form-control" 
                    value={newAssignment.dueDate}
                    onChange={(e) => setNewAssignment({...newAssignment, dueDate: e.target.value})}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Attachments</label>
                  <input 
                    type="file" 
                    className="form-control" 
                    multiple
                    onChange={handleFileChange}
                  />
                  {files.length > 0 && (
                    <div className="mt-2">
                      <h6>Selected Files:</h6>
                      <ul className="list-group">
                        {files.map((file, index) => (
                          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            <span>
                              <FaFileUpload className={`me-2 ${getFileIcon(file.name)}`} />
                              {file.name}
                            </span>
                            <button 
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => removeFile(index)}
                            >
                              <FaTimes />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
>>>>>>> b4b2c8c1abf4516ff065ddb8b69d14ed5b04e531
                </div>
                
                {/* Uploaded files preview */}
                {fileUploads.length > 0 && (
                  <div className="mb-3">
                    <label className="form-label">Selected Files:</label>
                    <div className="list-group">
                      {fileUploads.map((file, index) => (
                        <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
                          <span className="text-truncate" style={{ maxWidth: '80%' }}>
                            {file.name}
                          </span>
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => removeUploadedFile(index)}
                          >
                            <FaTimes />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
<<<<<<< HEAD
                  onClick={() => {
                    setShowCreateModal(false);
                    resetCreateForm();
                  }}
=======
                  onClick={() => setShowCreateModal(false)}
                  disabled={loading}
>>>>>>> b4b2c8c1abf4516ff065ddb8b69d14ed5b04e531
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  onClick={handleCreateAssignment}
<<<<<<< HEAD
                  disabled={!newAssignment.title || !newAssignment.class || !newAssignment.description || !newAssignment.dueDate}
=======
                  disabled={loading || !newAssignment.title || !newAssignment.class || !newAssignment.dueDate}
>>>>>>> b4b2c8c1abf4516ff065ddb8b69d14ed5b04e531
                >
                  {loading ? (
                    <>
                      <FaSpinner className="fa-spin me-2" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <FaCheck className="me-2" />
                      Create Assignment
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grade Submission Modal */}
      {showGradeModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Grade Submission</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowGradeModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Student</label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentSubmission?.student?.name || ''}
                    readOnly
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Assignment</label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentSubmission?.assignment?.title || ''}
                    readOnly
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Grade*</label>
                  <input
                    type="text"
                    className="form-control"
                    value={gradeData.grade}
                    onChange={(e) => setGradeData({...gradeData, grade: e.target.value})}
                    placeholder="A, B+, C-, etc."
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Feedback</label>
                  <textarea
                    className="form-control"
                    rows={4}
                    value={gradeData.feedback}
                    onChange={(e) => setGradeData({...gradeData, feedback: e.target.value})}
                    placeholder="Provide constructive feedback..."
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowGradeModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  onClick={handleGradeSubmission}
                  disabled={!gradeData.grade}
                >
                  Submit Grade
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorAssignmentsPage;