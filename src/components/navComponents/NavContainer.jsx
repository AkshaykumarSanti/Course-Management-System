import React from "react";
import Logo from "./Logo";
import Navbar from "./Navbar";

const NavContainer = () => {
  return (
    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <Logo />
      <Navbar />
    </div>
  );
};

export default NavContainer;