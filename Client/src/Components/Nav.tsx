import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  const user = localStorage.getItem("taskboard_user");

  const handleLogout = () => {
    localStorage.removeItem("taskboard_user");
    window.location.reload();
  };

  return (
    <div className="w-full flex justify-center py-4 relative">
      <Link to="/" className="group relative cursor-pointer">
        <h1 className="md:text-4xl font-black tracking-tighter select-none">
          <span className="text-primary drop-shadow-sm">B</span>
          <span className="text-base-content/20 font-thin mx-1">-</span>
          <span className="text-base-content group-hover:text-base-content/80 transition-colors">
            Productive
          </span>
        </h1>
      </Link>

      {user && (
        <button
          className="absolute right-8 top-1/2 -translate-y-1/2 btn btn-sm btn-ghost hover:bg-error hover:text-white transition-colors"
          onClick={handleLogout}
        >
          Wyloguj
        </button>
      )}
    </div>
  );
}

export default Nav;
