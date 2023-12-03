import { Button, Option, Select } from '@material-tailwind/react'
import React, { useState } from 'react'
import axiosClient from '../axios'
import { useNavigate } from 'react-router-dom'

const SearchBar = ({categories}) => {
    const [category,setCategory] = useState();
    const navigate = useNavigate();
    const handleSubmit = () => {
      try {
        console.log(category)
        navigate("/posts",{category})
        const response = axiosClient.get(`posts`,{categoryId:category.id})
      } catch (err) {
        console.log(err)
      }

    }
  return (
    <form onSubmit={handleSubmit}>
      <div className="w-72 mb-8">
        <Select value='3' label="資格カテゴリーを選択" onChange={(e) => setCategory(e.target.value)}>
          { categories?.map((item) => (
            <Option onChange={(e) => setCategory(e.target.value)} value={item.id}>{item.name}</Option>
          ))}
        </Select>
      </div>
      <div className="flex w-max items-end gap-4 ">
      <Button type="submit" size="sm">検索</Button>
    </div>
    </form>
  )
}

export default SearchBar
