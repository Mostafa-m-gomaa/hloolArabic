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
})