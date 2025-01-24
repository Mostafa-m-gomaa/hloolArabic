import React, { useEffect } from 'react'

import { getUsers } from '@/api/users'
import { useQuery ,useQueryClient  } from '@tanstack/react-query'
import Loader from '@/components/Loader'
import { UsersTable } from '@/components/UsersTable'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useState  } from 'react'
import { ComboboxOrders } from '@/components/CompoBoxForOrders'
import { Input } from "@/components/ui/input"
import { toast } from 'react-hot-toast'
import { PaginationDemo } from '@/components/Pagination'
import { set } from 'date-fns'
const Users = () => {
  const [usersItems , setUsersItems] = useState([])
  const [searchParam , setSearchParam] = useState("")
  const queryClient = useQueryClient()
  const [searchObject , setSearchObject] = useState({})
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const {data : users , isLoading  , isError } = useQuery(
    {
    queryKey:["users" ,searchObject ,page ],
    queryFn: ({queryKey})=>{
const param = queryKey[1] || []
const page = queryKey[2] 
return getUsers(param ,page)
    }
    });


 const onSearchChange = (value) => {
  if(searchParam === ""){
    toast.error("اختر الفلتر اولا")
  }
  setSearchObject({[searchParam]:value})
 }


useEffect(()=>{
  queryClient.invalidateQueries({queryKey:["users"]})
if(users?.data){
  setUsersItems(users.data)
  setNumberOfPages(users.paginationResult.numberOfPages)  
  setPage(users.paginationResult.currentPage)

 }
} ,[users ,page])



if (isError) {
  return <div>Error loading users. Please try again later.</div>;
}
  
  return (
    <div className='w-[100%]  mx-auto flex flex-col gap-3'>
      <div className="flex w-[90%] mx-auto flex-col lg:flex-row-reverse justify-between items-center py-4 gap-8">
          <h1 className=''>الموظفين</h1>
          <div className="flex w-full lg:w-[50%] gap-4">

          <ComboboxOrders  setParam={setSearchParam} forWhat="users"/>
           <Input type="text" placeholder="اكتب هنا"  onChange={(e)=>onSearchChange(e.target.value)} />
          </div>
          <Button > <Link to="/home/addUser"> اضافة موظف</Link> </Button>

      </div>
          {usersItems.length > 0 || !isLoading ?  <UsersTable users={usersItems} /> : <Loader />}
          <PaginationDemo  currentPage ={page} numberOfPages={numberOfPages} setPage={setPage}/>

        
          
      </div>
  )
}

export default Users