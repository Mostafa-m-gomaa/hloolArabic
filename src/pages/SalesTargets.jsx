import React from 'react'
import { useMutation, useQuery , useQueryClient } from '@tanstack/react-query'
import { getTargets, getTargetsAnalytics, getTargetsAnalyticsMine, participateTarget } from '@/api/targets'
import { Loader2, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';



const SalesTargets = () => {
const queryClient = useQueryClient()

    const {data:targets} = useQuery({
        queryKey:['usertargets'],
        queryFn:getTargets
    })

    const {data:targetsAn} = useQuery({
        queryKey:['usertargetsAn'],
        queryFn:getTargetsAnalytics
    })
    const {data:targetsAnMine} = useQuery({
        queryKey:['usertargetsAnMine'],
        queryFn:getTargetsAnalyticsMine
    })



const targetsItems = targets?.data || []
    const mutation = useMutation({
        mutationFn:(id)=>participateTarget(id),
        onSuccess:(res)=>{
            if(res.status === "success"){
                queryClient.invalidateQueries({queryKey:["usertargets"]})
                toast.success("تم اشتراكك في التارجت بنجاح")
            }
            else if(res.status === "fail"){
                toast.error(res.message)
            }
        },
    })
  return (
    <div className='bg-white p-4 rounded-md shadow-md'> 
    <div className="flex">
    <Target color='#59f85b' />
        <h2>الاهداف لليوم</h2>
    </div>
    <div className="flex flex-col gap-3 w-[90%] mx-auto py-4">

    {targetsItems.length > 0 ? 
    targetsItems?.map((tar ,i)=>(
        <div className="relative flex flex-col gap-3 bg-white p-4 rounded-md shadow-lg items-end border-2 border-[#53e72e]">
           <Button type="button" onClick={()=>mutation.mutate(tar._id)} disabled={mutation.isPending} className="absolute left-4 bg-[#24c024]">{mutation.isPending ? <Loader2 className='animate-spin' />: "اشتراك"}</Button>
            <div className='font-semibold text-[20px]'>{tar?.title}</div>
            <div className=' text-[15px]'>{tar?.description}</div>
            <h3>الاهداف</h3>
            <div className="flex flex-col gap-3">

            {tar?.targets.map((item,index)=>(
                <div className="flex gap-3" key={index}>
                    <span>{item?.reward} : المكافاة</span>
                    <span>{item?.orderNumbers} :  عدد الطلبات</span>
                </div>
            ))}
            </div>
            
        </div>
    ))
    : <div className='text-center'> لا يوجد تارجت لهذا اليوم </div>}
    </div>
    </div>
  )
}

export default SalesTargets