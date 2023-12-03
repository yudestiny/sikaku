import React, { useEffect, useState } from 'react'
import axiosClient from '../axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from '@material-tailwind/react'
import { useStateContext } from '../context/ContextProvider'


const PostDetail = () => {
  const {id} = useParams();
  const [post,setPost] = useState([]);
    const { currentUser } = useStateContext();
    const navigate = useNavigate();

  useEffect (() => {
    const fetchData = async() => {
      try {
        const response = await axiosClient.get(`posts/detail/${id}`);
        setPost(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  },[id])

  const handleDelete = async() => {
    if (window.confirm("本当に削除してもよろしいですか？")) {
      try {
        const response = axiosClient.delete(`/posts/${post.id}`)
        console.log(response)
        navigate("/posts")
      } catch (err) {
        console.log(err)
      }
    }
  }

  console.log(currentUser)
  return (
    <>
      <div className="space-y-12 mx-6">
        <div className="pb-12">
          <Typography variant='h2' className="text-base font-semibold leading-7 text-gray-900 mb-8">資格取得詳細</Typography>
          {/* <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you share.
          </p> */}

            <div className="col-span-full mb-8">
              <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                ユーザー名
              </label>
              <div className="mt-2 flex items-center w-full gap-x-3">
                <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                <div className='w-1/2'>
                <Typography
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 ring-inset"
                >
                  {post.user_name}
                </Typography>
                </div>
                <div className='block justify-end text-right w-1/2 mr-6'>
                <Typography className='justify-normal'>投稿日：{post.created_at}</Typography>
                <Typography>更新日：{post.updated_at}</Typography>
                </div>
              </div>
            </div>

            <div className="col-span-full mb-8">
              <label htmlFor="about" className="block text-sm font-semibold leading-6 text-gray-900">
                取得資格
              </label>
              <div className="mt-2 flex">
                <Typography className='mr-4'>{post.qualification_name}</Typography>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="green" class="text-white bg-white w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
              </div>
            </div>

            <div className="col-span-full mb-8">
              <label htmlFor="about" className="block text-sm font-semibold leading-6 text-gray-900">
                学習目的
              </label>
              <div className="mt-2 flex">
                <Typography className='mr-4'>{post.target}</Typography>
              </div>
            </div>

            <div className="col-span-full mb-8">
              <label htmlFor="about" className="block text-sm font-semibold leading-6 text-gray-900">
                学習開始時期
              </label>
              <div className="mt-2 flex">
                <Typography className='mr-4'>{post.start_date}</Typography>
              </div>
            </div>

            <div className="col-span-full mb-8">
              <label htmlFor="about" className="block text-sm font-semibold leading-6 text-gray-900">
                最も役立ったサービス、コンテンツ
              </label>
              <div className="mt-2 flex">
                <Typography className='mr-4'>{post.service_name}</Typography>
              </div>
            </div>

            <div className="col-span-full mb-8">
              <label htmlFor="about" className="block text-sm font-semibold leading-6 text-gray-900">
                取得後の感想
              </label>
              <div className="mt-2 flex">
                <Typography className='mr-4'>{post.description}</Typography>
              </div>
            </div>

            <div className="col-span-full mb-8">
              <label htmlFor="about" className="block text-sm font-semibold leading-6 text-gray-900">
                学習ステップ
              </label>
              <div  className='flex justify-center'>
              {post.steps?.map(step => {
                return (
                <div key={step.id} className='flex flex-auto items-center mx-auto gap-x-6'>
                {step.step_number !== 1 &&
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="block w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
</svg>}
                <Card className="mt-6 mr-4 w-80">
                  <CardFooter className="pt-0 mb-0">
                    <Button color='black' disabled className='bg-black'>{step.period}</Button>
                  </CardFooter>
                  <CardBody className='pt-0'>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                      {step.name}
                    </Typography>
                    <Typography>
                      {step.description}
                    </Typography>
                  </CardBody>
                </Card>
                </div>
)})}
              </div>
            </div>


          </div>
        </div>
      <div className="my-6 flex items-center justify-end gap-x-6">
        <Link to={`/posts/edit/${post.id}`}>
          <button type="button" className="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            編集する
          </button>
        </Link>
        <Link>
          <button
            onClick={handleDelete}
            className="rounded-md bg-red-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            削除する
          </button>
        </Link>
      </div>
    </>
  )
}

export default PostDetail
