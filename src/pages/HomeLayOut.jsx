import { Button } from '@/components/ui/button'
import React from 'react'
import { Link , Outlet } from 'react-router-dom'
import Nav from './Nav'


const HomeLayOut = () => {
  return (
<div className="flex w-full h-screen flex-col">
  <Nav />
  <div>
    <Outlet />
  </div>

</div>
  )
}

export default HomeLayOut