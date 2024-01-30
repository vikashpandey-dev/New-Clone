import React from 'react'
import Header from './components/Header'
import RightSection from './components/RightSection'
import FeedbackComments from './components/FeedbackComments'
function Feedback() {
  return (
    <div className='flex'>
      <div className='w-2/3'>
      <Header />
      <FeedbackComments />
      </div>
      <div className='w-1/3 h-screen'>
        <RightSection />
      </div>
      </div>
  )
}

export default Feedback