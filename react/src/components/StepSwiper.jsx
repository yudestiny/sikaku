import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import './styles.css';

// import required modules
import { FreeMode, Pagination, Navigation } from 'swiper/modules';
import { Button, Card, CardBody, CardFooter, Typography } from '@material-tailwind/react';

export default function StepSwiper({post}) {
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        breakpoints={{
          320: {
        slidesPerView: 1,
        spaceBetween: 10,
          },
          720: {
        slidesPerView: 2,
        spaceBetween: 10,
          },
          1080: {
        slidesPerView: 3,
        spaceBetween: 20,
          },
          1480: {
        slidesPerView: 4,
        spaceBetween: 30,
          },
          1680: {
        slidesPerView: 5,
        spaceBetween: 30,
          },
        }}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[FreeMode, Pagination, Navigation]}
        className="mySwiper justify-center items-center pb-32"
      >
      {post.steps?.map((step,index) => {
        return (
    <div key={index}>
      <SwiperSlide className={`justify-center container my-12 items-center mx-auto gap-x-6`}>

        <Card className="justify-center mx-14 pt-3 shadow-xl">
          <CardFooter className="flex pb-3 pt-0 mb-0">
            <Typography className='text-center items-center py-2 mr-3 justify-center text-md font-extrabold text-black'>STEP<span className=''>{step.step_number}</span></Typography>
            <Button disabled className='bg-black px-3 rounded-full'>{step.period}</Button>
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
      </SwiperSlide>
    </div>
)})}
      </Swiper>
    </>
  );
}
