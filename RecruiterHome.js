import React from "react";
// import { useNavigate } from "react-router-dom";
// import recruiterhome from "../images/recruiterhome.jpg";
import NavbarRec from "../NavbarRec";

export default function RecruiterHome() {
  // const navigate = useNavigate(); // Initialize useNavigate to handle navigation

  // const handleLogout = () => {
  //   // Logic to handle logout, like clearing local storage or calling API
  //   localStorage.removeItem("id"); // Clear stored recruiter id, for example
  //   navigate("/"); // Redirect to the login page
  // };

  return (
    <>
      <style>
        {`
          .custom-navbar {
            background-color: #5f84de !important; /* Ensure the background color is applied */
          }
          .custom-navbar .nav-link, 
          .custom-navbar .navbar-brand {
            color: #fff !important; /* Ensure the text color is white */
          }
        `}
      </style>
      {/* Navbar */}
      <div
        style={{
          // backgroundImage: `url(${recruiterhome})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          backgroundColor: "#e7e7e5",
        }}
      >
        <NavbarRec />
        {/* Main content */}
        <div className="container my-5">
          <h2 className="text-center mb-4">Recruiter Dashboard</h2>
          <div className="text-center">
            {/* <button
              className="btn btn-primary mx-3"
              onClick={() => navigate("/recruiter/applications")}
            >
              Applications
            </button>
            <button
              className="btn btn-secondary mx-3"
              onClick={() => navigate("/recruiter/addjob")}
            >
              Add Job
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
}
