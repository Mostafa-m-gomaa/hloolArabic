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
import MyTableRow from "./MyTableRow";



export function ReportPopOver({item}) {
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

      const newOrders = item?.newOrders || [];
      const outGoings = item?.outgoings || [];
      const deliveredOrders = item?.deliveredOrders || [];
      const salesMenRestMoney = item?.salesMenRestMoney || [];



  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button className="p-1 h-fit lg:px-4 lg:py-2">استعراض الطلب</Button>
      </DialogTrigger>
      <DialogContent className="w-[90%]  h-[80vh] overflow-y-auto" >
        <DialogHeader>
          <DialogTitle>بيانات التقرير</DialogTitle>
          <DialogDescription>
          جميع التفاصيل الخاصة بالتقرير
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-0 flex-col w-[100%]  mx-auto border-2 border-gray-400 rounded-md">

<MyTableRow title={"تم الانشاء في"} content={formatDate(item?.createdAt)} />
<MyTableRow title={"تكلفة الوقود"} content={item?.fuelCost || "غير موجود"} />
<MyTableRow title={"تاريخ التقرير"} content={formatDate(item?.reportDate)} />
<MyTableRow title={"منشئ التقرير"} content={item?.creator?.name || "غير موجود"} />
<MyTableRow title={"الوصف"} content={item?.description || "غير موجود"} />
{newOrders?.map((item,index)=>( newOrders?.length > 0 ?
  <div className="flex w-full justify-between  text-white border-b-2 border-white flex-row-reverse" key={index}>
  <div className="w-[40%] bg-myBlue text-center py-2 text-white">طلب جديد</div>
  
  <div className="w-[59%] text-black p-2 flex flex-col *:flex *:justify-between">
    <span><span>{item?.deposit}</span> : <span>الدفعه المقدمة</span></span>
    <span><span>{item?.depositPaymentMethod}</span> : <span>طريقة الدفع</span></span>
    <span><span>{item?.product}</span> : <span>المنتج</span></span>
    <span><span>{item?.quantity}</span> : <span>الكمية</span></span>
    <span><span>{item?.salesMan}</span> : <span>المندوب</span></span>
  
  </div>
  </div> : <MyTableRow title={"طلب جديد"} content={"لا يوجد"} />
))}

{deliveredOrders?.map((item,index)=>( deliveredOrders.length > 0 ?
  <div className="flex w-full justify-between  text-white border-b-2 border-white flex-row-reverse" key={index}>
  <div className="w-[40%] bg-myBlue text-center py-2 text-white">طلب مسلم</div>
  
  <div className="w-[59%] text-black p-2 flex flex-col *:flex *:justify-between">
    <span><span>{item?.order?.product}</span> : <span>الطلب</span></span>
    <span><span>{item?.order?.salesPerson?.name}</span> : <span>المندوب</span></span>
    <span><span>{item?.order?.supervisor?.name}</span> : <span>المشرف</span></span>

    {item?.restOrderCost.map((item,index)=>(
        <div className="flex flex-col *:flex *:justify-between" key={index}>
            <span><span>{item?.amount || 0}</span> : <span>المبلغ</span></span>
            <span><span>{item?.paymentMethod || "لايوجد"}</span> : <span>طريقة الدفع </span> </span>
        </div>
    ))}
  
  </div>
  </div> : <MyTableRow title={"طلب مسلم"} content={"لا يوجد"} />
))}

{outGoings.length > 0 ? 
outGoings.map((item ,i)=>(
    <div className="flex w-full justify-between  text-white border-b-2 border-white flex-row-reverse" key={i}>
    <div className="w-[40%] bg-myBlue text-center py-2 text-white">المخرج</div>
    
    <div className="w-[59%] text-black p-2 flex flex-col *:flex *:justify-between">
      <span><span>{item?.user?.name}</span> : <span>المستحق</span></span>
      <span><span>{item?.deservedCommission}</span> : <span>العمولة المستحقة</span></span>
      <span><span>{item?.gottenCommission}</span> : <span>العمولة المستلمة</span></span>
      <span><span>{item?.userConfirmation}</span> : <span>تاكيد الاستلام</span></span>
 
    
    </div>
    </div> 
))
: 
<MyTableRow title={"المخرجات"} content={"لا يوجد"} />} 

        </div>
      </DialogContent>
    </Dialog>
  )
}
