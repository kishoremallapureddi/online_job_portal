import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import recruiterLoginImg from "../images/recruiterLogin.png";

export default function RecruiterLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegisterClick = () => {
    navigate("/registerRecruiter");
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);

    setError("");
    try {
      const response = await axios.post(
        `http://localhost:8080/recruiterlogin/${encodeURIComponent(
          email
        )}/${encodeURIComponent(password)}`,
        {}, // Send an empty object since we don't need a body
        {
          headers: {
            "Content-Type": "application/json", // Ensure correct content type
          },
        }
      );
      console.log("API Response:", response.data);
      if (response.status === 200) {
        alert("Login successful!");

        // Assuming the response contains the recruiter object
        const recruiterId = response.data.id; // Change according to your API response structure
        localStorage.setItem("recruiterId", recruiterId); // Store recruiter ID in local storage
        console.log(localStorage.getItem("id"));

        // Call your context function to manage auth state

        // Redirect to the recruiter dashboard
        navigate("/recruiter");
      }
    } catch (error) {
      setError("Invalid email or password. Please try again.");

      console.error("Login failed:", error);
      // alert("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section
        style={{
          // backgroundImage: `url(${homeImage})`, // Adjust the path as needed
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          backgroundColor: "#e7e7e5",
        }}
        className="vh-100 d-flex flex-column"
      >
        <div className="container-fluid h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img src={recruiterLoginImg} className="img-fluid" alt="Sample" />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <h1 className="text-center mb-4">Job Portal</h1>
              <h5 className="text-center mb-4">Welcome</h5>
              <form onSubmit={handleLogin}>
                {" "}
                {/* Add onSubmit handler */}
                {/* Email input */}
                <div className="form-outline mb-4">
                  <input
                    style={{ border: "2px solid #007bff" }}
                    type="email"
                    id="form3Example3"
                    className="form-control form-control-lg"
                    placeholder="Enter a valid email address"
                    value={email} // Controlled input
                    onChange={(e) => setEmail(e.target.value)} // Handle input change
                    required
                  />
                  <label className="form-label" htmlFor="form3Example3">
                    Email address
                  </label>
                </div>
                {/* Password input */}
                <div className="form-outline mb-3">
                  <input
                    style={{ border: "2px solid #007bff" }}
                    type="password"
                    id="form3Example4"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                    value={password} // Controlled input
                    onChange={(e) => setPassword(e.target.value)} // Handle input change
                    required
                  />
                  <label className="form-label" htmlFor="form3Example4">
                    Password
                  </label>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                {/* <div className="d-flex justify-content-between align-items-center">
                  
                  <div className="form-check mb-0">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      id="form2Example3"
                    />
                    <label className="form-check-label" htmlFor="form2Example3">
                      Remember me
                    </label>
                  </div>
                  <a href="#!" className="text-body">
                    Forgot password?
                  </a>
                </div> */}
                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Don't have an account?{" "}
                    <button
                      className="btn btn-link p-0 link-danger"
                      style={{ textDecoration: "none" }}
                      onClick={handleRegisterClick}
                    >
                      Register
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

        <footer className="bg-white text-center py-3 mt-auto shadow-sm">
          <p className="mb-0 text-muted">
            &copy; {new Date().getFullYear()} Job Portal. All Rights Reserved.
          </p>
        </footer>
      </section>
    </div>
  );
}
