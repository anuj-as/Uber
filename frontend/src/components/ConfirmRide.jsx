import React from 'react'

const ConfirmRide = (props) => {
  return (
    <div>
      <h5 className='p-1 text-center absolute top-0 w-[93%] ' onClick={() => props.setConfirmRidePanel(false)}>
        <i className="text-3xl text-green-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className='text-2xl font-bold '>Confirm your Ride</h3>

      <div className='flex gap-5 justify-between flex-col items-center'>
        <img className='h-28' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
        <div className='w-full '>
          <div className='flex items-center gap-5 border-b-2 p-2'>
            <i className="text-2xl ri-map-pin-2-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>562/11-A</h3>
              <p className='text-gray-600 -mt-1'>Kakariya Talab, Bhopal</p>
            </div>
          </div>
          <div className='flex items-center gap-5 border-b-2 p-2'>
            <i className="text-2xl ri-map-pin-user-fill"></i>
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
        <button onClick={() => {
          props.setVehicleFound(true)
          props.setConfirmRidePanel(false);
          props.setVehiclePanel(false);
        }} className='w-full bg-green-600 text-white text-lg font-semibold p-2 rounded-lg'>Confirm</button>
      </div>


    </div>
  )
}

export default ConfirmRide