import HomeCard from '@/components/HomeCard'
import React from 'react'
import { Users } from 'lucide-react';
import MyChart from '@/components/MyChart';
import AreaChartComponent from '@/components/AreaChartFillByValue';
import CustomBarChart from '@/components/CustomBarChart';
import Orders from './Orders';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ManagersHome = () => {
  return (
    <div className="flex flex-col py-8 gap-4">
        <h1 className='bg-white p-4 rounded-md '>لوحة القيادة</h1>
        <div className="flex lg:flex-row flex-col-reverse w-[96%] lg:w-[90%]  p-4 mx-auto justify-between ">
          <div className="w-full lg:w-[45%] p-4 flex flex-col gap-4">
            <AreaChartComponent />
            <CustomBarChart />
          </div>
          <div className="w-full flex flex-col gap-4 lg:w-[55%]  p-4 rounded-md ">
    <div className="flex w-full justify-between gap-4 flex-wrap">

            <HomeCard icon ={<Users/>} number={51} title="مبيعات الاسبوع" subTitle="المجموع الاسبوعي" color={"bg-[#012af9]"} />
            <HomeCard icon ={<Users/>} number={15} title="الطلبات الجاهزة" subTitle="المجموع الاسبوعي" color={"bg-[#d73364]"} />
            <HomeCard icon ={<Users/>} number={61} title="التسليمات" subTitle="المجموع الاسبوعي" color={"bg-[#d7ab33]"} />
            <HomeCard icon ={<Users/>} number={20} title="تقارير قيد المطابقة" subTitle="المجموع الاسبوعي" color={"bg-[#51e1b6]"} />

    </div>
    <div className="flex w-full justify-center gap-8 flex-wrap">
            <HomeCard icon ={<Users/>} number={20} title="المنتجات الجاهزة للتسليم" subTitle="المجموع الاسبوعي" color={"bg-[#365955]"} />
            <HomeCard icon ={<Users/>} number={20} title="المنتجات الغير جاهزة للتسليم" subTitle="المجموع الاسبوعي" color={"bg-[#483c80]"} />
    </div>
    {/* <MyChart /> */}
    <div className="w-full bg-white p-4 rounded-md shadow-lg overflow-auto">
      <Button><Link to="/home/orders">الذهاب الي القالب الرئيسي</Link></Button>
<Orders />
    </div>
           
          </div>
        
        </div>
    </div>
  )
}

export default ManagersHome