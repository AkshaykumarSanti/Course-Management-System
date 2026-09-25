import React, { useContext, useState } from "react";
import { v4 as randomId } from "uuid";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { UserProvider } from "../context/UserContext";
const Login = () => {
  let {login} = useContext(UserProvider)
  let navigate = useNavigate();
  let [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  let { password, email, role } = formData;

  let handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };
  console.log(formData);
  let handleSubmit = async (e) => {
    e.preventDefault();
    let res = await axios.get(
      `http://localhost:5000/users?email=${email}&password=${password}&role=${role}`,
    );
    if (res.status == 200 && res.data.length > 0) {
      login(res.data[0])
      
      toast.success("login successfull");
      navigate("/");
    } else {
      toast.error("cannot login");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/50 sm:p-8"
    >
      {/* Heading */}
      <div className="mb-6 text-center">
        <p className="mt-2 text-sm text-slate-500">Login</p>
      </div>

      <div className="space-y-5">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            value={email}
            name="email"
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Password
          </label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={handleChange}
            name="password"
            placeholder="Enter your password"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="mb-3 block text-sm font-medium text-slate-700">
            Role
          </label>

          <div className="flex gap-6">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
              <input
                type="radio"
                checked={role === "admin"}
                onChange={handleChange}
                value="admin"
                name="role"
                className="h-4 w-4 accent-blue-600"
              />
              Admin
            </label>

            <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
              <input
                type="radio"
                checked={role === "user"}
                onChange={handleChange}
                value="user"
                name="role"
                className="h-4 w-4 accent-blue-600"
              />
              user
            </label>
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm shadow-blue-200 transition-all duration-200 hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-500/20 active:scale-[0.98]"
        >
          Login
        </button>
      </div>
      <p>Don't have an account ? <Link to='/signup'>SignUp</Link></p>
    </form>
  );
};

export default Login;
