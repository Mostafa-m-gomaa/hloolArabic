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
  
 
  
  export function ProductTable({products }) {
    const queryClient = useQueryClient()
    const mutation =useMutation ({
        mutationFn:({id , credentials})=>updateProduct(id , credentials),
        onSuccess:(res)=>{
            queryClient.invalidateQueries({queryKey:["products"]})
        }
    })

    const theProducts = products || []

    console.log(theProducts)

    const setActive =(id , active)=>{
        const obj ={
            active : !active
        }

        mutation.mutate({id ,credentials : obj})

    }
    return (
     <div className="h-[75vh] overflow-y-auto bg-white py-2">

     
      <Table className="w-[95%] mx-auto rtl">
        <TableHeader className="bg-gray-100">
          <TableRow className="capitalize text-[15px] lg:text-[20px] font-bold">
            <TableHead className="">الاسم</TableHead>
            <TableHead className="">الوصف</TableHead>
            <TableHead className="">السعر</TableHead>
            <TableHead className="">عمولة المشرف</TableHead>
            <TableHead className="">عمولة المندوب</TableHead>
            <TableHead className="">عمولة التوصيل</TableHead>
            <TableHead className="">الكمية</TableHead>
            <TableHead className="">نشط</TableHead>
          </TableRow>
          </TableHeader>
          {theProducts.length > 0 ?         <TableBody>

{theProducts?.map((item ,index) => (
  <TableRow key={index} className="text-[14px] lg:text-[18px]">
    <TableCell className="w-[24%] border-r-2 border-gray-400 overflow-hidden" >{item?.title} </TableCell>
    <TableCell className="w-[24%] border-r-2 border-gray-400 overflow-hidden" >{item?.desc}</TableCell>
    <TableCell className="w-[24%] border-r-2 border-gray-400 overflow-hidden" >{item?.price}</TableCell>
    <TableCell className="w-[24%] border-r-2 border-gray-400 overflow-hidden" >{item?.supervisorCommission}</TableCell>
    <TableCell className="w-[24%] border-r-2 border-gray-400 overflow-hidden" >{item?.salesManCommission}</TableCell>
    <TableCell className="w-[24%] border-r-2 border-gray-400 overflow-hidden" >{item?.deliveryCommission || "لا يوجد"}</TableCell>
    <TableCell className="w-[24%] border-r-2 border-gray-400 overflow-hidden" >{item?.quantity || "لا يوجد"}</TableCell>
    <TableCell className="max-w-[15%]  border-gray-400 overflow-hidden" >{item.active ? <div className="bg-green-700 text-white px-2">active </div> : <div className="bg-red-600 text-white px-2">un active </div>}</TableCell>
    <TableCell  >
      <DropdownMenu>
<DropdownMenuTrigger><Button className="flex justify-center gap-1 items-center font-bold text-[20px]">
<span>.</span>
<span>.</span>
<span>.</span>
</Button></DropdownMenuTrigger>
<DropdownMenuContent className="text-center peer">
{/* <DropdownMenuItem><AlertDelete/></DropdownMenuItem> */}
<AlertDeleteProduct id={item._id}/>
<DropdownMenuItem><Link to={`/home/updateproduct/${item._id}`}>تعديل</Link></DropdownMenuItem>
<DropdownMenuItem onClick ={()=>setActive(item._id , item.active)}>{item.active ?"un activate":"activate"}</DropdownMenuItem>
</DropdownMenuContent>
</DropdownMenu></TableCell>
   
  </TableRow>
))}
</TableBody>: <Loader />}
  
          

     
 

      </Table>
      </div>
    )
  }
  





