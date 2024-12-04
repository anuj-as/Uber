import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';


const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const captain = {
      email,
      password
    }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain);
    if (response.status === 200) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem('token', data.token);
      navigate('/captain-home');
    }
    setEmail('');
    setPassword('')
  }

  return (
    <div className='h-screen p-7 flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <form onSubmit={(e) => submitHandler(e)} action="">

          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email" required placeholder='email@example.com'
            value={email} onChange={(e) => setEmail(e.target.value)} />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            type="password" required placeholder='Password'
            value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base'>Login</button>

        </form>
        <p className='text-center mb-2'>Join a fleet? <Link to='/captain-signup' className='text-blue-600'>Register as a Captain</Link></p>
      </div>
      <div>
        <Link to='/login' className='flex items-center justify-center bg-[#d5622d] text-white font-semibold mb-5 rounded px-4 py-2  w-full text-lg placeholder:text-base'>Sign in as User </Link>
      </div>
    </div>
  )
}

export default CaptainLogin