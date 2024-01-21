import { Textarea, Button, IconButton } from "@material-tailwind/react";
import axiosClient from "../axios";
import { useState } from "react";
 
export function CommentPost({id,userId}) {
    const [content,setContent] = useState("");
    const [error,setError] = useState(false);
    const handlePost = async() => {
        if (!content) {
            setError(true);
        }
        try {
            const response = await axiosClient.post(`comment/post`,{
                post_id:id,
                user_id:userId,
                content,
            })
            console.log(response.data)
        } catch (err) {
            console.log(err)
        }
    }
  return (
    <div className="relative mx-6 w-[32rem]">
      <Textarea error={error} variant="static" placeholder="Your Comment" value={content} onChange={(e) => setContent(e.target.value)} rows={8} />
      {error && <p className="text-red-800">コメントを入力してください</p>}
      <div className="flex w-full justify-between py-1.5">
        <IconButton variant="text" color="blue-gray" size="sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
            />
          </svg>
        </IconButton>
        <div className="flex gap-2">
          <Button size="sm" color="red" variant="text" className="rounded-md">
            やめる
          </Button>
          <Button size="sm" onClick={handlePost} className="rounded-md">
            コメントを送る
          </Button>
        </div>
      </div>
    </div>
  );
}