import { Typography } from '@material-tailwind/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { ProfileImg } from './ProfileImg'

const UserRank = ({userRanks}) => {
  return (
    <div className='flex w-80 items-center justify-center max-w-lg'>
      <section className='p-4 m-3 border flex justify-center w-full rounded-md space-y-2'>
        <div className='space-y-2'>
        <Typography variant='h4' className='mb-3'>いいね数ランキング</Typography>
          {userRanks?.map((userRank,index) => (
              <div key={userRank.favoriteUserId} className='flex justify-between gap-3 shadow-blue-700'>
                <div className='flex gap-3'>
                  <span className='flex gap-1'>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={"w-6 h-6 "+(index === 0 ? "text-gold": index === 1 ? "text-gray-300": index === 2 ? "text-amber-900" : "")}>
                          <path fillRule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 0 0-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.139-5.6.75.75 0 0 0-.585-.858 47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.658-.744 49.22 49.22 0 0 0-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 0 0-.657.744Zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 0 1 3.16 5.337a45.6 45.6 0 0 1 2.006-.343v.256Zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 0 1-2.863 3.207 6.72 6.72 0 0 0 .857-3.294Z" clip-rule="evenodd" />
                      </svg>   
                      {index+1} 位</span>
                  <Link to={`/my-page/${userRank.favoriteUserId}`}>
                    <div className='hover:cursor-pointer flex items-center gap-4 justify-around hover:underline'>
                      <div className='gap-2 flex '>
                        <ProfileImg img={userRank.image} size={6} />
                        <Typography className=' flex-nowrap'>{userRank.name.length > 3 ? (
                            <>{ userRank.name.substring(0,3) }...</>
                        ):(
                          <>{userRank.name}</>
                        )}</Typography>
                      </div>
                    </div>
                  </Link>
                </div>
                  <Typography className=''>{userRank.count}</Typography>
              </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default UserRank