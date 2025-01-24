import Custom from '@/formik/CustomInput'
import React ,{useState} from 'react'
import { CreateUsersValidation, productValidation } from '@/validation/Validation'
import { Formik ,Form, Field } from 'formik'
import { Button } from '@/components/ui/button'
import { useMutation ,useQuery,useQueryClient } from '@tanstack/react-query'

import {Loader2} from "lucide-react"
import toast from 'react-hot-toast' 
import { useNavigate, useParams } from 'react-router-dom'
import { createProduct, getOneProduct, updateProduct } from '@/api/products'


const UpdateProduct = () => {
    const param =useParams().id
    const [title,setTitle]=useState("")
    const queryClient = useQueryClient()
    const history = useNavigate()

    const {data , isLoading}=useQuery({
        queryKey:["products"],
        queryFn:()=>getOneProduct(param) 
    })
 

const initialValues={
    title:data?.data.title,
    desc:data?.data.desc,
    ValidityPeriod:data?.data.ValidityPeriod,
    price:data?.data.price,
    salesManCommission:data?.data.ValidityPeriod,
    supervisorCommission:data?.data.ValidityPeriod
}



const mutation = useMutation({
    mutationKey:"products",
    mutationFn:({id ,values})=>updateProduct(id,values) ,
    onSuccess:(res)=>{
        console.log(res)
        if(res.status !== "error"){

            queryClient.invalidateQueries({queryKey:["products"]})
            toast.success("تم تعديل المنتج بنجاح")
            history("/home/products")
        }
        else{

            toast.error("هناك خطأ")
        }

    },
})

const onSubmit=(values)=>{
  
    mutation.mutate({id:param ,values})
}

  return (
    <div className='w-[100%] mx-auto flex flex-col gap-3'>
        <h1 className='py-12'>املأ البيانات التي تريد تعديلها</h1>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={productValidation} enableReinitialize>
            {({errors ,touched})=>    <Form className='flex flex-col gap-10 w-[80%] mx-auto py-7'>
                
                <Custom label="العنوان" name="title" err={errors.title}  />
                <Custom label="الوصف" name="desc" err={errors.desc} />
                <Custom label="فترة الصلاحية" name="ValidityPeriod" err={errors.ValidityPeriod} />
                <Custom label="السعر" name="price" err={errors.price}  />
                <Custom label="عمولة البائع" name="salesManCommission" err={errors.salesManCommission}  />
                <Custom label="عمولة المشرف" name="supervisorCommission" err={errors.supervisorCommission}  />
                <div>
     

      </div>
      <Button disabled={mutation.isPending} type="submit" >
{mutation.isPending ?<div className='flex items-center gap-2'> <Loader2 className="animate-spin" />Please wait</div> : "تعديل"}
    </Button>
            </Form>}
         
        </Formik>
    </div>
  )
}

export default UpdateProduct