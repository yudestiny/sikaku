import { Typography } from '@material-tailwind/react';
import React from 'react';


const TopPage = ({qualifications}) => (
  <>

  <div className="justify-center bg-gray-50 py-2 pb-6 md:pb-10 lg:py-8 lg:mx-12 md:mx-4 shadow-md mb-6 lg:px-4 ">
    <div className='flex justify-center'>
    <Typography className='text-2xl font-bold tracking-tight text-gray-900 md:text-3xl mb-6 text-center'>人気資格ランキング</Typography>
  </div>
    <div className='grid md:grid-cols-3 md:justify-around lg:justify-between md:mx-4 mx-1 gap-x-4 gap-y-6 mb-6 lg:mb-8'>
    {qualifications.slice(0,3).map((item,index) => (
      <div key={item.id} className="m-0 md:col-span-1 lg:m-2 items-center text-center max-w-lg rounded-lg">
        <div>
            <Typography className='text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl xl:mb-3'>
              {index+1}位
            </Typography>
          </div>
        <div key={item.id} className="p-3 mx-6 md:mx-1 items-center text-center max-w-lg bg-white rounded-lg shadow-xl xl:p-5 xl:mx-">

          <div className='justify-center flex text-center items-center pb-1'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-red-300 justify-start text-start mr-2 mb-1">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
</svg>

            <Typography className='text-end text-xl font-bold tracking-tight text-gray-900 lg:text-2xl flex-nowrap'>
              {item.name}
            </Typography>
          </div>
          <div>
            <Typography className='text-center'>
              総投稿数：{item.count}
            </Typography>
          </div>
        </div>
      </div>
    ))}
    </div>


  <div className="grid md:grid-cols-3 xl:grid-cols-6 md:mx-6">
    {qualifications.slice(3).map((item,index) => (
      <div key={item.id} className="md:col-span-1 text-center justify-center items-center">
        <div className="m-2 items-center text-center max-w-lg rounded-lg">
        <div>
            <Typography className='text-lg font-semibold tracking-tight text-gray-900 lg:text-xl xl:mb-2'>
              {index+4}位
            </Typography>
          </div>
        <div key={item.id} className="p-2 items-center text-center max-w-lg bg-white rounded-lg shadow-md mx-8 md:mx-3 xl:mx-auto">

          <div className='justify-center flex text-center items-center pb-1 xl:block'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-pink-100 justify-start text-start lg:justify-center mr-2 xl:my-1 xl:mx-auto mb-1">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
</svg>

            <Typography className='text-end xl:text-center xl:justify-center text-md font-semibold tracking-tight text-gray-900 lg:text-lg lg:flex lg:whitespace-nowrap xl:mx-auto'>
              {item.name}
            </Typography>
          </div>
          <div>
            <Typography className='text-center'>
              総投稿数：{item.count}
            </Typography>
          </div>
        </div>
      </div>
      </div>
    ))}
  </div>
  </div>
  </>
);

export default TopPage;
