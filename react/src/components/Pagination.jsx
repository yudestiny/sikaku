import React, { useEffect, useState } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useStateContext } from "../context/ContextProvider";
import Post from "../Post";
import axiosClient from "../axios";

export function Pagination({category}) {
  const [active, setActive] = React.useState(1);
  const [ posts, setPosts ] = useState([]);


  useEffect (() => {
    const fetchData = async() => {
      try {
        // console.log(category)
        const response = await axiosClient.get(`posts/index`);
        setPosts(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  },[])
  console.log(posts)

  const handleClick = async(index) => {
    setActive(index);
      try {
        const response = await axiosClient.get(`posts/index/?page=${index}`);
        console.log(response);
        setPosts(response.data);
      } catch (err) {
        console.log(err);
      }
    }


  const getItemProps = (index) =>
    ({
      id:index,
      variant: active === index ? "filled" : "text",
      color: "gray",
      onClick:  () => handleClick(index)
    });

  const next = async() => {
    if (active === posts.last_page) return;

    try {
      const response = await axiosClient.get(`posts/index/?page=${posts.current_page + 1}`);
      console.log(response);
      setPosts(response.data);
    } catch (err) {
      console.log(err);
    }
    setActive(active + 1);
  };

  const prev = async() => {
    if (active === 1) return;

    try {
      const response = await axiosClient.get(`posts/index/?page=${posts.current_page - 1}`);
      console.log(response);
      setPosts(response.data);
    } catch (err) {
      console.log(err);
    }
    setActive(active - 1);
  };
const  page = () => {
    const number = [];
    for (let i = 1; i <= posts.last_page; i++) {
      number.push(<IconButton {...getItemProps(i)}>{i}</IconButton>);
    }
    return number;
  };

  return (
    <>
    <Post posts={posts} />
    <div className="flex justify-center items-center gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={prev}
        disabled={active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        { page() }
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={next}
        disabled={active === posts.last_page}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
    </>
  );
}
