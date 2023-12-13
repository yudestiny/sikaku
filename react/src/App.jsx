import { Route, Routes } from "react-router-dom"
import Home from "./Home"
import './index.css'
import Layout from "./layout/Layout"
import { Signup } from "./Signup"
import { Login } from "./Login"
import { Pagination } from "./components/Pagination"
import PostDetail from "./components/PostDetail"
import PostEditor from "./components/PostEditor"
import PostCreator from "./components/PostCreator"
import Favorites from "./components/Favorites"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="Signup" element={<Signup />} />
          <Route path="favorite" element={<Favorites />} />
          <Route path="posts/create" element={<PostCreator />} />
          <Route path="posts/detail/:id" element={<PostDetail />} />
          <Route path="posts/edit/:id" element={<PostEditor />} />
          <Route path="posts" element={<Pagination />} />
        </Route>
      </Routes>

    </>
  )
}

export default App
