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
const Orders = () => {

  // const {data : orders , isLoading ,isFetching , isError} = useQuery(
  //   {
  //   queryKey:["orders" ,{product :"البطاقه الفضيه"}],
  //   queryFn: ({queryKey})=> getOrders (queryKey[1].product)

  //   });
const [page, setPage] = useState(1);
const [country, setCountry] = useState("");
const [createdAt, setCreatedAt] = useState("");
const [customerName, setCustomerName] = useState("");
const [deliveryDate, setDeliveryDate] = useState("");
const [salesPerson, setSalesPerson] = useState("");
const [supervisor, setSupervisor] = useState("");
const [phone, setPhone] = useState("");
const [deliveryStatus, setDeliveryStatus] = useState("");
const [sellingDate, setSellingDate] = useState("");
const [theVariable, setTheVariable] = useState("")

const [queryObj , setQueryObject] = useState({})

const handleSearchChange = (value) => {
  
  if(theVariable === "country"){
    setCountry(value)
    setQueryObject({country:value})
  }
  if(theVariable === "createdAt"){
    setCreatedAt(value)
    setQueryObject({createdAt:value})
  }
  if(theVariable === "customerName"){
    setCustomerName(value)
    setQueryObject({customerName:value})
  }
  if(theVariable === "deliveryDate"){
    setDeliveryDate(value)
    setQueryObject({deliveryDate:value})
  }
  if(theVariable === "salesPerson"){
    setSalesPerson(value)
    setQueryObject({salesPerson:value})
  }
  if(theVariable === "supervisor"){
    setSupervisor(value)
    setQueryObject({supervisor:value})
  }
  if(theVariable === "phone"){
    setPhone(value)
    setQueryObject({phone:value})
  }
  if(theVariable === "deliveryStatus"){
    setDeliveryStatus(value)
    setQueryObject({deliveryStatus:value})
  }
  if(theVariable === "sellingDate"){
    setSellingDate(value)
    setQueryObject({sellingDate:value})
  }
  if(theVariable === "page"){
    setPage(value)
    setQueryObject({page:value})
  }
}



const { data: orders, isLoading, isFetching, isError } = useQuery({
  queryKey: [
    "orders",
    queryObj,
  ],
  queryFn: ({ queryKey }) => {
    const params = queryKey[1] || {};
    return getOrders(params); // Pass the entire object
  },
});

if (isError) {
  return <div>Internet Error</div>;
}
  
  console.log(orders)


  
  return (
    <div className='w-[100%]  mx-auto flex flex-col gap-3'>
      <div className="flex w-[90%] mx-auto flex-row-reverse items-center py-4">
          <h1>الطلبات</h1>
          <div className="flex border-2 w-[70%]">

         <ComboboxDemo setVar={setTheVariable} />
         {theVariable === "createdAt" || theVariable === "deliveryDate" || theVariable === "sellingDate" ? <DatePickerDemo searchFunc={handleSearchChange} /> :   <Input type="text" placeholder="اكتب هنا" onChange={(e)=>handleSearchChange(e.target.value)} />}

          </div>

      </div>
          {isLoading ? <Loader />: <OrdersTable orders={orders} />}
      
   
          
      </div>
  )
}

export default Orders