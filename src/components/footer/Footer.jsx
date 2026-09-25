import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          
          {/* Logo / Description */}
          <div>
            <Link
              to="/"
              className="text-xl font-bold tracking-tight text-slate-900"
            >
              Course<span className="text-blue-600">.</span>
            </Link>

            <p className="mt-2 max-w-sm text-sm text-slate-500">
              Learn new skills, explore courses, and grow your knowledge.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <Link
              to="/"
              className="text-slate-500 transition hover:text-blue-600"
            >
              Courses
            </Link>

            <Link
              to="/cart"
              className="text-slate-500 transition hover:text-blue-600"
            >
              Cart
            </Link>

            <Link
              to="/addcourse"
              className="text-slate-500 transition hover:text-blue-600"
            >
              Add Course
            </Link>

            <Link
              to="/login"
              className="text-slate-500 transition hover:text-blue-600"
            >
              Login
            </Link>
          </div>
        </div>

       
      </div>
    </footer>
  );
};

export default Footer;
