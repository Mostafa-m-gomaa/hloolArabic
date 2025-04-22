import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import toast from "react-hot-toast"
import { getDeliveringOrders, getMyOrders } from "@/api/orders"
import { useQuery } from "@tanstack/react-query"
import { ComboboxDemo } from "@/components/CompoBox"
import { DatePickerDemo } from "@/components/DatePicker"
import { PaginationDemo } from "@/components/Pagination"
import Card from "./Card"
import { set } from "date-fns"
import SpecCard from "./SpecCard"
import { OrdersFilter } from "./OrdersFilter"


export function DialogDemo({setOrder}) {

    



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
})

const handleFilterChange = (key, value) => {
  setFilters((prev) => ({
    ...prev,
    [key]: value || undefined, // Ensure empty values are removed
  }));
};



const { data: orders, isLoading, isFetching, isError } = useQuery({
  queryKey: [
    "orders",
    filters,
    page
  ],
  queryFn: ({ queryKey }) => {
    const params = queryKey[1] || {};
    const page = queryKey[2] ;
    return getDeliveringOrders(params , page); // Pass the entire object
  },
});

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



    const [theVariable, setTheVariable] = useState("")
    const [queryObj , setQueryObject] = useState({})
    const [activeOrder , setActiveOrder] = useState("")
    const [orderNum, setOrderNum] = useState("")
    const [open, setOpen] = useState(false);
    
    const handleSearchChange = (value) => {
      if(theVariable === ""){
        toast.error("اختر الفلتر اولا")
      }
    setQueryObject({[theVariable]:value})
    }
    
    
    
    // const { data: orders, isLoading, isFetching, isError } = useQuery({
    //   queryKey: [
    //     "everyOrders",
    //     queryObj,
    //     page
    //   ],
    //   queryFn: ({ queryKey }) => {
    //     const params = queryKey[1] || {};
    //     const page = queryKey[2] ;
    //     return getDeliveringOrders(params , page); // Pass the entire object
    //   },
    // });
    
  
    
    
    
    const orderItems = orders?.data || []
    

    if (isError) {
      return <div>Internet Error</div>;
    }


  return (
    <Dialog  open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button >{orderNum === "" ? "اختر الطلب" : orderNum}</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[70%] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>الطلبات الخاصة بك</DialogTitle>
 
        </DialogHeader>
             {/* <div className="flex  w-[70%]">
        
                 <ComboboxDemo setVar={setTheVariable} />
                 {theVariable === "createdAt" || theVariable === "deliveryDate" || theVariable === "sellingDate" ? <DatePickerDemo searchFunc={handleSearchChange} /> :   <Input type="text" placeholder="اكتب هنا" onChange={(e)=>handleSearchChange(e.target.value)} />}
        
                  </div> */}
                  <div className="max-w-[94%] mx-auto overflow-auto">

                  <OrdersFilter filterChange={handleFilterChange} />
                  </div>



<div className='w-[98%] lg:w-[95%] mx-auto flex flex-col items-end gap-3 justify-center'>
            {orderItems.map((item,index)=>( 
             <SpecCard  key={index} number={index+1} item={item} anim={false} click={
                (item)=>{
                    setOrder(item) 
                    setActiveOrder(item._id)
                    setOrderNum(item?.product )
                    setOpen(false)
                  }
             }
             role="supervisor"
             /> 
          ))}
            </div>

          <PaginationDemo page={page} setPage={setPage} numberOfPages={orders?.paginationResult?.numberOfPages} />
   
      </DialogContent>
    </Dialog>
  )
}
