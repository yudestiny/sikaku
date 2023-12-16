import React, { useEffect, useState } from 'react'
import axiosClient from '../axios'
import { useStateContext } from '../context/ContextProvider'
import { Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const {currentUser} = useStateContext();
  const [favorites,setFavorites] = useState()
  const loading = !favorites;
  
  useEffect(() => {
    console.log(loading)
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
      <div><Typography variant='h2' className="text-base font-semibold leading-7 text-gray-900 mb-4">いいね！した投稿一覧</Typography></div>
      {loading ? (
        <div>
          <Typography className='text-center'>
            読み込み中...
          </Typography>
        </div>
      ): favorites.length !== 0 ? (
      <div>
        {favorites.map(fav => (
          <Link to={`/posts/detail/${fav.post_id}`}>
          <div className='shadow-lg mb-6 mx-6 p-6 rounded hover:bg-gray-200'>
            <Typography>取得した資格：{fav.qualification_name}</Typography>
            <Typography>利用した主なサービス：{fav.service_name}</Typography>
          </div>
          </Link>
        ))}
      </div>
      ):(
        <div>
          <Typography className='text-center'>いいね！した投稿はまだありません</Typography>
        </div>
      )}
    </>
  )
}

export default Favorites
