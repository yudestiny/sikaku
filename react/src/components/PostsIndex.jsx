import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Pagination } from './Pagination';
import { Typography } from '@material-tailwind/react';

const PostsIndex = () => {
    
    const location = useLocation()
    const state = location.state;
    return (
        <>
            <div className="mx-auto">
                <Typography variant="h3" className="mx-4 text-center">{state?.title? state.title:"投稿"}一覧</Typography>
            </div>
            <Pagination params={state} />
        </>
    )
}

export default PostsIndex