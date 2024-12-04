import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'

const UserSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  // const [userData, setUserData] = useState({})

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullname: {
        firstname, lastname
      },
      email,
      password
    }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)
    if (response.status === 201) {
      const data = response.data
      setUser(data.user);
      localStorage.setItem('token', data.token)
      navigate('/home');
    }
    setEmail('');
    setPassword('');
    setFirstname('');
    setLastname('');
  }

  return (
    <div>
      <div className='h-screen p-7 flex flex-col justify-between'>
        <div>
          <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
          <form onSubmit={(e) => submitHandler(e)} action="">

            <h3 className='text-lg font-medium mb-2'>What's your name</h3>
            <div className='flex gap-4 mb-6'>
              <input className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base'
                type="text" required placeholder='Firstname'
                value={firstname} onChange={(e) => setFirstname(e.target.value)} />
              <input className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base'
                type="text" placeholder='Lastname'
                value={lastname} onChange={(e) => setLastname(e.target.value)} />

            </div>

            <h3 className='text-lg font-medium mb-2'>What's your email</h3>
            <input className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
              type="email" required placeholder='email@example.com'
              value={email} onChange={(e) => setEmail(e.target.value)} />

            <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
            <input className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
              type="password" required placeholder='Password'
              value={password} onChange={(e) => setPassword(e.target.value)} />

            <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base'>Create Account</button>

          </form>
          <p className='text-center mb-2'>Already have an account? <Link to='/login' className='text-blue-600'>Login here</Link></p>
        </div>
        <div className='text-[10px] leading-tight'>
          <p>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and  <span className='underline'>Terms of Service apply</span>.</p>
        </div>
      </div>
    </div>
  )
}

export default UserSignup