import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CaptainSignup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')

  const { captain, setCaptain } = useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      fullname: {
        firstname, lastname
      },
      email,
      password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)

    if (response.status === 201) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem('token', data.token);
      navigate('/captain-home')
    }

    setEmail('');
    setPassword('');
    setFirstname('');
    setLastname('');
    setVehicleColor('');
    setVehicleCapacity('');
    setVehiclePlate('');
    setVehicleType('');
  }

  return (
    <div className='h-screen p-7 flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-8' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <form onSubmit={(e) => submitHandler(e)} action="">

          <h3 className='text-lg font-medium mb-2'>What's your name</h3>
          <div className='flex gap-4 mb-5'>
            <input className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base'
              type="text" required placeholder='Firstname'
              value={firstname} onChange={(e) => setFirstname(e.target.value)}
            />
            <input className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base'
              type="text" placeholder='Lastname'
              value={lastname} onChange={(e) => setLastname(e.target.value)}
            />
          </div>

          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email" required placeholder='email@example.com'
            value={email} onChange={(e) => setEmail(e.target.value)} />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            type="password" required placeholder='Password'
            value={password} onChange={(e) => setPassword(e.target.value)} />

          <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-4 mb-3'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Color'
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value)
              }}
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Plate'
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value)
              }}
            />
          </div>
          <div className='flex gap-4 mb-6'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="number"
              placeholder='Vehicle Capacity'
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value)
              }}
            />
            <select
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value)
              }}
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">MotorCycle</option>
            </select>
          </div>

          <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base'>Create Captain Account</button>

        </form>
        <p className='text-center mb-2'>Already have an account? <Link to='/captain-login' className='text-blue-600'>Login here</Link></p>
      </div>
      <div className='text-[10px] leading-tight'>
        <p>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
      </div>
    </div>
  )
}

export default CaptainSignup