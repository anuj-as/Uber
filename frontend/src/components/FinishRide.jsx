import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const FinishRide = (props) => {

  const navigate = useNavigate()

  async function endRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {
      rideId: props.ride._id
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    if (response.status === 200) {
      navigate('/captain-home')
    }
  }

  return (
    <div>
      <h5 className='p-1 text-center absolute top-0 w-[93%] ' onClick={() => props.setFinishRidePanel(false)}>
        <i className="text-3xl text-green-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className='text-2xl font-bold mb-3'>Finish this Ride.</h3>
      <div className='flex items-center justify-between px-3 my-5 bg-yellow-300 rounded-lg'>
        <div className='flex items-center gap-3 my-3 '>
          <img className='h-12 w-12 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7SieSDnaZtBEq5mYqs-QZEOMuiED6aC6X0Q&s" alt="" />
          <h2 className='text-lg font-medium'>{props.ride?.user.fullname.firstname} </h2>
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

        <div className='mt-6 w-full'>

          <button
            onClick={endRide}
            className='mt-5 w-full bg-green-600 flex justify-center text-white text-xl font-semibold p-3 rounded-lg'>Finish Ride
          </button>

        </div>
      </div>
    </div>
  )
}

export default FinishRide