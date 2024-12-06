import React from 'react'

const VehiclePanel = (props) => {
  return (
    <div>
      <h5 className='p-1 text-center absolute top-0 w-[93%] ' onClick={() => props.setVehiclePanel(false)}>
        <i className="text-3xl text-green-200 ri-arrow-down-wide-line"></i>
      </h5>

      <h3 className='text-2xl font-semibold mb-4'>Choose a vehicle</h3>

      <div onClick={() => props.setConfirmRidePanel(true)} className='flex w-full items-center justify-between p-3 border-2 mb-2 active:border-black rounded-xl'>
        <img className='h-16' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1682350473/assets/97/e2a99c-c349-484f-b6b0-3cea1a8331b5/original/UberBlack.png" alt="" />
        <div className='ml-2 w-1/2'>
          <h4 className='font-medium text-base'>UberGo <span><i className="ri-user-3-fill"></i>4</span> </h4>
          <h5 className='font-medium text-sm'>2 mins away</h5>
          <p className='font-normal text-xs  text-gray-500'>Affordable, compact rides</p>
        </div>
        <h2 className='text-lg font-semibold'>₹193.20</h2>
      </div>

      <div onClick={() => props.setConfirmRidePanel(true)} className='flex w-full items-center justify-between p-3 border-2 mb-2 active:border-black rounded-xl'>
        <img className='h-16' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
        <div className='ml-2 w-1/2'>
          <h4 className='font-medium text-base'>Moto <span><i className="ri-user-3-fill"></i>1</span> </h4>
          <h5 className='font-medium text-sm'>3 mins away</h5>
          <p className='font-normal text-xs  text-gray-500'>Affordable, Mortorcycle rides</p>
        </div>
        <h2 className='text-lg font-semibold'>₹65.17</h2>
      </div>

      <div onClick={() => props.setConfirmRidePanel(true)} className='flex w-full items-center justify-between p-3 border-2 mb-2 active:border-black rounded-xl'>
        <img className='h-16' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
        <div className='ml-2 w-1/2'>
          <h4 className='font-medium text-base'>UberAuto <span><i className="ri-user-3-fill"></i>3</span> </h4>
          <h5 className='font-medium text-sm'>2 mins away</h5>
          <p className='font-normal text-xs  text-gray-500'>Affordable, auto rides</p>
        </div>
        <h2 className='text-lg font-semibold'>₹118.68</h2>
      </div>
    </div>
  )
}

export default VehiclePanel