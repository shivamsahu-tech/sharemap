import React from 'react'

function Page3() {
  return (
    <div className=' rounded-md mt-6 flex justify-between page3' >
      
      <div 
      className='bg-slate-300 rounded-md text-justify cards' 
      >
          <div className='cards-content' >
                  <div
                className=' w-auto  rounded-md mb-8 info1 cards-img'
                >
                </div>

                <p className='cards-para' >
                ShareMap enhances travel experiences by letting travelers share real-time locations on a single map, improving coordination, safety, and group adventures during trips.
                </p>
          </div>
      </div>


      <div 
      className='bg-slate-300 rounded-md text-justify cards' 
      >
          <div className='  cards-content' >
                  <div
                className=' w-auto  rounded-md mb-8 info2 info cards-img'
                >
                </div>

                <p className='cards-para' >
                It helps families stay connected by providing a shared map where everyone’s real-time locations are visible, ensuring safety and coordination during family outings.
                </p>
          </div>
      </div>



      <div 
      className='bg-slate-300 rounded-md text-justify cards' 
      >
          <div className=' cards-content' >
                  <div
                className=' w-auto  rounded-md mb-8 info3 info cards-img'
                >
                </div>

                <p className='cards-para' >
                ShareMap boosts coordination by displaying all members’ real-time locations on one map, making it easy to manage plans and stay connected during group activities.
                </p>
          </div>
      </div>

    </div>
  )
}

export default Page3
