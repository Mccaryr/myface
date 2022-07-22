import React from 'react'
import { useAppDispatch } from '../../app/hooks'
import { createUser } from '../../Auth'
import { logoutUser } from '../../features/user/userSlice'
import { Link, useNavigate } from 'react-router-dom'
import './Header.scss'

const Header: React.FC = () => {
  const dispatch = useAppDispatch()

  return (
    <div className='header-container'>
        <div className="header-navlinks">
            <Link to='/'>Myface</Link>
            <Link to='/profile' >Profile</Link>
            <Link to='/messages' >Messages</Link>
            <Link to='/' onClick={() => 
              dispatch(logoutUser()) 
              }>Logout</Link>
        </div>
    </div>
  )
}

export default Header