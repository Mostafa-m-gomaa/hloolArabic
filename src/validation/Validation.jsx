import * as Yup from 'yup';




export const LoginValidation =Yup.object({
    email: Yup.string().required("يجب أن تدخل الايميل") ,
    password: Yup.string().min(8 , "الرقم السري لا يقل عن 8 ارقام").required("يجب أن تدخل كلمة السر") ,
})
export const CreateUsersValidation =Yup.object({
    email: Yup.string().email().required("يجب أن تدخل الايميل") ,
    password: Yup.string().min(8 , "الرقم السري لا يقل عن 8 ارقام").required("يجب أن تدخل كلمة السر") ,
    name: Yup.string().required("يجب أن تدخل الاسم") ,
    role: Yup.string().required("يجب أن تختار الوظيفة") ,
    passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'كلمة السر غير متطابقة')
})
export const productValidation =Yup.object({
    title: Yup.string().required("يجب أن تدخل الاسم") ,
    desc: Yup.string().required("يجب أن تدخل الوصف") ,
    ValidityPeriod: Yup.number().required("يجب أن تدخل فترة الصلاحية") ,
    price: Yup.number().required("يجب أن تدخل السعر") ,
    salesManCommission: Yup.number().required("يجب أن تدخل عمولة المندوب") ,
    supervisorCommission: Yup.number().required("يجب أن تدخل عمولة المشرف") ,
    deliveryCommission: Yup.number().required("يجب أن تدخل عمولة رجل التوصيل") ,
})
export const addOrderValidation =Yup.object({
    customerName: Yup.string().required("يجب أن تدخل اسم العميل") ,
    receipt: Yup.string().required("يجب أن تدخل رقم السند") ,
    gender: Yup.string().required("يجب أن تدخل الجنس") ,
    depositPaymentMethod: Yup.string().required("يجب أن تدخل طريقة دفع الدفعة المقدمة") ,
    restMoneyPaymentMethod: Yup.string().required("يجب أن تدخل طريقة دفع الدفعة الباقيه") ,
    supervisor: Yup.string().required("يجب أن تختار المشرف") ,
    birthDate: Yup.string().required("يجب أن تدخل تاريخ الميلاد") ,
    sellingDate: Yup.string().required("يجب أن تدخل تاريخ البيع") ,
    deliveryDate: Yup.string().required("يجب أن تدخل تاريخ التسليم") ,
    phone: Yup.string().required("يجب أن تدخل رقم الهاتف") ,
    country: Yup.string().required("يجب أن تدخل البلد") ,
    quantity: Yup.number().required("يجب أن تدخل الكمية") ,
    deposit: Yup.number().required("يجب أن تدخل الدفعة المقدمة") ,
    product: Yup.string().required("يجب أن تختار المنتج") ,
    notes: Yup.string() ,
    deliveryMan: Yup.string().required("يجب أن تختار رجل التوصيل") ,

})

export const addReportValidationSchema = Yup.object().shape({
    newOrders: Yup.array()
      .of(
        Yup.object().shape({
                    deposit: Yup.number()
            .typeError("يجب إدخال مبلغ صالح")
            .min(0, "المبلغ يجب أن يكون أكبر من صفر"),
          depositPaymentMethod: Yup.string(),
          product: Yup.string(),
        })
      ),
    deliveredOrders: Yup.array().of(
      Yup.object().shape({
deliveryCommission: Yup.number().typeError("يجب أن يكون مبلغًا صالحًا").required("يجب أن تدخل عمولة رجل التوصيل") ,
deservedSalesManCommission: Yup.number().typeError("يجب أن يكون مبلغًا صالحًا") ,
salesManGottenCommission: Yup.number().typeError("يجب أن يكون مبلغًا صالحًا").required("يجب أن تدخل عمولة المندوب") ,
deservedSupervisorCommission: Yup.number().typeError("يجب أن يكون مبلغًا صالحًا") ,
supervisorGottenCommission: Yup.number().typeError("يجب أن يكون مبلغًا صالحًا").required("يجب أن تدخل عمولة المشرف") ,
deliveryReceipt: Yup.number().typeError("يجب أن يكون رقماً صالحاً") ,
restOrderCost : Yup.array().of(
  Yup.object().shape({
    amount: Yup.number()
    .typeError("يجب إدخال مبلغ صالح")
    .min(0, "المبلغ يجب أن يكون أكبر من صفر"),
    paymentMethod: Yup.string()
  }
)
)
  
      })
    ),
   
    fuelCost: Yup.number()
      .typeError("يجب إدخال مبلغ صالح")
      .required("تكلفة الوقود مطلوبة")
      .min(0, "التكلفة يجب أن تكون أكبر من صفر"),
    
    description: Yup.string()
      .nullable()
      .max(500, "الوصف يجب ألا يتجاوز 500 حرف"),
  });



