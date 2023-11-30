import React, { useEffect, useState } from 'react'
import './index.css'
import { Button } from '@material-tailwind/react'
import TopPage from './components/ListItem'
import axiosClient from './axios'
import HomePosts from './components/HomePosts'

const Home = () => {
  const [qualifications,setQualifications] = useState([]);
  const [posts,setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get("qualifications");
        const postResponse = await axiosClient.get("posts");
        console.log(postResponse)
        setQualifications(response.data);
        setPosts(postResponse.data)
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
    <TopPage qualifications={qualifications} />
    <HomePosts posts={posts} />
    </div>
  )
}

export default Home
