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
import { getMyOrders } from "@/api/orders"
import { useQuery } from "@tanstack/react-query"
import { ComboboxDemo } from "@/components/CompoBox"
import { DatePickerDemo } from "@/components/DatePicker"
import { PaginationDemo } from "@/components/Pagination"
import Card from "./Card"
import { set } from "date-fns"
import SpecCard from "./SpecCard"


export function DialogDemo({setOrder}) {

    
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


    const [page, setPage] = useState(1);
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
    
    
    
    const { data: orders, isLoading, isFetching, isError } = useQuery({
      queryKey: [
        "orders",
        queryObj,
        page
      ],
      queryFn: ({ queryKey }) => {
        const params = queryKey[1] || {};
        const page = queryKey[2] ;
        return getMyOrders(params , page); // Pass the entire object
      },
    });
    
    if (isError) {
      return <div>Internet Error</div>;
    }
      
    
    const orderItems = orders?.data || []


  return (
    <Dialog  open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button >{orderNum === "" ? "اختر الطلب" : orderNum}</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[70%] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>الطلبات الخاصة بك</DialogTitle>
 
        </DialogHeader>
             <div className="flex  w-[70%]">
        
                 <ComboboxDemo setVar={setTheVariable} />
                 {theVariable === "createdAt" || theVariable === "deliveryDate" || theVariable === "sellingDate" ? <DatePickerDemo searchFunc={handleSearchChange} /> :   <Input type="text" placeholder="اكتب هنا" onChange={(e)=>handleSearchChange(e.target.value)} />}
        
                  </div>
        {/* <div className="flex flex-wrap justify-center gap-3  max-w-[95%] mx-auto">

                  {orderItems.map((order, i) => (
                      <div onClick={()=>{
                        setOrder(order) 
                        setActiveOrder(order._id)
                        setOrderNum(order?.product )
                      }} className={`flex flex-col border-2 w-[48%] rounded-lg p-2 border-myBlue cursor-pointer transition-all hover:bg-myBlue hover:text-white *:flex *:gap-2 ${order._id === activeOrder ? "bg-myBlue text-white" : ""} `} key={i}>
                          <div><span>المنتج</span> : <span>{order?.product}</span></div>
                          <div><span>العميل</span> : <span>{order?.customerName || "N/A"}</span></div>
                          <div>{order?.phone || "N/A"}</div>
                          <div><span>المندوب</span> : <span>{order?.salesPerson?.name || "N/A"}</span></div>
                          <div><span>حالة الطلب </span> : <span>{order?.deliveryStatus || "N/A"}</span></div>
                          <div><span>تاريخ التوصيل</span> : <span>{formatDate(order?.deliveryDate)}</span></div>
                          
                      </div>
                  ))}
        </div> */}

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
