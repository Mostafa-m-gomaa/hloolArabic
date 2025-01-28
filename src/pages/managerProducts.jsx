import React ,{useState} from 'react'
import { OrdersTable} from '@/components/OrdersTable'
import { useQuery ,useQueryClient  } from '@tanstack/react-query'
import Loader from '@/components/Loader'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { getOrders } from '@/api/orders'
import { ComboboxDemo } from '@/components/CompoBox'
import { Input } from "@/components/ui/input"
import { DatePickerDemo } from '@/components/DatePicker'
import toast from 'react-hot-toast'
import { PaginationDemo } from '@/components/Pagination'
import Card from '@/components/Card'
import { TabsDemo } from '@/components/tabs'
const ManagerOrders = () => {
const [deliveryStatus, setDeliveryStatus] = useState("غير جاهز للتسليم")
const [page, setPage] = useState(1);
const [theVariable, setTheVariable] = useState("")
const [queryObj , setQueryObject] = useState({})

const handleSearchChange = (value) => {
  if(theVariable === ""){
    toast.error("اختر الفلتر اولا")
  }
setQueryObject({[theVariable]:value})
}



const { data: orders, isLoading, isFetching, isError } = useQuery({
  queryKey: [
    "orders",
    queryObj,
    page
  ],
  queryFn: ({ queryKey }) => {
    const params = queryKey[1] || {};
    const page = queryKey[2] ;
    return getOrders(params , page); // Pass the entire object
  },
});

const orderItems = orders?.data || []

if (isError) {
  return <div>Internet Error</div>;
}
  
  console.log(orders)


  
  return (
    <div className='w-[100%]  mx-auto flex flex-col gap-3'>
      <div className="flex w-[90%] mx-auto flex-row-reverse items-center py-4">
          <h1>ادارة الطلبات</h1>
          <div className="flex  w-[70%]">

         <ComboboxDemo setVar={setTheVariable} />
         {theVariable === "createdAt" || theVariable === "deliveryDate" || theVariable === "sellingDate" ? <DatePickerDemo searchFunc={handleSearchChange} /> :   <Input type="text" placeholder="اكتب هنا" onChange={(e)=>handleSearchChange(e.target.value)} />}

          </div>

      </div>
     
      <TabsDemo  setDeliveryStatus={setDeliveryStatus}/>
          {isLoading ? <Loader />: 
          <div className='w-[98%] lg:w-[95%] mx-auto flex flex-col items-end gap-3 justify-center'>
            {orderItems.map((item,index)=>( 
              item?.deliveryStatus === deliveryStatus ? <Card  key={index} number={index+1} item={item}/> : null
          ))}
            </div>
   
          }
          <PaginationDemo page={page} setPage={setPage} numberOfPages={orders?.paginationResult?.numberOfPages} />
      
   
          
      </div>
  )
}

export default ManagerOrders