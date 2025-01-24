import Custom from '@/formik/CustomInput'
import React from 'react'
import { Formik ,Form, Field } from 'formik'
import { Button } from '@/components/ui/button'
import { useMutation ,useQuery,useQueryClient } from '@tanstack/react-query'

import {Loader2} from "lucide-react"
import toast from 'react-hot-toast' 
import { useNavigate, useParams } from 'react-router-dom'
import { getOneUser, updateUser } from '@/api/users'


const UpdateUser = () => {
    const param =useParams().id
    const queryClient = useQueryClient()
    const history = useNavigate()
   

    const {data , isLoading}=useQuery({
        queryKey:["users"],
        queryFn:()=>getOneUser(param) 
    })
 

console.log(data)
    const initialValues={
        name:data?.data.name,
        email:data?.data.email,
        role:data?.data.role
    }
    
    const mutation = useMutation({
        mutationKey:"users",
        mutationFn:({id ,values})=>updateUser(id ,values) ,
        onSuccess:(res)=>{
      
            if(res.errors){
                toast.error(res.errors[0].msg)
            }
            else{

                queryClient.invalidateQueries({queryKey:["users"]})
                toast.success("تم تعديل الموظف بنجاح")
                history("/home/users")
            }
        },
    })
    
    const onSubmit=(values)=>{
        if(values.email === initialValues.email){
            delete values.email
        }
      
        mutation.mutate({id:param ,values})
    }
  return (
    <div className='w-[100%] mx-auto flex flex-col gap-3'>
        <h1 className='py-12'>املأ البيانات الأتية لتعديل موظف</h1>
        <Formik initialValues={initialValues} onSubmit={onSubmit}  enableReinitialize>
            {({errors ,touched})=>    <Form className='flex flex-col gap-10 w-[80%] mx-auto py-7'>
                
                <Custom label="الاسم" name="name" err={errors.name}  />
                <Custom label="الايميل" name="email" err={errors.email} />
      
                <div>
        <Field as="select" name="role" className="w-full border-2 border-black rounded-lg p-2">
          <option value="">اختر الوظيفة</option>
          <option value="admin">مدير</option>
          <option value="manager">ادارة</option>
          <option value="sales">مندوب</option>
          <option value="supervisor">مشرف</option>
          <option value="validator">مطابق</option>
        </Field>
        {touched.role && errors.role && <div className="text-red-500">{errors.role}</div>}
      </div>
      <Button disabled={mutation.isPending} type="submit" >
{mutation.isPending ?<div className='flex items-center gap-2'> <Loader2 className="animate-spin" />Please wait</div> : "تعديل"}
    </Button>
            </Form>}
         
        </Formik>
    </div>
  )
}

export default UpdateUser