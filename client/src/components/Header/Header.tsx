import React from 'react'
import { useAppDispatch } from '../../app/hooks'
import { createUser } from '../../Auth'
import { logoutUser } from '../../features/user/userSlice'
import './Header.scss'

const Header: React.FC = () => {
  const dispatch = useAppDispatch()

  return (
    <div className='header-container'>
        <div className="header-navlinks">
            <a href="/">Myface</a>
            <a href="/">Profile</a>
            <a href="/">Messages</a>
            <button onClick={() => dispatch(logoutUser())}>Logout</button>
        </div>
    </div>
  )
}

export default Header