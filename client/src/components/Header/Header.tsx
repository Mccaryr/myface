import React from 'react'
import { useAppDispatch } from '../../app/hooks'
import { createUser } from '../../Auth'
import { logoutUser } from '../../features/user/userSlice'
import { Link } from 'react-router-dom'
import './Header.scss'

const Header: React.FC = () => {
  const dispatch = useAppDispatch()

  return (
    <div className='header-container'>
        <div className="header-navlinks">
            <a href="/">Myface</a>
            <Link to='/profile' >Profile</Link>
            <Link to='/messages' >Messages</Link>
            <button onClick={() => dispatch(logoutUser())}>Logout</button>
        </div>
    </div>
  )
}

export default Header