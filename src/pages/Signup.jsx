import React, { useState } from "react";
import { v4 as randomId } from "uuid";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { username, email, password, confirmPassword, gender } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !username.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword ||
      !gender
    ) {
      toast.error("Complete all fields before signing up");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const already = await axios.get("http://localhost:5000/users", {
        params: { email: email.trim() },
      });

      if (already.data.length > 0) {
        toast.error("An account with this email already exists");
        return;
      }

      const user = {
        id: randomId(),
        username: username.trim(),
        email: email.trim(),
        password,
        gender,
        role: "user",
      };

      await axios.post("http://localhost:5000/users", user);

      toast.success("Account created successfully");
      navigate("/login");
    } catch (error) {
      toast.error(
        error.response
          ? "Unable to create your account. Please try again."
          : "Cannot reach the server. Start the API and try again."
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-3">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-5 shadow-md"
      >
        <div className="mb-4 text-center">
          <h2 className="text-xl font-bold text-slate-900">
            Create Account
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Sign up to start learning
          </p>
        </div>

        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleChange}
              placeholder="Enter username"
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter password"
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-slate-700">
              Gender
            </label>

            <div className="flex gap-5">
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={handleChange}
                  className="accent-blue-600"
                />
                Male
              </label>

              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={handleChange}
                  className="accent-blue-600"
                />
                Female
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Sign Up
          </button>
        </div>

        <p className="mt-4 text-center text-xs text-slate-600">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-blue-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;