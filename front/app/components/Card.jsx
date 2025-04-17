import React from 'react'

function Card({children, className}) {
  className = className + " shadow-lg bg-[#302F3F]  rounded-3xl px-8 py-8";
  return (
      <div className={className}>
        {children}
      </div>
  )
}

export default Card