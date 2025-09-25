import React, { useState } from "react";

export function Form() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setSuccess("");
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name required";
    if (!formData.email.trim()) newErrors.email = "Email required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email invalid";
    if (!formData.password) newErrors.password = "Password required";
    else if (formData.password.length < 6) newErrors.password = "Min 6 chars";
    if (formData.confirmPassword !== formData.password) newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const val = validate();
    if (Object.keys(val).length > 0) setErrors(val);
    else {
      setErrors({});
      setSuccess("Form submitted successfully! 🎉");
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    }
  };

  return (
    <div className="card">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange}/>
        {errors.name && <span className="error">{errors.name}</span>}
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange}/>
        {errors.email && <span className="error">{errors.email}</span>}
        <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange}/>
        {errors.password && <span className="error">{errors.password}</span>}
        <input name="confirmPassword" type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange}/>
        {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
        <button type="submit">Submit</button>
      </form>
      {success && <p className="success">{success}</p>}
    </div>
  );
}
