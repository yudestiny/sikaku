import { Button, Option, Select } from '@material-tailwind/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SearchBar = ({categories}) => {
    const [category,setCategory] = useState();
    const navigate = useNavigate();
    const handleSubmit = () => {
      try {
        navigate("/posts",{state:{category}})
      } catch (err) {
        console.log(err)
      }

    }
  return (
    <form onSubmit={handleSubmit}>
      <div className="w-72 mb-8  py-12 sm:py-18">
        <Select label="資格カテゴリーを選択" onChange={(e) => setCategory(e)}>
          { categories?.map((item) => (
            <Option key={item.id} value={`${item.id}`}>{item.name}</Option>
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
