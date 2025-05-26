import React from "react";

function NewButton({onClick, children, disabled, type}) {
  return (
    
      <div className="flex-1">
        <button onClick={onClick} disabled={disabled} type={type} className="group/btn relative w-full bg-gradient-to-r from-[#b4499d] to-[#f07e7f] text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-[0_8px_25px_rgba(180,73,157,0.4)] hover:scale-[1.02] active:scale-[0.98] overflow-hidden">

            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
            
            <span className="relative flex items-center justify-center gap-2 text-sm">
              {children}
              </span>
          </button>
      </div>
    
  );
}

export default NewButton;
