import { useState ,useEffect } from 'react'
import Login from './pages/Login'
import {  Routes, Route } from "react-router-dom";
import HomeLayOut from './pages/HomeLayOut'
import Users from './pages/Users';
import Orders from './pages/Orders';
import Products from './pages/Products';
import  { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import AddUser from './pages/AddUser';
import AddProduct from './pages/AddProduct';
import UpdateProduct from './pages/UpdateProduct';
import UpdateUser from './pages/UpdateUser';


function App() {
  const history = useNavigate()


  useEffect(() => {
    const token = localStorage.getItem("token")
    if(!token){
      history("/")
    }
  }, [])

  return (
<div className="app">
<Toaster />
  <Routes>
    <Route path="/" element={<Login/>} />
    <Route path="/home" element={<HomeLayOut/>} >
    <Route path="" element={<Orders/>} />
    <Route path="users" element={<Users/>} />
    <Route path="products" element={<Products/>} />
    <Route path="addUser" element={<AddUser/>} />
    <Route path="addProduct" element={<AddProduct/>} />
    <Route path="updateproduct/:id" element={<UpdateProduct/>} />
    <Route path="updateuser/:id" element={<UpdateUser/>} />
    </Route>
  </Routes>
</div>
  )
}

export default App
