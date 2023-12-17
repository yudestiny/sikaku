import { Button, Option, Select, Typography } from '@material-tailwind/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SearchBar = ({categories}) => {
    const [category,setCategory] = useState();
    const navigate = useNavigate();
    const handleSubmit = async() => {
        try {
          navigate("/posts",{state:{category:category}})
        } catch (err) {
          console.log(err)
        }

    }
  return (
    <>
      <Typography className='text-sm text-center text-gray-700'>
        カテゴリー検索
      </Typography>
      <form onSubmit={handleSubmit}>
        <div className='flex xl:block xl:m-5 items-center justify-center gap-x-5 my-4'>
          <div className="xl:w-72 xl:mb-8 xl:py-18 items-center">
            <Select label="資格カテゴリーを選択" onChange={(e) => setCategory(e)} className='items-center'>
              { categories?.map((item) => (
                <Option key={item.id} value={`${item.id}`}>{item.name}</Option>
              ))}
            </Select>
          </div>
          <div className="xl:w-max xl:text-end gap-4 ">
          <Button type="submit" size="sm">検索</Button>
        </div>
      </div>
      </form>
    </>
  )
}

export default SearchBar
