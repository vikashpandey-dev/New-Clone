import React from 'react'
import Left from './Left/Left'
import Right from './Right/Right'
import Center from './Center/Center'
function Main() {
  return (
   <>
 <div className='flex w-full mx-auto md:container'>
 <div className='w-10 md:w-[30%] '><Left/></div>
 <div className='w-full md:w-[40%]'><Center/></div>
 <div className='w-1 hidden md:w-[30%]  md:block'><Right/></div>

 </div>
   </>
  )
}

export default Main