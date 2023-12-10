import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import { useStateContext } from "./context/ContextProvider";
import axiosClient from "./axios";
import { Navigate, useNavigate } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember,setRemember] = useState(false);
    const [error, setError] = useState({__html: "", many: {}});
  const { currentUser,setCurrentUser,userToken,setUserToken } = useStateContext();
  const navigate = useNavigate();

  if (userToken) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async(e) => {
      e.preventDefault();
      await axiosClient.post('login',{
        email,
        password,
        remember
      })
      .then(({data}) => {
        console.log(data)
      setCurrentUser(data.user)
      setUserToken(data.token)
      navigate("/");
      })
      .catch((error) => {
        if (error) {
          const finalErrors = "ログインに失敗しました";
        if (error.response.data.errors) {
          const finalErrors = Object.values(error.response.data.errors).reduce((accum, next) => [...next, ...accum], [])
        }
        setError({__html:finalErrors, many: finalErrors})
      }
        console.error(error)
      })
    }
  return (
     <Card className="items-center mt-12 mb-32" color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        ログイン
      </Typography>
      {/* <Typography color="gray" className="mt-1 font-normal">
        Thank you always! Enter your details to Login.
      </Typography> */}
      { error.__html && (<div className="bg-red-500 rounded mt-8 py-2 px-3 text-white" dangerouslySetInnerHTML={error}></div>)}
      <form onSubmit={handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            メールアドレス
          </Typography>
          <Input
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            パスワード
          </Typography>
          <Input
            type="password"
            size="lg"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
        <Checkbox
          label={
            <Typography
              variant="small"
              color="gray"
              className="flex items-center font-normal"
            >
              ログインを
              <a
                href="#"
                className="font-medium transition-colors hover:text-gray-900"
              >
                &nbsp;保持する
              </a>
            </Typography>
          }
          checked={remember}
          onChange={e => setRemember(e.target.checked)}
          containerProps={{ className: "-ml-2.5" }}
        />
        <Button type="submit" className="mt-6" fullWidth>
          ログイン
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          新規登録は{" "}
          <a href="/signup" className="font-medium text-gray-900">
            こちら
          </a>
        </Typography>
      </form>
    </Card>
  )
}
