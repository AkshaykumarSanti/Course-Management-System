import React, { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { UserProvider } from "../context/UserContext";

const Login = () => {
  const { login } = useContext(UserProvider);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      toast.error("Enter your email and password");
      return;
    }

    try {
      const { data } = await axios.get("http://localhost:5000/users", {
        params: {
          email: email.trim(),
        },
      });

      if (data.length === 0) {
        toast.error("User not found");
        return;
      }

      const user = data[0];

      if (user.password !== password) {
        toast.error("Invalid password");
        return;
      }

      login(user);
      toast.success("Login successful");
      navigate("/");
    } catch (error) {
      toast.error("Cannot reach the server");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/50 sm:p-8"
    >
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Welcome Back</h2>
        <p className="mt-2 text-sm text-slate-500">Login to your account</p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Password
          </label>

          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Login
        </button>
      </div>

      <p className="mt-5 text-center text-sm text-slate-600">
        Don't have an account?{" "}
        <Link to="/signup" className="font-semibold text-blue-600">
          Sign Up
        </Link>
      </p>
    </form>
  );
};

export default Login;