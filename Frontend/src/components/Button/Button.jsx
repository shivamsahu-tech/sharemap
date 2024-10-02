import React from 'react'

function Button({method, title, isLoading = false, bgc}) {
  return (

       <button
            className={`text-white w-full mt-4 ${bgc} text-xl font-semibold p-1 px-16 rounded-md btn-login`}
            onClick={method}
            >{
                !isLoading ? (
                    <p>{title}</p>
                ) : (
                    <i class="fa-solid fa-spinner fa-spin"></i>
                )
                
            }
        </button>

  )
}

export default Button
