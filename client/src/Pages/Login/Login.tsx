import {useState} from 'react'
import { signIn  } from '../../Auth'
import { useAppDispatch } from '../../app/hooks'
import { saveUser, saveUserDetails } from '../../features/user/userSlice'
import './Login.scss'
import { useNavigate } from 'react-router-dom'
import { useLazyQuery } from '@apollo/client'
import { GET_USER } from '../../Graphql/Queries'

const Login = () => {
    const [emailInput, setEmailInput] = useState<string>('')
    const [passInput, setPassInput] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [getUser, {data: userData, error}] = useLazyQuery(GET_USER, {
      fetchPolicy: "cache-and-network",
      onCompleted(data) {
        dispatch(saveUserDetails(data))
      },
    })
    const navigate = useNavigate()
    const dispatch = useAppDispatch();


    

    const signInUser = async (e: React.MouseEvent<HTMLButtonElement>) => {

      try {
        e.preventDefault();
        await signIn(emailInput, passInput)
        await getUser({variables: {user_id: sessionStorage.getItem('uid')}})
          dispatch(saveUser(JSON.stringify(sessionStorage.getItem('uid'))))
          setErrorMessage('')
          setEmailInput('')
          setPassInput('')

      } catch(err) {
        setErrorMessage("Incorrect Username or Password")
      } finally {
       
        
      }
         
      

    }
    

  return (
    <div className='login-container'>
        <div className='login-form'>
            <h1>MyFace Social</h1>
            <form>
                <div>{errorMessage}</div>
                <input type="email" placeholder='Email' onChange={(e) => setEmailInput(e.target.value)} value={emailInput} />
                <input type="password" placeholder='Password' onChange={(e) => setPassInput(e.target.value)} value={passInput}  />
                <button disabled={emailInput.length < 1} onClick={(e) => signInUser(e)}>Log In</button>
                <a href="/">Forgot Password</a>
                <button onClick={() => navigate('/signup')}>Create new account</button>
            </form>
        </div>
    </div>
  )
}

export default Login