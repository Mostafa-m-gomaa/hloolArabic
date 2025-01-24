import Custom from '@/formik/CustomInput'
import React from 'react'
import { addOrderValidation, CreateUsersValidation } from '@/validation/Validation'
import { Formik ,Form, Field } from 'formik'
import { Button } from '@/components/ui/button'
import { useMutation ,useQueryClient , useQuery } from '@tanstack/react-query'
import { getSuperVisors} from '@/api/users'
import {Loader2} from "lucide-react"
import toast from 'react-hot-toast' 
import { useNavigate } from 'react-router-dom'
import { getAvailableProducts, getProducts } from '@/api/products'
import { createOrder } from '@/api/orders'
import {getOneOrder} from '@/api/orders'
import { useParams } from 'react-router-dom'




const EditOrder = () => {
    const param =useParams().id
    const queryClient = useQueryClient()
    const history = useNavigate()
    const {data : theOrder} = useQuery({
        queryKey:["orders"],
        queryFn:()=>getOneOrder(param)
    })

    console.log(theOrder)

    const {data :superVisors} = useQuery({
        queryKey:["users"],
        queryFn:getSuperVisors
    })
    const superVisorsItems = superVisors?.data || []



    const {data : products} = useQuery({
        queryKey:["products"],
        queryFn:getAvailableProducts
    })
    const productsItems = products?.data || []

const initialValues={
    customerName:"",
    receipt:"",
    gender:"",
    supervisor:"",
    birthDate:"",
    sellingDate:"",
    phone:"",
    country:"",
    product:"",
    quantity:"",
    deposit:"",
    depositPaymentMethod:"",
    deliveryDate:"",
    restMoneyPaymentMethod:"",
    supervisorCommission:"",
    salesManCommission:"",
    notes:"",
    deliveryMan:"",
    deliveryCommission:""

}

const mutation = useMutation({
    mutationFn:(values)=>createOrder(values) ,
    onSuccess:(res)=>{
        console.log(res)
        queryClient.invalidateQueries({queryKey:["orders"]})
        toast.success("تم اضافة الطلب  بنجاح")
        history("/home/myorders")
    },
    onError:(err)=>{
        console.log(err)
    }
})

const onSubmit=(values)=>{
    mutation.mutate(values)
}

  return (
    <div className='w-[100%] mx-auto flex flex-col gap-3'>
        <h1 className='py-12'>املأ البيانات الأتية لأضافة طلب</h1>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={addOrderValidation} >
            {({errors ,touched})=>    <Form className='flex flex-col gap-10 w-[80%] mx-auto py-7'>
                
                <Custom label="اسم العميل" name="customerName" err={errors.customerName}  />
                <Custom label="رقم السند" name="receipt" err={errors.receipt} />
                <Custom label="تاريخ الميلاد" name="birthDate" err={errors.birthDate} />
                <Custom label="تاريخ البيع" name="sellingDate" err={errors.sellingDate}  />
                <Custom label="تاريخ التسليم" name="deliveryDate" err={errors.deliveryDate}  />
                <Custom label="رقم الهاتف" name="phone" err={errors.phone}  />
                <Custom label="البلد" name="country" err={errors.country}  />
                <Custom label="الكمية" name="quantity" err={errors.quantity}  />
                <Custom label="الدفعه المقدمة" name="deposit" err={errors.deposit}  />
                <Custom label="عمولة المشرف" name="supervisorCommission" err={errors.supervisorCommission}  />
                <Custom label="عمولة المندوب" name="salesManCommission" err={errors.salesManCommission}  />
                <Custom label="ملاحظات" name="notes" err={errors.notes}  />
                <div className="flex flex-col gap-4">
        <Field as="select" name="gender" className="w-full border-2 border-black rounded-lg p-2">
          <option value="">اختر الجنس</option>
          <option value="ذكر">ذكر</option>
          <option value="أنثي">أنثي</option>
    
        </Field>
        {touched.gender && errors.gender && <div className="text-red-500">{errors.gender}</div>}

        <Field as="select" name="supervisor" className="w-full border-2 border-black rounded-lg p-2">
          <option value="">اختر المشرف</option>

          {superVisorsItems.map((item , index)=><option value={item._id}>{item.name}</option> )}

        </Field>
        <Field as="select" name="deliveryMan" className="w-full border-2 border-black rounded-lg p-2">
          <option value="">اختر رجل التوصيل</option>

          {superVisorsItems.map((item , index)=><option value={item._id}>{item.name}</option> )}

        </Field>
        {touched.deliveryMan && errors.deliveryMan && <div className="text-red-500">{errors.deliveryMan}</div>}
        <Custom label="عمولة رجل التوصيل" name="deliveryCommission" err={errors.deliveryCommission}  />
        <Field as="select" name="product" className="w-full border-2 border-black rounded-lg p-2">
          <option value="">اختر المنتج</option>
          {productsItems.map((item , index)=><option value={item._id}>{item.title}</option> )}
         
        </Field>
        {touched.product && errors.product && <div className="text-red-500">{errors.product}</div>}
        <Field as="select" name="depositPaymentMethod" className="w-full border-2 border-black rounded-lg p-2">
          <option value="">طريقة دفع الدفعة المقدمة</option>
          <option value="كاش">كاش</option>
          <option value="تحويل بنك أهلي">تحويل بنك أهلي</option>
          <option value="تحويل بنك راجحي">تحويل بنك راجحي</option>
          <option value="supervisor">رقمي</option>
        </Field>
        {touched.depositPaymentMethod && errors.depositPaymentMethod && <div className="text-red-500">{errors.depositPaymentMethod}</div>}
        <Field as="select" name="restMoneyPaymentMethod" className="w-full border-2 border-black rounded-lg p-2">
          <option value="">طريقة دفع باقي المبلغ</option>
          <option value="كاش">كاش</option>
          <option value="تحويل بنك أهلي">تحويل بنك أهلي</option>
          <option value="تحويل بنك راجحي">تحويل بنك راجحي</option>
          <option value="supervisor">رقمي</option>
        </Field>
        {touched.restMoneyPaymentMethod && errors.restMoneyPaymentMethod && <div className="text-red-500">{errors.restMoneyPaymentMethod}</div>}
    
      </div>



      <Button disabled={mutation.isPending} type="submit" >
{mutation.isPending ?<div className='flex items-center gap-2'> <Loader2 className="animate-spin" />Please wait</div> : "اضافة"}
    </Button>
            </Form>}
         
        </Formik>
    </div>
  )
}

export default EditOrder