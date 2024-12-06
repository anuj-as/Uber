import React from 'react'
import { Link } from 'react-router-dom'

const Riding = () => {
  return (
    <div className='h-screen'>
      
      <Link to='/home' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
        <i className="text-xl ri-home-4-fill"></i>
      </Link>

      <div className='h-1/2 '>
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />

      </div>

      <div className='h-1/2 p-2'>
        <div className='flex items-center justify-between p-3'>
          <img className='h-20' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1682350473/assets/97/e2a99c-c349-484f-b6b0-3cea1a8331b5/original/UberBlack.png" alt="" />
          <div className='text-right'>
            <h2 className='text-lg font-medium'>Anuj Saxena</h2>
            <h4 className='text-xl font-semibold -mt-1 -mb-1'>MP 04 AB 1234</h4>
            <p className='text-xs text-gray-600'>Swift Desire</p>
          </div>
        </div>

        <div className='flex gap-5 justify-between flex-col items-center '>
          <div className='w-full '>
            <div className='flex items-center gap-5 border-b-2 p-2'>
              <i className="text-2xl ri-map-pin-2-fill"></i>
              <div>
                <h3 className='text-lg font-medium'>562/11-A</h3>
                <p className='text-gray-600 -mt-1'>Kakariya Talab, Bhopal</p>
              </div>
            </div>

            <div className='flex items-center gap-5  p-2 '>
              <i className="text-2xl ri-cash-line"></i>
              <div>
                <h3 className='text-lg font-medium'>₹193.20</h3>
                <p className='text-gray-600 -mt-1'>Cash</p>
              </div>
            </div>
          </div>
        </div>
        <button className='w-full mt-2 bg-green-600 text-white text-lg font-semibold p-2 rounded-lg'>Make a Payment</button>
      </div>

    </div>
  )
}

export default Riding