import React from 'react'
import { Button } from './ui/button';
import { PopoverDemo } from './PopOver';
import manIcon from '../assets/man.png'
import womanIcon from '../assets/woman.png'
import { ShowPopOver } from './showCardPopOver';
import { useMutation , useQueryClient } from '@tanstack/react-query';
import { cancelTheOrder, makeOrderAttheDeliver, retrieveOrder } from '@/api/orders';
import { toast } from 'react-hot-toast';
import { Loader2Icon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RewardPopOver } from './rewardsPopOver';

const RewardCard = ({item , number}) => {
const role = localStorage.getItem("role")
    
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
const queryClient = useQueryClient()
// const mutation = useMutation({
//     mutationKey: "orders",
//     mutationFn: () => makeOrderAttheDeliver(item._id),
//     onSuccess: (res) => {
//     toast.success("تم تحديث حالة الطلب بنجاح");
//     queryClient.invalidateQueries("orders")
    
//     } ,
//     onError: (err) => {
//         console.log(err)
//     }
// })
// const cancelMutation = useMutation({
//     mutationKey: "orders",
//     mutationFn: () => cancelTheOrder(item._id),
//     onSuccess: (res) => {
//     toast.success("تم تحديث حالة الطلب بنجاح");
//     queryClient.invalidateQueries("orders")
    
//     } ,
//     onError: (err) => {
//         console.log(err)
//     }
// })
// const retrieveMutation = useMutation({
//     mutationKey: "orders",
//     mutationFn: () => retrieveOrder(item._id),
//     onSuccess: (res) => {
//     toast.success("تم تحديث حالة و نقله الي غير جاهز للتسليم");
//     queryClient.invalidateQueries("orders")
    
//     } ,
//     onError: (err) => {
//         console.log(err)
//     }
// })
   

          return (
            
        <div
      
        className=" min-h-fit w-[90%] mx-auto bg-white hover:bg-[#3891da] transition-all shadow-[0px_0px_15px_rgba(0,0,0,0.09)] py-2 px-4 space-y-3 relative overflow-hidden"
        >
          <div className="w-14 h-14 lg:w-20 lg:h-20 bg-myBlue rounded-full absolute -right-5 -top-7">
            <p className="absolute bottom-1 left-3  lg:bottom-4 lg:left-5 text-white text-[16px] lg:text-[20px]">{number < 10 ? `0${number}`: number}</p>
          </div>
   
   <div className="flex w-[95%] mx-auto justify-between flex-row-reverse  items-center">
    
    <div className="flex flex-col items-end gap-3 w-[70%]">
    <h2 className="font-bold text-[15px] lg:text-xl">{item?.user?.name || "sales"}</h2>
                  <div className="max-w-full flex flex-col lg:flex-row gap-2 text-[10px] lg:text-[15px] px-1 items-end lg:items-center *:min-w-fit  *:flex  *:items-center *:rounded-md  *:text-center  *:gap-2 *:flex-row-reverse  ">
                   {/* {item?.} */}
                  </div>
    </div>
                <div className="flex flex-col lg:flex-row items-center gap-2">

                {/* <PopoverDemo id={item._id} />  */}
                  {/* <ShowPopOver item={item} /> */}
                  <RewardPopOver rewards={item?.rewards || []}/>
                </div>

   </div>
         
    </div>
        
          )
      }


export default RewardCard