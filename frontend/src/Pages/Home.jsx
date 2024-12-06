import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';

const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const vehiclePanelRef = useRef(null)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const confirmRidePanelRef = useRef(null)
  const [vehicleFound, setVehicleFound] = useState(false)
  const vehicleFoundRef = useRef(null)
  const [waitingForDriver, setWaitingForDriver] = useState(false)
  const waitingForDriverRef = useRef(null)


  const submitHandler = (e) => {
    e.preventDefault();
  }

  useGSAP(function () {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        opacity: 1,
        padding: 24
      })
      gsap.to(panelCloseRef.current, {
        opacity: 1
      })
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        opacity: 0,
        padding: 0
      })
      gsap.to(panelCloseRef.current, {
        opacity: 0
      })
    }
  }, [panelOpen])

  useGSAP(() => {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehiclePanel])

  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePanel])

  useGSAP(() => {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehicleFound])

  useGSAP(() => {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [waitingForDriver])

  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
      <div className='h-screen w-screen'>
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>
      <div className='flex flex-col justify-end h-screen absolute top-0 w-full '>
        <div className='h-[30%] bg-white p-6 relative'>
          <h5 ref={panelCloseRef} className='opacity-0 absolute top-3 right-6 text-2xl' onClick={() => setPanelOpen(false)}>
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className='text-2xl font-bold'>Find a trip</h4>
          <form onSubmit={(e) => submitHandler(e)} >
            <div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-800 rounded-full"></div>
            <input className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-4 ' type="text" placeholder='Add a pickup location'
              value={pickup} onChange={(e) => setPickup(e.target.value)}
              onClick={() => setPanelOpen(true)}
            />
            <input className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3' type="text" placeholder='Enter your destination'
              value={destination} onChange={(e) => setDestination(e.target.value)}
              onClick={() => setPanelOpen(true)}
            />
          </form>
        </div>

        <div ref={panelRef} className='h-0 opacity-0 bg-white'>
          <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanel={setVehiclePanel} />
        </div>
      </div>

      <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 bg-white px-3 py-10 pt-12 translate-y-full'>
        <VehiclePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />
      </div>

      <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12 translate-y-full'>
        <ConfirmRide setVehiclePanel={setVehiclePanel} setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
      </div>

      <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12 translate-y-full'>
        <LookingForDriver setVehicleFound={setVehicleFound} />
      </div>

      <div ref={waitingForDriverRef} className='fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12 translate-y-full'>
        <WaitingForDriver setWaitingForDriver={setWaitingForDriver} />
      </div>
    </div>
  )
}

export default Home