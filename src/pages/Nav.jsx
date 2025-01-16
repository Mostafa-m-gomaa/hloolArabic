import React from 'react'
import logo from '../assets/logo.png'
import { Button } from '@/components/ui/button'   
import { MenuSheet } from '@/components/MenuSheet'
const Nav = () => {
  return (
    <div className="flex w-full shadow-xl bg-gray-100 justify-end  " >
        <div className="w-[100%] lg:w-[60%]  flex justify-between items-center p-2 pr-6">

<img src={logo} alt="" className='w-[100px] lg:w-[140px] rounded-lg' />
        <MenuSheet />
        </div>
    </div>
  )
}

export default Nav