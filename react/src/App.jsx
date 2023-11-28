import { Route, Routes } from "react-router-dom"
import Home from "./Home"
import './index.css'
import Layout from "./layout/Layout"
import { Signup } from "./Signup"
import { Login } from "./Login"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="Signup" element={<Signup />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
