import React from "react";
import { NavLink } from "react-router";

const MyLink = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "btn btn-primary border-none text-black text-base rounded-full transition-all duration-300"
          : "px-4 py-3 rounded-full hover:bg-primary border-none transition-all duration-300"
      }
    >
      {children}
    </NavLink>
  );
};

export default MyLink;
