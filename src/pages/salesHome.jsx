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


const SalesHome = () => {
const queryClient = useQueryClient()

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
        <h1 className='bg-white p-4 rounded-md '>لوحة القيادة</h1>
        <div className="flex lg:flex-row flex-col-reverse w-[96%] lg:w-[90%]  p-4 mx-auto justify-between ">
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

            <HomeCard icon ={<Users/>} number={51} title="طلباتك التي تم تجهيزها" subTitle="المجموع الاسبوعي" color={"bg-[#012af9]"} />
            <HomeCard icon ={<Users/>} number={15} title="طلباتك المسلمة" subTitle="المجموع الاسبوعي" color={"bg-[#d73364]"} />
            <HomeCard icon ={<DollarSign />} number={amount} title="اموالك" subTitle="المحفظة" color={"bg-[#f5b951]"} /> 
            {localStorage.getItem("role") === "supervisor" &&     <HomeCard icon ={<DollarSign />} number={duesOverMe?.dues} title="اموال عليك" subTitle="المحفظة" color={"bg-[#f5b951]"} />}
        


    </div>
    <CustomBarChart />
    <AreaChartComponent />
          </div>
        
        </div>
    </div>
  )
}

export default SalesHome