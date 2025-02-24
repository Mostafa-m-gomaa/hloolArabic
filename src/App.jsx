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
import ManagerOrders from './pages/managerProducts';
import MyOrders from './pages/MyOrders';
import AddOrder from './pages/AddOrder';
import EditOrder from './pages/EditOrder';
import MyReports from './pages/MyReports';
import Reports from './pages/Reports';
import CreateReport from './pages/AddReport';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ReportDetails from './pages/ReportDetails';
import ManagersHome from './pages/ManagersHome';
import SalesHome from './pages/salesHome';
import SuperVisorsDues from './pages/SuperVisorsSues';


function App() {
  const history = useNavigate()


  useEffect(() => {
    const token = localStorage.getItem("token")
    if(!token){
      history("/")
    }
  }, [])

  useEffect(() => {
    AOS.init({
      duration : 2000
    });
  }, [])

  return (
<div className="app">
<Toaster />
  <Routes>
    <Route path="/" element={<Login/>} />
    <Route path="/home" element={<HomeLayOut/>} >
    <Route path="" element={<ManagersHome/>} />
    <Route path="salesHome" element={<SalesHome/>} />
    <Route path="managersHome" element={<ManagersHome/>} />
    <Route path="users" element={<Users/>} />
    <Route path="products" element={<Products/>} />
    <Route path="addUser" element={<AddUser/>} />
    <Route path="addProduct" element={<AddProduct/>} />
    <Route path="manageOrders" element={<ManagerOrders/>} />
    <Route path="updateproduct/:id" element={<UpdateProduct/>} />
    <Route path="updateuser/:id" element={<UpdateUser/>} />
    <Route path="editorder/:id" element={<EditOrder/>} />
    <Route path="myorders" element={<MyOrders/>} />
    <Route path="addOrder" element={<AddOrder/>} />
    <Route path="myreports" element={<MyReports/>} />
    <Route path="reports" element={<Reports/>} />
    <Route path="orders" element={<Orders/>} />
    <Route path="addreport" element={<CreateReport/>} />
    <Route path="supervisorsdues" element={<SuperVisorsDues/>} />
    <Route path="onereport/:id" element={<ReportDetails/>} />
    </Route>
  </Routes>
</div>
  )
}

export default App
