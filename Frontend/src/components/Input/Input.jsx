import React from 'react'

function Input({label, value, method, placeholder = "username1234", iconClass, type}) {
  return (
    <div className=' bg-white px-4 py-2 rounded-2xl mt-4 text-[#394958] ' >
        <h2 
        className='text-xl font-semibold' 
        >{label}</h2>
       <div className='flex justify-center items-center gap-2  ' >
       <i class={`${iconClass}`}></i>
       <input 
        type={type} 
        value={value}
        onChange={(e) => method(e.target.value)}
        className=' flex-1 w-[80%] focus:outline-none bg-transparent text-[#282c30]  ' 
        spellCheck={false}
        placeholder={placeholder}
        />
       </div>
    </div>
  )
}

export default Input
