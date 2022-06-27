import React from 'react'
import './Header.scss'

const Header = () => {
  return (
    <div className='header-container'>
        <div className="header-navlinks">
            <a href="/">Myface</a>
            <a href="/">Profile</a>
            <a href="/">Messages</a>
        </div>
    </div>
  )
}

export default Header