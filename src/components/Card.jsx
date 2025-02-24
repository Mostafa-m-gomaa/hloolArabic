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

const Card = ({number ,item , anim , ...props}) => {
const role = localStorage.getItem("role")
    const formatDate = (date) => {
        const validDate = new Date(date);
      
        if (isNaN(validDate.getTime())) {
          throw new Error("Invalid date passed to formatDate.");
        }
      
        const nyDate = new Intl.DateTimeFormat("en-US", {
          timeZone: "America/New_York",
          year: "numeric",
          month: "long",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(validDate);
      
        return nyDate;
      };

const queryClient = useQueryClient()
const mutation = useMutation({
    mutationKey: "orders",
    mutationFn: () => makeOrderAttheDeliver(item._id),
    onSuccess: (res) => {
    toast.success("تم تحديث حالة الطلب بنجاح");
    queryClient.invalidateQueries("orders")
    
    } ,
    onError: (err) => {
        console.log(err)
    }
})
const cancelMutation = useMutation({
    mutationKey: "orders",
    mutationFn: () => cancelTheOrder(item._id),
    onSuccess: (res) => {
    toast.success("تم تحديث حالة الطلب بنجاح");
    queryClient.invalidateQueries("orders")
    
    } ,
    onError: (err) => {
        console.log(err)
    }
})
const retrieveMutation = useMutation({
    mutationKey: "orders",
    mutationFn: () => retrieveOrder(item._id),
    onSuccess: (res) => {
    toast.success("تم تحديث حالة و نقله الي غير جاهز للتسليم");
    queryClient.invalidateQueries("orders")
    
    } ,
    onError: (err) => {
        console.log(err)
    }
})
   

          return (
            
        <div
        onClick={props.click ? ()=>props.click(item) : null }
        // data-aos={anim ? "fade-right" : ""}
        className=" min-h-fit w-[90%] mx-auto bg-white hover:bg-[#3891da] transition-all shadow-[0px_0px_15px_rgba(0,0,0,0.09)] py-2 px-4 space-y-3 relative overflow-hidden"
        >
          <div className="w-14 h-14 lg:w-20 lg:h-20 bg-myBlue rounded-full absolute -right-5 -top-7">
            <p className="absolute bottom-1 left-3  lg:bottom-4 lg:left-5 text-white text-[16px] lg:text-[20px]">{number < 10 ? `0${number}`: number}</p>
          </div>
   
   <div className="flex w-[95%] mx-auto justify-between flex-row-reverse  items-center">
    
    <img src={item?.gender === "ذكر" ? manIcon : womanIcon} alt=""  className='w-[50px] lg:w-[80px]'/>
    <div className="flex flex-col items-end gap-3 w-[70%]">
    <h2 className="font-bold text-[15px] lg:text-xl">{item?.product || "not-found"}</h2>
                  <div className="max-w-full flex flex-col lg:flex-row gap-2 text-[10px] lg:text-[15px] px-1 items-end lg:items-center *:min-w-fit  *:flex  *:items-center *:rounded-md  *:text-center  *:gap-2 *:flex-row-reverse  ">
                    <div><span>اسم العميل</span> : <span>{item.customerName}</span> </div>
                    <div><span>رقم سند العربون</span> : <span>{item.receipt || "لا يوجد رقم سند"}</span> </div>
                    <div><span>تاريخ الميلاد</span> : <span>{formatDate(item.birthDate)}</span> </div>

                  </div>
    </div>
                <div className="flex flex-col lg:flex-row items-center gap-2">

                  {["manager" , "admin"].includes(role) && props.deliveryStatus === "غير جاهز للتسليم" ? <PopoverDemo id={item._id} /> : null}
                  {["manager" , "admin"].includes(role) && props.deliveryStatus === "جاهز للتسليم" ? <PopoverDemo id={item._id} /> : null}
                  {["manager" , "admin"].includes(role) && props.deliveryStatus === "جاهز للتسليم" ? <Button type="button" disabled={mutation.isPending} onClick={mutation.mutate}>{mutation.isPending ? <Loader2Icon className='animate-spin' />:"جعله قيد التوصيل"}</Button> : null}
                  {["manager" , "admin"].includes(role) &&  !["تم التسليم" , "ملغي"].includes(props.deliveryStatus) ? <Button className="bg-red-500" type="button" disabled={cancelMutation.isPending} onClick={cancelMutation.mutate}>{cancelMutation.isPending ? <Loader2Icon className='animate-spin' />:"الغاء الطلب"}</Button> : null}
                  {["manager" , "admin"].includes(role) &&  ["ملغي"].includes(props.deliveryStatus) ? <Button  type="button" disabled={retrieveMutation.isPending} onClick={retrieveMutation.mutate}>{retrieveMutation.isPending ? <Loader2Icon className='animate-spin' />:"استرجاع الطلب"}</Button> : null}
                  <ShowPopOver item={item} />
                </div>

   </div>
         
    </div>
        
          )
      }


export default Card