import React from 'react'
import { Button } from './ui/button';
import { PopoverDemo } from './PopOver';
import manIcon from '../assets/man.png'
import womanIcon from '../assets/woman.png'
import { ShowPopOver } from './showCardPopOver';

const Card = ({number ,item}) => {

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

    

   

          return (
            
        <div
        data-aos="fade-right"
          className="w-[90%] mx-auto bg-white shadow-[0px_0px_15px_rgba(0,0,0,0.09)] py-2 px-4 space-y-3 relative overflow-hidden"
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
   <PopoverDemo   id={item._id}/>
<ShowPopOver  item={item}/>    </div>
   </div>
         
    </div>
        
          )
      }


export default Card