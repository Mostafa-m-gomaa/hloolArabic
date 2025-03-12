import Custom from '@/formik/CustomInput'
import React from 'react'
import { CreateUsersValidation, productValidation } from '@/validation/Validation'
import { Formik ,Form, Field, FieldArray } from 'formik'
import { Button } from '@/components/ui/button'
import { useMutation ,useQueryClient } from '@tanstack/react-query'

import {Loader2} from "lucide-react"
import toast from 'react-hot-toast' 
import { useNavigate } from 'react-router-dom'
import { createProduct } from '@/api/products'
import { createTarget } from '@/api/targets'


const AddTarget = () => {
    const queryClient = useQueryClient()
    const history = useNavigate()
    const targetObj ={
        orderNumbers :"",
        reward : ""
    }

const initialValues={
    title:"",
    description:"",
    validAt:"",
    targets : [targetObj]
}

const mutation = useMutation({
    mutationKey:"users",
    mutationFn:(values)=>createTarget(values) ,
    onSuccess:(res)=>{
        if(res.status === "success"){
         
       
            queryClient.invalidateQueries({queryKey:["targets"]})
            toast.success("تم اضافة الهدف بنجاح بنجاح")
            history("/home/targets")
        }
        else{
            toast.error("حدث خطأ ما")
        }
    },
})

const onSubmit=(values)=>{
    mutation.mutate(values)

}

  return (
    <div className='w-[100%] mx-auto flex flex-col gap-3'>
        <h1 className='py-12'>املأ البيانات الأتية لأضافة هدف</h1>
        <Formik initialValues={initialValues} onSubmit={onSubmit} >
            {({errors ,touched , values})=>    <Form className='flex flex-col gap-10 w-[80%] mx-auto py-7'>
                
                <Custom label="العنوان" name="title" err={errors.title}  />
                <Custom label="الوصف" name="description" err={errors.description} />
                <Custom label="تاريخ تفعيل الهدف" name="validAt" err={errors.validAt} />
                <FieldArray name="targets"> 
{({push,remove})=>(
    <div className="flex flex-col gap-8">
        {values.targets.map((tar,i)=>(
            <div className="flex  gap-3">
                <Custom label="عددالطلبات" name={`targets.${i}.orderNumbers`} err={errors.targets?.[i]?.orderNumbers}  />
                <Custom label="المكافأة" name={`targets.${i}.reward`} err={errors.targets?.[i]?.reward}  />
                <Button type="button" onClick={()=>remove(i)} >حذف</Button>
            </div>
        ))}
        <Button  className="w-fit my-4" type="button" onClick={()=>push(targetObj)} >اضافة هدف</Button>
    </div>
)}
                    </FieldArray>
            
                <div>
     

      </div>
      <Button disabled={mutation.isPending} type="submit" >
{mutation.isPending ?<div className='flex items-center gap-2'> <Loader2 className="animate-spin" />Please wait</div> : "اضافة"}
    </Button>
            </Form>}
         
        </Formik>
    </div>
  )
}

export default AddTarget