import { getOneReport } from '@/api/orders'
import ReportDisplay from '@/components/dispalyReportData'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router-dom'
import orderImg from '../assets/salesOrders.png'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {Button} from '@/components/ui/button'
import Cardd from '@/components/ReportSpecialCard'

const ReportDetails = () => {

const param =useParams().id

const {data : details , isLoading ,isErro} =useQuery({
    queryKey:["reports"] ,
    queryFn:()=> getOneReport(param)
})

const reportDetails = details?.report || []
const salesOrders = details?.report?.salesMenOrders || []


console.log(details)

  return (
    <div className="flex flex-col-reverse lg:flex-row w-full *:bg-white *:rounded-md *:p-4 *:shadow-lg justify-center gap-2 p-8">
        <div className="w-[95%] mx-auto lg:w-[40%] ">
                <Card>
                  <CardHeader className="flex items-center flex-row-reverse justify-between ">
                    <CardTitle>طلبات المناديب لهذا اليوم</CardTitle>
                    <img className="w-[50px] lg:w-[80px]" src={orderImg} />
                  </CardHeader>
                </Card>
              <div className="flex flex-col gap-3 my-2 ">
                  {salesOrders?.length > 0 ?
                      salesOrders?.map((order, i) => (
                          <Cardd key={i} number={i + 1} item={order} anim={true} />
                      ))


                      : <div className='text-center border-b-2 border-black pb-4 mx-auto text-[20px] my-10'>لا يوجد طلبات</div>}
              </div>

        </div>
        <div className="w-[95%] mx-auto lg:w-[57%]">
            <ReportDisplay report={reportDetails} />
        </div>
    </div>
  )
}

export default ReportDetails