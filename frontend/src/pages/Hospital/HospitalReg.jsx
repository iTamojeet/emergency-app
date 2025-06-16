import React, { useState } from "react";

export default function HospitalRegistrationForm() {
  const [formData, setFormData] = useState({
    hospitalName: "",
    address: "",
    phone: "",
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting:", formData);
    // Submit formData to your backend or API
  };

  return (
    <div className="max-w-3xl mx-auto p-6 shadow-xl">
      <div>
        <h2 className="text-2xl font-bold mb-6">Hospital Registration Form</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <div>
            <label>Hospital Name</label>
            <input
              type="text"
              name="hospitalName"
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
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}