import React from 'react'

function Card({children}) {
  return (
    <div className="flex justify-center items-center h-[85vh]">
      <div className="shadow-xl bg-[#302F3F]  w-auto flex justify-center items-center rounded-3xl px-6 py-10">
        {children}
      </div>
    </div>
  )
}

export default Card