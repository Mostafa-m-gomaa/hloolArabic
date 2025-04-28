// import React, { useEffect } from "react";
// import { Formik, Field, Form, FieldArray } from "formik";
// import * as Yup from "yup";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { Button } from "@/components/ui/button";
// import toast from "react-hot-toast";
// import Custom from "@/formik/CustomInput";
// import { addReportValidationSchema } from "@/validation/Validation";
// import { DialogDemo } from "@/components/MyOrdersDialog";
// import { useState } from "react";
// import { createReport, getDuesOverMe, getUsersDues } from "@/api/orders";
// import { useNavigate, useParams } from "react-router-dom";
// import { Loader2 } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import CustomInput from "@/formik/InputForAddReport";
// import { getSalesMan } from "@/api/users";
// import { getProducts } from "@/api/products";
// import { getOneReport } from "@/api/orders";







// const EditReport = () => {

//   const [outgoings, setOutgoings] = useState([]);
//   const [commissionInputs, setCommissionInputs] = useState({});
//   const [commessions,setCommissions]=useState([])
//   const [categorizedMoney, setCategorizedMoney] = useState([]);
//   const [cash, setCash] = useState(0);
//   const [previousValues, setPreviousValues] = useState({}); 
//   const [prevValue, setPrevValue] = useState(0);
//   const [restCash, setRestCash] = useState(0);
//   const {id} =useParams()

// const {data : details , isLoading ,isErro} =useQuery({
//     queryKey:["reports"] ,
//     queryFn:()=> getOneReport(id)
// })


// console.log(details)
// // const initialValues = details?.report 


//   const {data:salesMen , isLoading : salesMenLoading} = useQuery({
//     queryKey : ["reportUsers"] ,
//     queryFn:getSalesMan
//   })
//   const salesMenItems = salesMen?.data || []

//   const {data :products}=useQuery({
//     queryKey:["reportProducts"] ,
//     queryFn:getProducts
//   })

//   const productItems = products?.data


//   const {data : duesOverMe}=useQuery({
//     queryKey:["dues×OverMe"] ,
//     queryFn: getDuesOverMe
//   })

//   // console.log(duesOverMe)
//   const cashWithMe = duesOverMe?.dues || 0




//   const handleCommissionChange = (userId, newValue) => {
//     const prevValue = previousValues[userId] || 0; // Get previous value (default to 0)
//     const newNumericValue = parseFloat(newValue) || 0; // Convert input to number safely
  
//     // ✅ Adjust cash correctly: restore old value first, then subtract new one
//     setCash((prevCash) => prevCash + prevValue - newNumericValue);
  
//     // ✅ Update the commission input state
//     setCommissionInputs((prev) => ({
//       ...prev,
//       [userId]: newValue, // Store the new input value as a string
//     }));
  
//     // ✅ Store the numeric value for tracking changes
//     setPreviousValues((prev) => ({
//       ...prev,
//       [userId]: newNumericValue, // Keep track of last entered numeric value
//     }));
//   };
  
 
  
// const [checkOutGoings , setcheckOutGoings] =useState(false)

//   const generateOutgoings = () => {
//     if(hasbaCheck === false){
// toast.error("برجاء تفعيل الحاسبة")
//     }else{

//       return new Promise((resolve) => {
//         const newOutgoings = commessions
//           .filter((item) => item.userId !== undefined)
//           .map((item) => ({
//             user: item.userId,
//             deservedCommission: item.userCommission,
//             gottenCommission: commissionInputs[item.userId] || "0",
//           }));
//      toast.success("تم حساب المخرجات بنجاح")
//         setOutgoings((prev) => {
//           const updatedOutgoings = [...newOutgoings];
//           resolve(updatedOutgoings); // Resolve the promise after state update
//           setcheckOutGoings(true)
//           return updatedOutgoings;
//         });
//       }
//     );
//     }
    

//   };
  



// const [usersCommission, setUsersCommission] = useState([]);


//   const history = useNavigate();
// const mutation =useMutation({

//   mutationKey:"createReport",
//   mutationFn:(values)=>createReport(values),
//   onSuccess:(res)=>{
   

//     if(res.status === "success"){
//       toast.success("تم انشاء التقرير بنجاح")
//       history("/home/myreports")
//     }
//   },
//   onError:(error)=>{
//     toast.error("حدث خطأ")
//   }
// })

// const {data : usersDues , isLoading : usersDuesLoading} = useQuery({
//   queryKey : ["usersDues"] ,
//   queryFn : getUsersDues
// })

// const usersDuesItems = usersDues?.data || []




// const restMoneyObj={amount: "",paymentMethod: "",}
// const depositOrder={order: "",paymentMethod: "", deposit: "",receipt : ""}
// const userDuesObj={
//   userDuesDocId : "" ,
//   gottenMoney : "",
// }
// const burnOutsObj = {
//   description : "",
//   amount : "",
// }
// const deliveredOrdersObj = {
//   customerName: "",
//   deliveryReceipt: "",
//   order: "",
//   deservedSalesManCommission: "",
//   deservedSupervisorCommission: "",
//   deliveryCommission: "",
//   salesMan:"" ,
//   restOrderCost: [restMoneyObj],
// };
// const newOrdersObj = {
//   salesMan: "",
//   deposit: "",
//   depositPaymentMethod: "",
//   product: "",
//   quantity: "",
// };

//   const [initialValues , setInitialValues] = useState( {
//     newOrders: [],
//     deliveredOrders: [],
//     outgoings : outgoings,
//     categorizedMoney: categorizedMoney,
//     burnOuts : [],
//     description: "",
//     reportDate: "",
//     // companyDues: cash + cashWithMe,
//     extraDeposits: [],
//     userDues : [],
//   })

// const [hasbaCheck,setHasbaCheck]=useState(false)
// const [firstCash,setFirstCash]=useState(0)

// const hasba =(values)=>{
//   calculateCategorizedMoney(values);
//   aggregateUserCommissions(usersCommission);
//   setHasbaCheck(true)
//   setCommissionInputs({})
//   setPreviousValues({})
// }


// useEffect(()=>{
// setInitialValues(details?.report)
// } , [])




//   const onSubmit = async (values) => {
//     // if(values.deliveredOrders[0].order === ""){
//     //   toast.error("برجاء إضافة طلبات مسلمة")
//     // }
//     //  if (categorizedMoney.length === 0) {
//     //   calculateCategorizedMoney(values);
//     //   aggregateUserCommissions(usersCommission);

//     // } else {
    
//     // }

// if(hasbaCheck === false){
//   toast.error("برجاء تفعيل الحاسبة")
// }
// else if(checkOutGoings === false){
//       toast.error("برجاء حساب المخرجات")
//     }
//     else{
//       values.outgoings = outgoings;
//       values.categorizedMoney = categorizedMoney;
  
//       if(cash >= 0){
//         values.companyDues = cash 
//       }
//       else if(cash < 0){
//         values.usedCompanyDues = -cash 
//       }
//       // console.log(values)
//       mutation.mutate(values);

 
//     }
//   };



//   const aggregateUserCommissions = (userCommission) => {

  

//     const commissionMap = new Map();
  
//     userCommission.forEach(({
//       salesManName,
//       saledManId,
//       salesManComm,
//       supervisorName,
//       superVisorId,
//       superVisorComm,
//       deliveryManName,
//       deliveryManId,
//       deliveryCommisssion,
//     }) => {
//       // Process Salesman
//       if (commissionMap.has(saledManId)) {
//         commissionMap.get(saledManId).userCommission += salesManComm;
//       } else {
//         commissionMap.set(saledManId, {
//           userName: salesManName,
//           userId: saledManId,
//           userCommission: salesManComm,
//         });
//       }
  
//       // Process Supervisor / DeliveryMan (if IDs match, merge commissions)
//       if (superVisorId === deliveryManId) {
//         if (commissionMap.has(superVisorId)) {
//           commissionMap.get(superVisorId).userCommission += superVisorComm + deliveryCommisssion;
//         } else {
//           commissionMap.set(superVisorId, {
//             userName: supervisorName,
//             userId: superVisorId,
//             userCommission: superVisorComm + deliveryCommisssion,
//           });
//         }
//       } else {
//         // Process Supervisor
//         if (commissionMap.has(superVisorId)) {
//           commissionMap.get(superVisorId).userCommission += superVisorComm;
//         } else {
//           commissionMap.set(superVisorId, {
//             userName: supervisorName,
//             userId: superVisorId,
//             userCommission: superVisorComm,
//           });
//         }
  
//         // Process DeliveryMan
//         if (commissionMap.has(deliveryManId)) {
//           commissionMap.get(deliveryManId).userCommission += deliveryCommisssion;
//         } else {
//           commissionMap.set(deliveryManId, {
//             userName: deliveryManName,
//             userId: deliveryManId,
//             userCommission: deliveryCommisssion,
//           });
//         }
//       }
//     });
  
  
// setCommissions(Array.from(commissionMap.values())) 
// return Array.from(commissionMap.values())
//   };



//   // categorize money function 




//   const calculateCategorizedMoney = (values) => {
//     const categorizedMoney = {};
//     let totalCash = 0; // Variable to track total cash amount
  
//     // Loop through delivered orders and sum restOrderCost amounts by payment method

//     values.deliveredOrders.forEach((order) => {
//       order.restOrderCost.forEach(({ amount, paymentMethod }) => {
//         if (amount && paymentMethod) {
//           if (!categorizedMoney[paymentMethod]) {
//             categorizedMoney[paymentMethod] = 0;
//           }
//           categorizedMoney[paymentMethod] += parseFloat(amount);
  
//           // Check if payment method is "كاش" and add to totalCash
//           if (paymentMethod === "كاش") {
//             totalCash += parseFloat(amount);
//           }
//         }
//       });
//     });
  
//     // Loop through new orders and sum deposit amounts by payment method
//     values.newOrders.forEach(({ deposit, depositPaymentMethod }) => {
//       if (deposit && depositPaymentMethod) {
//         if (!categorizedMoney[depositPaymentMethod]) {
//           categorizedMoney[depositPaymentMethod] = 0;
//         }
//         categorizedMoney[depositPaymentMethod] += parseFloat(deposit);
  
//         // Check if deposit payment method is "كاش" and add to totalCash
//         if (depositPaymentMethod === "كاش") {
//           totalCash += parseFloat(deposit);
//         }
//       }
//     });
//     values.extraDeposits.forEach(({ deposit, paymentMethod }) => {
//       if (deposit && paymentMethod) {
//         if (!categorizedMoney[paymentMethod]) {
//           categorizedMoney[paymentMethod] = 0;
//         }
//         categorizedMoney[paymentMethod] += parseFloat(deposit);
  
//         // Check if deposit payment method is "كاش" and add to totalCash
//         if (paymentMethod === "كاش") {
//           totalCash += parseFloat(deposit);
//         }
//       }
//     });
  
//     // Update the cash state
//     setCash(totalCash);
//     setFirstCash(totalCash)
  
//     // Convert categorizedMoney object to an array
//     const categorizedArray = Object.keys(categorizedMoney).map((method) => ({
//       paymentMethod: method,
//       amount: categorizedMoney[method],
//     }));
  
//     setCategorizedMoney(categorizedArray);
//     return categorizedArray;
//   };


  
  
//   const handleAmountChange = (index, newValue, prevValue) => {
//     const numericNewValue = Number(newValue) || 0; // Convert to number, default to 0
//     const numericPrevValue = Number(prevValue) || 0;
  
//     setCash((prevCash) => prevCash + numericPrevValue - numericNewValue);
//   };
//   return (
//     <div className="w-full py-6 flex flex-col gap-8 items-center">
//           <h1 >إنشاء تقرير</h1>

   
//     <Formik
//       initialValues={initialValues}
//       onSubmit={onSubmit}
//       // enableReinitialize
//       // validationSchema={addReportValidationSchema}
     
//     >
//       {({ values, setFieldValue }) => (
//         <Form  className="w-[80%] mx-auto flex flex-col gap-8">
//           {/* New Orders */}
//           <h1 className="font-semibold">طلبات جديدة</h1>

//           <FieldArray name="newOrders" >
            
//             {({ push, remove }) => (
//               <div className="flex flex-col justify-center gap-10 items-center  w-full  ">
       
//                 {values?.newOrders?.map((_, index) => (
//                   <div key={index} className=" border-b py-10 px-4 w-[90%] bg-white rounded-md shadow-2xl flex flex-col lg:flex-row  justify-center gap-10 items-center border-2 ">
//                          <Field
//                       name={`newOrders[${index}].depositPaymentMethod`}
//                       as="select"
//                       className="border-2 border-black rounded-lg p-2"
                    
//                     >   <option value="">طريقة دفع مبلغ العربون</option>
//                     <option value="كاش">كاش</option>
//                     <option value="تحويل بنك أهلي">تحويل بنك أهلي</option>
//                     <option value="تحويل بنك راجحي">تحويل بنك راجحي</option>
//                     <option value="supervisor">رقمي</option>
//                     </Field>
               
//                     <CustomInput
//                       name={`newOrders[${index}].deposit`}
//                       label="المبلغ"
//                       type={"number"}
                    
//                     />
//                     <Field as="select"   name={`newOrders[${index}].salesMan`}    className="border-2 border-black rounded-lg p-2">
//                       <option value="">اختر المندوب</option>
//                     {salesMenItems.map((item,i)=>(
//                       <option value={item.name} key={item._id}>
//                         {item.name}
//                       </option>
//                     ))}
//                     </Field>
                 
              
                
                 

//                     <Field  name={`newOrders[${index}].product`} as="select"  className="border-2 border-black rounded-lg p-2">
//                     <option value="">اختر المنتج</option>
//                     {productItems?.map((item)=>(
//                       <option key={item._id}  value={item.title}>{item.title}</option>
//                     ))}
//                     </Field>
                 
//                     <Button type="button" onClick={() => remove(index)}>حذف</Button>
//                   </div>
//                 ))}
//                 <Button type="button" onClick={() => push(newOrdersObj)}>
//                   إضافة طلب جديد
//                 </Button>
//               </div>
//             )}
//           </FieldArray>
//           <h1 >طلبات مسلمة</h1>

//           <FieldArray name="deliveredOrders">
//             {({ push, remove }) => (
//              <div className="flex flex-col justify-center gap-10 items-center  w-full">
//                 {values?.deliveredOrders?.map((_, index) => (
//                 <div key={index} className="border-b py-10 px-4 w-[90%] bg-white rounded-md shadow-2xl flex flex-col lg:flex-row  justify-center gap-10 items-center border-2 flex-wrap ">
          
//                       <DialogDemo
//   setOrder={(order) => {
//     setRestCash(order?.remainingAmount || 0);

//     const newCommissionEntry = {
//       order: order?._id,
//       salesManName: order?.salesPerson?.name,
//       saledManId: order?.salesPerson?._id,
//       salesManComm: order.salesManCommission,
//       supervisorName: order?.supervisor?.name,
//       superVisorId: order?.supervisor?._id,
//       superVisorComm: order?.supervisorCommission,
//       deliveryCommisssion: order?.deliveryCommission || 0,
//       deliveryManName: order?.deliveryMan?.name,
//       deliveryManId: order?.deliveryMan?._id,
//     };

//     // setUsersCommission((prev) => {
//     //   const existingIndex = prev.findIndex((item) => item.order === order?._id);

//     //   if (existingIndex !== -1) {
//     //     const updated = [...prev];
//     //     updated[existingIndex] = newCommissionEntry;
//     //     return updated;
//     //   } else {
//     //     return [...prev, newCommissionEntry];
//     //   }
//     // });

//     setUsersCommission((prev) => {
//       const updated = [...prev];
//       updated[index] = {
//         order: order?._id,
//         salesManName: order?.salesPerson?.name,
//         saledManId: order?.salesPerson?._id,
//         salesManComm: order.salesManCommission,
//         supervisorName: order?.supervisor?.name,
//         superVisorId: order?.supervisor?._id,
//         superVisorComm: order?.supervisorCommission,
//         deliveryCommisssion: order?.deliveryCommission || 0,
//         deliveryManName: order?.deliveryMan?.name,
//         deliveryManId: order?.deliveryMan?._id,
//       };
//       return updated;
//     });

//     const updatedDeliveredOrders = [...values?.deliveredOrders];
//     updatedDeliveredOrders[index] = {
//       ...updatedDeliveredOrders[index],
//       customerName: order.customerName || "",
//       deliveryReceipt: order.DeliveryReceipt || "",
//       order: order._id || "",
//       deservedSalesManCommission: order.salesManCommission || "",
//       deservedSupervisorCommission: order.supervisorCommission || "",
//       deliveryCommission: order.deliveryCommission || "",
//       salesMan: order?.salesPerson?.name || "",
//     };

//     setFieldValue("deliveredOrders", updatedDeliveredOrders);
//   }}
// />
//                     <CustomInput
//                       name={`deliveredOrders[${index}].customerName`}
//                       label="اسم العميل"
//                       type={"text"}
//                       disabled ={true}
                       
//                     />
//                     <CustomInput
//                       name={`deliveredOrders[${index}].deliveryReceipt`}
//                       label="رقم السند"
//                       type={"text"}
//                       disabled ={true}
//                     />
//                     <CustomInput
//                       name={`deliveredOrders[${index}].salesMan`}
//                       label="المندوب"
//                       type={"text"}
//                       disabled ={true}
//                     />
                   
                   
                 
//                     <CustomInput type={"number"} name={`deliveredOrders[${index}].deservedSalesManCommission`} label="العمولة المستحقة للمندوب"  disabled ={true}  />
//                     <CustomInput type={"number"} name={`deliveredOrders[${index}].deservedSupervisorCommission`} label="العمولة المستحقة للمشرف" disabled ={true}  />
//                     <CustomInput type={"number"} name={`deliveredOrders[${index}].deliveryCommission`} label="عمولة التوصيل" disabled ={true} />
//                     <div>المبلغ الباقي لاستلام الطلب : {restCash}</div>
//                     <FieldArray name={`deliveredOrders[${index}].restOrderCost`}>
//                       {({ push: pushRestOrderCost, remove: removeRestOrderCost }) => (
//                         <div className="flex flex-col gap-4 items-center w-full ">
//                           {values?.deliveredOrders[index]?.restOrderCost?.map((_, restIndex) => (
//                             <div key={restIndex} className="flex flex-row-reverse flex-wrap  gap-10 items-center w-[80%] justify-center pt-8 pb-6 rounded-md  bg-gray-200 ">
//                               <CustomInput
//                                 name={`deliveredOrders[${index}].restOrderCost[${restIndex}].amount`}
//                                 label="المبلغ المتبقي"
//                                 type={"number"}
                             
//                               />
//                               <Field
//                                 name={`deliveredOrders[${index}].restOrderCost[${restIndex}].paymentMethod`}
//                                 as="select"
//                                 className="border-2 border-black rounded-lg p-2"
//                               >
//                                 <option value="">طريقة دفع الباقي</option>
                           
//           <option value="كاش">كاش</option> 
//           <option value="تحويل بنك أهلي">تحويل بنك أهلي</option>
//           <option value="تحويل بنك راجحي">تحويل بنك راجحي</option>
//           <option value="supervisor">رقمي</option>
//                               </Field>

//                               <Button type="button" onClick={() => removeRestOrderCost(restIndex)}>حذف</Button>
//                             </div>
//                           ))}
//                           <Button type="button" onClick={() => pushRestOrderCost(restMoneyObj)}>
//                             إضافة مبلغ متبقي
//                           </Button>
//                         </div>
//                       )}
//                     </FieldArray>
                    
                   
//                     <Button type="button" onClick={() => remove(index)}>حذف</Button>
//                   </div>
//                 ))}
//                 <Button type="button" onClick={() => push(deliveredOrdersObj)}>
//                   إضافة طلب مسلّم
//                 </Button>
//               </div>
//             )}
//           </FieldArray>

// {/* extra deposites section  */}
// <h1>عربون اضافي</h1>
//           <FieldArray name={`extraDeposits`}>
//                       {({ push: pushRestOrderCost, remove: removeRestOrderCost }) => (
//                         <div className="flex flex-col gap-4 items-center mx-auto bg-white p-4 w-[90%] rounded-md shadow-2xl ">
//                           {values?.extraDeposits?.map((_, restIndex) => (
//                             <div key={restIndex} className="flex flex-row-reverse flex-wrap  gap-10 items-center w-[80%] justify-center pt-8 pb-6 rounded-md  bg-gray-200 ">
//                           <DialogDemo
//                         setOrder={(order) => {        
//                           const updatedDeliveredOrders = [
//                             ...values?.extraDeposits,
//                           ];
//                           updatedDeliveredOrders[restIndex] = {
//                             ...updatedDeliveredOrders[restIndex],
//                             order: order._id || "", };
//                           setFieldValue(
//                             "extraDeposits",
//                             updatedDeliveredOrders
//                           );
//                         }}
//                       />
//                               <CustomInput
//                                 name={`extraDeposits[${restIndex}].deposit`}
//                                 label="المبلغ "
//                                 type={"number"}
                             
//                               />
//                               <CustomInput
//                                 name={`extraDeposits[${restIndex}].receipt`}
//                                 label="  سند العربون اضافي"
//                                 type={"number"}
                             
//                               />
//                               <Field
//                                 name={`extraDeposits[${restIndex}].paymentMethod`}
//                                 as="select"
//                                 className="border-2 border-black rounded-lg p-2"
//                               >
//                                 <option value="">طريقة الدفع</option>
                           
//           <option value="كاش">كاش</option> 
//           <option value="تحويل بنك أهلي">تحويل بنك أهلي</option>
//           <option value="تحويل بنك راجحي">تحويل بنك راجحي</option>
//           <option value="supervisor">رقمي</option>
//                               </Field>

//                               <Button type="button" onClick={() => removeRestOrderCost(restIndex)}>حذف</Button>
//                             </div>
//                           ))}
//                           <Button type="button" onClick={() => pushRestOrderCost(depositOrder)}>
//                             إضافة مبلغ متبقي
//                           </Button>
//                         </div>
//                       )}
//                     </FieldArray>



// <div className="bg-white flex flex-col gap-10 items-center w-[90%] py-10 px-4 rounded-md shadow-2xl border-2 mx-auto">
//     {true && (
//       <div className="flex flex-col border-2 border-black p-4 rounded-md gap-2 w-full">
//         <h2>العمولات المستحقة</h2>
//         <div>{cashWithMe} الصندوق</div>
//         <div>{cash} اجمالي المبلغ لهذا التقرير</div>
//         <div>{cash + cashWithMe} الاجمالي الكلي:</div>
//         {commessions.map((item, i) =>
//           item.userId === undefined ? null : (
//             <div className="flex gap-2 w-full justify-between" key={i}>
//             <Input
//     type="number"
//     placeholder="العموله المسلمة"
//     className="w-[55%]"
//     value={commissionInputs[item.userId] || ""}
//     onChange={(e) => handleCommissionChange(item.userId, e.target.value)}
//   />
//               <div className="flex w-[40%] justify-between">
//                 <div>ر.س {item.userCommission}</div>
//                 <div>{item.userName}</div>
//               </div>
//             </div>
//           )
//         )}
//       </div>
//     )}
//        <Button type="button" onClick={()=>hasba(values)}>
//         الحاسبة
//       </Button>

//     <CustomInput type={"text"} name="description" label="الوصف" />
//   </div>

// {/* userDuseSection  */}
// <h1>مستحقات قديمة </h1>
//   <FieldArray name={`userDues`}>
//                       {({ push: pushRestOrderCost, remove: removeRestOrderCost }) => (
//                         <div className="flex flex-col gap-4 items-center mx-auto bg-white p-4 w-[90%] rounded-md shadow-2xl ">
//                           {values?.userDues?.map((due, restIndex) => (
//                             <div key={restIndex} className="flex flex-row-reverse flex-wrap  gap-10 items-center w-[80%] justify-center pt-8 pb-6 rounded-md  bg-gray-200 ">
//                        <Field
//                                 name={`userDues[${restIndex}].userDuesDocId`}
//                                 as="select"
//                                 className="border-2 border-black rounded-lg p-2"
//                               >
//                                 <option value="">{usersDuesItems.length > 0  ? "اختر المستخدم": "لا يوجد مستحقات قديمة"}</option>
                           
//          {usersDuesItems.length > 0 &&
//          usersDuesItems?.map((item,index)=>(
//             <option key={index} value={item._id}>{item?.user?.name} :{item ?.dues} </option>
//          ))
//          }
//                               </Field>
//                               <Field
//                                 name={`userDues[${restIndex}].gottenMoney`}
//                                 label="المبلغ "
//                                 type={"number"}
//                                 value={due?.gottenMoney || ""}
//                                  className="border-2 border-black rounded-lg p-2"
//                                 onChange={(e) => {
//                                   const prevValue = values?.userDues?.[restIndex]?.gottenMoney || 0;
//                                   const newValue = e.target.value;
//                                   handleAmountChange(restIndex, newValue, prevValue);
//                                   setFieldValue(`userDues[${restIndex}].gottenMoney`, newValue);
//                                 }}
                             
//                               />
                         

//                               <Button type="button" onClick={() => removeRestOrderCost(restIndex)}>حذف</Button>
//                             </div>
//                           ))}
//                           <Button type="button" onClick={() => pushRestOrderCost(userDuesObj)}>
//                             إضافة 
//                                                       </Button>
//                         </div>
//                       )}
//                     </FieldArray>

//   <h1 className="font-semibold">المصاريف</h1>

// <FieldArray name="burnOuts" >
  
//   {({ push, remove }) => (
//     <div className="flex flex-col justify-center gap-10 items-center  w-full  ">

//       {values?.burnOuts?.map((burnOut, index) => (
//         <div key={index} className=" border-b py-10 px-4 w-[90%] bg-white rounded-md shadow-2xl flex flex-col lg:flex-row  justify-center gap-10 items-center border-2 ">

     
     
//                <Field
//             name={`burnOuts[${index}].amount`}
//             type="number"
//             value={burnOut?.amount || ""}
//             onChange={(e) => {
//               const prevValue = values?.burnOuts?.[index]?.amount || 0;
//               const newValue = e.target.value;
//               handleAmountChange(index, newValue, prevValue);
//               setFieldValue(`burnOuts[${index}].amount`, newValue);
//             }}
//             placeholder="المبلغ"
//             className="border-2 border-black rounded-lg p-2"
//             label="المبلغ"
//           />
     
//           <CustomInput
//             name={`burnOuts[${index}].description`}
//             label="الوصف"
//             type={"text"}
         
//           />

       
//           <Button type="button" onClick={() => remove(index)}>حذف</Button>
//         </div>
//       ))}
//       <Button type="button" onClick={() => push(burnOutsObj)}>
// اضافة مصروف
//       </Button>
//     </div>
//   )}
// </FieldArray>

// <CustomInput
//             name={`reportDate`}
//             label="تاريخ التقرير"
//             type={"date"}
         
//           />
          
// <Button onClick={generateOutgoings} type="button">حساب المخرجات</Button>

//             <Button type="submit" disabled={mutation.isPending}>
//               {mutation.isPending ? (
//                 <div className="flex items-center gap-2">
//                   <Loader2 className="animate-spin" />
// جاري الإنشاء
//                 </div>
//               ) : (
//                 "إنشاء"
//               )}
//             </Button>
//         </Form>
//       )}
//     </Formik>
//     </div>
//   );
// };

// export default EditReport;



import React, { useEffect } from "react";
import { Formik, Field, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import Custom from "@/formik/CustomInput";
import { addReportValidationSchema } from "@/validation/Validation";
import { DialogDemo } from "@/components/MyOrdersDialog";
import { useState } from "react";
import { updateReport, getDuesOverMe, getUsersDues } from "@/api/orders";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import CustomInput from "@/formik/InputForAddReport";
import { getSalesMan } from "@/api/users";
import { getProducts } from "@/api/products";
import { getOneReport } from "@/api/orders";

// Date formatting utility
const formatDateForInput = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

const EditReport = () => {
  const [outgoings, setOutgoings] = useState([]);
  const [commissionInputs, setCommissionInputs] = useState({});
  const [commessions, setCommissions] = useState([]);
  const [categorizedMoney, setCategorizedMoney] = useState([]);
  const [cash, setCash] = useState(0);
  const [previousValues, setPreviousValues] = useState({});
  const [prevValue, setPrevValue] = useState(0);
  const [restCash, setRestCash] = useState(0);
  const { id } = useParams();

  const {
    data: details,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["reports", id],
    queryFn: () => getOneReport(id),
  });

  const { data: salesMen, isLoading: salesMenLoading } = useQuery({
    queryKey: ["reportUsers"],
    queryFn: getSalesMan,
  });
  const salesMenItems = salesMen?.data || [];

  const { data: products } = useQuery({
    queryKey: ["reportProducts"],
    queryFn: getProducts,
  });

  const productItems = products?.data;

  const { data: duesOverMe } = useQuery({
    queryKey: ["duesOverMe"],
    queryFn: getDuesOverMe,
  });

  const cashWithMe = duesOverMe?.dues || 0;

  const handleCommissionChange = (userId, newValue) => {
    const prevValue = previousValues[userId] || 0;
    const newNumericValue = parseFloat(newValue) || 0;

    setCash((prevCash) => prevCash + prevValue - newNumericValue);

    setCommissionInputs((prev) => ({
      ...prev,
      [userId]: newValue,
    }));

    setPreviousValues((prev) => ({
      ...prev,
      [userId]: newNumericValue,
    }));
  };

  const [checkOutGoings, setcheckOutGoings] = useState(false);

  const generateOutgoings = () => {
    if (hasbaCheck === false) {
      toast.error("برجاء تفعيل الحاسبة");
    } else {
      return new Promise((resolve) => {
        const newOutgoings = commessions
          .filter((item) => item.userId !== undefined)
          .map((item) => ({
            user: item.userId,
            deservedCommission: item.userCommission,
            gottenCommission: commissionInputs[item.userId] || "0",
          }));
        toast.success("تم حساب المخرجات بنجاح");
        setOutgoings((prev) => {
          const updatedOutgoings = [...newOutgoings];
          resolve(updatedOutgoings);
          setcheckOutGoings(true);
          return updatedOutgoings;
        });
      });
    }
  };

  const [usersCommission, setUsersCommission] = useState([]);
  const history = useNavigate();

  const mutation = useMutation({
    mutationKey: ["updateReport"],
    mutationFn: (values) => updateReport(id, values),
    onSuccess: (res) => {
      if (res.status === "success") {
        toast.success("تم تعديل التقرير بنجاح");
        history("/home/myreports");
      }
    },
    onError: (error) => {
      toast.error("حدث خطأ أثناء التعديل");
    },
  });

  const { data: usersDues, isLoading: usersDuesLoading } = useQuery({
    queryKey: ["usersDues"],
    queryFn: getUsersDues,
  });

  const usersDuesItems = usersDues?.data || [];

  const restMoneyObj = { amount: "", paymentMethod: "" };
  const depositOrder = { order: "", paymentMethod: "", deposit: "", receipt: "" };
  const userDuesObj = {
    userDuesDocId: "",
    gottenMoney: "",
  };
  const burnOutsObj = {
    description: "",
    amount: "",
  };
  const deliveredOrdersObj = {
    customerName: "",
    deliveryReceipt: "",
    order: "",
    deservedSalesManCommission: "",
    deservedSupervisorCommission: "",
    deliveryCommission: "",
    salesMan: "",
    restOrderCost: [restMoneyObj],
  };
  const newOrdersObj = {
    salesMan: "",
    deposit: "",
    depositPaymentMethod: "",
    product: "",
    quantity: "",
  };

  const [initialValues, setInitialValues] = useState({
    newOrders: [],
    deliveredOrders: [],
    outgoings: [],
    categorizedMoney: [],
    burnOuts: [],
    description: "",
    reportDate: "",
    extraDeposits: [],
    userDues: [],
  });

  const [hasbaCheck, setHasbaCheck] = useState(false);
  const [firstCash, setFirstCash] = useState(0);

  const hasba = (values) => {
    calculateCategorizedMoney(values);
    aggregateUserCommissions(usersCommission);
    setHasbaCheck(true);
    setCommissionInputs({});
    setPreviousValues({});
  };

  useEffect(() => {
    if (details?.report) {
      // Initialize commission inputs from existing report
      const initialCommissions = {};
      details.report.outgoings?.forEach((outgoing) => {
        initialCommissions[outgoing.user] = outgoing.gottenCommission;
      });

      // Format dates in the report data
      const formattedReport = {
        ...details.report,
        reportDate: formatDateForInput(details.report.reportDate),
        // Format any other dates if needed
      };

      setInitialValues(formattedReport);
      setOutgoings(details.report.outgoings || []);
      setCategorizedMoney(details.report.categorizedMoney || []);
      setCommissionInputs(initialCommissions);
      setHasbaCheck(true);
      setcheckOutGoings(true);
    }
  }, [details]);

  const aggregateUserCommissions = (userCommission) => {
    const commissionMap = new Map();

    userCommission.forEach(
      ({
        salesManName,
        saledManId,
        salesManComm,
        supervisorName,
        superVisorId,
        superVisorComm,
        deliveryManName,
        deliveryManId,
        deliveryCommisssion,
      }) => {
        // Process Salesman
        if (commissionMap.has(saledManId)) {
          commissionMap.get(saledManId).userCommission += salesManComm;
        } else {
          commissionMap.set(saledManId, {
            userName: salesManName,
            userId: saledManId,
            userCommission: salesManComm,
          });
        }

        // Process Supervisor / DeliveryMan
        if (superVisorId === deliveryManId) {
          if (commissionMap.has(superVisorId)) {
            commissionMap.get(superVisorId).userCommission +=
              superVisorComm + deliveryCommisssion;
          } else {
            commissionMap.set(superVisorId, {
              userName: supervisorName,
              userId: superVisorId,
              userCommission: superVisorComm + deliveryCommisssion,
            });
          }
        } else {
          // Process Supervisor
          if (commissionMap.has(superVisorId)) {
            commissionMap.get(superVisorId).userCommission += superVisorComm;
          } else {
            commissionMap.set(superVisorId, {
              userName: supervisorName,
              userId: superVisorId,
              userCommission: superVisorComm,
            });
          }

          // Process DeliveryMan
          if (commissionMap.has(deliveryManId)) {
            commissionMap.get(deliveryManId).userCommission +=
              deliveryCommisssion;
          } else {
            commissionMap.set(deliveryManId, {
              userName: deliveryManName,
              userId: deliveryManId,
              userCommission: deliveryCommisssion,
            });
          }
        }
      }
    );

    setCommissions(Array.from(commissionMap.values()));
    return Array.from(commissionMap.values());
  };

  const calculateCategorizedMoney = (values) => {
    const categorizedMoney = {};
    let totalCash = 0;

    values.deliveredOrders.forEach((order) => {
      order.restOrderCost.forEach(({ amount, paymentMethod }) => {
        if (amount && paymentMethod) {
          if (!categorizedMoney[paymentMethod]) {
            categorizedMoney[paymentMethod] = 0;
          }
          categorizedMoney[paymentMethod] += parseFloat(amount);

          if (paymentMethod === "كاش") {
            totalCash += parseFloat(amount);
          }
        }
      });
    });

    values.newOrders.forEach(({ deposit, depositPaymentMethod }) => {
      if (deposit && depositPaymentMethod) {
        if (!categorizedMoney[depositPaymentMethod]) {
          categorizedMoney[depositPaymentMethod] = 0;
        }
        categorizedMoney[depositPaymentMethod] += parseFloat(deposit);

        if (depositPaymentMethod === "كاش") {
          totalCash += parseFloat(deposit);
        }
      }
    });

    values.extraDeposits.forEach(({ deposit, paymentMethod }) => {
      if (deposit && paymentMethod) {
        if (!categorizedMoney[paymentMethod]) {
          categorizedMoney[paymentMethod] = 0;
        }
        categorizedMoney[paymentMethod] += parseFloat(deposit);

        if (paymentMethod === "كاش") {
          totalCash += parseFloat(deposit);
        }
      }
    });

    setCash(totalCash);
    setFirstCash(totalCash);

    const categorizedArray = Object.keys(categorizedMoney).map((method) => ({
      paymentMethod: method,
      amount: categorizedMoney[method],
    }));

    setCategorizedMoney(categorizedArray);
    return categorizedArray;
  };

  const handleAmountChange = (index, newValue, prevValue) => {
    const numericNewValue = Number(newValue) || 0;
    const numericPrevValue = Number(prevValue) || 0;

    setCash((prevCash) => prevCash + numericPrevValue - numericNewValue);
  };

  const onSubmit = async (values) => {
   
    if (hasbaCheck === false) {
      toast.error("برجاء تفعيل الحاسبة");
    } else if (checkOutGoings === false) {
      toast.error("برجاء حساب المخرجات");
    } else {
      values.outgoings = outgoings;
      values.categorizedMoney = categorizedMoney;

      if (cash >= 0) {
        values.companyDues = cash;
      } else if (cash < 0) {
        values.usedCompanyDues = -cash;
      }

      mutation.mutate(values);
  
    console.log(values)
    }
  };

  if (isLoading || salesMenLoading || usersDuesLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-12 w-12" />
      </div>
    );
  }

  if (isError) {
    return <div className="text-red-500 text-center py-10">حدث خطأ في تحميل بيانات التقرير</div>;
  }

  return (
    <div className="w-full py-6 flex flex-col gap-8 items-center">
      <h1 className="text-2xl font-bold">تعديل تقرير</h1>

      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize
 
      >
        {({ values, setFieldValue }) => (
          <Form className="w-[80%] mx-auto flex flex-col gap-8">



<FieldArray name="newOrders">
              {({ push, remove }) => (
                <div className="flex flex-col justify-center gap-10 items-center w-full">
                  {values?.newOrders?.map((_, index) => (
                    <div
                      key={index}
                      className="border-b py-10 px-4 w-[90%] bg-white rounded-md shadow-2xl flex flex-col lg:flex-row justify-center gap-10 items-center border-2"
                    >
                      <Field
                        name={`newOrders[${index}].depositPaymentMethod`}
                        as="select"
                        className="border-2 border-black rounded-lg p-2"
                      >
                        <option value="">طريقة دفع مبلغ العربون</option>
                        <option value="كاش">كاش</option>
                        <option value="تحويل بنك أهلي">تحويل بنك أهلي</option>
                        <option value="تحويل بنك راجحي">تحويل بنك راجحي</option>
                        <option value="supervisor">رقمي</option>
                      </Field>

                      <CustomInput
                        name={`newOrders[${index}].deposit`}
                        label="المبلغ"
                        type={"number"}
                      />

                      <Field
                        as="select"
                        name={`newOrders[${index}].salesMan`}
                        className="border-2 border-black rounded-lg p-2"
                      >
                        <option value="">اختر المندوب</option>
                        {salesMenItems.map((item) => (
                          <option value={item.name} key={item._id}>
                            {item.name}
                          </option>
                        ))}
                      </Field>

                      <Field
                        name={`newOrders[${index}].product`}
                        as="select"
                        className="border-2 border-black rounded-lg p-2"
                      >
                        <option value="">اختر المنتج</option>
                        {productItems?.map((item) => (
                          <option key={item._id} value={item.title}>
                            {item.title}
                          </option>
                        ))}
                      </Field>

                      <Button type="button" onClick={() => remove(index)}>
                        حذف
                      </Button>
                    </div>
                  ))}
                  <Button type="button" onClick={() => push(newOrdersObj)}>
                    إضافة طلب جديد
                  </Button>
                </div>
              )}
            </FieldArray>

            <h1>طلبات مسلمة</h1>

            <FieldArray name="deliveredOrders">
              {({ push, remove }) => (
                <div className="flex flex-col justify-center gap-10 items-center w-full">
                  {values?.deliveredOrders?.map((_, index) => (
                    <div
                      key={index}
                      className="border-b py-10 px-4 w-[90%] bg-white rounded-md shadow-2xl flex flex-col lg:flex-row justify-center gap-10 items-center border-2 flex-wrap"
                    >
                      <DialogDemo
                        setOrder={(order) => {
                          setRestCash(order?.remainingAmount || 0);

                          const newCommissionEntry = {
                            order: order?._id,
                            salesManName: order?.salesPerson?.name,
                            saledManId: order?.salesPerson?._id,
                            salesManComm: order.salesManCommission,
                            supervisorName: order?.supervisor?.name,
                            superVisorId: order?.supervisor?._id,
                            superVisorComm: order?.supervisorCommission,
                            deliveryCommisssion: order?.deliveryCommission || 0,
                            deliveryManName: order?.deliveryMan?.name,
                            deliveryManId: order?.deliveryMan?._id,
                          };

                          setUsersCommission((prev) => {
                            const updated = [...prev];
                            updated[index] = {
                              order: order?._id,
                              salesManName: order?.salesPerson?.name,
                              saledManId: order?.salesPerson?._id,
                              salesManComm: order.salesManCommission,
                              supervisorName: order?.supervisor?.name,
                              superVisorId: order?.supervisor?._id,
                              superVisorComm: order?.supervisorCommission,
                              deliveryCommisssion: order?.deliveryCommission || 0,
                              deliveryManName: order?.deliveryMan?.name,
                              deliveryManId: order?.deliveryMan?._id,
                            };
                            return updated;
                          });

                          const updatedDeliveredOrders = [...values?.deliveredOrders];
                          updatedDeliveredOrders[index] = {
                            ...updatedDeliveredOrders[index],
                            customerName: order.customerName || "",
                            deliveryReceipt: order.DeliveryReceipt || "",
                            order: order._id || "",
                            deservedSalesManCommission: order.salesManCommission || "",
                            deservedSupervisorCommission: order.supervisorCommission || "",
                            deliveryCommission: order.deliveryCommission || "",
                            salesMan: order?.salesPerson?.name || "",
                          };

                          setFieldValue("deliveredOrders", updatedDeliveredOrders);
                        }}
                      />
                      <CustomInput
                        name={`deliveredOrders[${index}].customerName`}
                        label="اسم العميل"
                        type={"text"}
                        disabled={true}
                      />
                      <CustomInput
                        name={`deliveredOrders[${index}].deliveryReceipt`}
                        label="رقم السند"
                        type={"text"}
                        disabled={true}
                      />
                      <CustomInput
                        name={`deliveredOrders[${index}].salesMan`}
                        label="المندوب"
                        type={"text"}
                        disabled={true}
                      />
                      <CustomInput
                        type={"number"}
                        name={`deliveredOrders[${index}].deservedSalesManCommission`}
                        label="العمولة المستحقة للمندوب"
                        disabled={true}
                      />
                      <CustomInput
                        type={"number"}
                        name={`deliveredOrders[${index}].deservedSupervisorCommission`}
                        label="العمولة المستحقة للمشرف"
                        disabled={true}
                      />
                      <CustomInput
                        type={"number"}
                        name={`deliveredOrders[${index}].deliveryCommission`}
                        label="عمولة التوصيل"
                        disabled={true}
                      />
                      <div>المبلغ الباقي لاستلام الطلب : {restCash}</div>
                      <FieldArray name={`deliveredOrders[${index}].restOrderCost`}>
                        {({ push: pushRestOrderCost, remove: removeRestOrderCost }) => (
                          <div className="flex flex-col gap-4 items-center w-full">
                            {values?.deliveredOrders[index]?.restOrderCost?.map(
                              (_, restIndex) => (
                                <div
                                  key={restIndex}
                                  className="flex flex-row-reverse flex-wrap gap-10 items-center w-[80%] justify-center pt-8 pb-6 rounded-md bg-gray-200"
                                >
                                  <CustomInput
                                    name={`deliveredOrders[${index}].restOrderCost[${restIndex}].amount`}
                                    label="المبلغ المتبقي"
                                    type={"number"}
                                  />
                                  <Field
                                    name={`deliveredOrders[${index}].restOrderCost[${restIndex}].paymentMethod`}
                                    as="select"
                                    className="border-2 border-black rounded-lg p-2"
                                  >
                                    <option value="">طريقة دفع الباقي</option>
                                    <option value="كاش">كاش</option>
                                    <option value="تحويل بنك أهلي">تحويل بنك أهلي</option>
                                    <option value="تحويل بنك راجحي">تحويل بنك راجحي</option>
                                    <option value="supervisor">رقمي</option>
                                  </Field>

                                  <Button
                                    type="button"
                                    onClick={() => removeRestOrderCost(restIndex)}
                                  >
                                    حذف
                                  </Button>
                                </div>
                              )
                            )}
                            <Button
                              type="button"
                              onClick={() => pushRestOrderCost(restMoneyObj)}
                            >
                              إضافة مبلغ متبقي
                            </Button>
                          </div>
                        )}
                      </FieldArray>

                      <Button type="button" onClick={() => remove(index)}>
                        حذف
                      </Button>
                    </div>
                  ))}
                  <Button type="button" onClick={() => push(deliveredOrdersObj)}>
                    إضافة طلب مسلّم
                  </Button>
                </div>
              )}
            </FieldArray>

            {/* Extra Deposits Section */}
            <h1>عربون اضافي</h1>
            <FieldArray name={`extraDeposits`}>
              {({ push: pushRestOrderCost, remove: removeRestOrderCost }) => (
                <div className="flex flex-col gap-4 items-center mx-auto bg-white p-4 w-[90%] rounded-md shadow-2xl">
                  {values?.extraDeposits?.map((_, restIndex) => (
                    <div
                      key={restIndex}
                      className="flex flex-row-reverse flex-wrap gap-10 items-center w-[80%] justify-center pt-8 pb-6 rounded-md bg-gray-200"
                    >
                      <DialogDemo
                        setOrder={(order) => {
                          const updatedDeliveredOrders = [...values?.extraDeposits];
                          updatedDeliveredOrders[restIndex] = {
                            ...updatedDeliveredOrders[restIndex],
                            order: order._id || "",
                          };
                          setFieldValue("extraDeposits", updatedDeliveredOrders);
                        }}
                      />
                      <CustomInput
                        name={`extraDeposits[${restIndex}].deposit`}
                        label="المبلغ"
                        type={"number"}
                      />
                      <CustomInput
                        name={`extraDeposits[${restIndex}].receipt`}
                        label="سند العربون اضافي"
                        type={"number"}
                      />
                      <Field
                        name={`extraDeposits[${restIndex}].paymentMethod`}
                        as="select"
                        className="border-2 border-black rounded-lg p-2"
                      >
                        <option value="">طريقة الدفع</option>
                        <option value="كاش">كاش</option>
                        <option value="تحويل بنك أهلي">تحويل بنك أهلي</option>
                        <option value="تحويل بنك راجحي">تحويل بنك راجحي</option>
                        <option value="supervisor">رقمي</option>
                      </Field>

                      <Button
                        type="button"
                        onClick={() => removeRestOrderCost(restIndex)}
                      >
                        حذف
                      </Button>
                    </div>
                  ))}
                  <Button type="button" onClick={() => pushRestOrderCost(depositOrder)}>
                    إضافة مبلغ متبقي
                  </Button>
                </div>
              )}
            </FieldArray>

            <div className="bg-white flex flex-col gap-10 items-center w-[90%] py-10 px-4 rounded-md shadow-2xl border-2 mx-auto">
              {hasbaCheck && (
                <div className="flex flex-col border-2 border-black p-4 rounded-md gap-2 w-full">
                  <h2>العمولات المستحقة</h2>
                  <div>{cashWithMe} الصندوق</div>
                  <div>{cash} اجمالي المبلغ لهذا التقرير</div>
                  <div>{cash + cashWithMe} الاجمالي الكلي:</div>
                  {commessions.map((item, i) =>
                    item.userId === undefined ? null : (
                      <div className="flex gap-2 w-full justify-between" key={i}>
                        <Input
                          type="number"
                          placeholder="العموله المسلمة"
                          className="w-[55%]"
                          value={commissionInputs[item.userId] || ""}
                          onChange={(e) =>
                            handleCommissionChange(item.userId, e.target.value)
                          }
                        />
                        <div className="flex w-[40%] justify-between">
                          <div>ر.س {item.userCommission}</div>
                          <div>{item.userName}</div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
              <Button type="button" onClick={() => hasba(values)}>
                الحاسبة
              </Button>

              <CustomInput type={"text"} name="description" label="الوصف" />
            </div>

            {/* User Dues Section */}
            <h1>مستحقات قديمة</h1>
            <FieldArray name={`userDues`}>
              {({ push: pushRestOrderCost, remove: removeRestOrderCost }) => (
                <div className="flex flex-col gap-4 items-center mx-auto bg-white p-4 w-[90%] rounded-md shadow-2xl">
                  {values?.userDues?.map((due, restIndex) => (
                    <div
                      key={restIndex}
                      className="flex flex-row-reverse flex-wrap gap-10 items-center w-[80%] justify-center pt-8 pb-6 rounded-md bg-gray-200"
                    >
                      <Field
                        name={`userDues[${restIndex}].userDuesDocId`}
                        as="select"
                        className="border-2 border-black rounded-lg p-2"
                      >
                        <option value="">
                          {usersDuesItems.length > 0
                            ? "اختر المستخدم"
                            : "لا يوجد مستحقات قديمة"}
                        </option>
                        {usersDuesItems.length > 0 &&
                          usersDuesItems?.map((item, index) => (
                            <option key={index} value={item._id}>
                              {item?.user?.name} :{item?.dues}
                            </option>
                          ))}
                      </Field>
                      <Field
                        name={`userDues[${restIndex}].gottenMoney`}
                        label="المبلغ"
                        type={"number"}
                        value={due?.gottenMoney || ""}
                        className="border-2 border-black rounded-lg p-2"
                        onChange={(e) => {
                          const prevValue =
                            values?.userDues?.[restIndex]?.gottenMoney || 0;
                          const newValue = e.target.value;
                          handleAmountChange(restIndex, newValue, prevValue);
                          setFieldValue(
                            `userDues[${restIndex}].gottenMoney`,
                            newValue
                          );
                        }}
                      />

                      <Button
                        type="button"
                        onClick={() => removeRestOrderCost(restIndex)}
                      >
                        حذف
                      </Button>
                    </div>
                  ))}
                  <Button type="button" onClick={() => pushRestOrderCost(userDuesObj)}>
                    إضافة
                  </Button>
                </div>
              )}
            </FieldArray>

            <h1 className="font-semibold">المصاريف</h1>

            <FieldArray name="burnOuts">
              {({ push, remove }) => (
                <div className="flex flex-col justify-center gap-10 items-center w-full">
                  {values?.burnOuts?.map((burnOut, index) => (
                    <div
                      key={index}
                      className="border-b py-10 px-4 w-[90%] bg-white rounded-md shadow-2xl flex flex-col lg:flex-row justify-center gap-10 items-center border-2"
                    >
                      <Field
                        name={`burnOuts[${index}].amount`}
                        type="number"
                        value={burnOut?.amount || ""}
                        onChange={(e) => {
                          const prevValue =
                            values?.burnOuts?.[index]?.amount || 0;
                          const newValue = e.target.value;
                          handleAmountChange(index, newValue, prevValue);
                          setFieldValue(`burnOuts[${index}].amount`, newValue);
                        }}
                        placeholder="المبلغ"
                        className="border-2 border-black rounded-lg p-2"
                        label="المبلغ"
                      />
                      <CustomInput
                        name={`burnOuts[${index}].description`}
                        label="الوصف"
                        type={"text"}
                      />

                      <Button type="button" onClick={() => remove(index)}>
                        حذف
                      </Button>
                    </div>
                  ))}
                  <Button type="button" onClick={() => push(burnOutsObj)}>
                    اضافة مصروف
                  </Button>
                </div>
              )}
            </FieldArray>
            
            <CustomInput
              name={`reportDate`}
              label="تاريخ التقرير"
              type={"date"}
            />

            {/* All other existing form fields... */}
            
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="animate-spin" />
                  جاري التعديل
                </div>
              ) : (
                "تعديل"
              )}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditReport;


// import React, { useEffect } from "react";
// import { Formik, Field, Form, FieldArray } from "formik";
// import * as Yup from "yup";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { Button } from "@/components/ui/button";
// import toast from "react-hot-toast";
// import Custom from "@/formik/CustomInput";
// import { addReportValidationSchema } from "@/validation/Validation";
// import { DialogDemo } from "@/components/MyOrdersDialog";
// import { useState } from "react";
// import { updateReport, getDuesOverMe, getUsersDues } from "../api/orders";
// import { useNavigate, useParams } from "react-router-dom";
// import { Loader2 } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import CustomInput from "@/formik/InputForAddReport";
// import { getSalesMan } from "../api/users";
// import { getProducts } from "../api/products";
// import { getOneReport } from "../api/orders";

// const EditReport = () => {
//   const [outgoings, setOutgoings] = useState([]);
//   const [commissionInputs, setCommissionInputs] = useState({});
//   const [commessions, setCommissions] = useState([]);
//   const [categorizedMoney, setCategorizedMoney] = useState([]);
//   const [cash, setCash] = useState(0);
//   const [previousValues, setPreviousValues] = useState({});
//   const [prevValue, setPrevValue] = useState(0);
//   const [restCash, setRestCash] = useState(0);
//   const { id } = useParams();

//   const {
//     data: details,
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["reports", id],
//     queryFn: () => getOneReport(id),
//   });

//   const { data: salesMen, isLoading: salesMenLoading } = useQuery({
//     queryKey: ["reportUsers"],
//     queryFn: getSalesMan,
//   });
//   const salesMenItems = salesMen?.data || [];

//   const { data: products } = useQuery({
//     queryKey: ["reportProducts"],
//     queryFn: getProducts,
//   });

//   const productItems = products?.data;

//   const { data: duesOverMe } = useQuery({
//     queryKey: ["duesOverMe"],
//     queryFn: getDuesOverMe,
//   });

//   const cashWithMe = duesOverMe?.dues || 0;

//   const handleCommissionChange = (userId, newValue) => {
//     const prevValue = previousValues[userId] || 0;
//     const newNumericValue = parseFloat(newValue) || 0;

//     setCash((prevCash) => prevCash + prevValue - newNumericValue);

//     setCommissionInputs((prev) => ({
//       ...prev,
//       [userId]: newValue,
//     }));

//     setPreviousValues((prev) => ({
//       ...prev,
//       [userId]: newNumericValue,
//     }));
//   };

//   const [checkOutGoings, setcheckOutGoings] = useState(false);

//   const generateOutgoings = () => {
//     if (hasbaCheck === false) {
//       toast.error("برجاء تفعيل الحاسبة");
//     } else {
//       return new Promise((resolve) => {
//         const newOutgoings = commessions
//           .filter((item) => item.userId !== undefined)
//           .map((item) => ({
//             user: item.userId,
//             deservedCommission: item.userCommission,
//             gottenCommission: commissionInputs[item.userId] || "0",
//           }));
//         toast.success("تم حساب المخرجات بنجاح");
//         setOutgoings((prev) => {
//           const updatedOutgoings = [...newOutgoings];
//           resolve(updatedOutgoings);
//           setcheckOutGoings(true);
//           return updatedOutgoings;
//         });
//       });
//     }
//   };

//   const [usersCommission, setUsersCommission] = useState([]);
//   const history = useNavigate();

//   const mutation = useMutation({
//     mutationKey: ["updateReport"],
//     mutationFn: (values) => updateReport(id, values),
//     onSuccess: (res) => {
//       if (res.status === "success") {
//         toast.success("تم تعديل التقرير بنجاح");
//         history("/home/myreports");
//       }
//     },
//     onError: (error) => {
//       toast.error("حدث خطأ أثناء التعديل");
//     },
//   });

//   const { data: usersDues, isLoading: usersDuesLoading } = useQuery({
//     queryKey: ["usersDues"],
//     queryFn: getUsersDues,
//   });

//   const usersDuesItems = usersDues?.data || [];

//   const restMoneyObj = { amount: "", paymentMethod: "" };
//   const depositOrder = { order: "", paymentMethod: "", deposit: "", receipt: "" };
//   const userDuesObj = {
//     userDuesDocId: "",
//     gottenMoney: "",
//   };
//   const burnOutsObj = {
//     description: "",
//     amount: "",
//   };
//   const deliveredOrdersObj = {
//     customerName: "",
//     deliveryReceipt: "",
//     order: "",
//     deservedSalesManCommission: "",
//     deservedSupervisorCommission: "",
//     deliveryCommission: "",
//     salesMan: "",
//     restOrderCost: [restMoneyObj],
//   };
//   const newOrdersObj = {
//     salesMan: "",
//     deposit: "",
//     depositPaymentMethod: "",
//     product: "",
//     quantity: "",
//   };

//   const [initialValues, setInitialValues] = useState({
//     newOrders: [],
//     deliveredOrders: [],
//     outgoings: [],
//     categorizedMoney: [],
//     burnOuts: [],
//     description: "",
//     reportDate: "",
//     extraDeposits: [],
//     userDues: [],
//   });

//   const [hasbaCheck, setHasbaCheck] = useState(false);
//   const [firstCash, setFirstCash] = useState(0);

//   const hasba = (values) => {
//     calculateCategorizedMoney(values);
//     aggregateUserCommissions(usersCommission);
//     setHasbaCheck(true);
//     setCommissionInputs({});
//     setPreviousValues({});
//   };

//   useEffect(() => {
//     if (details?.report) {
//       // Initialize commission inputs from existing report
//       const initialCommissions = {};
//       details.report.outgoings?.forEach((outgoing) => {
//         initialCommissions[outgoing.user] = outgoing.gottenCommission;
//       });

//       setInitialValues(details.report);
//       setOutgoings(details.report.outgoings || []);
//       setCategorizedMoney(details.report.categorizedMoney || []);
//       setCommissionInputs(initialCommissions);
//       setHasbaCheck(true);
//       setcheckOutGoings(true);
//     }

//     console.log("details", details);
//   }, [details]);

//   const aggregateUserCommissions = (userCommission) => {
//     const commissionMap = new Map();

//     userCommission.forEach(
//       ({
//         salesManName,
//         saledManId,
//         salesManComm,
//         supervisorName,
//         superVisorId,
//         superVisorComm,
//         deliveryManName,
//         deliveryManId,
//         deliveryCommisssion,
//       }) => {
//         // Process Salesman
//         if (commissionMap.has(saledManId)) {
//           commissionMap.get(saledManId).userCommission += salesManComm;
//         } else {
//           commissionMap.set(saledManId, {
//             userName: salesManName,
//             userId: saledManId,
//             userCommission: salesManComm,
//           });
//         }

//         // Process Supervisor / DeliveryMan
//         if (superVisorId === deliveryManId) {
//           if (commissionMap.has(superVisorId)) {
//             commissionMap.get(superVisorId).userCommission +=
//               superVisorComm + deliveryCommisssion;
//           } else {
//             commissionMap.set(superVisorId, {
//               userName: supervisorName,
//               userId: superVisorId,
//               userCommission: superVisorComm + deliveryCommisssion,
//             });
//           }
//         } else {
//           // Process Supervisor
//           if (commissionMap.has(superVisorId)) {
//             commissionMap.get(superVisorId).userCommission += superVisorComm;
//           } else {
//             commissionMap.set(superVisorId, {
//               userName: supervisorName,
//               userId: superVisorId,
//               userCommission: superVisorComm,
//             });
//           }

//           // Process DeliveryMan
//           if (commissionMap.has(deliveryManId)) {
//             commissionMap.get(deliveryManId).userCommission +=
//               deliveryCommisssion;
//           } else {
//             commissionMap.set(deliveryManId, {
//               userName: deliveryManName,
//               userId: deliveryManId,
//               userCommission: deliveryCommisssion,
//             });
//           }
//         }
//       }
//     );

//     setCommissions(Array.from(commissionMap.values()));
//     return Array.from(commissionMap.values());
//   };

//   const calculateCategorizedMoney = (values) => {
//     const categorizedMoney = {};
//     let totalCash = 0;

//     values.deliveredOrders.forEach((order) => {
//       order.restOrderCost.forEach(({ amount, paymentMethod }) => {
//         if (amount && paymentMethod) {
//           if (!categorizedMoney[paymentMethod]) {
//             categorizedMoney[paymentMethod] = 0;
//           }
//           categorizedMoney[paymentMethod] += parseFloat(amount);

//           if (paymentMethod === "كاش") {
//             totalCash += parseFloat(amount);
//           }
//         }
//       });
//     });

//     values.newOrders.forEach(({ deposit, depositPaymentMethod }) => {
//       if (deposit && depositPaymentMethod) {
//         if (!categorizedMoney[depositPaymentMethod]) {
//           categorizedMoney[depositPaymentMethod] = 0;
//         }
//         categorizedMoney[depositPaymentMethod] += parseFloat(deposit);

//         if (depositPaymentMethod === "كاش") {
//           totalCash += parseFloat(deposit);
//         }
//       }
//     });

//     values.extraDeposits.forEach(({ deposit, paymentMethod }) => {
//       if (deposit && paymentMethod) {
//         if (!categorizedMoney[paymentMethod]) {
//           categorizedMoney[paymentMethod] = 0;
//         }
//         categorizedMoney[paymentMethod] += parseFloat(deposit);

//         if (paymentMethod === "كاش") {
//           totalCash += parseFloat(deposit);
//         }
//       }
//     });

//     setCash(totalCash);
//     setFirstCash(totalCash);

//     const categorizedArray = Object.keys(categorizedMoney).map((method) => ({
//       paymentMethod: method,
//       amount: categorizedMoney[method],
//     }));

//     setCategorizedMoney(categorizedArray);
//     return categorizedArray;
//   };

//   const handleAmountChange = (index, newValue, prevValue) => {
//     const numericNewValue = Number(newValue) || 0;
//     const numericPrevValue = Number(prevValue) || 0;

//     setCash((prevCash) => prevCash + numericPrevValue - numericNewValue);
//   };

//   const formatDate = (date) => {
//     if (!date) return "N/A"; // Return a default value if the date is undefined
//     const validDate = new Date(date);
  
//     if (isNaN(validDate.getTime())) {
//       return "Invalid Date"; // Return a fallback value if the date is invalid
//     }
  
//     // Extract month, day, and year
//     const month = validDate.getMonth() + 1; // Months are zero-based
//     const day = validDate.getDate();
//     const year = validDate.getFullYear();
  
//     return `${day}/${month}/${year}`;
//   };

//   const onSubmit = async (values) => {
//     console.log("values", values);
//     if (hasbaCheck === false) {
//       toast.error("برجاء تفعيل الحاسبة");
//     } else if (checkOutGoings === false) {
//       toast.error("برجاء حساب المخرجات");
//     } else {
//       values.outgoings = outgoings;
//       values.categorizedMoney = categorizedMoney;
      

//       if (cash >= 0) {
//         values.companyDues = cash;
//       } else if (cash < 0) {
//         values.usedCompanyDues = -cash;
//       }

//     //   mutation.mutate(values);
//     console.log("values", values);
//     }
//   };

//   if (isLoading || salesMenLoading || usersDuesLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <Loader2 className="animate-spin h-12 w-12" />
//       </div>
//     );
//   }

//   if (isError) {
//     return <div className="text-red-500 text-center py-10">حدث خطأ في تحميل بيانات التقرير</div>;
//   }

//   return (
//     <div className="w-full py-6 flex flex-col gap-8 items-center">
//       <h1 className="text-2xl font-bold">تعديل تقرير</h1>

//       <Formik
//         initialValues={initialValues}
//         onSubmit={onSubmit}
//         enableReinitialize
//         validationSchema={addReportValidationSchema}
//       >
//         {({ values, setFieldValue }) => (
//           <Form className="w-[80%] mx-auto flex flex-col gap-8">
//             {/* New Orders */}
//             <h1 className="font-semibold">طلبات جديدة</h1>

//             <FieldArray name="newOrders">
//               {({ push, remove }) => (
//                 <div className="flex flex-col justify-center gap-10 items-center w-full">
//                   {values?.newOrders?.map((_, index) => (
//                     <div
//                       key={index}
//                       className="border-b py-10 px-4 w-[90%] bg-white rounded-md shadow-2xl flex flex-col lg:flex-row justify-center gap-10 items-center border-2"
//                     >
//                       <Field
//                         name={`newOrders[${index}].depositPaymentMethod`}
//                         as="select"
//                         className="border-2 border-black rounded-lg p-2"
//                       >
//                         <option value="">طريقة دفع مبلغ العربون</option>
//                         <option value="كاش">كاش</option>
//                         <option value="تحويل بنك أهلي">تحويل بنك أهلي</option>
//                         <option value="تحويل بنك راجحي">تحويل بنك راجحي</option>
//                         <option value="supervisor">رقمي</option>
//                       </Field>

//                       <CustomInput
//                         name={`newOrders[${index}].deposit`}
//                         label="المبلغ"
//                         type={"number"}
//                       />

//                       <Field
//                         as="select"
//                         name={`newOrders[${index}].salesMan`}
//                         className="border-2 border-black rounded-lg p-2"
//                       >
//                         <option value="">اختر المندوب</option>
//                         {salesMenItems.map((item) => (
//                           <option value={item.name} key={item._id}>
//                             {item.name}
//                           </option>
//                         ))}
//                       </Field>

//                       <Field
//                         name={`newOrders[${index}].product`}
//                         as="select"
//                         className="border-2 border-black rounded-lg p-2"
//                       >
//                         <option value="">اختر المنتج</option>
//                         {productItems?.map((item) => (
//                           <option key={item._id} value={item.title}>
//                             {item.title}
//                           </option>
//                         ))}
//                       </Field>

//                       <Button type="button" onClick={() => remove(index)}>
//                         حذف
//                       </Button>
//                     </div>
//                   ))}
//                   <Button type="button" onClick={() => push(newOrdersObj)}>
//                     إضافة طلب جديد
//                   </Button>
//                 </div>
//               )}
//             </FieldArray>

//             <h1>طلبات مسلمة</h1>

//             <FieldArray name="deliveredOrders">
//               {({ push, remove }) => (
//                 <div className="flex flex-col justify-center gap-10 items-center w-full">
//                   {values?.deliveredOrders?.map((_, index) => (
//                     <div
//                       key={index}
//                       className="border-b py-10 px-4 w-[90%] bg-white rounded-md shadow-2xl flex flex-col lg:flex-row justify-center gap-10 items-center border-2 flex-wrap"
//                     >
//                       <DialogDemo
//                         setOrder={(order) => {
//                           setRestCash(order?.remainingAmount || 0);

//                           const newCommissionEntry = {
//                             order: order?._id,
//                             salesManName: order?.salesPerson?.name,
//                             saledManId: order?.salesPerson?._id,
//                             salesManComm: order.salesManCommission,
//                             supervisorName: order?.supervisor?.name,
//                             superVisorId: order?.supervisor?._id,
//                             superVisorComm: order?.supervisorCommission,
//                             deliveryCommisssion: order?.deliveryCommission || 0,
//                             deliveryManName: order?.deliveryMan?.name,
//                             deliveryManId: order?.deliveryMan?._id,
//                           };

//                           setUsersCommission((prev) => {
//                             const updated = [...prev];
//                             updated[index] = {
//                               order: order?._id,
//                               salesManName: order?.salesPerson?.name,
//                               saledManId: order?.salesPerson?._id,
//                               salesManComm: order.salesManCommission,
//                               supervisorName: order?.supervisor?.name,
//                               superVisorId: order?.supervisor?._id,
//                               superVisorComm: order?.supervisorCommission,
//                               deliveryCommisssion: order?.deliveryCommission || 0,
//                               deliveryManName: order?.deliveryMan?.name,
//                               deliveryManId: order?.deliveryMan?._id,
//                             };
//                             return updated;
//                           });

//                           const updatedDeliveredOrders = [...values?.deliveredOrders];
//                           updatedDeliveredOrders[index] = {
//                             ...updatedDeliveredOrders[index],
//                             customerName: order.customerName || "",
//                             deliveryReceipt: order.DeliveryReceipt || "",
//                             order: order._id || "",
//                             deservedSalesManCommission: order.salesManCommission || "",
//                             deservedSupervisorCommission: order.supervisorCommission || "",
//                             deliveryCommission: order.deliveryCommission || "",
//                             salesMan: order?.salesPerson?.name || "",
//                           };

//                           setFieldValue("deliveredOrders", updatedDeliveredOrders);
//                         }}
//                       />
//                       <CustomInput
//                         name={`deliveredOrders[${index}].customerName`}
//                         label="اسم العميل"
//                         type={"text"}
//                         disabled={true}
//                       />
//                       <CustomInput
//                         name={`deliveredOrders[${index}].deliveryReceipt`}
//                         label="رقم السند"
//                         type={"text"}
//                         disabled={true}
//                       />
//                       <CustomInput
//                         name={`deliveredOrders[${index}].salesMan`}
//                         label="المندوب"
//                         type={"text"}
//                         disabled={true}
//                       />
//                       <CustomInput
//                         type={"number"}
//                         name={`deliveredOrders[${index}].deservedSalesManCommission`}
//                         label="العمولة المستحقة للمندوب"
//                         disabled={true}
//                       />
//                       <CustomInput
//                         type={"number"}
//                         name={`deliveredOrders[${index}].deservedSupervisorCommission`}
//                         label="العمولة المستحقة للمشرف"
//                         disabled={true}
//                       />
//                       <CustomInput
//                         type={"number"}
//                         name={`deliveredOrders[${index}].deliveryCommission`}
//                         label="عمولة التوصيل"
//                         disabled={true}
//                       />
//                       <div>المبلغ الباقي لاستلام الطلب : {restCash}</div>
//                       <FieldArray name={`deliveredOrders[${index}].restOrderCost`}>
//                         {({ push: pushRestOrderCost, remove: removeRestOrderCost }) => (
//                           <div className="flex flex-col gap-4 items-center w-full">
//                             {values?.deliveredOrders[index]?.restOrderCost?.map(
//                               (_, restIndex) => (
//                                 <div
//                                   key={restIndex}
//                                   className="flex flex-row-reverse flex-wrap gap-10 items-center w-[80%] justify-center pt-8 pb-6 rounded-md bg-gray-200"
//                                 >
//                                   <CustomInput
//                                     name={`deliveredOrders[${index}].restOrderCost[${restIndex}].amount`}
//                                     label="المبلغ المتبقي"
//                                     type={"number"}
//                                   />
//                                   <Field
//                                     name={`deliveredOrders[${index}].restOrderCost[${restIndex}].paymentMethod`}
//                                     as="select"
//                                     className="border-2 border-black rounded-lg p-2"
//                                   >
//                                     <option value="">طريقة دفع الباقي</option>
//                                     <option value="كاش">كاش</option>
//                                     <option value="تحويل بنك أهلي">تحويل بنك أهلي</option>
//                                     <option value="تحويل بنك راجحي">تحويل بنك راجحي</option>
//                                     <option value="supervisor">رقمي</option>
//                                   </Field>

//                                   <Button
//                                     type="button"
//                                     onClick={() => removeRestOrderCost(restIndex)}
//                                   >
//                                     حذف
//                                   </Button>
//                                 </div>
//                               )
//                             )}
//                             <Button
//                               type="button"
//                               onClick={() => pushRestOrderCost(restMoneyObj)}
//                             >
//                               إضافة مبلغ متبقي
//                             </Button>
//                           </div>
//                         )}
//                       </FieldArray>

//                       <Button type="button" onClick={() => remove(index)}>
//                         حذف
//                       </Button>
//                     </div>
//                   ))}
//                   <Button type="button" onClick={() => push(deliveredOrdersObj)}>
//                     إضافة طلب مسلّم
//                   </Button>
//                 </div>
//               )}
//             </FieldArray>

//             {/* Extra Deposits Section */}
//             <h1>عربون اضافي</h1>
//             <FieldArray name={`extraDeposits`}>
//               {({ push: pushRestOrderCost, remove: removeRestOrderCost }) => (
//                 <div className="flex flex-col gap-4 items-center mx-auto bg-white p-4 w-[90%] rounded-md shadow-2xl">
//                   {values?.extraDeposits?.map((_, restIndex) => (
//                     <div
//                       key={restIndex}
//                       className="flex flex-row-reverse flex-wrap gap-10 items-center w-[80%] justify-center pt-8 pb-6 rounded-md bg-gray-200"
//                     >
//                       <DialogDemo
//                         setOrder={(order) => {
//                           const updatedDeliveredOrders = [...values?.extraDeposits];
//                           updatedDeliveredOrders[restIndex] = {
//                             ...updatedDeliveredOrders[restIndex],
//                             order: order._id || "",
//                           };
//                           setFieldValue("extraDeposits", updatedDeliveredOrders);
//                         }}
//                       />
//                       <CustomInput
//                         name={`extraDeposits[${restIndex}].deposit`}
//                         label="المبلغ"
//                         type={"number"}
//                       />
//                       <CustomInput
//                         name={`extraDeposits[${restIndex}].receipt`}
//                         label="سند العربون اضافي"
//                         type={"number"}
//                       />
//                       <Field
//                         name={`extraDeposits[${restIndex}].paymentMethod`}
//                         as="select"
//                         className="border-2 border-black rounded-lg p-2"
//                       >
//                         <option value="">طريقة الدفع</option>
//                         <option value="كاش">كاش</option>
//                         <option value="تحويل بنك أهلي">تحويل بنك أهلي</option>
//                         <option value="تحويل بنك راجحي">تحويل بنك راجحي</option>
//                         <option value="supervisor">رقمي</option>
//                       </Field>

//                       <Button
//                         type="button"
//                         onClick={() => removeRestOrderCost(restIndex)}
//                       >
//                         حذف
//                       </Button>
//                     </div>
//                   ))}
//                   <Button type="button" onClick={() => pushRestOrderCost(depositOrder)}>
//                     إضافة مبلغ متبقي
//                   </Button>
//                 </div>
//               )}
//             </FieldArray>

//             <div className="bg-white flex flex-col gap-10 items-center w-[90%] py-10 px-4 rounded-md shadow-2xl border-2 mx-auto">
//               {hasbaCheck && (
//                 <div className="flex flex-col border-2 border-black p-4 rounded-md gap-2 w-full">
//                   <h2>العمولات المستحقة</h2>
//                   <div>{cashWithMe} الصندوق</div>
//                   <div>{cash} اجمالي المبلغ لهذا التقرير</div>
//                   <div>{cash + cashWithMe} الاجمالي الكلي:</div>
//                   {commessions.map((item, i) =>
//                     item.userId === undefined ? null : (
//                       <div className="flex gap-2 w-full justify-between" key={i}>
//                         <Input
//                           type="number"
//                           placeholder="العموله المسلمة"
//                           className="w-[55%]"
//                           value={commissionInputs[item.userId] || ""}
//                           onChange={(e) =>
//                             handleCommissionChange(item.userId, e.target.value)
//                           }
//                         />
//                         <div className="flex w-[40%] justify-between">
//                           <div>ر.س {item.userCommission}</div>
//                           <div>{item.userName}</div>
//                         </div>
//                       </div>
//                     )
//                   )}
//                 </div>
//               )}
//               <Button type="button" onClick={() => hasba(values)}>
//                 الحاسبة
//               </Button>

//               <CustomInput type={"text"} name="description" label="الوصف" />
//             </div>

//             {/* User Dues Section */}
//             <h1>مستحقات قديمة</h1>
//             <FieldArray name={`userDues`}>
//               {({ push: pushRestOrderCost, remove: removeRestOrderCost }) => (
//                 <div className="flex flex-col gap-4 items-center mx-auto bg-white p-4 w-[90%] rounded-md shadow-2xl">
//                   {values?.userDues?.map((due, restIndex) => (
//                     <div
//                       key={restIndex}
//                       className="flex flex-row-reverse flex-wrap gap-10 items-center w-[80%] justify-center pt-8 pb-6 rounded-md bg-gray-200"
//                     >
//                       <Field
//                         name={`userDues[${restIndex}].userDuesDocId`}
//                         as="select"
//                         className="border-2 border-black rounded-lg p-2"
//                       >
//                         <option value="">
//                           {usersDuesItems.length > 0
//                             ? "اختر المستخدم"
//                             : "لا يوجد مستحقات قديمة"}
//                         </option>
//                         {usersDuesItems.length > 0 &&
//                           usersDuesItems?.map((item, index) => (
//                             <option key={index} value={item._id}>
//                               {item?.user?.name} :{item?.dues}
//                             </option>
//                           ))}
//                       </Field>
//                       <Field
//                         name={`userDues[${restIndex}].gottenMoney`}
//                         label="المبلغ"
//                         type={"number"}
//                         value={due?.gottenMoney || ""}
//                         className="border-2 border-black rounded-lg p-2"
//                         onChange={(e) => {
//                           const prevValue =
//                             values?.userDues?.[restIndex]?.gottenMoney || 0;
//                           const newValue = e.target.value;
//                           handleAmountChange(restIndex, newValue, prevValue);
//                           setFieldValue(
//                             `userDues[${restIndex}].gottenMoney`,
//                             newValue
//                           );
//                         }}
//                       />

//                       <Button
//                         type="button"
//                         onClick={() => removeRestOrderCost(restIndex)}
//                       >
//                         حذف
//                       </Button>
//                     </div>
//                   ))}
//                   <Button type="button" onClick={() => pushRestOrderCost(userDuesObj)}>
//                     إضافة
//                   </Button>
//                 </div>
//               )}
//             </FieldArray>

//             <h1 className="font-semibold">المصاريف</h1>

//             <FieldArray name="burnOuts">
//               {({ push, remove }) => (
//                 <div className="flex flex-col justify-center gap-10 items-center w-full">
//                   {values?.burnOuts?.map((burnOut, index) => (
//                     <div
//                       key={index}
//                       className="border-b py-10 px-4 w-[90%] bg-white rounded-md shadow-2xl flex flex-col lg:flex-row justify-center gap-10 items-center border-2"
//                     >
//                       <Field
//                         name={`burnOuts[${index}].amount`}
//                         type="number"
//                         value={burnOut?.amount || ""}
//                         onChange={(e) => {
//                           const prevValue =
//                             values?.burnOuts?.[index]?.amount || 0;
//                           const newValue = e.target.value;
//                           handleAmountChange(index, newValue, prevValue);
//                           setFieldValue(`burnOuts[${index}].amount`, newValue);
//                         }}
//                         placeholder="المبلغ"
//                         className="border-2 border-black rounded-lg p-2"
//                         label="المبلغ"
//                       />
//                       <CustomInput
//                         name={`burnOuts[${index}].description`}
//                         label="الوصف"
//                         type={"text"}
//                       />

//                       <Button type="button" onClick={() => remove(index)}>
//                         حذف
//                       </Button>
//                     </div>
//                   ))}
//                   <Button type="button" onClick={() => push(burnOutsObj)}>
//                     اضافة مصروف
//                   </Button>
//                 </div>
//               )}
//             </FieldArray>

//             <CustomInput
//               name={`reportDate`}
//               label="تاريخ التقرير"
//               type={"date"}
//             />

//             <Button onClick={generateOutgoings} type="button">
//               حساب المخرجات
//             </Button>

//             <Button type="submit" disabled={mutation.isPending}>
//               {mutation.isPending ? (
//                 <div className="flex items-center gap-2">
//                   <Loader2 className="animate-spin" />
//                   جاري التعديل
//                 </div>
//               ) : (
//                 "تعديل"
//               )}
//             </Button>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default EditReport;





