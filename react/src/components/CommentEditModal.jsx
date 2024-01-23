import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Textarea,
} from "@material-tailwind/react";
import axiosClient from "../axios";
 
export function CommentEditModal({comment,comments,setComments}) {
  const [open, setOpen] = React.useState(false);
    const [editContent,setEditContent] = useState(comment.content);
  const handleOpen = () => setOpen(!open);

  const handleEdit = () => {
    try {
        const response = axiosClient.put(`comment/update/${comment.id}`, {content:editContent});
        console.log(response)
        const editedComments = comments.map (com => {
            if(comment.id === com.id) {
                return {...com,content:editContent};
            }
            return com;
        })
        console.log(comments)
        setComments(editedComments)
        setOpen(!open)

    } catch (err) {
        console.log(err)
    }
  }
 
  return (
    <>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" 
    stroke="currentColor" className="w-6 h-6 hover:text-gray-600 hover:cursor-pointer" onClick={handleOpen} >
      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
    </svg>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>コメントの編集</DialogHeader>
        <DialogBody>
            <Textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleEdit}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}