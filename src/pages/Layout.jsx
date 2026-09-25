import React from "react";
import NavContainer from "../components/navComponents/NavContainer";
import Footer from "../components/footer/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
        <NavContainer />
      </header>

      {/* Main Content */}
      <main className="relative flex-1 overflow-hidden h-[100vh]">
        {/* Soft background decoration */}
       
          <Outlet />
    
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
