import React from 'react'
import { Button } from './ui/button';
import { PopoverDemo } from './PopOver';

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
          className="w-[48%] lg:w-80 bg-white shadow-[0px_0px_15px_rgba(0,0,0,0.09)] py-9 px-2 space-y-3 relative overflow-hidden"
        >
          <div className="w-24 h-24 bg-myBlue rounded-full absolute -right-5 -top-7">
            <p className="absolute bottom-6 left-7 text-white text-2xl">{number < 10 ? `0${number}`: number}</p>
          </div>
          <div className="fill-violet-500 w-12 mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="Layer_1"
              data-name="Layer 1"
              viewBox="0 0 24 24"
            >
              <path
                d="m24,6.928v13.072h-11.5v3h5v1H6.5v-1h5v-3H0V4.5c0-1.379,1.122-2.5,2.5-2.5h12.98c-.253.295-.54.631-.856,1H2.5c-.827,0-1.5.673-1.5,1.5v14.5h22v-10.993l1-1.079Zm-12.749,3.094C19.058.891,19.093.855,19.11.838c1.118-1.115,2.936-1.113,4.052.002,1.114,1.117,1.114,2.936,0,4.052l-8.185,8.828c-.116,1.826-1.623,3.281-3.478,3.281h-5.59l.097-.582c.043-.257,1.086-6.16,5.244-6.396Zm2.749,3.478c0-1.379-1.122-2.5-2.5-2.5-2.834,0-4.018,3.569-4.378,5h4.378c1.378,0,2.5-1.121,2.5-2.5Zm.814-1.073l2.066-2.229c-.332-1.186-1.371-2.057-2.606-2.172-.641.749-1.261,1.475-1.817,2.125,1.117.321,1.998,1.176,2.357,2.277Zm.208-5.276c1.162.313,2.125,1.134,2.617,2.229l4.803-5.18c.737-.741.737-1.925.012-2.653-.724-.725-1.908-.727-2.637,0-.069.08-2.435,2.846-4.795,5.606Z"
              ></path>
            </svg>
          </div>
          <h2 className="font-bold text-xl">{item?.product || "not-found"}</h2>
          <div className="flex flex-col gap-2 *:flex *:flex-col *:items-center *:rounded-md *:border-2 *:text-center w-full  ">
        <div><span>اسم العميل</span> <span>{item.customerName}</span> </div>
        <div><span>رقم سند العربون</span> <span>{item.receipt || "لا يوجد رقم سند"}</span> </div>
        <div><span>تاريخ الميلاد</span><span>{formatDate(item.birthDate)}</span> </div>
        <div> <span>الجنس</span> <span>{item.gender}</span> </div>
        <div><span>تاريخ البيع</span> <span>{formatDate(item.sellingDate)}</span></div>
        <div><span>تاريخ التسليم</span> <span>{formatDate(item.deliveryDate)}</span></div>
        <div><span>سند التسليم</span> <span>{item.DeliveryReceipt || "لا يوجد"}</span></div>
        <div><span>اصدار البطاقة</span> <span>{item.productIssuanceDate ? formatDate(item.productIssuanceDate): "لا يوجد"}</span></div>
          </div>
         <div className="flex flex-col lg:flex-row justify-around ">
         
            <PopoverDemo   id={item._id}/>
      
         </div>
         
        </div>
        
          )
      }


export default Card