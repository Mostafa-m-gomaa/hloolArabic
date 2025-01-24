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
import { AlertDelete } from "./Alert"
import { updateUser } from "@/api/users"
import { useMutation , useQueryClient } from "@tanstack/react-query"
import Loader from "./Loader"
  
 
  
  export function UsersTable({users}) {
    // const theUsers = users || []

    const queryClient = useQueryClient()
    const mutation =useMutation ({
        mutationFn:({id , credentials})=>updateUser(id , credentials),
        onSuccess:(res)=>{
            queryClient.invalidateQueries({queryKey:["users"]})
        }
    })

    const setActive =(id , active)=>{
        const obj ={
            active : !active
        }

        mutation.mutate({id ,credentials : obj})

    }
    return (
      <div className="h-[75vh] overflow-y-auto">

      
      <Table className="w-[95%] mx-auto rtl">
        <TableHeader className="bg-gray-100">
          <TableRow className="capitalize text-[15px] lg:text-[20px] font-bold">
            <TableHead className="w-[24%]">name</TableHead>
            <TableHead className="w-[24%]">email</TableHead>
            <TableHead className="w-[24%]">role</TableHead>
            <TableHead className="w-[24%]">active</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((item ,index) => (
            <TableRow key={index} className="text-[14px] lg:text-[18px]">
              <TableCell className="w-[24%] border-r-2 border-gray-400 overflow-hidden" >{item.name} </TableCell>
              <TableCell className="w-[24%] border-r-2 border-gray-400 overflow-hidden" >{item.email}</TableCell>
              <TableCell className="w-[24%] border-r-2 border-gray-400 overflow-hidden" >{item.role}</TableCell>
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
    <AlertDelete id={item._id}/>
    <DropdownMenuItem><Link to={`/home/updateuser/${item._id}`}>تعديل</Link></DropdownMenuItem>
    <DropdownMenuItem onClick ={()=>setActive(item._id , item.active)}>{item.active ?"un activate":"activate"}</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu></TableCell>
             
            </TableRow>
          ))}
        </TableBody> 


      </Table>
      </div>
    )
  }
  