import React, { useEffect } from 'react'
import logo from '../assets/loginlogo.png'
import { Form, Formik } from 'formik'
import Custom from '../formik/CustomInput'
import { LoginValidation } from '@/validation/Validation'
import { login } from '@/api/users'
import { useQueryClient , useMutation} from '@tanstack/react-query'
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Login = () => {

  const history = useNavigate()
  const queryClient = useQueryClient()

  const initialValues={
    email:"",
    password:""

  }
  const mutation = useMutation({
    mutationFn: (credentials) => login(credentials),
    onSuccess: (res) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    
      if(res.status === "fail"){

        toast.error(res.message)
      }
      else if(res.status === "success"){
        toast.success(`Welcome back ${res.user.name}`)
        localStorage.setItem("token", res.token)  
        localStorage.setItem("name", res.user.name)  
        localStorage.setItem("role", res.user.role)  
        localStorage.setItem("email", res.user.email)  
        localStorage.setItem("id", res.user._id)  
        if(res.user.role === "admin" || res.user.role === "manager" || res.user.role === "validator"){
          history("/home")
        }
        else if(res.user.role === "sales" || res.user.role === "supervisor" ){
          history("/home/salesHome")
        }
  
      }
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  
  });
  
  const onSubmit=values=>mutation.mutate(values);



  useEffect(()=>{
const token = localStorage.getItem("token")
const role = localStorage.getItem("role")
if(token){
  if(role === "admin" || role === "manager" || role === "validator"){
    history("/home")
  }
  else if(role === "sales" || role === "supervisor" ){
    history("/home/salesHome")
  }
}
  },[])
  return (


<section className="relative flex flex-wrap lg:h-screen lg:items-center ">
  <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24 flex flex-col gap-8">
    <div className="mx-auto w-full text-center ">
      <h1 className="text-2xl font-bold sm:text-3xl">تسجيل الدخول</h1>
    </div>

    <Formik validationSchema={LoginValidation} initialValues={initialValues} onSubmit={onSubmit}>
      {({errors})=>(

      <Form className='flex flex-col gap-8'>
       
        <Custom name="email" err={errors.email} label="الايميل" />
        <Custom name="password" err={errors.password} label="كلمة السر" />
      
      <Button disabled={mutation.isPending} type="submit" >
{mutation.isPending ?<div className='flex items-center gap-2'> <Loader2 className="animate-spin" />Please wait</div> : "تسجيل الدخول"}
    </Button>
      </Form>
      )}
    </Formik>


  </div>

  <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
    <img
      alt=""
      src={logo}
      className="absolute inset-0 h-full w-full object-cover"
    />
  </div>
</section>
  )
}

export default Login