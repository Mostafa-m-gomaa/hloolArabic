
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "@/components/ui/tabs"
// import { BookCheck } from 'lucide-react';
// import { Ban } from 'lucide-react';
// import { MailCheck } from 'lucide-react';
// import { Rss } from 'lucide-react';
// import { useState } from "react";



// export function TabsDemo({setDeliveryStatus ,filterChang , categorizedOrders}) {
//   const data =Object.entries(categorizedOrders) || []
//   console.log(categorizedOrders)
//    return (
//     <Tabs defaultValue="" className="w-[100%] mx-auto  ">
//       <TabsList className=" w-full min-h-fit flex flex-wrap justify-center gap-4 *:w-[45%] *:lg:w-[20%] *:flex *:items-center *:gap-2">
//         <TabsTrigger onClick={()=>filterChang("deliveryStatus" ,"غير جاهز للتسليم")} value="غير جاهزة للاستلام"><Ban color="#db0000" /> <span className="text-[12px] lg:text-[15px]">غير جاهزة للاستلام</span></TabsTrigger>
//         <TabsTrigger onClick={()=>filterChang( "deliveryStatus","جاهز للتسليم")} value="جاهزة للاستلام"><Rss color="#1387b9" /> <span className="text-[12px] lg:text-[15px]" >جاهزة للاستلام</span></TabsTrigger>
//         <TabsTrigger onClick={()=>filterChang("deliveryStatus","قيد التوصيل" )} value="قيد التوصيل"><MailCheck color="#b98d13" /> <span className="text-[12px] lg:text-[15px]">قيد التوصيل</span></TabsTrigger>
//         <TabsTrigger onClick={()=>filterChang("deliveryStatus","تم التسليم")} value="تم الاستلام"><BookCheck color="#0ea20b" /> <span className="text-[12px] lg:text-[15px]">تم التسليم</span></TabsTrigger>
//       </TabsList>
//       <div className="flex justify-center gap-4 bg-white p-4 rounded-md shadow-lg my-2">
//       {data?.map(([key, value], index) => (
//      <span className="text-white bg-myBlue p-2 rounded-md" key={index}>{key}{value}</span>
//       )
//       )}
//       </div>

//     </Tabs>
  
//   )
// }

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { BookCheck, Ban, MailCheck, Rss } from "lucide-react"; // Simplified import
import { useState } from "react";

export function TabsDemo({ setDeliveryStatus, filterChang, categorizedOrders }) {
  const data = Object.entries(categorizedOrders || {}); // Prevents crashing if undefined/null
 

  return (
    <Tabs defaultValue="" className="w-[100%] mx-auto">
      <TabsList className="w-full min-h-fit flex flex-wrap justify-center gap-4 *:w-[45%] *:lg:w-[20%] *:flex *:items-center *:gap-2">
        <TabsTrigger onClick={() => filterChang("deliveryStatus", "تم التسليم")} value="تم الاستلام">
          <BookCheck color="#0ea20b" /> <span className="text-[12px] lg:text-[15px]">تم التسليم</span>
        </TabsTrigger>
             
        <TabsTrigger onClick={() => filterChang("deliveryStatus", "غير جاهز للتسليم")} value="غير جاهزة للاستلام">
          <Ban color="#db0000" /> <span className="text-[12px] lg:text-[15px]">غير جاهزة للاستلام</span>
        </TabsTrigger>
        <TabsTrigger onClick={() => filterChang("deliveryStatus", "قيد التوصيل")} value="قيد التوصيل">
          <MailCheck color="#b98d13" /> <span className="text-[12px] lg:text-[15px]">قيد التوصيل</span>
        </TabsTrigger>
        <TabsTrigger onClick={() => filterChang("deliveryStatus", "جاهز للتسليم")} value="جاهزة للاستلام">
          <Rss color="#1387b9" /> <span className="text-[12px] lg:text-[15px]">جاهزة للاستلام</span>
        </TabsTrigger>
      </TabsList>

      <div className="flex justify-center gap-4 bg-white p-4 rounded-md shadow-lg my-2">
        {data.map(([key, value], index) => (
          <span className="text-[10px] lg:text-[13px] text-white bg-myBlue p-2 rounded-md" key={index}>
            {key} <t/> : {value}
          </span>
        ))}
      </div>
    </Tabs>
  );
}
