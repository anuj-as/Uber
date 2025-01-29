import React, { useRef, useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'
import LiveTracking from '../components/LiveTracking'

const CaptainHome = () => {

  const [ridePopUpPanel, setRidePopUpPanel] = useState(false);
  const ridePopUpPanelRef = useRef(null);
  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);
  const confirmRidePanelRef = useRef(null);
  const [ride, setRide] = useState(null)

  const { socket } = useContext(SocketContext)
  const { captain } = useContext(CaptainDataContext)

  useEffect(() => {
    socket.emit('join', { userId: captain._id, userType: 'captain' })

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          // console.log({
          //   userId: captain._id,
          //   location: {
          //     ltd: position.coords.latitude,
          //     lng: position.coords.longitude
          //   }
          // })

          socket.emit('update-location-captain', {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude
            }
          })
        })
      }
    }

    const locationInterval = setInterval(updateLocation, 10000)
    updateLocation()

  })

  socket.on('new-ride', (data) => {
    console.log(data);
    setRide(data);
    setRidePopUpPanel(true);
  })

  useGSAP(() => {
    if (ridePopUpPanel) {
      gsap.to(ridePopUpPanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(ridePopUpPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [ridePopUpPanel])

  useGSAP(() => {
    if (confirmRidePopUpPanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePopUpPanel])

  const confirmRide = async () => {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
      rideId: ride._id,
      captainId: captain._id,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    setRidePopUpPanel(false)
    setConfirmRidePopUpPanel(true)
  }

  return (
    <div className='h-screen'>

      <div className='fixed w-full p-5 top-0 flex items-center justify-between z-10'>
        <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <Link to='/captain/logout' className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>

      <div className='h-3/5 '>
        {/* <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" /> */}
        <LiveTracking />
      </div>

      <div className='h-2/5 p-6'>
        <CaptainDetails />
      </div>

      <div ref={ridePopUpPanelRef} className='fixed w-full z-10 bottom-0 bg-white px-3 py-10 pt-12 translate-y-full'>
        <RidePopUp
          ride={ride}
          confirmRide={confirmRide}
          setRidePopUpPanel={setRidePopUpPanel} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} />
      </div>

      <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 h-screen bg-white px-3 py-10 pt-12 translate-y-full'>
        <ConfirmRidePopUp
          ride={ride}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} setRidePopUpPanel={setRidePopUpPanel}
        />
      </div>

    </div>
  )
}

export default CaptainHome