import React, { useEffect, useState } from 'react'
import axiosClient from '../axios'
import { useStateContext } from '../context/ContextProvider'
import { Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const {currentUser} = useStateContext();
  const [favorites,setFavorites] = useState([])
  useEffect(() => {
    const fetchFavorites = async() => {
      const response = await axiosClient.get('favorite/index', {
        params: {
          user_id: currentUser.id
        }
      })
      console.log(response)
      setFavorites(response.data)
    }
    fetchFavorites();
  },[currentUser])
  return (
    <>
      <div>いいね！した投稿一覧</div>
      <div>
        {favorites?.map(fav => (
          <Link to={`/posts/detail/${fav.post_id}`}>
          <div className='shadow-lg mb-6 mx-6 hover:bg-gray-200'>
            <Typography>取得した資格：{fav.qualification_name}</Typography>
            <Typography>利用した主なサービス：{fav.service_name}</Typography>
          </div>
          </Link>
        ))}
      </div>
    </>
  )
}

export default Favorites
