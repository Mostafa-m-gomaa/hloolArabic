import HomeCard from '@/components/HomeCard'
import React from 'react'
import { Users } from 'lucide-react';
import MyChart from '@/components/MyChart';
import AreaChartComponent from '@/components/AreaChartFillByValue';
import CustomBarChart from '@/components/CustomBarChart';
import Orders from './Orders';
import { useQuery  , useQueryClient} from '@tanstack/react-query';
import { cashVerify, getDuesOverMe, getMineDues } from '@/api/orders';
import { Coins } from 'lucide-react';
import SalesMoneyCard from '@/components/SalesMoneyCard';
import { DollarSign } from 'lucide-react';
import SalesTargets from './SalesTargets';
import Loader from '@/components/Loader';
import { getOrdersAnalytics } from '@/api/orders';


const SalesHome = () => {
const queryClient = useQueryClient()

  const [startDate,setStartDate] = React.useState("2024-12-12")
  const [endDate,setEndDate] = React.useState(() => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0"); // Ensure two digits
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = today.getFullYear();

    return `${year}-${month}-${day}`;
  })

const {data , isLoading , isError} = useQuery({
    queryKey:['ordersAnalyticsSales',startDate,endDate],
    queryFn:()=>getOrdersAnalytics(startDate,endDate)
})

console.log(data)
    const {data : myCash , isLoading :myCashLoadin , isError : myCahError}=useQuery({
        queryKey:["myCash"],
        queryFn: cashVerify ,
    })
    const {data : myDues ,  isFetching: myDuesFetching,  isLoading : myDuesLoading , isError : myDuesError , refetch   }=useQuery({
        queryKey:["myDues"],
        queryFn: getMineDues,
        retry: 3,
     
    })
    const amount = (myDues?.data || [])
    .filter(item => typeof item.dues === "number") // Ensure it's a number
    .map(item => item.dues)
    .reduce((a, b) => a + b, 0);


    const {data : duesOverMe}=useQuery({
      queryKey :["duesForCompany"],
      queryFn:getDuesOverMe
    })
const cashItems = myCash?.data || []

 

  return (
    <div className="flex flex-col py-8 gap-4">
            <div className="flex w-[90%] mx-auto flex-col lg:flex-row">
<div className="flex border-2 border-[#d7d7d7] items-center rounded-md p-2 gap-4 flex-col lg:flex-row">
 
<div  className="input flex flex-col w-fit static">
  <label
    for="input"
     className="text-blue-500 text-xs font-semibold relative top-2 ml-[7px] px-[3px] bg-[#e8e8e8] w-fit"
    >Start Date</label>
  <input
    id="password"
    type="date"
    value={startDate}
    onChange={(e)=>setStartDate(e.target.value)}
    placeholder="Write here..."
    name="input"
     className="border-blue-500 input px-[10px] py-[11px] text-xs bg-[#e8e8e8] border-2 rounded-[5px] w-[210px] focus:outline-none placeholder:text-black/25"
    dateFormat="dd/MM/yyyy" 
  />
</div>
<div  className="input flex flex-col w-fit static">
  <label
    for="input"
     className="text-blue-500 text-xs font-semibold relative top-2 ml-[7px] px-[3px] bg-[#e8e8e8] w-fit"
    >End Date</label>
  <input
    id="password"
    type="date"
    placeholder="Write here..."
    name="input"
    value={endDate}
    onChange={(e)=>setEndDate(e.target.value)}
 
     className="border-blue-500 input px-[10px] py-[11px] text-xs bg-[#e8e8e8] border-2 rounded-[5px] w-[210px] focus:outline-none placeholder:text-black/25"
  />
</div>
</div>
        <h1 className='bg-white p-4 rounded-md '>لوحة القيادة</h1>
      </div>


      {isLoading ?<Loader /> :     <div className="flex lg:flex-row flex-col-reverse w-[96%] lg:w-[90%]  p-4 mx-auto justify-between ">
          <div className="w-full lg:w-[45%] p-4 flex flex-col gap-4">
            <div className="flex w-full flex-col gap-4 bg-white p-4 rounded-md shadow-lg">
                <div className="flex border-b-2 pb-2 border-black">
                <span className='p-2  rounded-md bg-[#ffd257] text-white'><Coins /></span>
                <h2>تأكيد استلام عمولات</h2>
                </div>
                
                {cashItems?.length > 0 ? 
                <div className="flex flex-col gap-3">
{cashItems?.map((item , i)=>(
    // <div className="flex flex-col gap-2 bg-[black] text-white" key={i}>
    //     <span>المبلغ : {item.amount}</span>
    // </div>
<SalesMoneyCard amount={item?.amount} user={item?.supervisor?.name} id={item?._id}/>
    
))}
                </div>
                : "لا يوجد لديك اي مبالغ للتحصيل"}
            </div>
          
         
          </div>
          <div className="w-full flex flex-col gap-4 lg:w-[55%]  p-4 rounded-md ">
    <div className="flex w-full justify-end gap-4 flex-wrap">

            <HomeCard icon ={<DollarSign />} number={amount} title="اموالك" subTitle="المحفظة" color={"bg-[#f5b951]"} /> 
            <HomeCard icon ={<Users/>} number={data?.categorizedOrders?.created || 0} title="طلباتك " subTitle="المجموع " color={"bg-[#012af9]"} />
            <HomeCard icon ={<Users/>} number={data?.categorizedOrders?.readyToBeDelivered || 0} title="طلباتك التي تم تجهيزها" subTitle="المجموع " color={"bg-[#012af9]"} />
            <HomeCard icon ={<Users/>} number={data?.categorizedOrders?.delivered || 0} title="طلباتك المسلمة" subTitle="المجموع " color={"bg-[#d73364]"} />
            <HomeCard icon ={<Users/>} number={data?.categorizedOrders?.delivering || 0} title="طلباتك قيد توصيل" subTitle="المجموع " color={"bg-[#d73364]"} />
            <HomeCard icon ={<Users/>} number={data?.categorizedOrders?.notReadyToBeDelivered || 0} title="طلباتك غير جاهزة للاستلام" subTitle="المجموع " color={"bg-[#d73364]"} />
            {localStorage.getItem("role") === "supervisor" &&     <HomeCard icon ={<DollarSign />} number={duesOverMe?.dues} title="اموال عليك" subTitle="المحفظة" color={"bg-[#f5b951]"} />}
        


    </div>
     {localStorage.getItem("role") === "sales" && <SalesTargets />}
    <CustomBarChart delivered={data?.deliveredOrdersAnalytics || []} />
    <AreaChartComponent />
          </div>
        
        </div>}
    
    </div>
  )
}

export default SalesHome