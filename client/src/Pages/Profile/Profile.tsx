import { useMutation } from '@apollo/client';
import React from 'react'
import { useState } from 'react'
import { useAppSelector } from '../../app/hooks';
import { CREATE_IMAGE } from '../../Graphql/Mutations';


const Profile = () => {
    const [uploadedImage, setUploadedImage] = useState<string | undefined>()
    const [createImage] = useMutation(CREATE_IMAGE)
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
      createImage({variables: {image: imageUrl, user_id: uid}})
    }

    

    

    

  return (
    <div>
        <input type="file" onChange={(e) => fileSelectedHandler(e)} />
        <img style={{height:'200px', width:'200px', borderRadius:'100px'}} src={uploadedImage} />
    </div>
  )
}

export default Profile