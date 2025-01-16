import React, { useEffect } from 'react'

import { getUsers } from '@/api/users'
import { useQuery ,useQueryClient  } from '@tanstack/react-query'
import Loader from '@/components/Loader'
import { UsersTable } from '@/components/UsersTable'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useState  } from 'react'
const Users = () => {
  const queryClient = useQueryClient()
  const {data : users , isLoading ,isFetching , isError , isPending} = useQuery(
    {
    queryKey:["users"],
    queryFn: getUsers

    });
  
  console.log(users)

// const usersItems =users?.data || []
const [usersItems , setUsersItems] = useState([])

useEffect(()=>{
if(users?.data){
  setUsersItems(users.data) }
} ,[users])

if (isLoading || isFetching) {
  return <Loader />;
}

if (isError) {
  return <div>Error loading users. Please try again later.</div>;
}
  
  return (
    <div className='w-[100%]  mx-auto flex flex-col gap-3'>
      <div className="flex w-[90%] mx-auto flex-row-reverse items-center py-4">
          <h1>الموظفين</h1>
          <Button > <Link to="/home/addUser"> اضافة موظف</Link> </Button>

      </div>
          {usersItems.length > 0  ?  <UsersTable users={usersItems} /> : <Loader />}
          
      </div>
  )
}

export default Users