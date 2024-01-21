import { Typography } from '@material-tailwind/react'
import React, { useState } from 'react'
import { ProfileImg } from './ProfileImg';

const CommentList = ({comments}) => { 
  return (
    <div className='w-[40rem] mb-10 mx-5 space-y-4'>
        <Typography >コメント</Typography>
        {comments?.map((comment) => (
        <div className='gap-y-3 space-y-4 border p-4'>
            <div className='flex items-center justify-between gap-3'>
                <div className='flex items-center gap-5'>
                    <ProfileImg img={comment.image} />
                    <Typography >{comment.user_name}</Typography>
                </div>
                <div className='justify-end'>{comment.created_at}</div>
            </div>
            <div>{comment.content}</div>
        </div>
        ))}
    </div>
  )
}

export default CommentList