import React, { useEffect, useState } from "react";

function App() {
  const [student, setStudent] = useState({});
  const [students, setStudents] = useState([]);
  const [stdId, setStdId] = useState(-1);

  useEffect(() => {
    const storedStudents = localStorage.getItem("students");
    if (storedStudents) {
      setStudents(JSON.parse(storedStudents));
    }

    const storedStdId = sessionStorage.getItem("stdId");
    if (storedStdId) {
      setStdId(parseInt(storedStdId));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    if (stdId !== -1) {
      sessionStorage.setItem("stdId", stdId);
    } else {
      sessionStorage.removeItem("stdId");
    }
  }, [stdId]);

  const handleChnage = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (stdId !== -1) {
      setStudents((prevStudents) =>
        prevStudents.map((std) =>
          std.id === stdId ? { ...student, id: stdId } : std
        )
      );
      setStdId(-1);
    } else {
      const newStudent = { ...student, id: Date.now() };
      setStudents((prevStudents) => [...prevStudents, newStudent]);
    }
    setStudent({});
  };

  const handleDelete = (id) => {
    setStudents((prevStudents) =>
      prevStudents.filter((student) => student.id !== id)
    );
  };

  const handleEdit = (id) => {
    setStdId(id);
    const student = students.find((student) => student.id === id);
    setStudent(student);
  };

  return (
    <div
      className="d-flex"
      style={{ minHeight: "100vh", backgroundColor: "#e9ecef" }}
    >
      {/* Sidebar */}
      <div className="bg-dark text-white p-3" style={{ width: "250px" }}>
        <h4 className="mb-4">
          <i className="bi bi-mortarboard-fill me-2"></i>StudentSys
        </h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <a
              href="#"
              className="nav-link text-white active sidebar-link"
              style={{
                borderRadius: "0.25rem",
                textDecoration: "none",
                cursor: "default",
              }}
            >
              <i className="bi bi-speedometer2 me-2"></i> Dashboard
            </a>
          </li>
          <li className="nav-item mb-2">
            <a
              href="#"
              className="nav-link text-white sidebar-link"
              style={{
                borderRadius: "0.25rem",
                textDecoration: "none",
                cursor: "default",
              }}
            >
              <i className="bi bi-person-lines-fill me-2"></i> Students
            </a>
          </li>
          <li className="nav-item mb-2">
            <a
              href="#"
              className="nav-link text-white sidebar-link"
              style={{
                borderRadius: "0.25rem",
                textDecoration: "none",
                cursor: "default",
              }}
            >
              <i className="bi bi-gear-fill me-2"></i> Settings
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 d-flex flex-column">
        {/* Header */}
        <header className="text-white p-3 shadow-sm" style={{ backgroundColor: "#6f42c1" }}>
          <h2 className="m-0">
            <i className="bi bi-person-lines-fill me-2"></i>Student Registration Dashboard
          </h2>
        </header>

        {/* Content */}
        <main
          className="container my-4 flex-grow-1"
          style={{
            backgroundColor: "#f8f9fa",
            borderRadius: "0.5rem",
            padding: "1rem",
          }}
        >
          {/* Student Form */}
          <div className="card mb-4 shadow-sm">
            <div className="card-header bg-success text-white">
              <i className="bi bi-person-plus-fill me-2"></i>Add / Edit Student
            </div>
            <div className="card-body">
              <form method="post" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter name"
                      name="name"
                      value={student.name || ""}
                      onChange={handleChnage}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      onChange={handleChnage}
                      value={student.email || ""}
                      className="form-control"
                      placeholder="Enter email"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Course</label>
                    <select
                      className="form-select"
                      name="course"
                      value={student.course || ""}
                      onChange={handleChnage}
                    >
                      <option>Select Course</option>
                      <option>BCA</option>
                      <option>B.Sc IT</option>
                      <option>BBA</option>
                      <option>MCA</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Joining Date</label>
                    <input
                      type="date"
                      className="form-control"
                      onChange={handleChnage}
                      value={student.date || ""}
                      name="date"
                    />
                  </div>
                  <div className="col-md-12 mb-3">
                    <label className="form-label me-3">Gender</label>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        onChange={handleChnage}
                        value="male"
                        checked={student.gender === "male"}
                        name="gender"
                      />
                      <label className="form-check-label">Male</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        onChange={handleChnage}
                        checked={student.gender === "female"}
                        value="female"
                        name="gender"
                      />
                      <label className="form-check-label">Female</label>
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn btn-success">
                  <i className="bi bi-save me-1"></i>Submit
                </button>
              </form>
            </div>
          </div>

          {/* Student List */}
          <div className="card shadow-sm">
            <div className="card-header bg-success text-white">
              <i className="bi bi-list-ul me-2"></i>Student List
            </div>
            <div className="card-body table-responsive">
              <table className="table table-bordered table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Course</th>
                    <th>Gender</th>
                    <th>Joining Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((val, ind) => (
                    <tr key={val.id}>
                      <td>{ind + 1}</td>
                      <td>{val.name}</td>
                      <td>{val.email}</td>
                      <td>{val.course}</td>
                      <td>{val.gender}</td>
                      <td>{val.date}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-warning me-2"
                          onClick={() => handleEdit(val.id)}
                        >
                          <i className="bi bi-pencil-square"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(val.id)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {students.length === 0 && (
                    <tr>
                      <td colSpan="7" className="text-center text-muted">
                        No students found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
