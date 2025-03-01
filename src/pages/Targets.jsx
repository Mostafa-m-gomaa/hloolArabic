import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getTargets } from '@/api/targets'

const Targets = () => {
    const {data:targets} = useQuery({
        queryKey:['targets'],
        queryFn:getTargets
    })


    console.log(targets)
  return (
    <div className="flex flex-col gap-3 py-8">
    <h1 className='bg-white p-4 rounded-md '>الاهداف الموضوعه</h1>
    </div>
  )
}

export default Targets