import Custom from '@/formik/CustomInput'
import React from 'react'
import { CreateUsersValidation, productValidation } from '@/validation/Validation'
import { Formik ,Form, Field } from 'formik'
import { Button } from '@/components/ui/button'
import { useMutation ,useQueryClient } from '@tanstack/react-query'

import {Loader2} from "lucide-react"
import toast from 'react-hot-toast' 
import { useNavigate } from 'react-router-dom'
import { createProduct } from '@/api/products'


const AddProduct = () => {
    const queryClient = useQueryClient()
    const history = useNavigate()

const initialValues={
    title:"",
    desc:"",
    ValidityPeriod:"",
    price:"",
    salesManCommission:"",
    supervisorCommission:"" ,
        deliveryCommission:""
}

const mutation = useMutation({
    mutationKey:"users",
    mutationFn:(values)=>createProduct(values) ,
    onSuccess:(res)=>{
        console.log(res)
        queryClient.invalidateQueries({queryKey:["users"]})
        toast.success("تم اضافة المنتج بنجاح")
        history("/home/products")
    },
})

const onSubmit=(values)=>{
  
    mutation.mutate(values)
}

  return (
    <div className='w-[100%] mx-auto flex flex-col gap-3'>
        <h1 className='py-12'>املأ البيانات الأتية لأضافة منتج</h1>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={productValidation} >
            {({errors ,touched})=>    <Form className='flex flex-col gap-10 w-[80%] mx-auto py-7'>
                
                <Custom label="العنوان" name="title" err={errors.title}  />
                <Custom label="الوصف" name="desc" err={errors.desc} />
                <Custom label="فترة الصلاحية" name="ValidityPeriod" err={errors.ValidityPeriod} />
                <Custom label="السعر" name="price" err={errors.price}  />
                <Custom label="عمولة البائع" name="salesManCommission" err={errors.salesManCommission}  />
                <Custom label="عمولة المشرف" name="supervisorCommission" err={errors.supervisorCommission}  />
                <Custom label="عمولة رجل التوصيل" name="deliveryCommission" err={errors.deliveryCommission}  />
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

export default AddProduct