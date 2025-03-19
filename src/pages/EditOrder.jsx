import Custom from '@/formik/CustomInput'
import React from 'react'
import { addOrderValidation, CreateUsersValidation } from '@/validation/Validation'
import { Formik ,Form, Field } from 'formik'
import { Button } from '@/components/ui/button'
import { useMutation ,useQueryClient , useQuery } from '@tanstack/react-query'
import {CretaUser, getSuperVisors} from '@/api/users'
import {Edit, Loader2} from "lucide-react"
import toast from 'react-hot-toast' 
import { useNavigate, useParams } from 'react-router-dom'
import { getAvailableProducts, getProducts } from '@/api/products'
import { createOrder, updateOrder } from '@/api/orders'



const EditOrder = () => {
    const queryClient = useQueryClient()
    const history = useNavigate()

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
    city:"",
    product:"",
    quantity:"",
    deposit:"",
    depositPaymentMethod:"",
    deliveryDate:"",
    restMoneyPaymentMethod:"",
    notes:"",
    deliveryMan:"",

}
const id = useParams().id
const mutation = useMutation({
  mutationFn: ({ values, id }) => updateOrder(values, id),
  onSuccess: (res) => {
      console.log(res);
      if(res.status === "success") {
        queryClient.invalidateQueries({ queryKey: ["orders"] });
        toast.success("تم تعديل الطلب بنجاح");
      }
  },
  onError: (err) => {
      console.log(err);
  }
});

const onSubmit = (values) => {
  const filteredValues = Object.fromEntries(
      Object.entries(values).filter(([_, value]) => value !== "")
  );
  console.log(filteredValues);
  
  mutation.mutate({ values: filteredValues, id });
};

  return (
    <div className='w-[100%] mx-auto flex flex-col gap-3'>
        <h1 className='py-12'>تعديل الطلب</h1>
        <Formik initialValues={initialValues} onSubmit={onSubmit} >
            {({errors ,touched})=>    <Form className='flex flex-col gap-10 w-[80%] mx-auto py-7'>
                
                <Custom label="اسم العميل" name="customerName" err={errors.customerName}  />
                <Custom label="رقم السند" name="receipt" err={errors.receipt} />
                <Custom label="تاريخ الميلاد" name="birthDate" err={errors.birthDate} />
                <Custom label="تاريخ البيع" name="sellingDate" err={errors.sellingDate}  />
                <Custom label="تاريخ التسليم" name="deliveryDate" err={errors.deliveryDate}  />
                <Custom label="رقم الهاتف" name="phone" err={errors.phone}  />
                <Custom label="المنطقة" name="country" err={errors.country}  />
                <Custom label="المدينة" name="city" err={errors.city}  />
                <Custom label="الكمية" name="quantity" err={errors.quantity}  />
                <Custom label="الدفعه المقدمة" name="deposit" err={errors.deposit}  />
           
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
        <Field as="select" name="deliveryMan" className="w-full border-2 border-black rounded-lg p-2 mb-6">
          <option value="">اختر رجل التوصيل</option>

          {superVisorsItems.map((item , index)=><option value={item._id}>{item.name}</option> )}

        </Field>
        {touched.deliveryMan && errors.deliveryMan && <div className="text-red-500">{errors.deliveryMan}</div>}
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
{mutation.isPending ?<div className='flex items-center gap-2'> <Loader2 className="animate-spin" />Please wait</div> : "تعديل الطلب"}
    </Button>
            </Form>}
         
        </Formik>
    </div>
  )
}

export default EditOrder