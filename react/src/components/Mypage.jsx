import { UserCircleIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import ProfileDetail from './ProfileDetail'
import { useStateContext } from '../context/ContextProvider';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import axiosClient from '../axios';
import { ProfileModal } from './ProfileModal';
import { ProfileImg } from './ProfileImg';

const Mypage = () => {
  const {id} = useParams();
  const { currentUser,setCurrentUser,userToken } = useStateContext();
  const [ userProfile,setUserProfile ] = useState();
  const [loading,setLoading] = useState(true);

  useEffect(() =>{
    const getUser = async() => {
      try {
        const response = await axiosClient.get(`user/profile/${id}`);
        console.log(response.data);
        setUserProfile(response.data);
        setLoading(false)
      } catch (err) {
        console.log(err)
      }
    }
    getUser();
  },[id])

  return (
    <div>
      {loading ? (
        <p className='text-center'>Loading...</p>
      ):(
        <>
      <div className='m-6 p-4 border rounded-lg text-center justify-center block'>
        <div className='mb-3 gap-3 flex items-center justify-center'>
          <ProfileImg img={userProfile.image} />
          <p>{userProfile?.name}</p>
        </div>
        <ProfileModal userProfile={userProfile} />
      </div>
        <div className='justify-center flex'>
          <ProfileDetail userProfile={id} />
        </div>
        </>
      )}
    </div>
  )
}

export default Mypage