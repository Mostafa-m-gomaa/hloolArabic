import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
    import { Button } from "@/components/ui/button"
    import { Link } from "react-router-dom"
import { useMutation , useQueryClient } from "@tanstack/react-query"
import { AlertDeleteProduct } from "./AlertDeletePro"
import { updateProduct } from "@/api/products"
import Loader from "./Loader"
  
 
  
  export function ReportTable({reports}) {
    const queryClient = useQueryClient()
    const mutation =useMutation ({
        mutationFn:({id , credentials})=>updateProduct(id , credentials),
        onSuccess:(res)=>{
            queryClient.invalidateQueries({queryKey:["products"]})
        }
    })

    const reportsItems = reports || []

    const setActive =(id , active)=>{
        const obj ={
            active : !active
        }

        mutation.mutate({id ,credentials : obj})

    }



    const formatDate = (date) => {
        if (!date) return "N/A"; // Return a default value if the date is undefined
        const validDate = new Date(date);
      
        if (isNaN(validDate.getTime())) {
          return "Invalid Date"; // Return a fallback value if the date is invalid
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
     <div className="h-[75vh] overflow-y-auto">

     
      <Table className="w-[95%] mx-auto rtl">
        <TableHeader className="bg-gray-100">
          <TableRow className="capitalize text-[15px] lg:text-[20px] font-bold">
            <TableHead className="">تاريخ الانشاء</TableHead>
            <TableHead className="">تاريخ التعديل</TableHead>
            <TableHead className="">اسم المنشئ</TableHead>
            <TableHead className="">الوصف</TableHead>
            <TableHead className="">تكلفة الوقود</TableHead>

          </TableRow>
          </TableHeader>
          {reportsItems.length > 0 ?         <TableBody>

{reportsItems.map((item ,index) => (
  <TableRow key={index} className="text-[14px] lg:text-[18px]">
    <TableCell className="w-[24%] border-r-2 border-gray-400 overflow-hidden" >{formatDate(item.createdAt)} </TableCell>
    <TableCell className="w-[24%] border-r-2 border-gray-400 overflow-hidden" >{formatDate(item.updatedAt)} </TableCell>
    <TableCell className="w-[24%] border-r-2 border-gray-400 overflow-hidden" >{item?.creator.name}</TableCell>
    <TableCell className="w-[24%] border-r-2 border-gray-400 overflow-hidden" >{item?.description}</TableCell>
    <TableCell className="w-[24%] border-r-2 border-gray-400 overflow-hidden" >{item?.fuelCost}</TableCell>
  </TableRow>
))}
</TableBody>: <Loader />}
  
          

     
 

      </Table>
      </div>
    )
  }
  





