import React from 'react'

const RidePopUp = (props) => {
  return (
    <div>
      <h5 className='p-1 text-center absolute top-0 w-[93%] ' onClick={() => props.setRidePopUpPanel(false)}>
        <i className="text-3xl text-green-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className='text-2xl font-bold mb-3'>New Ride Available!</h3>
      <div className='flex items-center justify-between p-3 bg-gray-100 rounded-lg'>
        <div className='flex items-center gap-3 my-3'>
          <img className='h-12 w-12 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7SieSDnaZtBEq5mYqs-QZEOMuiED6aC6X0Q&s" alt="" />
          <h2 className='text-lg font-medium'>{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h2>
        </div>
        <h5 className='text-lg font-semibold'>2.2 km</h5>
      </div>

      <div className='flex gap-2 justify-between flex-col items-center'>
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
              <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
              <p className='text-gray-600 -mt-1'>Cash</p>
            </div>
          </div>
        </div>
        <div className='flex w-full items-center justify-between'>

          <button onClick={() => {
            props.setRidePopUpPanel(false)
          }} className='bg-gray-400 text-white text-lg font-semibold p-3 px-12 rounded-lg'>Ignore</button>

          <button onClick={() => {
            props.setConfirmRidePopUpPanel(true);
            props.confirmRide();
          }} className='bg-green-600 text-white text-lg font-semibold p-3 px-12 rounded-lg'>Accept</button>

        </div>
      </div>
    </div>
  )
}

export default RidePopUp