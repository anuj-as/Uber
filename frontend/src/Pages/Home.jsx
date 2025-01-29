import React, { useContext, useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import axios from 'axios';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import { SocketContext } from '../context/SocketContext';
import { UserDataContext } from '../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';

const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)
  const [pickupSuggestions, setPickupSuggestions] = useState([])
  const [destinationSuggestions, setDestinationSuggestions] = useState([])
  const [activeField, setActiveField] = useState(null)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)

  const [fare, setFare] = useState({})
  const [vehicleType, setVehicleType] = useState(null)
  const [ride, setRide] = useState(null)
  const navigate = useNavigate();

  const { socket } = useContext(SocketContext)
  const { user } = useContext(UserDataContext)

  useEffect(() => {
    socket.emit('join', { userType: 'user', userId: user._id })
  }, [user])

  socket.on('ride-confirmed', ride => {
    setVehicleFound(false);
    setWaitingForDriver(true);
    setRide(ride);
  })

  socket.on('ride-started', ride => {
    setWaitingForDriver(false);
    navigate('/riding', { state: { ride } });
  })

  useGSAP(function () {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '65%',
        opacity: 1,
        padding: 24,
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

  const animatePanel = (ref, condition) => {
    gsap.to(ref.current, {
      transform: condition ? 'translateY(0)' : 'translateY(100%)',
      display: condition ? 'block' : 'none',
    })
  }
  useGSAP(() => animatePanel(vehiclePanelRef, vehiclePanel), [vehiclePanel])
  useGSAP(() => animatePanel(confirmRidePanelRef, confirmRidePanel), [confirmRidePanel])
  useGSAP(() => animatePanel(vehicleFoundRef, vehicleFound), [vehicleFound])
  useGSAP(() => animatePanel(waitingForDriverRef, waitingForDriver), [waitingForDriver])


  const handlePickupChange = async (e) => {
    setPickup(e.target.value)
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input: e.target.value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setPickupSuggestions(response.data)
    } catch {
      // handle error
    }
  }

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value)
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input: e.target.value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setDestinationSuggestions(response.data)
    } catch {
      // handle error
    }
  }

  const findTrip = async () => {
    setVehiclePanel(true)
    setPanelOpen(false)

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
      params: { pickup, destination },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    setFare(response.data)
  }

  const createRide = async () => {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
      pickup,
      destination,
      vehicleType
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    console.log(response.data);
  }

  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 absolute z-20 left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
      <div className='h-3/5'>
        <LiveTracking />
      </div>
      <div className='flex flex-col justify-end h-screen absolute top-0 w-full z-30 '>
        <div className='h-[40%] bg-white px-6 py-5 relative'>
          <h5 ref={panelCloseRef} className='opacity-0 absolute top-3 right-6 text-2xl' onClick={() => setPanelOpen(false)}>
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className='text-2xl font-bold'>Find a trip</h4>
          <form onSubmit={(e) => e.preventDefault()} >
            <div className="line absolute h-16 w-1 top-[33%] left-10 bg-gray-800 rounded-full"></div>
            <input className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3 ' type="text" placeholder='Add a pickup location'
              value={pickup} onChange={handlePickupChange}
              onClick={() => {
                setPanelOpen(true)
                setActiveField('pickup')
              }}
            />
            <input className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3' type="text" placeholder='Enter your destination'
              value={destination} onChange={handleDestinationChange}
              onClick={() => {
                setPanelOpen(true)
                setActiveField('destination')
              }}
            />
          </form>
          <button
            onClick={findTrip}
            className='bg-gray-800 text-white text-lg px-12 py-2 rounded-lg mt-3 w-full'>
            Find Trip
          </button>
        </div>

        <div ref={panelRef} className='h-0 opacity-0 bg-white'>
          <LocationSearchPanel
            suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>

      <div ref={vehiclePanelRef} className='fixed w-full z-50 bottom-0 bg-white px-3 py-10 pt-12 translate-y-full'>
        <VehiclePanel setVehicleType={setVehicleType} fare={fare} setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />
      </div>

      <div ref={confirmRidePanelRef} className='fixed w-full z-50 bottom-0 bg-white px-3 py-6 pt-12 translate-y-full'>
        <ConfirmRide
          setVehiclePanel={setVehiclePanel}
          createRide={createRide}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
          pickup={pickup} destination={destination} fare={fare} vehicleType={vehicleType}
        />

      </div>

      <div ref={vehicleFoundRef} className='fixed w-full z-50 bottom-0 bg-white px-3 py-6 pt-12 translate-y-full'>
        <LookingForDriver
          setVehicleFound={setVehicleFound}
          pickup={pickup} destination={destination} fare={fare} vehicleType={vehicleType}

        />
      </div>

      <div ref={waitingForDriverRef} className='fixed w-full z-50 bottom-0 bg-white  px-3 py-6 pt-12 translate-y-full'>
        <WaitingForDriver setWaitingForDriver={setWaitingForDriver}
          ride={ride} waitingForDriver={waitingForDriver}
        />
      </div>
    </div>
  )
}

export default Home