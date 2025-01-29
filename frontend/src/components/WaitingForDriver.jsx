import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div>
      <h5 className='p-1 text-center absolute top-0 w-[93%]' onClick={() => props.setWaitingForDriver(false)}>
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>

      <div className='flex items-center justify-around mb-3'>
        <img className='h-20' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1682350473/assets/97/e2a99c-c349-484f-b6b0-3cea1a8331b5/original/UberBlack.png" alt="" />
        <div className='text-right'>
          <h2 className='text-lg font-medium capitalize'>{props.ride?.captain.fullname.firstname}</h2>
          <h4 className='text-xl font-semibold -mt-1 -mb-1'>{props.ride?.captain.vehicle.plate}</h4>
          <p className='text-xs text-gray-600'>Swift Desire</p>
          <h2 className='text-lg font-medium text-red-500'>OTP : {props.ride?.otp} </h2>
        </div>

      </div>

      <div className='flex gap-5 justify-between flex-col items-center '>
        <div className='w-full '>
          <div className='flex items-center gap-5 border-b-2 p-2'>
            <i className="text-2xl ri-map-pin-user-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>Pickup</h3>
              <p className='text-gray-600 -mt-1'>{props.ride?.pickup}</p>
            </div>
          </div>
          <div className='flex items-center gap-5 border-b-2 p-2'>
            <i className="text-2xl ri-map-pin-2-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>Destination</h3>
              <p className='text-gray-600 -mt-1'>{props.ride?.destination}</p>
            </div>
          </div>
          <div className='flex items-center gap-5  p-2 '>
            <i className="text-2xl ri-cash-line"></i>
            <div>
              <h3 className='text-lg font-medium'>{props.ride?.fare}</h3>
              <p className='text-gray-600 -mt-1'>Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WaitingForDriver