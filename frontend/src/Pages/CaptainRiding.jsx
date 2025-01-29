import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import LiveTracking from '../components/LiveTracking'

const CaptainRiding = () => {

  const [finishRidePanel, setFinishRidePanel] = useState(false)
  const finishRidePanelref = useRef(null)
  const location = useLocation()
  const rideData = location.state?.ride

  useGSAP(() => {
    if (finishRidePanel) {
      gsap.to(finishRidePanelref.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(finishRidePanelref.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [finishRidePanel])

  return (
    <div className='h-screen'>

      <div className='fixed w-full p-5 top-0 flex items-center justify-between'>
        <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <Link to='/captain-login' className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>

      <div className='h-4/5 '>
        {/* <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" /> */}
        <LiveTracking />
      </div>

      <div className='h-1/5 p-6 flex items-center justify-between relative bg-yellow-300 pt-12'
        onClick={() => setFinishRidePanel(true)}>

        <h5 className='p-1 text-center absolute top-0 w-[90%]' onClick={() => { }}>
          <i className="text-3xl text-black ri-arrow-up-wide-line"></i>
        </h5>

        <h4 className='text-xl font-semibold'>4 km away,</h4>
        <button className='w-full bg-green-600 flex justify-center text-white text-lg font-semibold p-3 rounded-lg'>Complete Ride</button>
      </div>

      <div ref={finishRidePanelref} className='fixed w-full z-10 bottom-0 bg-white px-3 py-10 pt-12 translate-y-full'>
        <FinishRide ride={rideData} setFinishRidePanel={setFinishRidePanel} />
      </div>

    </div>
  )
}

export default CaptainRiding