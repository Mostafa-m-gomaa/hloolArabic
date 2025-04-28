import React from 'react'
import { Button } from './ui/button';
import { PopoverDemo } from './PopOver';

import reportIcon from '../assets/report.png'
import { ShowPopOver } from './showCardPopOver';
import { ReportPopOver } from './repoertPopOver';
import { Link } from 'react-router-dom';
import { availableRepsToUpdate  ,getaAvailableRepsCountsToUpdate} from '@/api/orders';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';



const ReportCard = ({item , number , ...props}) => {
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

  

  const mutation = useMutation({
    mutationFn: () => {
      return availableRepsToUpdate(item._id);
    } ,
    onSuccess: (data) => {
      console.log(data);
      if(data?.status === "success"){
        toast.success(data.message)
      }
   
    },
  });
    

  const {data} =useQuery({
    queryKey:["availableRepsToUpdate" , item._id] ,
    queryFn:()=> getaAvailableRepsCountsToUpdate(item._id) ,
  })


  const numberToUpdate = data?.count || 0

          return (
            
        <div
   
        className=" min-h-fit w-[90%] mx-auto bg-white transition-all shadow-[0px_0px_15px_rgba(0,0,0,0.09)] py-2 px-4 space-y-3 relative overflow-hidden"
        >
          <div className="w-14 h-14 lg:w-20 lg:h-20 bg-myBlue rounded-full absolute -right-5 -top-7">
            <p className="absolute bottom-1 left-3  lg:bottom-4 lg:left-5 text-white text-[16px] lg:text-[20px]">{number < 10 ? `0${number}`: number}</p>
          </div>
   
   <div className="flex w-[95%] mx-auto justify-between flex-row-reverse  items-center">
    
    <img src={reportIcon} alt=""  className='w-[50px] lg:w-[80px]'/>
    <div className="flex flex-col items-end gap-3 w-[70%]">
    <h2 className="font-bold text-[15px] lg:text-xl">{item?.creator?.name || "not-found"}</h2>
                  <div className="max-w-full flex flex-col lg:flex-row gap-2 text-[10px] lg:text-[15px] px-1 items-end lg:items-center *:min-w-fit  *:flex  *:items-center *:rounded-md  *:text-center  *:gap-2 *:flex-row-reverse  ">
                    <div><span>الطلبات الجديد</span> : <span>{item?.newOrders.length || 0}</span> </div>
                    <div><span>الطلبات المسلمة</span> : <span>{item?.deliveredOrders.length || 0}</span> </div>
                    <div><span>تاريخ التقرير</span> : <span>{formatDate(item.reportDate)}</span> </div>

                  </div>
    </div>
                <div className="flex flex-col lg:flex-row items-center gap-2">
                  <ReportPopOver item={item} />
                  <Button><Link to={`/home/onereport/${item?._id}`}>عرض بالتفصيل</Link></Button>
                  {! localStorage.getItem("role") === "supervisor"  &&  <Button onClick={mutation.mutate}>السماح بالتعديل</Button>}
                  {localStorage.getItem("role") === "supervisor" && numberToUpdate > 0  &&  <Button><Link to={`/home/editreport/${item._id}`} >تعديل</Link></Button>}
                  {/* <Button><Link to={`/home/editreport/${item._id}`} >تعديل</Link></Button> */}

                </div>

   </div>
         
    </div>
        
          )
      }


export default ReportCard