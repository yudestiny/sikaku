import React, { useEffect, useState } from 'react'
import axiosClient from '../axios'
import { Form, Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { ArrowDownCircleIcon, ArrowLeftCircleIcon, ArrowLeftIcon, ArrowRightCircleIcon, ArrowRightIcon, ArrowUpCircleIcon, MinusIcon, PhotoIcon, PlusIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { Button, Card, CardBody, CardFooter, CardHeader, Input, Option, Select, Textarea, Typography } from '@material-tailwind/react'
import { useStateContext } from '../context/ContextProvider'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';



const PostCreator = () => {
    const [post,setPost] = useState({})
    const navigate = useNavigate();
    const { currentUser,userToken } = useStateContext();
    const [submitLoading,setSubmitLoading] = useState(false)
    const [error, setError] = useState({__html: "", many: {}});
    const [qualification,setQualification] = useState();
    const [score,setScore] = useState("");
    const [category,setCategory] = useState("");
    const [categories,setCategories] = useState([]);
    const [target,setTarget] = useState("");
    const [startDate,setStartDate] = useState("");
    const [status,setStatus] = useState("");
    const [statuses,setStatuses] = useState([]);
    const [service,setService] = useState("");
    const [description,setDescription] = useState("");
    const [steps,setSteps] = useState([
      {
        stepNumber:1,
        serviceName:"",
        period:"",
        description:""
      },
      {
        stepNumber:2,
        serviceName:"",
        period:"",
        description:""
      },
      {
        stepNumber:3,
        serviceName:"",
        period:"",
        description:""
      }
    ]);

  const [arrowHorizon, setArrowHorizon] = useState(window.innerWidth >= 960);

  const handleWindowResize = () =>{
    window.innerWidth >= 960 ? (setArrowHorizon(true)):(setArrowHorizon(false))}

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [window.innerWidth]);

    useEffect(() => {
      const fetchData = async() => {
        try {
        const [response,responseStatus] = await Promise.all([
          axiosClient.get("categories"),
          axiosClient.get("statuses")
        ])
        setCategories(response.data)
        setStatuses(responseStatus.data)
        } catch (err) {
          console.log(err)
        }
      }
      fetchData();
    },[])

  const handleChange = (index,column,value) => {
    const data = [...steps];
    data[index][column] = value;
    setSteps(data);
  }



  const handleAdd = (index) => {
    const data = [...steps];
    data.splice(index + 1, 0, {
      description:"",
      serviceName:"",
      period:"",
      stepNumber:"",
    })
    data.map((d,index) => {
      d.stepNumber = index + 1;
    })
    setSteps(data);
  }
  const handleDelete = (index) => {
    const data = [...steps];
    data.splice(index, 1);
    setSteps(data);
    data.map((d,index) => {
      d.stepNumber = index + 1;
    })
  }

  const handleLeft = (index) => {
    const data = [...steps];
    const movingData = data[index];
    const movedData = data[index - 1];
    data[index] = movedData;
    data[index - 1] = movingData;
    data.map((d,index) => {
      d.stepNumber = index + 1;
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
      d.stepNumber = index + 1;
    })
    setSteps(data);
  }

  const handlePostConfirm = async() => {
    setSubmitLoading(true)
    const state = {
          id:currentUser?.id,
          qualification,
          score,
          category,
          status,
          target,
          service,
          start_date:startDate,
          description,
          steps
        }
    
    axiosClient.post(`/posts/create`, state)
    .then(response => {
      console.log(response)
      const post = response.data;
      setSubmitLoading(false)
      navigate(`/posts/detail/${post.id}`);
    })
    .catch (error => {
      console.log(error.response.data)
      if (error.response.data.errors) {
        const finalErrors = Object.values(error.response.data.errors).reduce((accum, next) => [...next, ...accum], [])
        setError({__html:error.response.data.message, many: finalErrors})
      }
    })
      setSubmitLoading(false)
    }
  return (
    <>
      <form >
        <div className="space-y-12 px-6">
          <div className="pb-2">
            <Typography variant='h2' className="text-base font-semibold leading-7 text-gray-900 mb-4">資格取得投稿</Typography>
            { userToken ? (
              <>
            <div className='items-center mb-4'>
              <Typography className='items-center'>
                あなたの資格取得に際した経験を記入してください。
              </Typography>
            </div>

              <div className='grid-cols-2'>
                <div className='col-span-1'>
                  <div className="sm:w-1/4">
                    <label htmlFor="about" className="block text-sm font-semibold leading-6 text-gray-900 mb-2">
                      取得資格
                    </label>
                  <Select label="資格カテゴリーを選択" onChange={(e) => setCategory(e)}>
          { categories?.map((item) => (
            <Option key={item.id} value={`${item.id}`}>{item.name}</Option>
            ))}
                  </Select>
                  </div>
                  <div className='col-span-1 sm:flex items-end'>
                    <div className="mb-8 sm:mr-2 sm:w-1/2">
                      <div className="mt-2 flex">
                        <Input value={qualification} onChange={e => setQualification(e.target.value)} className='mr-4' placeholder='例：ITパスポート'/>
                      </div>
                    </div>
                    <div className="sm:w-1/2 mb-8">
                      <label htmlFor="about" className="block text-sm font-semibold leading-6 text-gray-900 mb-2">
                        取得スコア
                      </label>
                      <div className="mt-2 flex">
                        <Input value={score} onChange={e => setScore(e.target.value)} className='mr-4' placeholder='例：890'/>
                      </div>
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
                    <label htmlFor="about" className="block text-sm font-semibold leading-6 text-gray-900 mb-2">
                      学習開始前のステータス
                    </label>
                    <div className="mt-2 flex">
                    <Select label="学習開始時の状態を選択" onChange={(e) => setStatus(e)}>
          { statuses?.map((item) => (
            <Option key={item.id} value={`${item.id}`}>{item.name}</Option>
          ))}
        </Select>
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
                          <div key={step.id} className='block'>
                    <div className='block lg:flex items-center justify-center mb-4'>
                        <div className='col-span-1 items-center justify-center flex'>
                      {step.stepNumber !== 1 && ( arrowHorizon ? (
                          <ArrowLeftCircleIcon className='w-6 hover:text-gray-700' onClick={() => handleLeft(index)} />
                      ):(
                          <ArrowUpCircleIcon className='w-6 hover:text-gray-700' onClick={() => handleLeft(index)} />
                      ))}
                        </div>
                        <Card className="col-span-4 mx-4 pt-3 shadow-2xl my-2 rounded-lg">
                          <CardFooter className="flex pb-3 pt-0 mb-0">
                            <Typography  className='text-center items-center py-2 mr-3 justify-center text-md font-bold'>STEP<span className='rounded-md '>{step.stepNumber}</span></Typography>
                            <Input className='' placeholder='期間' value={step.period} onChange={(e) => handleChange(index,"period",e.target.value)}/>
                          </CardFooter>
                          <CardBody className='py-0 bg-cover'>
                            <div className='mb-3'>
                              <Input placeholder='利用したサービス' variant="standard" value={step.serviceName} onChange={(e) => handleChange(index,"serviceName",e.target.value)} color="blue-gray" className="mb-2 rounded-lg"/>
                            </div>
                            <Textarea placeholder='まとめ、感想' value={step.description} onChange={(e) => handleChange(index,"description",e.target.value)} />
                          </CardBody>
                        <div className='flex justify-center text-center pb-2 gap-4 items-center bg-white'>
                          <PlusIcon className='w-6 rounded-full hover:bg-red-500 items-center justify-center text-center block' onClick={() => handleAdd(index)} />
                          <MinusIcon className='w-6 rounded-full hover:bg-blue-500 items-center justify-center text-center block' onClick={() => handleDelete(index)}/>
                        </div>
                        </Card>
                        <div className='grid-item col-span-1 items-center justify-center flex'>
                      {step.stepNumber !== steps.length && ( arrowHorizon ? (
                          <ArrowRightCircleIcon className='w-6 hover:text-gray-700' onClick={() => handleRight(index)} />
                      ):(
                          <ArrowDownCircleIcon className='w-6 hover:text-gray-700' onClick={() => handleRight(index)} />
                      ))}
                        </div>
                      </div>
                    </div>
  )})}
                </div>
              </div>
              { error.__html && (<div className="rounded mt-8 py-2 px-3 text-red-500" dangerouslySetInnerHTML={error}></div>)}

        <div className="my-6 flex items-center justify-center md:mr-6 md:justify-end gap-x-6">
          <Link>
            <Button
              disabled={submitLoading}
              className="rounded-md bg-red-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handlePostConfirm}
            >
              投稿する
            </Button>
          </Link>
          <Link to={`/posts`}>
            <Button type="button" className="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              戻る
            </Button>
          </Link>
            </div>
            </>
      ):(
        <div className='justify-center w-full items-center'>
          <Typography className='text-center'>投稿機能を利用するにはログインが必要です。</Typography>
        </div>
      )}
          </div>
        </div>
      </form>
    </>
  )
}

export default PostCreator
