import {useState} from 'react'
import { createUser, signIn  } from '../../Auth'
import { useAppDispatch } from '../../app/hooks'
import { saveUser } from '../../features/user/userSlice'
import './Login.scss'

const Login = () => {
    const [emailInput, setEmailInput] = useState<string>('')
    const [passInput, setPassInput] = useState<string>('')
    const dispatch = useAppDispatch();


    const signUp = (e: React.MouseEvent<HTMLButtonElement>) => {

      e.preventDefault();
      createUser(emailInput, passInput);
      setEmailInput('')
      setPassInput('')
      
    }

    const signInUser = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        signIn(emailInput, passInput);
        setEmailInput('')
        setPassInput('')
        dispatch(saveUser(JSON.stringify(sessionStorage.getItem('uid'))))
      }
    

  return (
    <div className='login-container'>
        <div className='login-form'>
            <h1>MyFace Social</h1>
            <form>
                <input type="email" placeholder='Email' onChange={(e) => setEmailInput(e.target.value)} value={emailInput} />
                <input type="password" placeholder='Password' onChange={(e) => setPassInput(e.target.value)} value={passInput}  />
                <button onClick={(e) => signInUser(e)}>Log In</button>
                <a href="/">Forgot Password</a>
                <button onClick={(e) => signUp(e)}>Create new account</button>
            </form>
        </div>
    </div>
  )
}

export default Login