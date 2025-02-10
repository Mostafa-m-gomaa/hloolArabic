import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"



export function ShowPopOver({item}) {
    const formatDate = (date) => {
        if (!date) return "غير موجود"; // Return a default value if the date is undefined
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
    <Dialog >
      <DialogTrigger asChild>
        <Button className="p-1 h-fit lg:px-4 lg:py-2">استعراض الطلب</Button>
      </DialogTrigger>
      <DialogContent className="w-[90%]  h-[80vh] overflow-y-auto" >
        <DialogHeader>
          <DialogTitle>بيانات الطلب</DialogTitle>
          <DialogDescription>
          جميع التفاصيل الخاصة بالطلب
          </DialogDescription>
        </DialogHeader>
  
  <div className="flex w-[100%] justify-between mx-auto border-2 border-gray-400 rounded-md  ">
    <div className="w-[45%] bg-myBlue text-white text-center flex flex-col gap-4 py-3  *:min-h-[60px] text-[13px] lg:text-[16px]"> 
         <div className="">المنتج</div>
          <div className="">سعر المنتج</div>
          <div className="">سعر الطلبية</div>
          <div className="">البلد</div>
          <div className="">تاريخ الانشاء</div>
          <div className="">تاريخ الميلاد</div>
          <div className="">اسم العميل</div>
          <div className="">تاريخ التوصيل</div>
          <div className="">حالة التوصيل</div>
          <div className="">مسئول التوصيل</div>
          <div className="">عمولة التوصيل</div>
          <div className="">اصدار البطاقة</div>
          <div className="">سند التسليم</div>
          <div className="">سند التسليم</div>
          <div className="">الدفعه المقدمة</div>
          <div className="">طريقة دفع الدفعه المقدمة</div>
          <div className="">طريقة دفع الدفعه الباقي</div>
          <div className="">ملاحظات</div>
          <div className="">الكمية</div>
          <div className="">اسم المندوب</div>
          <div className="">عمولة المندوب</div>
          <div className="">تاريخ البيع</div>
          <div className="">المشرف</div>
          <div className="">عمولة المشرف</div>
          <div className="">تاريخ التحديث</div>
          <div className="">رقم الهاتف</div>
          <div className="">فترة السماح</div>
          <div className="">ينتهي بعد</div>
          <div className ="">الجنس</div>
          <div className ="">رقم الطلب</div>
          <div className ="">تاريخ انتهاء المنتج</div>
    </div>
    <div className="w-[53%] text-center flex flex-col gap-4 py-3 *:min-h-[60px] *:max-h-[60px] text-[13px] lg:text-[16px]">
                <div>{item?.product || "غير موجود"}</div>
                <div>{item?.productPrice || "غير موجود"}</div>
                <div>{item?.orderPrice || "غير موجود"}</div>
                <div>{item?.country || "غير موجود"}</div>
                <div>{formatDate(item?.createdAt)}</div>
                <div>{formatDate(item?.birthDate)}</div>
                <div>{item?.customerName || "غير موجود"}</div>
                <div>{formatDate(item?.deliveryDate)}</div>
                <div>{item?.deliveryStatus || "غير موجود"}</div>
                <div>{item?.deliveryMan?.name || "غير موجود"}</div>
                <div>{item?.deliveryCommission || "غير موجود"}</div>
                <div>{item?.productIssuanceDate ?formatDate(item.productIssuanceDate) : "لا يوجد"}</div>
                <div>{item?.DeliveryReceipt || "غير موجود"}</div>
                <div>{item?.receipt || "غير موجود"}</div>
                <div>{item?.deposit || "غير موجود"}</div>
                <div>{item?.depositPaymentMethod || "غير موجود"}</div>
                <div>{item?.restMoneyPaymentMethod || "غير موجود"}</div>
                <div>{item?.notes || "غير موجود"}</div>
                <div>{item?.quantity || "غير موجود"}</div>
                <div>{item?.salesPerson?.name || "غير موجود"}</div>
                <div>{item?.salesManCommission || "غير موجود"}</div>
                <div>{formatDate(item?.sellingDate)}</div>
                <div>{item?.supervisor?.name || "غير موجود"}</div>
                <div>{item?.supervisorCommission || "غير موجود"}</div>
                <div>{formatDate(item?.updatedAt)}</div>
                <div>{item?.phone || "غير موجود"}</div>
                <div>{item?.ValidityPeriod || "غير موجود"}</div>
                <div>{item?.expireAfter || "غير موجود"}</div>
                <div>{item?.gender || "غير موجود"}</div>
                <div>{item?.orderNumber || "غير موجود"}</div>
                <div>{formatDate(item?.productEndDate) || "غير موجود"}</div>
    </div>
 
  </div>
      </DialogContent>
    </Dialog>
  )
}
