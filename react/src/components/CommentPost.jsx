import { Textarea, Button, IconButton, Typography } from "@material-tailwind/react";
import axiosClient from "../axios";
import { useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import { Popup } from "./Popup";
 
export function CommentPost({id,userId,comments,setComments}) {
    const { currentUser } = useStateContext();
    const [content,setContent] = useState("");
    const [submitSuccess,setSubmitSuccess] = useState(false)
    const [error, setError] = useState({__html:"",many:{}});
    const [submitLoading,setSubmitLoading] = useState(false)

    const handlePost = async() => {
        if (!content) {
            setError({__html:"コメントを入力してください"});
            return;
        }
        setSubmitLoading(true)
        try {
            const response = await axiosClient.post(`comment/post`,{
                post_id:id,
                user_id:userId,
                content,
            })
            const res = response.data
            res.created_at = res.created_at.substring(0,10);
            setComments([...comments, res])
            setContent("")
            setError("")
            displayPopup()
        } catch (error) {
        if (error.response.data.errors) {
          const finalErrors = Object.values(error.response.data.errors).reduce((accum, next) => [...next, ...accum], [])
          setError({__html:finalErrors, many: finalErrors})
        }
            console.log(error)
          }
          setSubmitLoading(false)
    }

    const displayPopup = async() => {
      setSubmitSuccess(true);
      await new Promise((resolve) => setTimeout(resolve, 3000));      setSubmitSuccess(false)
      setSubmitSuccess(false)
    }
  return (
    <div className="relative mx-6 w-[32rem]">
      { error.__html && (<div className="rounded mt-8 py-2 px-3 text-red-500" dangerouslySetInnerHTML={error}></div>)}
      <Textarea error={error.__html} variant="static" placeholder="Your Comment" value={content} onChange={(e) => setContent(e.target.value)} rows={8} />
      <div className="flex w-full items-center justify-end py-1.5">
        { !currentUser.id && 
          <Typography className="text-sm">コメントを投稿するにはログインが必要です。</Typography>
        }
        <div className="flex gap-2">
          <Button size="sm" disabled={!currentUser.id || submitLoading} onClick={handlePost} className="rounded-md">
            コメントを送る
          </Button>
        </div>
      </div>
      { submitSuccess && <Popup />}
    </div>
  );
}