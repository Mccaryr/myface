import React from 'react'
import { useNavigate } from 'react-router-dom'
import { createUser } from '../../Auth'
import { saveUser } from '../../features/user/userSlice'
import { useState } from 'react'
import './SignUp.scss'
import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../../Graphql/Mutations'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import backgroundVideo from '../../assets/create_account_vid.mp4'

const SignUp = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const uid = useAppSelector<string>((state) => state.user.uid)
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [job, setJob] = useState<string>('')
    const [education, setEducation] = useState<string>('')
    const [location, setLocation] = useState<string>('')
    const [uploadedImage, setUploadedImage] = useState<any | null>()
    const [uploadedImageFile, setUploadedImageFile] = useState<any | null>()
    const [password, setPassword] = useState<string>('')
    const [confirmedPassword, setConfirmedPassword] = useState<string>('')
    const [errorText, setErrorText] = useState<string>('')
    const [dbCreateUser, error] = useMutation(CREATE_USER)


    const signUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    
        try{
            e.preventDefault();
            if(password === confirmedPassword){
                let promise1 = await createUser(email, password)
                let promise2 = await saveImageToS3()
                let promise3 = await dbCreateUser({ variables: {
                        input: {
                            user_id: sessionStorage.getItem('uid'),
                            first_name: firstName,
                            last_name: lastName,
                            email: email,
                            job: job, 
                            education: education,
                            location: location,
                            profile_url: sessionStorage.getItem('profile_url') 
                        }   
                       
                    }}).then(() => {
                        setErrorText('')
                        setFirstName('');
                        setLastName('');
                        setEmail('');
                        setPassword('');
                        setEducation('')
                        setJob('')
                        setLocation('')
                        navigate('/')
                  
                    })
                
                
                let promise4 = await dispatch(saveUser(JSON.stringify(sessionStorage.getItem('uid'))))
                Promise.all([promise1, promise2, promise3, promise4])

            } else {
                setErrorText("Passwords don't match")
                throw Error;
            }
            
            
        } catch(err) {
            setErrorText('User already exists or invalid input')
            throw err;
        }  
      }

      const fileSelectedHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const file = e.target.files![0];
        if (file) {
            setUploadedImageFile(file)
            let reader = new FileReader();
            reader.onload = (e) => {
              setUploadedImage(e.target?.result);
            };
            reader.readAsDataURL(file);
          }
      }

      const saveImageToS3 = async () => {
        const { url }  = await fetch("http://localhost:3001/s3_upload").then(res => res.json());
        const imageUrl = url.split('?')[0]

            await fetch(url, {
                method: "PUT",
                headers: {"Content-Type": "image/jpg"},
                body: uploadedImageFile
                })

        sessionStorage.setItem('profile_url', imageUrl)

      }

  return (
    <div className="signup-page">
        <video autoPlay muted loop>
            <source src={backgroundVideo} type="video/mp4"/>
        </video>


        <div className='signup-form'>
        <h1>Create your account</h1>
        {errorText && <span style={{color:"red", fontSize:'18px'}}>{errorText}</span>}
        <form className='signup-form'>
            <div className="signup-textfields">

                <div className="name-container">
                    <input type="text" placeholder="First Name" required onChange={(e) => setFirstName(e.target.value)} />
                    <input type="text" placeholder="Last Name" required onChange={(e) => setLastName(e.target.value)}  />
                </div>
                
                <input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
                <div className="profile-image-container">
                    <label>Choose Profile Image</label><input type="file" onChange={(e) => fileSelectedHandler(e)} />
                    {uploadedImage && <img style={{height:'200px', width:'200px', borderRadius:'100px'}} src={uploadedImage} />}              
                </div>
                <input type="text" placeholder="Job" onChange={(e) => setJob(e.target.value)} />
                <input type="text" placeholder="Education" onChange={(e) => setEducation(e.target.value)} />
                <input type="text" placeholder="Residence" onChange={(e) => setLocation(e.target.value)} />
                <div className="password-container">
                    <input type="password" placeholder="Myface Password" required onChange={(e) => setPassword(e.target.value)} />
                    <input type="password" placeholder="Confirm Password" required onChange={(e) => setConfirmedPassword(e.target.value)} />
                </div>
            </div>
            <button onClick={(e) => signUp(e)}>Create Myface Account</button>
            <button onClick={() => navigate('/')}>Back to Login</button>
        </form>
        </div>
        
    </div>
  )
}

export default SignUp