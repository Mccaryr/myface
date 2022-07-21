import { useMutation } from '@apollo/client';
import React from 'react'
import { useState } from 'react'
import { useAppSelector } from '../../app/hooks';


const Profile = () => {
    const [uploadedImage, setUploadedImage] = useState<string | undefined>()
    const uid = useAppSelector((state) => state.user.uid)

    const fileSelectedHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      const file = e.target.files![0];
      const { url }  = await fetch("http://localhost:3001/s3_upload").then(res => res.json());
      
      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "image/jpg"
        },
        body: file
      })

      const imageUrl = url.split('?')[0]
      setUploadedImage(imageUrl)
    }

    

    

    

  return (
    <div>
        <input type="file" onChange={(e) => fileSelectedHandler(e)} />
        <img style={{height:'200px', width:'200px', borderRadius:'100px'}} src={uploadedImage} />
    </div>
  )
}

export default Profile