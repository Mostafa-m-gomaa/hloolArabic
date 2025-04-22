// import Custom from '@/formik/CustomInput'
// import React from 'react'
// import { addOrderValidation, CreateUsersValidation } from '@/validation/Validation'
// import { Formik ,Form, Field, FieldArray } from 'formik'
// import { Button } from '@/components/ui/button'
// import { useMutation ,useQueryClient , useQuery } from '@tanstack/react-query'
// import {CretaUser, getSuperVisors} from '@/api/users'
// import {Loader2} from "lucide-react"
// import toast from 'react-hot-toast' 
// import { useNavigate } from 'react-router-dom'
// import { getAvailableProducts, getProducts } from '@/api/products'
// import { createOrder } from '@/api/orders'



// const AddOrder = () => {
//     const queryClient = useQueryClient()
//     const history = useNavigate()

//     const {data :superVisors} = useQuery({
//         queryKey:["users"],
//         queryFn:getSuperVisors
//     })
//     const superVisorsItems = superVisors?.data || []



//     const {data : products} = useQuery({
//         queryKey:["products"],
//         queryFn:getAvailableProducts
//     })
//     const productsItems = products?.data || []

//     const customer ={customerName:"",
//       gender:"",
//       birthDate:"",
//       phone:""
//      }

// const initialValues={
//   customersData:[customer],
//     customerName:"",
//     receipt:"",
//     gender:"",
//     supervisor:"",
//     birthDate:"",
//     sellingDate:"",
//     phone:"",
//     country:"",
//     city:"",
//     product:"",
//     quantity:"",
//     deposit:"",
//     depositPaymentMethod:"",
//     deliveryDate:"",
//     restMoneyPaymentMethod:"",
//     notes:"",
//     deliveryMan:"",

// }

// const mutation = useMutation({
//     mutationFn:(values)=>createOrder(values) ,
//     onSuccess:(res)=>{
     
//         queryClient.invalidateQueries({queryKey:["orders"]})
//         toast.success("تم اضافة الطلب  بنجاح")
//         history("/home/myorders")
//     },
//     onError:(err)=>{
//         console.log(err)
//     }
// })

// const onSubmit=(values)=>{
//     mutation.mutate(values)
// }

//   return (
//     <div className='w-[100%] mx-auto flex flex-col gap-3'>
//         <h1 className='py-12'>املأ البيانات الأتية لأضافة طلب</h1>
//         <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={addOrderValidation} >
//             {({errors ,touched , values, setFieldValue})=>    <Form className='flex flex-col gap-10 w-[80%] mx-auto py-7'>
//             {/* <Custom label="الكمية" name="quantity" err={errors.quantity}  /> */}
//             <Field as="select" name="quantity" className="w-full border-2 border-black rounded-lg p-2">
//           <option value="">الكمية</option>
//           <option value="1">1</option>
//           <option value="2">2</option>
//         </Field>
//         {touched.quantity && errors.quantity && <div className="text-red-500">{errors.quantity}</div>}
//         <FieldArray name="customersData">
//           {() =>(
//             <div className="flex">
//               {values.customersData?.map((_ , i)=>(
//                 <div className="flex flex-col gap-8 w-full" key={i}>
//                 <Custom label="اسم العميل" name={`customersData[${i}].customerName`} />
//                 <Custom label="تاريخ الميلاد" name={`customersData[${i}].birthDate`} />
//                 <Custom label="رقم الهاتف" name={`customersData[${i}].phone`}   />
//                 <Field as="select" name={`customersData[${i}].gender`} className="w-full border-2 border-black rounded-lg p-2">
//           <option value="">اختر الجنس</option>
//           <option value="ذكر">ذكر</option>
//           <option value="أنثي">أنثي</option>
    
//         </Field>
//                 </div>
//               ))}
//             </div>
//           )}
//         </FieldArray>

//                 {/* <Custom label="اسم العميل" name="customerName" err={errors.customerName}  />
//                 <Custom label="تاريخ الميلاد" name="birthDate" err={errors.birthDate} />
//                 <Custom label="رقم الهاتف" name="phone" err={errors.phone}  />
//         <Field as="select" name="gender" className="w-full border-2 border-black rounded-lg p-2">
//           <option value="">اختر الجنس</option>
//           <option value="ذكر">ذكر</option>
//           <option value="أنثي">أنثي</option>
    
//         </Field>
//         {touched.gender && errors.gender && <div className="text-red-500">{errors.gender}</div>} */}
//                 <Custom label="رقم السند" name="receipt" err={errors.receipt} />
//                 <Custom label="تاريخ البيع" name="sellingDate" err={errors.sellingDate}  />
//                 <Custom label="تاريخ التسليم" name="deliveryDate" err={errors.deliveryDate}  />
//                 <Custom label="المنطقة" name="country" err={errors.country}  />
//                 <Custom label="المدينة" name="city" err={errors.city}  />
//                 <Custom label="مبلغ العربون" name="deposit" err={errors.deposit}  />
           
//                 <Custom label="ملاحظات" name="notes" err={errors.notes}  />
//                 <div className="flex flex-col gap-4">

//         <Field as="select" name="supervisor" className="w-full border-2 border-black rounded-lg p-2">
//           <option value="">اختر المشرف</option>

//           {superVisorsItems.map((item , index)=><option value={item._id}>{item.name}</option> )}

//         </Field>
//         <Field as="select" name="deliveryMan" className="w-full border-2 border-black rounded-lg p-2 mb-6">
//           <option value="">اختر رجل التوصيل</option>

//           {superVisorsItems.map((item , index)=><option value={item._id}>{item.name}</option> )}

//         </Field>
//         {touched.deliveryMan && errors.deliveryMan && <div className="text-red-500">{errors.deliveryMan}</div>}
//         <Field as="select" name="product" className="w-full border-2 border-black rounded-lg p-2">
//           <option value="">اختر المنتج</option>
//           {productsItems.map((item , index)=><option value={item._id}>{item.title}</option> )}
         
//         </Field>
//         {touched.product && errors.product && <div className="text-red-500">{errors.product}</div>}
//         <Field as="select" name="depositPaymentMethod" className="w-full border-2 border-black rounded-lg p-2">
//           <option value="">طريقة دفع مبلغ العربون</option>
//           <option value="كاش">كاش</option>
//           <option value="تحويل بنك أهلي">تحويل بنك أهلي</option>
//           <option value="تحويل بنك راجحي">تحويل بنك راجحي</option>
//           <option value="supervisor">رقمي</option>
//         </Field>
//         {touched.depositPaymentMethod && errors.depositPaymentMethod && <div className="text-red-500">{errors.depositPaymentMethod}</div>}
//         <Field as="select" name="restMoneyPaymentMethod" className="w-full border-2 border-black rounded-lg p-2">
//           <option value="">طريقة دفع باقي المبلغ</option>
//           <option value="كاش">كاش</option>
//           <option value="تحويل بنك أهلي">تحويل بنك أهلي</option>
//           <option value="تحويل بنك راجحي">تحويل بنك راجحي</option>
//           <option value="supervisor">رقمي</option>
//         </Field>
//         {touched.restMoneyPaymentMethod && errors.restMoneyPaymentMethod && <div className="text-red-500">{errors.restMoneyPaymentMethod}</div>}
    
//       </div>



//       <Button disabled={mutation.isPending} type="submit" >
// {mutation.isPending ?<div className='flex items-center gap-2'> <Loader2 className="animate-spin" />Please wait</div> : "اضافة"}
//     </Button>
//             </Form>}
         
//         </Formik>
//     </div>
//   )
// }

// export default AddOrder





import Custom from '@/formik/CustomInput'
import React, { useState, useEffect } from 'react'
import { addOrderValidation } from '@/validation/Validation'
import { Formik, Form, Field, FieldArray } from 'formik'
import { Button } from '@/components/ui/button'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { createOrder } from '@/api/orders'
import { getSuperVisors } from '@/api/users'
import { getAvailableProducts } from '@/api/products'
import { Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const AddOrder = () => {
  const queryClient = useQueryClient()
  const history = useNavigate()

  const { data: superVisors } = useQuery({
    queryKey: ['users'],
    queryFn: getSuperVisors
  })
  const superVisorsItems = superVisors?.data || []

  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: getAvailableProducts
  })

  const productsItems = products?.data || []
  const [productQuantity, setProductQuantity] = useState(1)

  const customer = {
    customerName: '',
    gender: '',
    birthDate: '',
    phone: ''
  }

  const initialValues = {
    customersData: [customer],
    receipt: '',
    supervisor: '',
    sellingDate: '',
    country: '',
    city: '',
    product: '',
    deposit: '',
    depositPaymentMethod: '',
    deliveryDate: '',
    notes: ''
  }

  const mutation = useMutation({
    mutationFn: (values) => createOrder(values),
    onSuccess: (res) => {
     
      if(res.status === "success"){

        queryClient.invalidateQueries({ queryKey: ['orders'] })
        toast.success('تم اضافة الطلب  بنجاح')
        history('/home/myorders')
      }
    },
    onError: (err) => {
      console.log(err)
    }
  })

  const onSubmit = (values) => {
    mutation.mutate(values)
   
  }

  return (
    <div className='w-[100%] mx-auto flex flex-col gap-3'>
      <h1 className='py-12'>املأ البيانات الأتية لأضافة طلب</h1>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={addOrderValidation}>
        {({ errors, touched, values, setFieldValue }) => {
          useEffect(() => {
            const qty = productQuantity
            const currentLength = values.customersData.length

            if (qty > currentLength) {
              const additionalCustomers = Array.from({ length: qty - currentLength }, () => ({
                customerName: '',
                gender: '',
                birthDate: '',
                phone: ''
              }))
              setFieldValue('customersData', [...values.customersData, ...additionalCustomers])
            } else if (qty < currentLength) {
              setFieldValue('customersData', values.customersData.slice(0, qty))
            }
          }, [productQuantity, setFieldValue, values.customersData])

          return (
            <Form className='flex flex-col gap-10 w-[80%] mx-auto py-7'>
              <Field
                as='select'
                name='product'
                className='w-full border-2 border-black rounded-lg p-2'
                onChange={(e) => {
                  const selectedOption = e.target.options[e.target.selectedIndex]
                  const quantity = selectedOption.getAttribute('data-sayed') || 1
                  setProductQuantity(Number(quantity))
                  setFieldValue('product', e.target.value)
                }}
              >
                <option value=''>اختر المنتج</option>
                {productsItems.map((item) => (
                  <option data-sayed={item?.quantity} key={item._id} value={item._id}>
                    {item.title}
                  </option>
                ))}
              </Field>
              {touched.product && errors.product && <div className='text-red-500'>{errors.product}</div>}

              <FieldArray name='customersData'>
                {() => (
                  <div className='flex flex-col gap-10'>
                    {values.customersData.map((_, i) => (
                      <div className='flex flex-col gap-8 w-full' key={i}>
                        <Custom label='اسم العميل' name={`customersData[${i}].customerName`} />
                        <Custom label='تاريخ الميلاد' name={`customersData[${i}].birthDate`} />
                        <Custom label='رقم الهاتف' name={`customersData[${i}].phone`} />
                        <Field as='select' name={`customersData[${i}].gender`} className='w-full border-2 border-black rounded-lg p-2'>
                          <option value=''>اختر الجنس</option>
                          <option value='ذكر'>ذكر</option>
                          <option value='أنثي'>أنثي</option>
                        </Field>
                      </div>
                    ))}
                  </div>
                )}
              </FieldArray>

              <Custom label='رقم السند' name='receipt' err={errors.receipt} />
              <Custom label='تاريخ البيع' name='sellingDate' err={errors.sellingDate} />
              <Custom label='تاريخ التسليم المتوقع' name='deliveryDate' err={errors.deliveryDate} />
              <Custom label='المنطقة' name='country' err={errors.country} />
              <Custom label='المدينة' name='city' err={errors.city} />
              <Custom label='مبلغ العربون' name='deposit' err={errors.deposit} />

              <div className='flex flex-col gap-4'>
                <Field as='select' name='supervisor' className='w-full border-2 border-black rounded-lg p-2'>
                  <option value=''>اختر المشرف</option>
                  {superVisorsItems.map((item) => (
                    <option key={item._id} value={item._id}>{item.name}</option>
                  ))}
                </Field>

                <Field as='select' name='depositPaymentMethod' className='w-full border-2 border-black rounded-lg p-2'>
                  <option value=''>طريقة دفع مبلغ العربون</option>
                  <option value='كاش'>كاش</option>
                  <option value='تحويل بنك أهلي'>تحويل بنك أهلي</option>
                  <option value='تحويل بنك راجحي'>تحويل بنك راجحي</option>
                  <option value='supervisor'>رقمي</option>
                </Field>
                {touched.depositPaymentMethod && errors.depositPaymentMethod && <div className='text-red-500'>{errors.depositPaymentMethod}</div>}
              </div>

              <Custom label='ملاحظات' name='notes' err={errors.notes} />

              <Button disabled={mutation.isPending} type='submit'>
                {mutation.isPending ? (
                  <div className='flex items-center gap-2'>
                    <Loader2 className='animate-spin' />Please wait
                  </div>
                ) : (
                  'اضافة'
                )}
              </Button>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default AddOrder



// import Custom from '@/formik/CustomInput'
// import React, { useState } from 'react'
// import { addOrderValidation } from '@/validation/Validation'
// import { Formik, Form, Field, FieldArray } from 'formik'
// import { Button } from '@/components/ui/button'
// import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
// import { createOrder } from '@/api/orders'
// import { getSuperVisors } from '@/api/users'
// import { getAvailableProducts } from '@/api/products'
// import { Loader2 } from 'lucide-react'
// import toast from 'react-hot-toast'
// import { useNavigate } from 'react-router-dom'

// const AddOrder = () => {
//   const queryClient = useQueryClient()
//   const history = useNavigate()

//   const { data: superVisors } = useQuery({
//     queryKey: ['users'],
//     queryFn: getSuperVisors
//   })
//   const superVisorsItems = superVisors?.data || []

//   const { data: products } = useQuery({
//     queryKey: ['products'],
//     queryFn: getAvailableProducts
//   })
 
//   const productsItems = products?.data || []
//   console.log(productsItems)
// const [productQuantity,setProductQuantity]=useState(1)

//   const customer = {
//     customerName: '',
//     gender: '',
//     birthDate: '',
//     phone: ''
//   }

//   const initialValues = {
//     customersData: [customer],
//     receipt: '',
//     supervisor: '',
//     sellingDate: '',
//     country: '',
//     city: '',
//     product: '',
//     deposit: '',
//     depositPaymentMethod: '',
//     deliveryDate: '',
//     notes: '',

//   }

//   const mutation = useMutation({
//     mutationFn: (values) => createOrder(values),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['orders'] })
//       toast.success('تم اضافة الطلب  بنجاح')
//       history('/home/myorders')
//     },
//     onError: (err) => {
//       console.log(err)
//     }
//   })

//   const onSubmit = (values) => {
//     // mutation.mutate(values)
//     console.log(values)
//   }

//   return (
//     <div className='w-[100%] mx-auto flex flex-col gap-3'>
//       <h1 className='py-12'>املأ البيانات الأتية لأضافة طلب</h1>
//       <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={addOrderValidation}>
//         {({ errors, touched, values, setFieldValue }) => {
//           React.useEffect(() => {
//             const qty = productQuantity
//             const currentLength = values.customersData.length

//             if (qty > currentLength) {
//               const additionalCustomers = Array.from({ length: qty - currentLength }, () => ({
//                 customerName: '',
//                 gender: '',
//                 birthDate: '',
//                 phone: ''
//               }))
//               setFieldValue('customersData', [...values.customersData, ...additionalCustomers])
//             } else if (qty < currentLength) {
//               setFieldValue('customersData', values.customersData.slice(0, qty))
//             }
//           }, [setFieldValue, values.customersData])

//           return (
//             <Form className='flex flex-col gap-10 w-[80%] mx-auto py-7'>
     
//      <Field as='select' name='product' className='w-full border-2 border-black rounded-lg p-2'>
//                   <option value=''>اختر المنتج</option>
//                   {productsItems.map((item) => (
//                     <option data-sayed={item?.quantity}  key={item._id} value={item._id}>{item.title}</option>
//                   ))}
//                 </Field>
//                 {touched.product && errors.product && <div className='text-red-500'>{errors.product}</div>}
//               <FieldArray name='customersData'>
//                 {() => (
//                   <div className='flex flex-col gap-10'>
//                     {values.customersData.map((_, i) => (
//                       <div className='flex flex-col gap-8 w-full' key={i}>
//                         <Custom label='اسم العميل' name={`customersData[${i}].customerName`} />
//                         <Custom label='تاريخ الميلاد' name={`customersData[${i}].birthDate`} />
//                         <Custom label='رقم الهاتف' name={`customersData[${i}].phone`} />
//                         <Field as='select' name={`customersData[${i}].gender`} className='w-full border-2 border-black rounded-lg p-2'>
//                           <option value=''>اختر الجنس</option>
//                           <option value='ذكر'>ذكر</option>
//                           <option value='أنثي'>أنثي</option>
//                         </Field>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </FieldArray>

//               <Custom label='رقم السند' name='receipt' err={errors.receipt} />
//               <Custom label='تاريخ البيع' name='sellingDate' err={errors.sellingDate} />
//               <Custom label='تاريخ التسليم المتوقع' name='deliveryDate' err={errors.deliveryDate} />
//               <Custom label='المنطقة' name='country' err={errors.country} />
//               <Custom label='المدينة' name='city' err={errors.city} />
//               <Custom label='مبلغ العربون' name='deposit' err={errors.deposit} />

//               <div className='flex flex-col gap-4'>
//                 <Field as='select' name='supervisor' className='w-full border-2 border-black rounded-lg p-2'>
//                   <option value=''>اختر المشرف</option>
//                   {superVisorsItems.map((item) => (
//                     <option key={item._id} value={item._id}>{item.name}</option>
//                   ))}
//                 </Field>

              

      

//                 <Field as='select' name='depositPaymentMethod' className='w-full border-2 border-black rounded-lg p-2'>
//                   <option value=''>طريقة دفع مبلغ العربون</option>
//                   <option value='كاش'>كاش</option>
//                   <option value='تحويل بنك أهلي'>تحويل بنك أهلي</option>
//                   <option value='تحويل بنك راجحي'>تحويل بنك راجحي</option>
//                   <option value='supervisor'>رقمي</option>
//                 </Field>
//                 {touched.depositPaymentMethod && errors.depositPaymentMethod && <div className='text-red-500'>{errors.depositPaymentMethod}</div>}

          
//               </div>
//               <Custom label='ملاحظات' name='notes' err={errors.notes} />

//               <Button disabled={mutation.isPending} type='submit'>
//                 {mutation.isPending ? (
//                   <div className='flex items-center gap-2'>
//                     <Loader2 className='animate-spin' />Please wait
//                   </div>
//                 ) : (
//                   'اضافة'
//                 )}
//               </Button>
//             </Form>
//           )
//         }}
//       </Formik>
//     </div>
//   )
// }

// export default AddOrder
