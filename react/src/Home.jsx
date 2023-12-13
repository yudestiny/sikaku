import React, { useEffect, useState } from 'react'
import './index.css'
import { Button } from '@material-tailwind/react'
import TopPage from './components/ListItem'
import axiosClient from './axios'
import HomePosts from './components/HomePosts'
import SearchBar from './components/SearchBar'

const Home = () => {
  const [qualifications,setQualifications] = useState([]);
  const [posts,setPosts] = useState([]);
  const [categories,setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axiosClient.get("qualifications");
        const [response,postResponse,categoryResponse] = await Promise.all([
          axiosClient.get("qualificationRank"),
          axiosClient.get("posts"),
          axiosClient.get("categories")
        ]);
        console.log(response)
        setQualifications(response.data);
        setPosts(postResponse.data);
        setCategories(categoryResponse.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
    <TopPage qualifications={qualifications} />
    <div className='grid grid-cols-5'>
      <div className='col-span-4'>
        <HomePosts posts={posts} />
      </div>
      <div className='col-span-1 mr-4'>
        <SearchBar categories={categories} />
      </div>
    </div>
    </div>
  )
}

export default Home
