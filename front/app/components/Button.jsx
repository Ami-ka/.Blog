"use client";
import React from "react";

function Button({ children, className = "", onClick, disabled = false, type, onSubmit }) {
  className =
    className +
    "before:bg-[#B4499D]! px-2  hover:bg-[var(--fiolet)]! transition-colors! text-white font-bold py-2!  rounded-full focus:outline-none! focus:shadow-outline!";
  return (
    <button className={className} onClick={onClick} disabled={disabled} type={type}>
      {children}
    </button>
  );
}

export default Button;
