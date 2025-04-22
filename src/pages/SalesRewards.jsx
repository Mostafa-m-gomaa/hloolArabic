import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getTargets } from '@/api/targets'
import TargetCard from '@/components/TargetCard'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { getTargetsAnalytics } from '@/api/targets'
import RewardCard from '@/components/RewardsCard'

const SalesReward = () => {


        const {data:targetsAn} = useQuery({
            queryKey:['adminTargetsAn'],
            queryFn:getTargetsAnalytics
        })

    
  
const rewards = targetsAn?.data || []

  return (
    <div className="flex flex-col gap-3 py-8">
        <div className='flex  gap-2 justify-between w-[90%] mx-auto p-2 bg-white items-center rounded-md'>

    <h1 className='bg-white p-4 rounded-md '>مستحقات المناديب</h1>

        </div>

    <div className="flex flex-col gap-3 w-[90%] mx-auto">
    {rewards.map((reward , i)=><RewardCard item={reward}  number={i+1}/> )}
    </div> 
    </div>
  )
}

export default SalesReward