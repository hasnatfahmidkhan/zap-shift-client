import React from "react";
import { FaArrowRight } from "react-icons/fa";

const SecondaryBtn = ({ children, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`btn text-black font-bold text-xl rounded-xl py-6 px-8 ${className}`}
    >
      {children}
    </button>
  );
};

export default SecondaryBtn;
