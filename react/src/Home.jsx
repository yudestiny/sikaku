import React, { useEffect, useState } from 'react'
import './index.css'
import { Button } from '@material-tailwind/react'
import TopPage from './components/ListItem'
import axiosClient from './axios'
import HomePosts from './components/HomePosts'
import SearchBar from './components/SearchBar'
import Description from './components/Description'
import UserRank from './components/UserRank'

const Home = () => {
  const [qualifications,setQualifications] = useState([]);
  const [posts,setPosts] = useState([]);
  const [categories,setCategories] = useState([]);
  const [userRanks,setUserRanks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axiosClient.get("qualifications");
        const [response,postResponse,categoryResponse,userRankResponse] = await Promise.all([
          axiosClient.get("qualificationRank"),
          axiosClient.get("posts/new"),
          axiosClient.get("categories"),
          axiosClient.get("favorite/user/rank")
        ]);
        console.log(userRankResponse)
        setQualifications(response.data);
        const pos = postResponse.data
        pos.forEach(p => {
          p.created_at = p.created_at.substring(0,10);
        })
        setPosts(pos);
        setCategories(categoryResponse.data);
        setUserRanks(userRankResponse.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='w-full'>
      <TopPage qualifications={qualifications} />
      <div className='grid justify-center xl:justify-between xl:flex xl:grid-cols-5'>
        <aside className=''>
          <SearchBar categories={categories} />
        </aside>
        <div className=' justify-'>
          <HomePosts posts={posts} />
        </div>
        <aside className='flex justify-center'>
          <div className='block md:flex xl:block'>
            <UserRank userRanks={userRanks} />
            <Description />
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Home
