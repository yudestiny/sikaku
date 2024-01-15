import { Card, CardBody, CardFooter, CardHeader, Typography } from '@material-tailwind/react'
import React from 'react'

const Description = () => {
  return (
    <div className='flex-none w-80 items-center justify-center max-w-lg'>
      <section className='p-5 m-3 border rounded-md'>
        <Typography variant='h4'>ABOUT sikaku</Typography>
        <div className='mb-4 mt-3'>資格の取得をきっかけとして<br/>人生が前向きに進むことを実感<br/>してもらうためのサイトです</div>
        <div className='mb-2'>
          <Typography variant='h5' className='mb-3'>USAGE of sikaku</Typography>
          <ol>
          <li className='mb-1 font-'>・気になる資格の検索機能</li>
          <li className='mb-1 font-'>・資格取得ロードマップの<br/>　　閲覧・共有・投稿</li>
          <li className='mb-1'>・いいね機能による<br/>　　お気に入り投稿の保存</li>
          </ol>
        </div>
        <p className='items-center justify-end'>Since 2023</p>
      </section>
    </div>
  )
}

export default Description
