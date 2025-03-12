import Custom from '@/formik/CustomInput'
import React from 'react'
import { CreateUsersValidation } from '@/validation/Validation'
import { Formik ,Form, Field, ErrorMessage } from 'formik'
import { Button } from '@/components/ui/button'
import { useMutation ,useQueryClient } from '@tanstack/react-query'
import {CretaUser} from '@/api/users'
import {Loader2} from "lucide-react"
import toast from 'react-hot-toast' 
import { useNavigate } from 'react-router-dom'


const AddUser = () => {
    const queryClient = useQueryClient()
    const history = useNavigate()

const initialValues={
    name:"",
    email:"",
    password:"",
    passwordConfirm:"",
    role:""
}

const mutation = useMutation({
    mutationKey:"users",
    mutationFn:(values)=>CretaUser(values) ,
    onSuccess:(res)=>{
 
        queryClient.invalidateQueries({queryKey:["users"]})
        toast.success("تم اضافة الموظف بنجاح")
        history("/home/users")
    },
})

const onSubmit=(values)=>{
  
    mutation.mutate(values)
}

  return (
    <div className='w-[100%] mx-auto flex flex-col gap-3'>
        <h1 className='py-12'>املأ البيانات الأتية لأضافة موظف</h1>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={CreateUsersValidation} >
            {({errors ,touched})=>    <Form className='flex flex-col gap-10 w-[80%] mx-auto py-7'>
                
                <Custom label="الاسم" name="name" err={errors.name}  />
                <Custom label="الايميل" name="email" err={errors.email} />
                <Custom label="كلمة السر" name="password" err={errors.password} />
                <Custom label="تاكيد كلمة السر" name="passwordConfirm" err={errors.passwordConfirm}  />
                <div>
        <Field as="select" name="role" className="w-full border-2 border-black rounded-lg p-2">
          <option value="">اختر الوظيفة</option>
          <option value="admin">مدير</option>
          <option value="manager">ادارة</option>
          <option value="sales">مندوب</option>
          <option value="supervisor">مشرف</option>
          <option value="validator">مطابق</option>
        </Field>
        <ErrorMessage name='role'  component="div" className="text-red-500"  />
        {/* {touched.role && errors.role && <div className="text-red-500">{errors.role}</div>} */}
      </div>
      <Button disabled={mutation.isPending} type="submit" >
{mutation.isPending ?<div className='flex items-center gap-2'> <Loader2 className="animate-spin" />Please wait</div> : "اضافة"}
    </Button>
            </Form>}
         
        </Formik>
    </div>
  )
}

export default AddUser