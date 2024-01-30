import React, { useState } from 'react'
import Centernavbar from './Centernavbar'
import Postfeed from './Postfeed'
function Center() {
  return (
    <div className=' h-full w-full '>

<Centernavbar/>
<div className="">
  <Postfeed/>
</div>
        </div>
  )
}

export default Center