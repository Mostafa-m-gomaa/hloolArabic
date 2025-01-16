import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
  import { Button } from "@/components/ui/button"
  import { Link } from "react-router-dom"
import { useMutation , useQueryClient } from "@tanstack/react-query"
import { AlertDeleteProduct } from "./AlertDeletePro"
import { updateProduct } from "@/api/products"



export function OrdersTable({orders}) {
  const theOrders = orders.data


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
    <Table className="w-[95%] mx-auto rtl">
      <TableHeader className="bg-gray-100">
        <TableRow className="capitalize text-[15px] lg:text-[20px] font-bold">
          <TableHead className="">المنتج</TableHead>
          <TableHead className="">سعر الطلبية</TableHead>
          <TableHead className="">البلد</TableHead>
          <TableHead className="">تاريخ الانشاء</TableHead>
          <TableHead className="">اسم العميل</TableHead>
          <TableHead className="">تاريخ التوصيل</TableHead>
          <TableHead className="">حالة التوصيل</TableHead>
          <TableHead className="">الدفعه المقدمة</TableHead>
          <TableHead className="">طريقة دفع الدفعه المقدمة</TableHead>
          <TableHead className="">ملاحظات</TableHead>
          <TableHead className="">الكمية</TableHead>
          <TableHead className="">اسم البائع</TableHead>
          <TableHead className="">تاريخ البيع</TableHead>
          <TableHead className="">المشرف</TableHead>
          <TableHead className="">تاريخ التحديث</TableHead>
          <TableHead className="">رقم الهاتف</TableHead>
        </TableRow>
        </TableHeader>
        <TableBody>
{theOrders && theOrders.map((item ,index) => (
  <TableRow key={index} className="text-[14px] lg:text-[18px]">
    <TableCell className=" border-r-2 border-gray-400 overflow-hidden" >{item.product} </TableCell>
    <TableCell className=" border-r-2 border-gray-400 overflow-hidden" >{item.orderPrice} </TableCell>
    <TableCell className=" border-r-2 border-gray-400 overflow-hidden" >{item.country}</TableCell>
    <TableCell className=" border-r-2 border-gray-400 overflow-hidden" >{formatDate(item.createdAt)}</TableCell>
    <TableCell className=" border-r-2 border-gray-400 overflow-hidden" >{item.customerName}</TableCell>
    <TableCell className=" border-r-2 border-gray-400 overflow-hidden" >{formatDate(item.deliveryDate)}</TableCell>
    <TableCell className=" border-r-2 border-gray-400 overflow-hidden" >{item.deliveryStatus}</TableCell>
    <TableCell className=" border-r-2 border-gray-400 overflow-hidden" >{item.deposit}</TableCell>
    <TableCell className=" border-r-2 border-gray-400 overflow-hidden" >{item.depositPaymentMethod}</TableCell>
    <TableCell className=" border-r-2 border-gray-400 overflow-hidden" >{item.notes}</TableCell>
    <TableCell className=" border-r-2 border-gray-400 overflow-hidden" >{item.quantity}</TableCell>
    <TableCell className=" border-r-2 border-gray-400 overflow-hidden" >{item.salesPerson}</TableCell>
    <TableCell className=" border-r-2 border-gray-400 overflow-hidden" >{item.sellingDate}</TableCell>
    <TableCell className=" border-r-2 border-gray-400 overflow-hidden" >{item.supervisor}</TableCell>
    <TableCell className=" border-r-2 border-gray-400 overflow-hidden" >{formatDate(item.updatedAt)}</TableCell>
    <TableCell className=" border-r-2 border-gray-400 overflow-hidden" >{item.phone}</TableCell>
  
   
  </TableRow>
))}
</TableBody>

   


    </Table>
  )
}



// <TableCell  >
// <DropdownMenu>
// <DropdownMenuTrigger><Button className="flex justify-center gap-1 items-center font-bold text-[20px]">
// <span>.</span>
// <span>.</span>
// <span>.</span>
// </Button></DropdownMenuTrigger>
// <DropdownMenuContent className="text-center peer">
// <DropdownMenuItem><AlertDelete/></DropdownMenuItem>
// <AlertDeleteProduct id={item._id}/>
// <DropdownMenuItem><Link to="/">تعديل</Link></DropdownMenuItem>
// <DropdownMenuItem onClick ={()=>setActive(item._id , item.active)}>{item.active ?"un activate":"activate"}</DropdownMenuItem>
// </DropdownMenuContent>
// </DropdownMenu></TableCell>


