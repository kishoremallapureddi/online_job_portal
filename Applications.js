import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarRec from "../NavbarRec";

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null); // Track current action for confirmation
  const [isUpdating, setIsUpdating] = useState(false); // Track if status update is in progress

  useEffect(() => {
    const fetchApplications = async () => {
      const recruiterId = localStorage.getItem("recruiterId");

      if (!recruiterId) {
        setError("Recruiter not logged in");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8080/applications/${recruiterId}`
        );
        const pendingApplications = response.data.filter(
          (app) => app.status !== "accepted" && app.status !== "rejected"
        );
        setApplications(pendingApplications);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch applications");
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleStatusChange = async (applicationId, status) => {
    setIsUpdating(true);
    try {
      await axios.put(
        `http://localhost:8080/application/${applicationId}/status`,
        { status }
      );
      setApplications((prevApplications) =>
        prevApplications.filter((app) => app.id !== applicationId)
      );
    } catch (error) {
      console.error("Failed to update application status:", error);
    } finally {
      setIsUpdating(false);
      setConfirmAction(null);
    }
  };

  const renderLoader = () => (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  const renderError = () => (
    <div className="alert alert-danger text-center" role="alert">
      {error}
    </div>
  );

  const renderApplicationsTable = () => (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Applicant Name</th>
          <th>Email</th>
          <th>Mobile</th>
          <th>Age</th>
          <th>Job Title</th>
          <th>Resume</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {applications.map((application) => (
          <tr key={application.id}>
            <td>
              {application.firstName} {application.lastName}
            </td>
            <td>{application.email}</td>
            <td>{application.mobile}</td>
            <td>{application.age}</td>
            <td>{application.jobName}</td>
            <td>
              {application.resumeUrl && application.resumeUrl.trim() !== "" ? (
                <a
                  href={application.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  View Resume
                </a>
              ) : (
                <span className="text-muted">No Resume Provided</span>
              )}
            </td>
            <td>
              <button
                className="btn btn-success btn-sm me-2"
                disabled={isUpdating}
                onClick={() =>
                  setConfirmAction({ applicationId: application.id, status: "accepted" })
                }
              >
                Accept
              </button>
              <button
                className="btn btn-danger btn-sm"
                disabled={isUpdating}
                onClick={() =>
                  setConfirmAction({ applicationId: application.id, status: "rejected" })
                }
              >
                Reject
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div
      style={{
        backgroundColor: "#e7e7e5",
        minHeight: "100vh",
      }}
    >
      <NavbarRec />
      <div className="container mt-5">
        <h2 className="text-center mb-4">Applications for Your Jobs</h2>

        {loading && renderLoader()}
        {error && renderError()}
        {!loading && !error && applications.length === 0 && (
          <div className="alert alert-info text-center">No applications found for your jobs.</div>
        )}
        {!loading && !error && applications.length > 0 && (
          <div className="card">
            <div className="card-body">{renderApplicationsTable()}</div>
          </div>
        )}

        {/* Confirmation Modal */}
        {confirmAction && (
          <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Action</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setConfirmAction(null)}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>
                    Are you sure you want to{" "}
                    <strong>{confirmAction.status === "accepted" ? "accept" : "reject"}</strong>{" "}
                    this application?
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setConfirmAction(null)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() =>
                      handleStatusChange(confirmAction.applicationId, confirmAction.status)
                    }
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
