import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCalendarAlt, FaUserCheck, FaUserTimes, FaUserClock, FaChartPie, FaDownload, FaUsers } from 'react-icons/fa';

const TutorAttendancePage = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedDate, setSelectedDate] = useState('all');
  const [stats, setStats] = useState({});
  const [showMarkAttendance, setShowMarkAttendance] = useState(false);
  const [currentSession, setCurrentSession] = useState(null);

  useEffect(() => {
    // Mock data - would come from API in real app
    const mockData = [
      {
        id: 1,
        course: 'Mathematics',
        date: '2023-06-01',
        students: [
          { id: 1, name: 'Alice Johnson', status: 'present', time: '10:00 AM' },
          { id: 2, name: 'Bob Williams', status: 'present', time: '10:02 AM' },
          { id: 3, name: 'Charlie Brown', status: 'absent', time: 'N/A' }
        ]
      },
      {
        id: 2,
        course: 'Computer Science',
        date: '2023-06-02',
        students: [
          { id: 1, name: 'Alice Johnson', status: 'late', time: '11:15 AM' },
          { id: 2, name: 'Bob Williams', status: 'present', time: '11:00 AM' },
          { id: 3, name: 'Charlie Brown', status: 'present', time: '11:01 AM' }
        ]
      },
      {
        id: 3,
        course: 'Physics',
        date: '2023-06-03',
        students: [
          { id: 1, name: 'Alice Johnson', status: 'present', time: '09:00 AM' },
          { id: 2, name: 'Bob Williams', status: 'absent', time: 'N/A' },
          { id: 3, name: 'Charlie Brown', status: 'present', time: '09:01 AM' }
        ]
      }
    ];

    setAttendanceData(mockData);

    // Calculate stats
    const allStudents = mockData.flatMap(session => session.students);
    const total = allStudents.length;
    const present = allStudents.filter(s => s.status === 'present').length;
    const late = allStudents.filter(s => s.status === 'late').length;
    const absent = allStudents.filter(s => s.status === 'absent').length;

    setStats({
      total,
      present: Math.round((present / total) * 100),
      late: Math.round((late / total) * 100),
      absent: Math.round((absent / total) * 100)
    });
  }, []);

  const filteredData = attendanceData.filter(session => {
    if (selectedCourse !== 'all' && session.course !== selectedCourse) return false;
    if (selectedDate !== 'all' && session.date !== selectedDate) return false;
    return true;
  });

  const uniqueDates = [...new Set(attendanceData.map(item => item.date))];
  const uniqueCourses = [...new Set(attendanceData.map(item => item.course))];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present':
        return <FaUserCheck className="text-success" />;
      case 'late':
        return <FaUserClock className="text-warning" />;
      case 'absent':
        return <FaUserTimes className="text-danger" />;
      default:
        return null;
    }
  };

  const handleMarkAttendance = (session) => {
    setCurrentSession(session);
    setShowMarkAttendance(true);
  };

  const handleUpdateAttendance = (studentId, newStatus) => {
    setAttendanceData(attendanceData.map(session => 
      session.id === currentSession.id ? {
        ...session,
        students: session.students.map(student => 
          student.id === studentId ? { ...student, status: newStatus } : student
        )
      } : session
    ));
  };

  return (
    <div className="attendance-container">
      <div className="container py-4">
        <h2 className="mb-4">
          <FaCalendarAlt className="me-2 text-primary" />
          Attendance Management
        </h2>

        {/* Stats Cards */}
        <div className="row mb-4">
          <div className="col-md-3 mb-3 mb-md-0">
            <div className="card bg-light border-0 h-100">
              <div className="card-body text-center">
                <h3 className="text-success">{stats.present || 0}%</h3>
                <p className="mb-0 text-muted">Present</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3 mb-md-0">
            <div className="card bg-light border-0 h-100">
              <div className="card-body text-center">
                <h3 className="text-warning">{stats.late || 0}%</h3>
                <p className="mb-0 text-muted">Late</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3 mb-md-0">
            <div className="card bg-light border-0 h-100">
              <div className="card-body text-center">
                <h3 className="text-danger">{stats.absent || 0}%</h3>
                <p className="mb-0 text-muted">Absent</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-light border-0 h-100">
              <div className="card-body text-center">
                <h3>{stats.total || 0}</h3>
                <p className="mb-0 text-muted">Total Records</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="row mb-4">
          <div className="col-md-4 mb-3 mb-md-0">
            <div className="input-group">
              <span className="input-group-text bg-white">Course</span>
              <select
                className="form-select"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                <option value="all">All Courses</option>
                {uniqueCourses.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-4 mb-3 mb-md-0">
            <div className="input-group">
              <span className="input-group-text bg-white">Date</span>
              <select
                className="form-select"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              >
                <option value="all">All Dates</option>
                {uniqueDates.map(date => (
                  <option key={date} value={date}>{date}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-4">
            <button className="btn btn-primary w-100">
              <FaCalendarAlt className="me-2" />
              New Session
            </button>
          </div>
        </div>

        {/* Sessions List */}
        <div className="row">
          {filteredData.length > 0 ? (
            filteredData.map(session => (
              <div key={session.id} className="col-md-6 col-lg-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-header bg-white d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="mb-0">{session.course}</h5>
                      <small className="text-muted">{session.date}</small>
                    </div>
                    <button 
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleMarkAttendance(session)}
                    >
                      Mark Attendance
                    </button>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-sm">
                        <thead>
                          <tr>
                            <th>Student</th>
                            <th>Status</th>
                            <th>Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          {session.students.map(student => (
                            <tr key={student.id}>
                              <td>{student.name}</td>
                              <td>
                                <div className="d-flex align-items-center">
                                  {getStatusIcon(student.status)}
                                  <span className="ms-2 text-capitalize">{student.status}</span>
                                </div>
                              </td>
                              <td>{student.time}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="card-footer bg-white text-end">
                    <small className="text-muted">
                      {session.students.filter(s => s.status === 'present').length} present, 
                      {' '}{session.students.filter(s => s.status === 'late').length} late, 
                      {' '}{session.students.filter(s => s.status === 'absent').length} absent
                    </small>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <h4 className="text-muted">No attendance sessions found</h4>
              <p>Try adjusting your filters or create a new session</p>
            </div>
          )}
        </div>
      </div>

      {/* Mark Attendance Modal */}
      {showMarkAttendance && currentSession && (
        <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Mark Attendance - {currentSession.course} ({currentSession.date})</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowMarkAttendance(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Student</th>
                        <th>Current Status</th>
                        <th>Mark as Present</th>
                        <th>Mark as Late</th>
                        <th>Mark as Absent</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentSession.students.map(student => (
                        <tr key={student.id}>
                          <td>{student.name}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              {getStatusIcon(student.status)}
                              <span className="ms-2 text-capitalize">{student.status}</span>
                            </div>
                          </td>
                          <td>
                            <button 
                              className={`btn btn-sm ${student.status === 'present' ? 'btn-success' : 'btn-outline-success'}`}
                              onClick={() => handleUpdateAttendance(student.id, 'present')}
                            >
                              Present
                            </button>
                          </td>
                          <td>
                            <button 
                              className={`btn btn-sm ${student.status === 'late' ? 'btn-warning' : 'btn-outline-warning'}`}
                              onClick={() => handleUpdateAttendance(student.id, 'late')}
                            >
                              Late
                            </button>
                          </td>
                          <td>
                            <button 
                              className={`btn btn-sm ${student.status === 'absent' ? 'btn-danger' : 'btn-outline-danger'}`}
                              onClick={() => handleUpdateAttendance(student.id, 'absent')}
                            >
                              Absent
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowMarkAttendance(false)}
                >
                  Close
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  onClick={() => setShowMarkAttendance(false)}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorAttendancePage;