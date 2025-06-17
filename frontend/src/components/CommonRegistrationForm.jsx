import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CommonRegistrationForm() {
  const navigate = useNavigate();

  const [role, setRole] = useState(""); // 'police' or 'hospital'
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    username: "",
    password: "",
  });

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    // Clear form data when role changes
    setFormData({
      name: "",
      address: "",
      phone: "",
      email: "",
      username: "",
      password: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role) {
      alert("Please select Police or Hospital.");
      return;
    }

    const endpoint =
      role === "police"
        ? "http://localhost:3000/api/police/register"
        : "http://localhost:3000/api/hospital/register";

    try {
      const res = await axios.post(endpoint, formData);
      alert("Registration successful!");
      console.log("Response:", res.data);

      // Redirect based on role
      if (role === "police") {
        navigate("/police/admin");
      } else {
        navigate("/hospital/admin");
      }
    } catch (err) {
      console.error("Registration failed:", err?.response?.data?.message);
      alert(err?.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 shadow-xl bg-white mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Registration Form</h2>

      {/* Role selection */}
      <div className="mb-6">
        <label className="font-semibold block mb-2">Register As:</label>
        <select
          value={role}
          onChange={handleRoleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">-- Select Role --</option>
          <option value="police">Police Station</option>
          <option value="hospital">Hospital</option>
        </select>
      </div>

      {/* Dynamic form based on role */}
      {role && (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <div>
            <label>{role === "police" ? "Police Station Name" : "Hospital Name"}</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Register
          </button>
        </form>
      )}
    </div>
  );
}
