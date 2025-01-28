import React from 'react'
import { Button } from './ui/button';
import { PopoverDemo } from './PopOver';
import manIcon from '../assets/man.png'
import womanIcon from '../assets/woman.png'
import { ShowPopOver } from './showCardPopOver';
import { useMutation } from '@tanstack/react-query';
import { updateUser } from '@/api/users';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertDelete } from './Alert';
import { Loader2, Pencil } from 'lucide-react';



const UserCard = ({number ,item}) => {
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
            
        <div
        data-aos="fade-right"
          className="w-[90%] mx-auto bg-white shadow-[0px_0px_15px_rgba(0,0,0,0.09)] py-2 px-4 space-y-3 relative overflow-hidden"
        >
          <div className="w-14 h-14 lg:w-20 lg:h-20 bg-myBlue rounded-full absolute -right-5 -top-7">
            <p className="absolute bottom-1 left-3  lg:bottom-4 lg:left-5 text-white text-[16px] lg:text-[20px]">{number < 10 ? `0${number}`: number}</p>
          </div>
   
   <div className="flex w-[95%] mx-auto justify-between flex-row-reverse  items-center">
    
    <img src={manIcon} alt=""  className='w-[50px] lg:w-[80px]'/>
    <div className="flex flex-col items-end gap-3 w-[70%]">
    <h2 className="font-bold text-[15px] lg:text-xl">{item?.name || "not-found"}</h2>
                  <div className="max-w-full flex flex-col lg:flex-row gap-2 text-[10px] lg:text-[15px] px-1 items-end lg:items-center *:min-w-fit  *:flex  *:items-center *:rounded-md  *:text-center  *:gap-2 *:flex-row-reverse  ">
                    <div><span>الايميل</span> : <span>{item.email}</span> </div>
                    <div><span>الدور</span> : <span>{item.role || ""}</span> </div>
                                  <div className="max-w-[15%]  border-gray-400 overflow-hidden" >{item.active ? <div className="bg-green-700 text-white px-2">active </div> : <div className="bg-red-600 text-white px-2">un active </div>}</div>
       

                  </div>
    </div>
    <div className="flex flex-col lg:flex-row items-center gap-2">
<Button  className=" p-1 h-fit lg:px-4 lg:py-2" ><Link to={`/home/updateuser/${item._id}`}><Pencil /></Link></Button>
<AlertDelete id={item._id}/>
<Button  className="p-1 h-fit text-[10px] lg:text-[14px] lg:px-4 lg:py-2" onClick ={()=>setActive(item._id , item.active)}>   {item.active ? " تعطيل " : "تنشيط"} {mutation.isPending ? <Loader2 className="animate-spin"/>:null}</Button>
   </div>
   </div>
         
    </div>
        
          )
      }


export default UserCard