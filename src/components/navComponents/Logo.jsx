import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      to="/"
      className="text-xl font-bold tracking-tight text-slate-900 transition-colors hover:text-blue-600"
    >
      Course<span className="text-blue-600">.</span>
    </Link>
  );
};

export default Logo;