import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import NavbarRec from "../NavbarRec";

export default function AddJob() {
  const [formData, setFormData] = useState({
    name: "",
    salary: "",
    location: "",
    description: "",
    company: "", // Add company to state
    mobile: "", // Add mobile to state
    recruiter_id: "", // Add recruiter_id to state
  });

  const navigate = useNavigate(); // Initialize useNavigate

  // Use useEffect to get recruiter_id from localStorage (assuming it's stored after login)
  useEffect(() => {
    const recruiterId = localStorage.getItem("recruiterId");
    console.log("Fetched Recruiter ID from Local Storage: ", recruiterId);
    if (recruiterId) {
      setFormData((prevState) => ({
        ...prevState,
        recruiter_id: recruiterId, // Set recruiter_id in formData
      }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("try");
      // Prepare the job object
      const jobData = {
        name: formData.name,
        salary: formData.salary,
        location: formData.location,
        description: formData.description,
        company: formData.company, // Include company in jobData
        mobile: formData.mobile, // Include mobile in jobData
        recruiter: { id: formData.recruiter_id }, // Associate the recruiter by id
      };
      console.log(jobData);
      // Post the job data to the backend, including recruiter
      await axios.post("http://localhost:8080/job", jobData);
      alert("Job added successfully!");

      // Redirect to the recruiter page after submission
      navigate("/recruiter");

      // Optionally, reset the form after submission
      // setFormData({
      //   name: "",
      //   salary: "",
      //   location: "",
      //   description: "",
      //   company: "",
      //   mobile: "", // Reset mobile
      //   recruiter_id: "",
      // });
    } catch (error) {
      console.log("Recruiter ID: ", formData.recruiter_id);
      console.log(formData);
      console.error("Error adding job:", error.response || error.message);
      alert("Failed to add job. Please try again.");
    }
  };

  return (
    <div
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        backgroundColor: "#e7e7e5",
      }}
    >
      <NavbarRec />
      <div className="container my-5">
        <h2 className="text-center mb-4">Add Job</h2>
        <div
          className="card border-0 mx-auto"
          style={{
            width: "650px",
            height: "700px",
            borderRadius: "20px",
            backgroundColor: "#fff",
          }}
        >
          <div className="card-body d-flex flex-column align-items-center">
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3 mt-3">
                <label htmlFor="name">Job Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  style={{
                    borderRadius: "10px",
                    borderWidth: "1px",
                    borderColor: "#fff",
                    backgroundColor: "#e7e7e5",
                    width: "580px",
                  }}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="salary">Salary</label>
                <input
                  type="number"
                  className="form-control"
                  id="salary"
                  name="salary"
                  style={{
                    borderRadius: "10px",
                    borderWidth: "1px",
                    borderColor: "#fff",
                    backgroundColor: "#e7e7e5",
                  }}
                  value={formData.salary}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  className="form-control"
                  id="location"
                  name="location"
                  style={{
                    borderRadius: "10px",
                    borderWidth: "1px",
                    borderColor: "#fff",
                    backgroundColor: "#e7e7e5",
                  }}
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="company">Company</label>
                <input
                  type="text"
                  className="form-control"
                  id="company"
                  name="company" // Set name for company input
                  style={{
                    borderRadius: "10px",
                    borderWidth: "1px",
                    borderColor: "#fff",
                    backgroundColor: "#e7e7e5",
                  }}
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="mobile">Mobile</label>
                <input
                  type="tel" // Use 'tel' type for mobile input
                  className="form-control"
                  id="mobile"
                  name="mobile" // Set name for mobile input
                  style={{
                    borderRadius: "10px",
                    borderWidth: "1px",
                    borderColor: "#fff",
                    backgroundColor: "#e7e7e5",
                  }}
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="description">Job Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  value={formData.description}
                  style={{
                    borderRadius: "10px",
                    borderWidth: "1px",
                    borderColor: "#fff",
                    backgroundColor: "#e7e7e5",
                  }}
                  onChange={handleChange}
                  required
                  rows="4"
                />
              </div>
              <button
                type="submit"
                style={{
                  borderRadius: "10px",
                }}
                className="btn btn-success"
              >
                Add Job
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
