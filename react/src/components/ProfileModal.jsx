import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import axiosClient from "../axios";
import { useStateContext } from "../context/ContextProvider";
 
export function ProfileModal({userProfile}) {
  const { currentUser } = useStateContext();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState(userProfile.email);
  const [image, setImage] = useState(userProfile.image);
  const handleOpen = () => setOpen((cur) => !cur);

  console.log(currentUser.id)
const handleEdit = async() => {
    try {
        const formData = new FormData();
        formData.append('image', image);
        formData.append('id', userProfile.id);
        formData.append('email', email);
        console.log(formData)
        const response = await axiosClient.post("profile/edit", formData)
        console.log(response.data)
        handleOpen()
    } catch (err) {
        console.log(err)
    }
  }
  return (
    <>
    {currentUser.id === userProfile.id && 
      <Button onClick={handleOpen}>プロフィールを編集する</Button>
    }
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
            プロフィールを編集
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              メールアドレスと画像の編集が可能です
            </Typography>
            <Typography className="-mb-2" variant="h6">
              メールアドレス
            </Typography>
            <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} size="lg" />
            <Typography className="-mb-2" variant="h6">
              プロフィール画像
            </Typography>
            <Input type="file" label="imageURL" onChange={(e) => setImage(e.target.files[0])} size="lg" />
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" className="mb-3" onClick={handleEdit} fullWidth>
              変更する
            </Button>
            <Button variant="gradient" color="white" onClick={handleOpen} fullWidth>
              戻る
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}