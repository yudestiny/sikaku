import React, { useEffect, useState } from 'react'
import axiosClient from '../axios'
import { Form, Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeftCircleIcon, ArrowLeftIcon, ArrowRightCircleIcon, ArrowRightIcon, MinusIcon, PhotoIcon, PlusIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { Button, Card, CardBody, CardFooter, CardHeader, Input, Textarea, Typography } from '@material-tailwind/react'
import { useStateContext } from '../context/ContextProvider'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';



const PostEditor = () => {
    const {id} = useParams();
    const [post,setPost] = useState({})
    const navigate = useNavigate();
    const { currentUser,userToken } = useStateContext();

    const [qualification,setQualification] = useState();
    const [target,setTarget] = useState();
    const [startDate,setStartDate] = useState();
    const [status,setStatus] = useState();
    const [service,setService] = useState();
    const [description,setDescription] = useState();
    const [steps,setSteps] = useState();

      useEffect (() => {
        const fetchData = async() => {
          try {
            const response = await axiosClient.get(`posts/detail/${id}`);
            const data = response.data;
            setPost(data);
    setQualification(data.qualification_name);
    setTarget(data.target);
    setStartDate(data.start_date);
    setStatus(data.status_name);
    setService(data.service_name);
    setDescription(data.description);
    setSteps(data.steps);

          } catch (err) {
            console.log(err);
          }
        }
        fetchData();
      },[id])

    if ( !userToken || currentUser.id !== post.user_id) {
      navigate("/");
    }


  const handleChange = (index,column,value) => {
    const data = [...steps];
    data[index][column] = value;
    setSteps(data);
  }

  const handleAdd = (index) => {
    const data = [...steps];
    data.splice(index + 1, 0, {
      created_at:"",
      description: "",
      id:"",
      name:"",
      period:"",
      post_id:data[index].post_id,
      service_id:"",
      step_number:"",
      updated_at:""
    })
    data.map((d,index) => {
      d.step_number = index + 1;
    })
    setSteps(data);
  }
  const handleDelete = (index) => {
    const data = [...steps];
    data.splice(index, 1);
    setSteps(data);
    data.map((d,index) => {
      d.step_number = index + 1;
    })
  }

  const handleLeft = (index) => {
    const data = [...steps];
    const movingData = data[index];
    const movedData = data[index - 1];
    data[index] = movedData;
    data[index - 1] = movingData;
    data.map((d,index) => {
      d.step_number = index + 1;
    })
    setSteps(data);
  }

  const handleRight = (index) => {
    const data = [...steps];
    const movingData = data[index];
    const movedData = data[index + 1];
    data[index] = movedData;
    data[index + 1] = movingData;
    data.map((d,index) => {
      d.step_number = index + 1;
    })
    setSteps(data);
  }

  const handleEditConfirm = async() => {
    try {
        navigate(`/posts/detail/${post.id}`);
        const response = axiosClient.put(`/posts/${post.id}`, {
          id:post.id,
          qualification,
          status,
          target,
          service,
          start_date:startDate,
          description,
          steps
        })
        console.log(response)
      } catch (err) {
        console.log(err)
      }
  }

  console.log(post)
  return (
    <>
      <form >
        <div className="space-y-12 px-6">
          <div className="pb-2">
            <Typography variant='h2' className="text-base font-semibold leading-7 text-gray-900 mb-4">資格取得詳細</Typography>

              <div className=" rounded p-2 mb-8 mx-auto px-4 bg-gray-400">
                <label htmlFor="photo" className="block text-sm font-medium leading-6 ml-2 text-gray-900">
                  ユーザー名
                </label>
                <div className="mt-2 md:flex md:flex-auto items-center gap-x-3">
                  <div className='w-full mb-3 md:w-1/4 flex'>
                    <UserCircleIcon className="w-auto h-12 mr-3 text-gray-300" aria-hidden="true" />
                    <Typography
                      className="
                      rounded-md w-32 px-6 p-2 my-1.5  align-baseline items-center text-center justify-center text-sm font-semibold text-gray-900 ring-inset bg-white
                      "
                    >
                      {post?.user_name}
                    </Typography>
                  </div>
                  <div className='md:flex  md:justify-end md:text-right md:w-3/4 mr-6'>
                  <Typography className='mr-4'>投稿日：{post.created_at}</Typography>
                  <Typography>更新日：{post.updated_at}</Typography>
                  </div>
                </div>
              </div>

              <div className='grid-cols-2'>
                <div className='col-span- sm:flex'>
                  <div className="sm:w-1/2 mb-8">
                    <label htmlFor="about" className="block text-sm font-semibold leading-6 text-gray-900">
                      取得資格
                    </label>
                    <div className="mt-2 sm:mr-2 flex">
                      <Input value={qualification} onChange={e => setQualification(e.target.value)} className='mr-4' placeholder='例：ITパスポート'/>
                      {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="green" class="text-white bg-white w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg> */}
                    </div>
                  </div>
                </div>

                <div className='col-span-1 sm:flex'>
                  <div className="mb-8 sm:mr-2 sm:w-1/2">
                    <label htmlFor="about" className="block text-sm font-semibold leading-6 text-gray-900">
                      学習開始時期
                    </label>
                    <div className="mt-2 flex">
                      <Input type='date' value={startDate} onChange={e => setStartDate(e.target.value)} className='mr-4'/>
                    </div>
                  </div>

                  <div className="sm:w-1/2 mb-8">
                    <label htmlFor="about" className="block text-sm font-semibold leading-6 text-gray-900">
                      学習開始前のステータス
                    </label>
                    <div className="mt-2 flex">
                      <Input value={status} onChange={e => setStatus(e.target.value)} className='mr-4' placeholder='例：まったくの初心者'/>
                    </div>
                  </div>
                </div>

                <div className='col-span- sm:flex'>
                  <div className="sm:mr-2 sm:w-1/2 mb-8">
                    <label htmlFor="about" className="block text-sm font-semibold leading-6 text-gray-900">
                      学習目的
                    </label>
                    <div className="mt-2 flex">
                      <Input value={target} onChange={e => setTarget(e.target.value)} className='mr-4' placeholder='例：転職を考えているから'/>
                    </div>
                  </div>

                  <div className="sm:w-1/2 mb-8">
                    <label htmlFor="about" className="block text-sm font-semibold leading-6 text-gray-900">
                      最も役立ったサービス、コンテンツ
                    </label>
                    <div className="mt-2 flex">
                      <Input value={service} onChange={e => setService(e.target.value)} className='mr-4' placeholder='例：オンライン講座の名称'/>
                    </div>
                  </div>
                </div>

                <div className="col-span-2 mb-8">
                  <label htmlFor="about" className="block text-sm font-semibold leading-6 text-gray-900">
                    取得後の感想
                  </label>
                  <div className="flex w-full flex-col gap-6">
                    <Textarea value={description} onChange={e => setDescription(e.target.value)} placeholder='人生が変わるような兆しが見えました'/>
                  </div>
                </div>
              </div>

              <div className="col-span-full mb-8">
                <label htmlFor="about" className="block text-sm font-semibold leading-6 text-gray-900">
                  学習ステップ
                </label>
                <div className='grid lg:grid-cols-2 2xl:grid-cols-3'>
                      {steps?.map((step,index) => {
                        return (
                          <div className='block -cols-6'>
                    <div className='flex items-center justify-center'>
                        <div className='col-span-1 items-center flex'>
                      {step.step_number !== 1 &&
                          <ArrowLeftCircleIcon className='w-6 hover:text-gray-700' onClick={() => handleLeft(index)} />
                        }
                        </div>
                        <Card className="col-span-4 mt-6 mx-4 pt-3 shadow-2xl mb-2">
                          <CardFooter className="flex pb-3 pt-0 mb-0">
                            <Typography className='text-center items-center py-2 mr-3 justify-center text-md'>STEP<span className='rounded-md '>{step.step_number}</span></Typography>
                            <Input className='' value={step.period} onChange={(e) => handleChange(index,"period",e.target.value)}/>
                          </CardFooter>
                          <CardBody className='py-0 bg-cover'>
                            <Input variant="h5" value={step.name} onChange={(e) => handleChange(index,"name",e.target.value)} color="blue-gray" className="mb-2"/>
                            <Textarea value={step.description} onChange={(e) => handleChange(index,"description",e.target.value)} />
                          </CardBody>
                        <div className='flex justify-center text-center pb-2 gap-4 items-center bg-white'>
                          <PlusIcon className='w-6 rounded-full hover:bg-red-500 items-center justify-center text-center block' onClick={() => handleAdd(index)} />
                          <MinusIcon className='w-6 rounded-full hover:bg-blue-500 items-center justify-center text-center block' onClick={() => handleDelete(index)}/>
                        </div>
                        </Card>
                        <div className='grid-item col-span-1 items-center flex'>
                      {step.step_number !== steps.length  &&
                          <ArrowRightCircleIcon className='w-6 hover:text-gray-700' onClick={() => handleRight(index)} />
                        }
                        </div>
                    </div>
                          </div>
  )})}
                </div>
              </div>
            </div>
          </div>

        <div className="my-6 flex items-center justify-center md:mr-6 md:justify-end gap-x-6">
          <Link>
            <Button

              className="rounded-md bg-red-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleEditConfirm}
            >
              確定する
            </Button>
          </Link>
          <Link to={`/posts/detail/${post?.id}`}>
            <Button type="button" className="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              戻る
            </Button>
          </Link>
        </div>
      </form>
    </>
  )
}

export default PostEditor
