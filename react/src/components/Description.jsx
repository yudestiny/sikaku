import { Card, CardBody, CardFooter, CardHeader } from '@material-tailwind/react'
import React from 'react'

const Description = () => {
  return (
    <div className='justify-end max-w-lg'>
      <Card>
        <CardHeader>about sikaku</CardHeader>
        <CardBody>資格の取得をきっかけとして人生が前向きに進むことを実感してもらうためのサイトです</CardBody>
        <CardFooter>Since 2023</CardFooter>
      </Card>
    </div>
  )
}

export default Description
