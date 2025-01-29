import React, { useContext } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext);

  return (
    <div>
      <div className='flex items-center justify-between'>
        <div className='flex items-center justify-start gap-3'>
          <img className='h-12 w-12 rounded-full object-cover' src="https://img.freepik.com/free-photo/young-adult-man-wearing-hoodie-beanie_23-2149393636.jpg" alt="" />
          <h4 className='text-lg font-medium capitalize'>{captain.fullname.firstname + " " + captain.fullname.lastname}</h4>
        </div>
        <div>
          <h4 className='text-xl font-semibold'>₹295.20</h4>
          <p className='text-sm text-gray-600'>Earned</p>
        </div>
      </div>

      <div className='flex p-3 mt-6 bg-gray-100 rounded-xl justify-center gap-5 items-start'>
        <div className='text-center'>
          <i className="text-3xl font-thin ri-time-line"></i>
          <h5 className='text-lg font-medium'>10.2</h5>
          <p className='text-sm text-gray-600'>Hours Online</p>
        </div>
        <div className='text-center'>
          <i className="text-3xl font-thin ri-speed-up-line"></i>
          <h5 className='text-lg font-medium'>10.2</h5>
          <p className='text-sm text-gray-600'>Hours Online</p>
        </div>
        <div className='text-center'>
          <i className="text-3xl font-thin ri-booklet-line"></i>
          <h5 className='text-lg font-medium'>10.2</h5>
          <p className='text-sm text-gray-600'>Hours Online</p>
        </div>
      </div>
    </div>
  )
}

export default CaptainDetails