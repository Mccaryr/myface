import React from 'react'
import { useNavigate } from 'react-router-dom'
import { createUser } from '../../Auth'
import { saveUser } from '../../features/user/userSlice'
import { useState } from 'react'
import './SignUp.scss'
import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../../Graphql/Mutations'
import { useAppDispatch, useAppSelector } from '../../app/hooks'

const SignUp = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const uid = useAppSelector<string>((state) => state.user.uid)
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [errorText, setErrorText] = useState<boolean>(false)
    const [dbCreateUser, error] = useMutation(CREATE_USER)


    const signUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    
        try{
            e.preventDefault();
            createUser(email, password).then(() => {
                dispatch(saveUser(JSON.stringify(sessionStorage.getItem('uid'))))
                dbCreateUser({ variables: {
                input: {
                    user_id: sessionStorage.getItem('uid'),
                    first_name: firstName,
                    last_name: lastName,
                    email: email 
                }
            }}).then(() => {

                setErrorText(false)
                setFirstName('');
                setLastName('');
                setEmail('')
                setPassword('')
                navigate('/')
            })
            })
            
        } catch(err) {
            setErrorText(true)
            throw err;
        }

           
      }

  return (
    <div className="signup-page">
        <div className='signup-form'>
        <h1>Create your account</h1>
        {errorText && <span style={{color:"red", fontSize:'18px'}}>Invalid credentials</span>}
        <form className='signup-form'>
            <div className="signup-textfields">
                <input type="text" placeholder="First Name" required onChange={(e) => setFirstName(e.target.value)} />
                <input type="text" placeholder="Last Name" required onChange={(e) => setLastName(e.target.value)}  />
                <input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Myface Password" required onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button onClick={(e) => signUp(e)}>Create Myface Account</button>
            <button onClick={() => navigate('/')}>Back to Login</button>
        </form>
        </div>
        
    </div>
  )
}

export default SignUp