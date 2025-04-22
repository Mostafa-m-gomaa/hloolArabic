import React from 'react'
import { CircleX } from 'lucide-react';
import { ThumbsUp } from 'lucide-react';
import { CircleUser } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { PayDues } from './PayDuesPopOver';
import { LoaderPinwheel } from 'lucide-react';
import { HistoryDialog } from './historyDialog';




const DuesCard = ({item}) => {
   
  return (
    <div className="flex gap-6  bg-white w-[90%] mx-auto lg:w-[100%] p-4 rounded-md shadow-md flex-col lg:flex-row-reverse items-center justify-between">
  <div className="flex flex-row-reverse items-center gap-2 flex-wrap justify-center">
  {/* {item.status === "غير مدفوع" ? <CircleX  size={40} color='#e23232' /> : item.status === "جاري اكتمال الدفع" ?<LoaderPinwheel size={40} color='#e6b60a' className='animate-spin' /> :  <ThumbsUp  color='#0bd022' size={40} />} */}
  <LoaderPinwheel size={40} color='#e6b60a' className='animate-spin' /> 
  <div className="flex flex-row-reverse items-center gap-2 text-white bg-gray-800 p-2 rounded-md">
            <span><CircleUser /></span>
            :
            <span>{item?.supervisor?.name}</span>
        </div>
        <div className="flex flex-row-reverse items-center gap-2 text-white bg-gray-800 p-2 rounded-md">
            <span>المستحقات</span>
            :
            <span>{item?.dues}</span>
        </div>
     
     
 
  </div>
  <div className="flex items-center gap-2 justify-center">
    {/* <Button>
<Link to={`/home/onereport/${item?.report}`}>
        التقرير
</Link>
    </Button> */}
    <HistoryDialog history ={item?.history} />
    {localStorage.getItem("role") != "supervisor" && <PayDues  id={item?._id} />}
    
  </div>
    </div>
  )
}

export default DuesCard