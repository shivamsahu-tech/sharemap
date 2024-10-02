import React from 'react'

function Page1() {
  return (
    <div className='w-10/12 bg-slate-300 rounded-md   mt-4 flex page1' >
      
      <div 
      className=' w-3/6 flex flex-col justify-center p-10 text-justify description' 
      >
        <h1 
        className=' text-5xl font-bold -mt-10' 
        > <i>Stay <br />Connected</i> 
        </h1>

        <h1 
        className='text-3xl font-semibold mb-10' 
        > <i>share map, with friends</i> 
        </h1>

        <p 
        className='mb-6' 
        >
            Create a group effortlessly, share the group ID with friends, and join groups with just a code. Instantly view each other’s real-time locations on an interactive map. Stay connected seamlessly with secure and straightforward location sharing.

        </p>

        <p>    
        Ideal for coordinating meetups or tracking your group’s movements.
        </p>

      </div>

      <div 
      className=' imgs w-3/6 h-auto  flex items-center justify-center' 
      >
        <div 
        className='desc-imgs ' 
        >
            <div className='img1' ></div>
            <div className='img2' ></div>
        </div>
      </div>

    </div>
  )
}

export default Page1
