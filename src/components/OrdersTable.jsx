import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"



export function OrdersTable({orders}) {
  const theOrders = orders || []
  console.log(orders)

 const role = localStorage.getItem("role")

   const formatDate = (date) => {
    if (!date) return "N/A"; // Return a default value if the date is undefined
    const validDate = new Date(date);
  
    if (isNaN(validDate.getTime())) {
      return "Invalid Date"; // Return a fallback value if the date is invalid
    }
  
    const nyDate = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York",
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(validDate);
  
    return nyDate;
  };
  return (
    <div className="h-[70vh] overflow-y-auto bg-white">

   
    <Table className="w-[95%] mx-auto rtl p-2 table-fixed relative">
      <TableHeader className=" bg-gray-100 ">
        <TableRow className="capitalize text-[15px] lg:text-[20px] font-bold *:w-[200px] *:border-2">
          <TableHead className="">المنتج</TableHead>
          <TableHead className="">اسم العميل</TableHead>
          <TableHead className="">رقم سند العربون</TableHead>
          <TableHead className ="">الجنس</TableHead>
          <TableHead className="">المتبقي علي انتهاء المنتج</TableHead>
          <TableHead className=""> تاريخ الميلاد العميل</TableHead>
          <TableHead className="">اسم المشرف</TableHead>
          <TableHead className="">اسم المندوب</TableHead>
          <TableHead className="">تاريخ البيع</TableHead>
          <TableHead className="">الكمية</TableHead>
          <TableHead className="">سعر المنتج</TableHead>
          <TableHead className="">سعر الطلبية</TableHead>
          <TableHead className="">العربون</TableHead>
          <TableHead className="">طريقة دفع العربون</TableHead>
          <TableHead className="">المتبقي منذ دفع العربون</TableHead>
          <TableHead className ="">المبلغ المتبقي للطلب</TableHead>
          <TableHead className ="">مسئول التوصيل</TableHead>
          <TableHead className="">تاريخ التسليم</TableHead>
          <TableHead className="">سند التسليم</TableHead>
          <TableHead className="">اصدار البطاقة</TableHead>
          <TableHead className="">طريقة دفع الدفعه الباقي</TableHead>
          <TableHead className="">عمولة المشرف</TableHead>
          <TableHead className="">عمولة المندوب</TableHead>
          <TableHead className ="">عمولة التوصيل</TableHead>
          <TableHead className="">حالة التوصيل</TableHead>
          <TableHead className="">المنطة</TableHead>
          <TableHead className="">المدينة</TableHead>
          <TableHead className="">ملاحظات</TableHead>
          <TableHead className="">تاريخ التحديث</TableHead>
          <TableHead className="">رقم الهاتف</TableHead>
          <TableHead className ="">رقم الطلب</TableHead>
          <TableHead className="">تاريخ الانشاء</TableHead>
          <TableHead className ="">تاريخ انتهاء المنتج</TableHead>
        </TableRow>
        </TableHeader>
   

<TableBody >
  {theOrders.length > 0 ? (
    theOrders.map((item, index) => (
      <TableRow key={item._id || index} className="text-[14px] lg:text-[18px] *:w-[200px]">
        <TableCell>{index +1} - {item?.product || "N/A"}</TableCell>
        <TableCell>{item?.customerName || "N/A"}</TableCell>
        <TableCell>{item?.receipt || "N/A"}</TableCell>
        <TableCell>{item?.gender || "N/A"}</TableCell>
        <TableCell>{item?.expireAfter || "N/A"}</TableCell>
        <TableCell>{formatDate(item?.birthDate)}</TableCell>
        <TableCell>{item?.supervisor?.name || "N/A"}</TableCell>
        <TableCell>{item?.salesPerson?.name || "N/A"}</TableCell>
        <TableCell>{formatDate(item?.sellingDate)}</TableCell>
        <TableCell>{item?.quantity || "N/A"}</TableCell>
        <TableCell>{item?.productPrice || "N/A"}</TableCell>
        <TableCell>{item?.orderPrice || "N/A"}</TableCell>
        <TableCell>{item?.deposit || "N/A"}</TableCell>
        <TableCell>{item?.depositPaymentMethod || "N/A"}</TableCell>
        <TableCell>{item?.daysAgo || "N/A"}</TableCell>
        <TableCell>{ item?.remainingAmount || "N/A"}</TableCell>
        <TableCell>{item?.deliveryMan?.name || "N/A"}</TableCell>
        <TableCell>{formatDate(item?.deliveryDate)}</TableCell>
        <TableCell>{item?.DeliveryReceipt || "N/A"}</TableCell>
        <TableCell>{item?.productIssuanceDate ?formatDate(item.productIssuanceDate) : "لا يوجد"}</TableCell>
        <TableCell>{item?.restMoneyPaymentMethod || "N/A"}</TableCell>
        <TableCell>{item?.supervisorCommission || "N/A"}</TableCell>
        <TableCell>{item?.salesManCommission || "N/A"}</TableCell>
        <TableCell>{item?.deliveryCommission || "N/A"}</TableCell>
        <TableCell>{item?.deliveryStatus || "N/A"}</TableCell>
        <TableCell>{item?.country || "N/A"}</TableCell>
        <TableCell>{item?.city || "N/A"}</TableCell>
        <TableCell>{item?.notes || "N/A"}</TableCell>
        <TableCell>{formatDate(item?.updatedAt)}</TableCell>
        <TableCell>{item?.phone || "N/A"}</TableCell>
        <TableCell>{item?.orderNumber || "N/A"}</TableCell>
        <TableCell>{formatDate(item?.createdAt)}</TableCell>
        <TableCell>{formatDate(item?.productEndDate) || "N/A"}</TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={16} className="text-center">
        No orders available.
      </TableCell>
    </TableRow>
  )}
</TableBody>


    </Table>
    </div>
  )
}






