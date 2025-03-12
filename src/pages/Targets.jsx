import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getTargets } from '@/api/targets'
import TargetCard from '@/components/TargetCard'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { getTargetsAnalytics } from '@/api/targets'

const Targets = () => {
    const {data:targets} = useQuery({
        queryKey:['targets'],
        queryFn:getTargets
    })

        const {data:targetsAn} = useQuery({
            queryKey:['adminTargetsAn'],
            queryFn:getTargetsAnalytics
        })

  
const targetsItems = targets?.data || []

  return (
    <div className="flex flex-col gap-3 py-8">
        <div className='flex justify-between w-[90%] mx-auto p-2 bg-white items-center rounded-md'>
    <Button><Link to="/home/addtarget">اضافة هدف</Link></Button>
    <h1 className='bg-white p-4 rounded-md '>الاهداف الموضوعه</h1>

        </div>

    <div className="flex flex-col gap-3 w-[90%] mx-auto">
    {targetsItems.map((target)=><TargetCard target={target} /> )}
    </div>
    </div>
  )
}

export default Targets