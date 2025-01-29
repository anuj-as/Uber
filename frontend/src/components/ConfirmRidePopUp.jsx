import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const ConfirmRidePopUp = (props) => {
  const [otp, setOtp] = useState('')
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
      {
        params: {
          rideId: props.ride._id,
          otp: otp
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      },
    )
    
    if (response.status === 200) {
      props.setConfirmRidePopUpPanel(false)
      props.setRidePopUpPanel(false)
      navigate('/captain-riding', { state: { ride: props.ride } })
    }

  }

  return (
    <div>
      <h5 className='p-1 text-center absolute top-0 w-[93%] ' onClick={() => props.setConfirmRidePopUpPanel(false)}>
        <i className="text-3xl text-green-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className='text-2xl font-bold mb-1'>Confirm this ride to start</h3>
      <div className='flex items-center justify-between p-3 bg-gray-100 rounded-lg'>
        <div className='flex items-center gap-3 my-3'>
          <img className='h-12 w-12 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7SieSDnaZtBEq5mYqs-QZEOMuiED6aC6X0Q&s" alt="" />
          <h2 className='text-lg font-medium capitalize'>{props.ride?.user.fullname.firstname}</h2>
        </div>
        <h5 className='text-lg font-semibold'>2.2 km</h5>
      </div>

      <div className='flex gap-2 justify-between flex-col items-center'>
        <div className='w-full '>
          <div className='flex items-center gap-5 border-b-2 p-2'>
            <i className="text-2xl ri-map-pin-2-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>Pickup</h3>
              <p className='text-gray-600 -mt-1'>{props.ride?.pickup}</p>
            </div>
          </div>
          <div className='flex items-center gap-5 border-b-2 p-2'>
            <i className="text-2xl ri-map-pin-user-fill"></i>
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

        <div className='mt-3 w-full'>
          <form onSubmit={submitHandler}>
            <input value={otp} onChange={(e) => setOtp(e.target.value)} type="text" placeholder='Enter OTP'
              className='bg-[#eee] px-6 py-4 text-xl font-mono rounded-lg w-full mt-1'
            />

            <button className='mt-3 w-full bg-green-600 flex justify-center text-white text-xl font-semibold p-3 rounded-lg'>Confirm</button>
            <button onClick={() => {
              props.setConfirmRidePopUpPanel(false)
              props.setRidePopUpPanel(false)
            }} className='w-full mt-2 bg-red-600 text-white text-xl font-semibold p-3 rounded-lg'>Cancel Ride</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ConfirmRidePopUp