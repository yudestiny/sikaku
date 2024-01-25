import { Typography } from '@material-tailwind/react'
import React, { useState } from 'react'
import { ProfileImg } from './ProfileImg';
import axiosClient from '../axios';
import { CommentEditModal } from './CommentEditModal';
import { useStateContext } from '../context/ContextProvider';

const CommentList = ({postUser,comments,setComments}) => { 
  const { currentUser } = useStateContext();
  const handleDelete = (id) => {
    if (window.confirm("本当に削除してもよろしいですか？")) {
      try {
        const response = axiosClient.delete(`comment/delete/${id}`)
        .then(() => {
        const newComments = comments.filter((comment) => (comment.id !== id))
        setComments(newComments)
        })
      } catch (err) {
        console.log(err)
      }
    }
  }
  return (
    <div className='w-[40rem] mb-10 mx-5 space-y-4'>
        <Typography >コメント</Typography>
        {comments?.map((comment) => (
        <div key={comment.id} className='gap-y-3 space-y-4 border p-4'>
            <div className='flex items-center justify-between gap-3'>
                <div className='flex items-center gap-5'>
                    <ProfileImg img={comment.image} size={12} />
                    <Typography className='flex'>{comment.user_name}</Typography>
                </div>
                <div className='justify-end'>{comment.created_at}</div>
            </div>
            <div>{comment.content}</div>
            <div className='flex justify-end'>
              {(currentUser.id === comment.user_id || currentUser.id === postUser) && comment.id ? (
                <div className='flex gap-4'>
                  <CommentEditModal comment={comment}  comments={comments} setComments={setComments} />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" 
                  stroke="currentColor" className="w-6 h-6 hover:text-gray-600 hover:cursor-pointer" onClick={() => handleDelete(comment.id)}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </div>
              ):(
                <></>
              )}
            </div>
        </div>
        ))}
    </div>
  )
}

export default CommentList