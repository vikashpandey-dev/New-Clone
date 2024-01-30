import React from 'react'
import Header from './components/Header'
import MainSection from './components/MainSection'
import RightSection from './components/RightSection'

function Home() {
  return (
    <div className='flex'>
    {/* <div className='w-2/3'> */}
    <div className='w-full'>
    <Header />
    <MainSection />
    </div>
    {/* <div className='w-1/3 h-screen'>
      <RightSection />
    </div> */}
    </div>
  )
}

export default Home