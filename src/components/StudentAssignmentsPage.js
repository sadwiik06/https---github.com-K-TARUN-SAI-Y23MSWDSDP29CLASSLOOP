import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaBook, FaFileUpload, FaCalendarAlt, FaSearch, FaFilter, FaCheckCircle } from 'react-icons/fa';

const StudentAssignmentsPage = () => {
  const [assignments, setAssignments] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Mock data - would come from API in real app
    setAssignments([
      {
        id: 1,
        title: 'Linear Algebra Problem Set',
        course: 'Mathematics',
        description: 'Complete problems 1-10 from chapter 5',
        dueDate: '2023-06-15',
        submitted: true,
        grade: 'A',
        attachments: ['problem_set.pdf'],
        submission: {
          file: 'my_solution.pdf',
          date: '2023-06-14',
          comments: 'Submitted on time'
        }
      },
      {
        id: 2,
        title: 'Machine Learning Essay',
        course: 'Computer Science',
        description: 'Write a 2000-word essay on neural networks',
        dueDate: '2023-06-20',
        submitted: false,
        grade: null,
        attachments: ['essay_guidelines.pdf']
      },
      {
        id: 3,
        title: 'Physics Lab Report',
        course: 'Physics',
        description: 'Complete lab report for experiment 3',
        dueDate: '2023-06-10',
        submitted: true,
        grade: 'B+',
        attachments: ['lab_manual.pdf'],
        submission: {
          file: 'lab_report.pdf',
          date: '2023-06-09',
          comments: 'Well done!'
        }
      }
    ]);
  }, []);

  const filteredAssignments = assignments.filter(assignment => {
    if (filter === 'submitted' && !assignment.submitted) return false;
    if (filter === 'pending' && assignment.submitted) return false;
    if (searchTerm && !assignment.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleSubmitAssignment = (assignmentId) => {
    // In real app, would upload to backend
    const file = prompt("Enter the filename you're submitting:");
    if (file) {
      setAssignments(assignments.map(assignment => 
        assignment.id === assignmentId ? { 
          ...assignment, 
          submitted: true,
          submission: {
            file,
            date: new Date().toISOString().split('T')[0],
            comments: ''
          }
        } : assignment
      ));
      alert('Assignment submitted successfully!');
    }
  };

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
              <div key={assignment.id} className="col-md-6 col-lg-4 mb-4">
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
                    {assignment.submitted && (
                      <div className="mb-3">
                        <h6>Your Submission:</h6>
                        <p>
                          <FaFileUpload className="me-2" />
                          {assignment.submission.file} (Submitted on {assignment.submission.date})
                        </p>
                        {assignment.grade && (
                          <div className="alert alert-success">
                            <strong>Grade: {assignment.grade}</strong>
                            {assignment.submission.comments && (
                              <div className="mt-1">{assignment.submission.comments}</div>
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
                        <small className="text-muted">Due: {assignment.dueDate}</small>
                      </div>
                      {!assignment.submitted ? (
                        <button 
                          className="btn btn-sm btn-primary"
                          onClick={() => handleSubmitAssignment(assignment.id)}
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
    </div>
  );
};

export default StudentAssignmentsPage;