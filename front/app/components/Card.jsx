import React from 'react'

function Card({children}) {
  return (
    <div className="flex justify-center items-center h-[85vh]">
      <div className="shadow-xl bg-[#302F3F]  rounded-3xl px-8 py-8">
        {children}
      </div>
    </div>
  )
}

export default Card