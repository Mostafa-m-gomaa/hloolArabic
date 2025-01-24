import React from "react";
import { Formik, Field, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

// API Function
const createReport = async (data) => {
  // Replace with your API call
  const response = await fetch("/api/create-report", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create report");
  return response.json();
};

// Validation Schema
const validationSchema = Yup.object().shape({
  newOrders: Yup.array().of(
    Yup.object().shape({
      salesMan: Yup.string().required("اسم المندوب مطلوب"),
      deposit: Yup.number()
        .required("المبلغ مطلوب")
        .min(0, "المبلغ يجب أن يكون أكبر من صفر"),
      depositPaymentMethod: Yup.string().required("طريقة الدفع مطلوبة"),
      product: Yup.string().required("المنتج مطلوب"),
    })
  ),
  deliveredOrders: Yup.array().of(
    Yup.object().shape({
      customerName: Yup.string().required("اسم العميل مطلوب"),
      deliveryReceipt: Yup.string().required("رقم السند مطلوب"),
      orderId: Yup.string().required("رقم الطلب مطلوب"),
      deservedSalesManCommission: Yup.number()
        .required("العمولة المستحقة مطلوبة")
        .min(0, "العمولة يجب أن تكون أكبر من صفر"),
      salesManGottenCommission: Yup.number().required("العمولة المستلمة مطلوبة"),
      deservedSupervisorCommission: Yup.number().required(
        "العمولة المستحقة للمشرف مطلوبة"
      ),
      supervisorGottenCommission: Yup.number().required(
        "العمولة المستلمة للمشرف مطلوبة"
      ),
      deliveryCommission: Yup.number().required("عمولة التوصيل مطلوبة"),
      restOrderCost: Yup.array().of(
        Yup.object().shape({
          amount: Yup.number()
            .required("المبلغ المتبقي مطلوب")
            .min(0, "المبلغ يجب أن يكون أكبر من صفر"),
          paymentMethod: Yup.string().required("طريقة الدفع مطلوبة"),
        })
      ),
    })
  ),
  fuelCost: Yup.number()
    .required("تكلفة الوقود مطلوبة")
    .min(0, "التكلفة يجب أن تكون أكبر من صفر"),
  description: Yup.string().required("الوصف مطلوب"),
});

const CreateReport = () => {
//   const mutation = useMutation(createReport, {
//     onSuccess: () => {
//       toast.success("تم إنشاء التقرير بنجاح");
//     },
//     onError: () => {
//       toast.error("حدث خطأ أثناء إنشاء التقرير");
//     },
//   });

  const initialValues = {
    newOrders: [
      { salesMan: "", deposit: "", depositPaymentMethod: "", product: "" },
    ],
    deliveredOrders: [
      {
        customerName: "",
        deliveryReceipt: "",
        orderId: "",
        deservedSalesManCommission: "",
        salesManGottenCommission: "",
        deservedSupervisorCommission: "",
        supervisorGottenCommission: "",
        deliveryCommission: "",
        restOrderCost: [{ amount: "", paymentMethod: "" }],
      },
    ],
    fuelCost: "",
    description: "",
  };

  const onSubmit = (values) => {
    // mutation.mutate(values);
    console.log(values);
  };

  return (
    <div className="w-full py-6">

   
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
     
    >
      {({ values, errors, touched, isSubmitting }) => (
        <Form  className="w-[80%] mx-auto">
          <h1 className="text-xl font-bold">إنشاء تقرير</h1>

          {/* New Orders */}
          <FieldArray name="newOrders">
            {({ push, remove }) => (
              <div>
                <h2 className="font-semibold">طلبات جديدة</h2>
                {values.newOrders.map((_, index) => (
                  <div key={index} className="space-y-4 border-b pb-4">
                    <Field
                      name={`newOrders[${index}].salesMan`}
                      placeholder="اسم المندوب"
                      className="input"
                    />
                    <Field
                      name={`newOrders[${index}].deposit`}
                      placeholder="المبلغ"
                      type="number"
                      className="input"
                    />
                    <Field
                      name={`newOrders[${index}].depositPaymentMethod`}
                      placeholder="طريقة الدفع"
                      className="input"
                    />
                    <Field
                      name={`newOrders[${index}].product`}
                      placeholder="المنتج"
                      className="input"
                    />
                    <Button onClick={() => remove(index)}>حذف</Button>
                  </div>
                ))}
                <Button onClick={() => push({ salesMan: "", deposit: "", depositPaymentMethod: "", product: "" })}>
                  إضافة طلب جديد
                </Button>
              </div>
            )}
          </FieldArray>
          <FieldArray name="deliveredOrders">
            {({ push, remove }) => (
              <div>
                <h2 className="font-semibold">طلبات مسلمة</h2>
                {values.deliveredOrders.map((_, index) => (
                  <div key={index} className="space-y-4 border-b pb-4">
                    <Field
                      name={`deliveredOrders[${index}].customerName`}
                      placeholder="اسم العميل"
                      className="input"
                    />
                    <Field
                      name={`deliveredOrders[${index}].deliveryReceipt`}
                      placeholder="رقم السند"
                      className="input"
                    />
                    <Field
                      name={`deliveredOrders[${index}].orderId`}
                      placeholder="رقم الطلب"
                      className="input"
                    />
                    <Field name={`deliveredOrders[${index}].deservedSalesManCommission`} placeholder="العمولة المستحقة" type="number" className="input" />
                    <Field name={`deliveredOrders[${index}].salesManGottenCommission`} placeholder="العمولة المستلمة" type="number" className="input" />
                    <Field name={`deliveredOrders[${index}].deservedSupervisorCommission`} placeholder="العمولة المستحقة للمشرف" type="number" className="input" />
                    <Field name={`deliveredOrders[${index}].supervisorGottenCommission`} placeholder="العمولة المستلمة للمشرف" type="number" className="input" />
                    <Field name={`deliveredOrders[${index}].deliveryCommission`} placeholder="عمولة التوصيل" type="number" className="input" />
                    
                   
                    <Button onClick={() => remove(index)}>حذف</Button>
                  </div>
                ))}
                <Button onClick={() => push({ /* Default deliveredOrder object */ })}>
                  إضافة طلب مسلّم
                </Button>
              </div>
            )}
          </FieldArray>

          {/* Fuel Cost */}
          <Field
            name="fuelCost"
            placeholder="تكلفة الوقود"
            type="number"
            className="input"
          />

          {/* Description */}
          <Field
            name="description"
            placeholder="الوصف"
            as="textarea"
            className="textarea"
          />

          {/* Submit Button */}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "جاري الإرسال..." : "إرسال"}
          </Button>
        </Form>
      )}
    </Formik>
    </div>
  );
};

export default CreateReport;
