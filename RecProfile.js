import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Navbar";
import Navbar from "../Navbar";

const RecProfile = () => {
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [successMessage, setSuccessMessage] = useState(""); // New state for success message

  useEffect(() => {
    const fetchUserDetails = async () => {
      const recruiterId = localStorage.getItem("recruiterId");

      if (!recruiterId) {
        setError("Recruiter not logged in");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8080/recruiter/id/${recruiterId}` // Replace with your API endpoint
        );
        setUserDetails(response.data);
        setFormData({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          age: response.data.age,
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user details:", err);
        setError("Failed to fetch profile details. Please try again later.");
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      const recruiterId = localStorage.getItem("recruiterId");
      const response = await axios.put(
        `http://localhost:8080/recruiter/update/${recruiterId}`,
        formData
      );
      setUserDetails({ ...userDetails, ...response.data });
      setIsEditing(false);
      setSuccessMessage("Profile updated!"); // Set success message
      setTimeout(() => {
        setSuccessMessage(""); // Clear success message after 3 seconds
      }, 3000);
    } catch (err) {
      console.error("Error updating user details:", err);
      setError("Failed to save profile details. Please try again later.");
    }
  };

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div
      style={{
        backgroundColor: "#e7e7e5",
        minHeight: "100vh",
        // padding: "20px",
      }}
    >
      <Navbar />
      <div className="container mt-5">
        <h2 className="text-center mb-4">Your Profile</h2>
        <div className="card">
          <div className="card-body">
            {successMessage && (
              <div className="alert alert-success" role="alert">
                {successMessage}
              </div>
            )}
            {isEditing ? (
              <div>
                <div className="mb-3">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={formData.firstName || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    value={formData.lastName || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Age</label>
                  <input
                    type="number"
                    className="form-control"
                    name="age"
                    value={formData.age || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <button className="btn btn-primary me-2" onClick={handleSave}>
                  Save
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <h5 className="card-title">{userDetails.name}</h5>
                <p className="card-text">
                  <strong>First Name:</strong> {userDetails.firstName}
                </p>
                <p className="card-text">
                  <strong>Last Name:</strong> {userDetails.lastName}
                </p>
                <p className="card-text">
                  <strong>Email:</strong> {userDetails.email}
                </p>
                <p className="card-text">
                  <strong>Phone:</strong> {userDetails.mobile || "Not provided"}
                </p>
                <p className="card-text">
                  <strong>Age:</strong> {userDetails.age || "Not provided"}
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecProfile;
