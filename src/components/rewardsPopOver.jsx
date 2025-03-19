"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { PayReward } from "./payRewardPopOver";




export function RewardPopOver({rewards}) {

    const formatDate = (date) => {
        if (!date) return "N/A"; // Return a default value if the date is undefined
        const validDate = new Date(date);
      
        if (isNaN(validDate.getTime())) {
          return "Invalid Date"; // Return a fallback value if the date is invalid
        }
      
        // Extract month, day, and year
        const month = validDate.getMonth() + 1; // Months are zero-based
        const day = validDate.getDate();
        const year = validDate.getFullYear();
      
        return `${day}/${month}/${year}`;
      };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button >المستحقات</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <h2 className="w-full text-center"> المستحقات</h2>
          </DrawerHeader>
          <div className="w-full flex flex-col gap-2">
{rewards.map((rewards,i)=>(
    <div className="flex flex-row-reverse justify-between p-2 border-b border-gray-200">
        <div className="font-semibold text-[18px]">{rewards?.reward}</div>
        <div>{formatDate(rewards?.paidAt)}</div>
        <div className={`${rewards?.isPaid ? "bg-[green]" : "bg-red-600"} text-white px-2`}>{rewards?.isPaid ?"تم الدفع" : "لم يتم الدفع"}</div>
        {! rewards?.isPaid && <PayReward id={rewards?._id} />}
    </div>
))}
    
          </div>

        </div>
      </DrawerContent>
    </Drawer>
  )
}
