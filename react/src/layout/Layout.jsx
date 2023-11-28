import React from 'react'
import { NavbarSimple } from '../components/NavList'
import { Outlet } from 'react-router-dom'
import FooterWithLogo from '../components/Footer'

const Layout = () => {
  return (
    <div className="block justify-center items-center">
      <NavbarSimple />
      <Outlet className="justify-center items-center" />
      <FooterWithLogo />
    </div>
  )
}

export default Layout
