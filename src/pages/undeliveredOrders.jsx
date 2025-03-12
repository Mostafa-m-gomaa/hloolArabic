import React ,{useState} from 'react'
import { OrdersTable} from '@/components/OrdersTable'
import { useQuery ,useQueryClient  } from '@tanstack/react-query'
import Loader from '@/components/Loader'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { getOrders, getUndeliveredOrders } from '@/api/orders'
import { ComboboxDemo } from '@/components/CompoBox'
import { Input } from "@/components/ui/input"
import { DatePickerDemo } from '@/components/DatePicker'
import toast from 'react-hot-toast'
import { PaginationDemo } from '@/components/Pagination'
import Card from '@/components/Card'
import { TabsDemo } from '@/components/tabs'
import { ReportsFilter } from '@/components/RepoertsFilter'
import { OrdersFilter } from '@/components/OrdersFilter'
import UndeliveredCard from '@/components/UndeliveredCard'
const UndeliveredOrders = ({title , num}) => {
const [deliveryStatus, setDeliveryStatus] = useState("غير جاهز للتسليم")
const [page, setPage] = useState(1);
const [filters,setFilters]= useState({
  DeliveryReceipt :"",
  ValidityPeriod :"",
  birthDate:"",
  country:"",
  createdAt:"",
  customerName:"",
  deliveryCommission:"",
  deliveryDate:"",
  deliveryMan:"",
  deliveryStatus:"",
  gender:"",
  orderNumber:"",
  orderPrice:"",
  phone:"",
  product:"",
  receipt:"",
  salesManCommission:"",
  salesPerson:"",
  sellingDate:"",
  supervisor:"",
  supervisorCommission:"",
  daysAgo:"",
  city:"",
})

const handleFilterChange = (key, value) => {
  setFilters((prev) => ({
    ...prev,
    [key]: value || undefined, // Ensure empty values are removed
  }));
};



const { data: orders, isLoading, isFetching, isError } = useQuery({
  queryKey: [
    "undOrders",
    filters,
    page
  ],
  queryFn: ({ queryKey }) => {
    const params = queryKey[1] || {};
    const page = queryKey[2] ;
    return getUndeliveredOrders(params , page); // Pass the entire object
  },
});
if (num === 1){

    var orderItems = orders?.orders1|| []
}
else if (num === 2){
    var orderItems = orders?.orders2|| []
}

if (isError) {
  return <div>Internet Error</div>;
}
  



  
  return (
    <div className='w-[100%]  mx-auto flex flex-col gap-3'>
      
      
<div className="flex w-[90%] mx-auto flex-row-reverse items-center py-4">
          <h1>{title}</h1>
       

      </div>
         {/* <OrdersFilter filterChange={handleFilterChange} /> */}
     
       {/* <TabsDemo categorizedOrders={orders?.categorizedOrders}  filterChang={handleFilterChange}  setDeliveryStatus={setDeliveryStatus}/> */}
            {isLoading ? <Loader />: 
           <div    data-aos="fade-right" className='w-[98%] lg:w-[95%] mx-auto flex flex-col items-end gap-3 justify-center'>

             {orderItems?.map((item,index)=>( 
              <UndeliveredCard deliveryStatus={item.deliveryStatus}  key={index} number={index+1} item={item} anim={true}/> 
           ))}
           {orderItems.length === 0 && <div className='text-center mx-auto text-[20px]'>لا يوجد طلبات</div>}    
             </div>
    
           }
           {/* <PaginationDemo currentPage={page} setPage={setPage} numberOfPages={orders?.paginationResult?.numberOfPages} /> */}
   
          
      </div>
  )
}

export default UndeliveredOrders


