import React from 'react'
import './SignUp.scss'

const SignUp = () => {
  return (
    <div className="signup-page">
        <div className='signup-form'>
        <h1>Create your account</h1>
        <form className='signup-form'>
            <div className="signup-textfields">
                <input type="text" placeholder="First Name" required />
                <input type="text" placeholder="Last Name" required />
                <input type="email" placeholder="Email" required />
            </div>
            <button>Create Myface Account</button>
        </form>
        </div>
        
    </div>
  )
}

export default SignUp