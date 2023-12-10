import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios";
import { Link } from "react-router-dom";

function NavList() {
  const { currentUser, setCurrentUser, userToken, setUserToken } = useStateContext();

  const handleClick = (e) => {
    e.preventDefault()
    axiosClient.post('logout', currentUser)
    .then(response => {
      setCurrentUser({})
      setUserToken(null)
    })
  }
  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <Link to="#" className="flex items-center hover:text-blue-500 transition-colors">
          Pages
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <Link to="/posts/create" className="flex items-center hover:text-blue-500 transition-colors">
          新規投稿
        </Link>
      </Typography>
      {userToken ? (
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <a to="/logout" onClick={handleClick} className="flex items-center hover:text-blue-500 transition-colors">
          ログアウト
        </a>
      </Typography>
      ) : (
        <>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <Link to="/login" className="flex items-center hover:text-blue-500 transition-colors">
          ログイン
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <Link to="/signup" className="flex items-center hover:text-blue-500 transition-colors">
          新規登録
        </Link>
      </Typography>
      </>
      )}
    </ul>
  );
}

export function NavbarSimple() {
  const [openNav, setOpenNav] = React.useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <Navbar className="mx-auto max-w-screen-3xl px-6 py-3 mb-6">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="/"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5"
        >
          sikaku
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
}
