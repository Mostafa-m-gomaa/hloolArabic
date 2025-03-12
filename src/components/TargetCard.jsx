import React from 'react'
import { Target } from 'lucide-react';
import { Button } from './ui/button';
import { useMutation , useQueryClient } from '@tanstack/react-query';
import { deleteTarget } from '@/api/targets';
import toast from 'react-hot-toast';

const TargetCard = ({target}) => {

const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn:()=>deleteTarget(target._id) ,
        onSuccess:(res)=>{
            if(res.status === "success"){
                queryClient.invalidateQueries({queryKey:["targets"]})
            }
            toast.success("تم حذف الهدف بنجاح")
        }
    })

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
    <div className="flex bg-white p-4 flex-col rounded-sm shadow-lg border-b-4 border-[#00ff62] items-end relative"  >
        <Button disabled={mutation.isPending} onClick={mutation.mutate} type="button" className="absolute left-1 lg:left-16 bg-red-600">حذف</Button>
        <div className="flex w-full justify-start gap-6 flex-row-reverse">

            <Target color='#37ea34'/>
        <div className='font-bold text-[20px] text-right'>{target.title}</div>
        </div>
        <div className='font-semibold text-[18px] text-right'>{target.description}</div>
        <div><span>{formatDate(target.createdAt)}</span> : <span>تاريخ الانشاء</span></div>
        <div><span>{formatDate(target.validAt)}</span> : <span>تاريخ التفعيل</span></div>
        <div className="text font-semibold text-[24px] text-right">
            الاهداف
        </div>
        <div className="flex flex-col ">
            {target?.targets?.map((item,index)=>(
                <div key={index} className="flex gap-4">
                    <div><span>{item.orderNumbers}</span> : <span>عدد الطلبات</span></div>
                    <div><span>{item.reward}</span> : <span>المكافأه</span></div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default TargetCard