import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCalendarAlt, FaUserCheck, FaUserTimes, FaUserClock, FaChartPie } from 'react-icons/fa';

const StudentAttendancePage = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [stats, setStats] = useState({});
  const [selectedCourse, setSelectedCourse] = useState('all');

  useEffect(() => {
    // Mock data - would come from API in real app
    const mockData = [
      {
        id: 1,
        course: 'Mathematics',
        date: '2023-06-01',
        status: 'present',
        time: '10:00 AM'
      },
      {
        id: 2,
        course: 'Computer Science',
        date: '2023-06-02',
        status: 'late',
        time: '11:15 AM'
      },
      {
        id: 3,
        course: 'Physics',
        date: '2023-06-03',
        status: 'absent',
        time: 'N/A'
      },
      {
        id: 4,
        course: 'Mathematics',
        date: '2023-06-08',
        status: 'present',
        time: '10:01 AM'
      },
      {
        id: 5,
        course: 'Computer Science',
        date: '2023-06-09',
        status: 'present',
        time: '11:00 AM'
      }
    ];

    setAttendanceData(mockData);

    // Calculate stats
    const total = mockData.length;
    const present = mockData.filter(item => item.status === 'present').length;
    const late = mockData.filter(item => item.status === 'late').length;
    const absent = mockData.filter(item => item.status === 'absent').length;

    setStats({
      total,
      present: Math.round((present / total) * 100),
      late: Math.round((late / total) * 100),
      absent: Math.round((absent / total) * 100)
    });
  }, []);

  const filteredData = attendanceData.filter(item => {
    if (selectedCourse !== 'all' && item.course !== selectedCourse) return false;
    return true;
  });

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

  return (
    <div className="attendance-container">
      <div className="container py-4">
        <h2 className="mb-4">
          <FaCalendarAlt className="me-2 text-primary" />
          My Attendance
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
                <p className="mb-0 text-muted">Total Sessions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="row mb-4">
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text bg-white">Course</span>
              <select
                className="form-select"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                <option value="all">All Courses</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Physics">Physics</option>
              </select>
            </div>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-white">
            <h5 className="mb-0">Attendance Records</h5>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Course</th>
                    <th>Status</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map(record => (
                      <tr key={record.id}>
                        <td>{record.date}</td>
                        <td>{record.course}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            {getStatusIcon(record.status)}
                            <span className="ms-2 text-capitalize">{record.status}</span>
                          </div>
                        </td>
                        <td>{record.time}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-4 text-muted">
                        No attendance records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Attendance Chart Placeholder */}
        <div className="card shadow-sm">
          <div className="card-header bg-white">
            <h5 className="mb-0">
              <FaChartPie className="me-2 text-primary" />
              Attendance Overview
            </h5>
          </div>
          <div className="card-body">
            <div className="bg-light rounded p-4 text-center" style={{ height: '300px' }}>
              <p className="text-muted">Your attendance chart would appear here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendancePage;