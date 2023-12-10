import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Navigate, useNavigate } from "react-router-dom";
import axiosClient from "./axios";
import { useState } from "react";
import { useStateContext } from "./context/ContextProvider";

export function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState({__html: "", many: {}});
  const { currentUser,setCurrentUser,userToken,setUserToken } = useStateContext();
  const navigate = useNavigate();

  if (userToken) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async(e) => {
      e.preventDefault();
      await axiosClient.post('signup',{
        name,
        email,
        password,
        password_confirmation:passwordConfirmation
      })
      .then(({data}) => {
        console.log(data)
      setCurrentUser(data.user)
      setUserToken(data.token)
      navigate("/");

      })
      .catch((error) => {
        if (error.response) {
          const finalErrors = Object.values(error.response.data.errors).reduce((accum, next) => [...next, ...accum], [])
          setError({__html:finalErrors.join('<br>'), many: finalErrors})
        }
        console.error(error)
      })

  }
  return (
     <Card className="items-center mt-12 mb-32" color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        新規登録
      </Typography>
      {/* <Typography color="gray" className="mt-1 font-normal">
        Nice to meet you! Enter your details to register.
      </Typography> */}
      { error.__html && (<div className="bg-red-500 rounded mt-8 py-2 px-3 text-white" dangerouslySetInnerHTML={error}></div>)}
      <form onSubmit={handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" htmlFor="name" className="-mb-3">
            お名前
          </Typography>
          <Input
            size="lg"
            id="name"
            value={name}
            name="name"
            placeholder="田中　太郎"
            onChange={(e) => setName(e.target.value)}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" htmlFor="email" className="-mb-3">
            メールアドレス
          </Typography>
          <Input
            size="lg"
            id="email"
            name="email"
            value={email}
            placeholder="name@mail.com"
            onChange={(e) => setEmail(e.target.value)}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" htmlFor="password" className="-mb-3">
            パスワード
          </Typography>
          <Input
            type="password"
            size="lg"
            id="password"
            name="password"
            value={password}
            placeholder="********"
            onChange={(e) => setPassword(e.target.value)}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" htmlFor="password_confirmation" className="-mb-3">
            パスワード確認
          </Typography>
          <Input
            type="password"
            size="lg"
            id="password_confirmation"
            name="password_confirmation"
            value={passwordConfirmation}
            placeholder="********"
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
        {/* <Checkbox
          label={
            <Typography
              variant="small"
              color="gray"
              className="flex items-center font-normal"
            >
              規約に
              <a
                href="#"
                className="font-medium transition-colors hover:text-gray-900"
              >
                &nbsp;同意する
              </a>
            </Typography>
          }
          containerProps={{ className: "-ml-2.5" }}
        /> */}
        <Button type="submit" className="mt-6" fullWidth>
          登録する
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          すでにアカウントをお持ちですか？{" "}
          <a href="login" className="font-medium text-gray-900">
            ログイン
          </a>
        </Typography>
      </form>
    </Card>
  );
}
