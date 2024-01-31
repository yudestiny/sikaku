import { Alert } from "@material-tailwind/react";
import { useEffect, useState } from "react";
 
export function Popup({form}) {
  const [message,setMessage] = useState("");
  useEffect(() => {
    const judgeForm = () => {
      switch (form) {
        case 'commentSuccess':
          setMessage("コメントを投稿しました");
        case 'password':
          setMessage("コメントを投稿しました");
      }
    }
    judgeForm();
  },[form])
  console.log(form)
  return (
    <div className="flex justify-center text-center fixed top-10 z-10">
      <Alert color="blue" className="h-24 w-96 text-center items-center">{message}</Alert>
    </div>
  );
}