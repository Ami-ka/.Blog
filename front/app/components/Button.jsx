import React from "react";

function Button({ children, className , onClick}) {
    className= className +" bg-[#B4499D]  hover:bg-[#F07E7F] transition-colors duration-300 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
