import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaBook, FaFileUpload, FaCalendarAlt, FaSearch, FaFilter, FaCheckCircle, FaUserGraduate, FaEdit } from 'react-icons/fa';

const TutorAssignmentsPage = () => {
  const [assignments, setAssignments] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    course: '',
    description: '',
    dueDate: '',
    attachments: []
  });

  useEffect(() => {
    // Mock data - would come from API in real app
    setAssignments([
      {
        id: 1,
        title: 'Linear Algebra Problem Set',
        course: 'Mathematics',
        description: 'Complete problems 1-10 from chapter 5',
        dueDate: '2023-06-15',
        submissions: [
          {
            student: 'Alice Johnson',
            file: 'alice_solution.pdf',
            date: '2023-06-14',
            grade: 'A',
            comments: 'Excellent work'
          },
          {
            student: 'Bob Williams',
            file: 'bob_solution.pdf',
            date: '2023-06-15',
            grade: 'B',
            comments: 'Good effort'
          }
        ],
        attachments: ['problem_set.pdf']
      },
      {
        id: 2,
        title: 'Machine Learning Essay',
        course: 'Computer Science',
        description: 'Write a 2000-word essay on neural networks',
        dueDate: '2023-06-20',
        submissions: [
          {
            student: 'Alice Johnson',
            file: 'alice_essay.pdf',
            date: '2023-06-19',
            grade: null,
            comments: ''
          }
        ],
        attachments: ['essay_guidelines.pdf']
      },
      {
        id: 3,
        title: 'Physics Lab Report',
        course: 'Physics',
        description: 'Complete lab report for experiment 3',
        dueDate: '2023-06-10',
        submissions: [
          {
            student: 'Alice Johnson',
            file: 'alice_lab.pdf',
            date: '2023-06-09',
            grade: 'B+',
            comments: 'Well documented'
          },
          {
            student: 'Bob Williams',
            file: 'bob_lab.pdf',
            date: '2023-06-10',
            grade: 'A-',
            comments: 'Thorough analysis'
          }
        ],
        attachments: ['lab_manual.pdf']
      }
    ]);
  }, []);

  const filteredAssignments = assignments.filter(assignment => {
    if (filter === 'graded' && assignment.submissions.some(s => !s.grade)) return false;
    if (filter === 'ungraded' && !assignment.submissions.some(s => !s.grade)) return false;
    if (searchTerm && !assignment.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleGradeSubmission = (assignmentId, studentName, grade, comments) => {
    setAssignments(assignments.map(assignment => 
      assignment.id === assignmentId ? {
        ...assignment,
        submissions: assignment.submissions.map(sub => 
          sub.student === studentName ? { ...sub, grade, comments } : sub
        )
      } : assignment
    ));
  };

  const handleCreateAssignment = () => {
    const newId = Math.max(...assignments.map(a => a.id)) + 1;
    setAssignments([
      ...assignments,
      {
        id: newId,
        ...newAssignment,
        submissions: []
      }
    ]);
    setShowCreateModal(false);
    setNewAssignment({
      title: '',
      course: '',
      description: '',
      dueDate: '',
      attachments: []
    });
  };

  return (
    <div className="assignments-container">
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">
            <FaBook className="me-2 text-primary" />
            Manage Assignments
          </h2>
          <button 
            className="btn btn-primary"
            onClick={() => setShowCreateModal(true)}
          >
            <FaFileUpload className="me-2" />
            Create Assignment
          </button>
        </div>

        {/* Filters and Search */}
        <div className="row mb-4">
          <div className="col-md-6">
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
              <div key={assignment.id} className="col-md-6 col-lg-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-header bg-white">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">{assignment.title}</h5>
                      <span className="badge bg-info">
                        {assignment.submissions.length} Submissions
                      </span>
                    </div>
                    <small className="text-muted">{assignment.course}</small>
                  </div>
                  <div className="card-body">
                    <p className="card-text">{assignment.description}</p>
                    <div className="mb-3">
                      <h6>Materials:</h6>
                      <ul className="list-unstyled">
                        {assignment.attachments.map((file, index) => (
                          <li key={index}>
                            <a href="#" className="text-decoration-none">
                              <FaFileUpload className="me-2" />
                              {file}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mb-3">
                      <h6>Submissions:</h6>
                      {assignment.submissions.length > 0 ? (
                        <div className="list-group">
                          {assignment.submissions.map((sub, index) => (
                            <div key={index} className="list-group-item p-2">
                              <div className="d-flex justify-content-between">
                                <div>
                                  <FaUserGraduate className="me-2" />
                                  <strong>{sub.student}</strong>
                                </div>
                                {sub.grade ? (
                                  <span className="badge bg-success">{sub.grade}</span>
                                ) : (
                                  <span className="badge bg-warning text-dark">Pending</span>
                                )}
                              </div>
                              <div className="mt-1">
                                <small className="text-muted">{sub.file} (Submitted on {sub.date})</small>
                              </div>
                              {sub.comments && (
                                <div className="mt-1 small">{sub.comments}</div>
                              )}
                              {!sub.grade && (
                                <button 
                                  className="btn btn-sm btn-outline-primary mt-2 w-100"
                                  onClick={() => {
                                    const grade = prompt("Enter grade:");
                                    const comments = prompt("Enter comments:");
                                    if (grade) {
                                      handleGradeSubmission(assignment.id, sub.student, grade, comments);
                                    }
                                  }}
                                >
                                  <FaEdit className="me-1" />
                                  Grade
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted">No submissions yet</p>
                      )}
                    </div>
                  </div>
                  <div className="card-footer bg-white">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <FaCalendarAlt className="me-2 text-muted" />
                        <small className="text-muted">Due: {assignment.dueDate}</small>
                      </div>
                      <button className="btn btn-sm btn-outline-secondary">
                        View Details
                      </button>
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

      {/* Create Assignment Modal */}
      {showCreateModal && (
        <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create New Assignment</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowCreateModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={newAssignment.title}
                    onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Course</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={newAssignment.course}
                    onChange={(e) => setNewAssignment({...newAssignment, course: e.target.value})}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea 
                    className="form-control" 
                    rows="3"
                    value={newAssignment.description}
                    onChange={(e) => setNewAssignment({...newAssignment, description: e.target.value})}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Due Date</label>
                  <input 
                    type="date" 
                    className="form-control" 
                    value={newAssignment.dueDate}
                    onChange={(e) => setNewAssignment({...newAssignment, dueDate: e.target.value})}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Attachments (comma separated)</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={newAssignment.attachments.join(', ')}
                    onChange={(e) => setNewAssignment({
                      ...newAssignment, 
                      attachments: e.target.value.split(',').map(s => s.trim())
                    })}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  onClick={handleCreateAssignment}
                >
                  Create Assignment
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