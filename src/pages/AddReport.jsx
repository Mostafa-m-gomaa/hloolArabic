import React from "react";
import { Formik, Field, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import Custom from "@/formik/CustomInput";
import { addReportValidationSchema } from "@/validation/Validation";
import { DialogDemo } from "@/components/MyOrdersDialog";
import { useState } from "react";
import { createReport } from "@/api/orders";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";







const CreateReport = () => {
  const history = useNavigate();
const mutation =useMutation({
  mutationKey:"createReport",
  mutationFn:(values)=>createReport(values),
  onSuccess:(res)=>{
   

    if(res.status === "success"){
      toast.success("تم انشاء التقرير بنجاح")
      history("/home/myreports")
    }
  },
  onError:(error)=>{
    toast.error("حدث خطأ")
  }
})



const restMoneyObj={amount: "",paymentMethod: "",}
const deliveredOrdersObj = {
  customerName: "",
  deliveryReceipt: "",
  order: "",
  deservedSalesManCommission: "",
  salesManGottenCommission: "",
  deservedSupervisorCommission: "",
  supervisorGottenCommission: "",
  deliveryCommission: "",
  restOrderCost: [restMoneyObj],
};
const newOrdersObj = {
  salesMan: "",
  deposit: "",
  depositPaymentMethod: "",
  product: "",
};

  const initialValues = {
    newOrders: [newOrdersObj],
    deliveredOrders: [deliveredOrdersObj],
    fuelCost: "50",
    description: "",
  };

  const onSubmit = (values) => {
    mutation.mutate(values);
  
   
  };

  return (
    <div className="w-full py-6 flex flex-col gap-8 items-center">
          <h1>إنشاء تقرير</h1>

   
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
      validationSchema={addReportValidationSchema}
     
    >
      {({ values, setFieldValue }) => (
        <Form  className="w-[80%] mx-auto flex flex-col gap-8">
          {/* New Orders */}
          <h1 className="font-semibold">طلبات جديدة</h1>

          <FieldArray name="newOrders" >
            
            {({ push, remove }) => (
              <div className="flex flex-col justify-center gap-10 items-center  w-full  ">
       
                {values.newOrders.map((_, index) => (
                  <div key={index} className=" border-b py-10 px-4 w-[90%] bg-white rounded-md shadow-2xl flex flex-col lg:flex-row  justify-center gap-10 items-center border-2 ">
                    <Custom
                      name={`newOrders[${index}].salesMan`}
                      label="اسم المندوب"
                    />
                    <Custom
                      name={`newOrders[${index}].deposit`}
                      label="المبلغ"
                      
                    
                    />
                    <Field
                      name={`newOrders[${index}].depositPaymentMethod`}
                      as="select"
                      className="border-2 border-black rounded-lg p-2"
                    
                    >   <option value="">طريقة دفع الدفعة المقدمة</option>
                    <option value="كاش">كاش</option>
                    <option value="تحويل بنك أهلي">تحويل بنك أهلي</option>
                    <option value="تحويل بنك راجحي">تحويل بنك راجحي</option>
                    <option value="supervisor">رقمي</option>
                    </Field>
                    <Custom
                      name={`newOrders[${index}].product`}
                      label="المنتج"
                   
                    />
                    <Button onClick={() => remove(index)}>حذف</Button>
                  </div>
                ))}
                <Button type="button" onClick={() => push(newOrdersObj)}>
                  إضافة طلب جديد
                </Button>
              </div>
            )}
          </FieldArray>
          <h1 >طلبات مسلمة</h1>

          <FieldArray name="deliveredOrders">
            {({ push, remove }) => (
             <div className="flex flex-col justify-center gap-10 items-center  w-full ">
                {values.deliveredOrders.map((_, index) => (
                <div key={index} className=" border-b py-10 px-4 w-[90%] bg-white rounded-md shadow-2xl flex flex-col lg:flex-row  justify-center gap-10 items-center border-2 flex-wrap ">
                        <DialogDemo
                        setOrder={(order) => {
                          const updatedDeliveredOrders = [
                            ...values.deliveredOrders,
                          ];
                          updatedDeliveredOrders[index] = {
                            ...updatedDeliveredOrders[index],
                            customerName: order.customerName || "",
                            deliveryReceipt: order.DeliveryReceipt || "",
                            order: order._id || "",
                            deservedSalesManCommission:
                              order.salesManCommission || "",
                              deservedSupervisorCommission: order.supervisorCommission || "",
                              deliveryReceipt : order.deliveryReceipt || "",
                            deliveryCommission: order.deliveryCommission || "",
                       
                          };
                          setFieldValue(
                            "deliveredOrders",
                            updatedDeliveredOrders
                          );
                        }}
                      />
                    <Custom
                      name={`deliveredOrders[${index}].customerName`}
                      label="اسم العميل"
                       
                    />
                    <Custom
                      name={`deliveredOrders[${index}].deliveryReceipt`}
                      label="رقم السند"
                       
                    />
                   
                    {/* <Custom name={`deliveredOrders[${index}].orderId`} label="رقم الطلب"/> */}
                    <Custom name={`deliveredOrders[${index}].deservedSalesManCommission`} label="العمولة المستحقة للمندوب"   />
                    <Custom name={`deliveredOrders[${index}].salesManGottenCommission`} label="العمولة المسلمة للمندوب"   />
                    <Custom name={`deliveredOrders[${index}].deservedSupervisorCommission`} label="العمولة المستحقة للمشرف"  />
                    <Custom name={`deliveredOrders[${index}].supervisorGottenCommission`} label="العمولة المستلمة للمشرف"  />
                    <Custom name={`deliveredOrders[${index}].deliveryCommission`} label="عمولة التوصيل" />
                    <FieldArray name={`deliveredOrders[${index}].restOrderCost`}>
                      {({ push: pushRestOrderCost, remove: removeRestOrderCost }) => (
                        <div className="flex flex-col gap-4 items-center w-full ">
                          {values.deliveredOrders[index].restOrderCost.map((_, restIndex) => (
                            <div key={restIndex} className="flex flex-row-reverse flex-wrap  gap-10 items-center w-[80%] justify-center pt-8 pb-6 rounded-md  bg-gray-200 ">
                              <Custom
                                name={`deliveredOrders[${index}].restOrderCost[${restIndex}].amount`}
                                label="المبلغ المتبقي"
                             
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

                              <Button onClick={() => removeRestOrderCost(restIndex)}>حذف</Button>
                            </div>
                          ))}
                          <Button type="button" onClick={() => pushRestOrderCost(restMoneyObj)}>
                            إضافة مبلغ متبقي
                          </Button>
                        </div>
                      )}
                    </FieldArray>
                    
                   
                    <Button onClick={() => remove(index)}>حذف</Button>
                  </div>
                ))}
                <Button type="button" onClick={() => push(deliveredOrdersObj)}>
                  إضافة طلب مسلّم
                </Button>
              </div>
            )}
          </FieldArray>
          <div className="bg-white flex flex-col gap-10 items-center w-[90%] py-10 px-4 rounded-md shadow-2xl border-2 mx-auto" >

            <Custom name="fuelCost"
              label="تكلفة الوقود" />
            <Custom
              name="description"
              label="الوصف"
            
            />
          </div>


            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="animate-spin" />
جاري الإنشاء
                </div>
              ) : (
                "إنشاء"
              )}
            </Button>
        </Form>
      )}
    </Formik>
    </div>
  );
};

export default CreateReport;
