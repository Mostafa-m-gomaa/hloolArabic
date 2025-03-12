import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import reportImg from '../assets/rep.png'
import newOrderImg from '../assets/newOrders.png'
import orderImg from '../assets/orders.png'
import cashImg from '../assets/cash.png'
import {Button} from '@/components/ui/button'
import { useParams } from "react-router-dom";
import { approveReport, onProgressReport } from "@/api/orders";
import { useMutation , useQueryClient} from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Loader } from "lucide-react";

const ReportCard = ({ report }) => {
    const queryClient = useQueryClient()
    const param =useParams().id
const mutation = useMutation({
    mutationKey: "reports",
    mutationFn: () => approveReport(param),
    onSuccess: (res) => {
    toast.success("تم تأكيد التقرير بنجاح");
    queryClient.invalidateQueries("reports")
    }
})
const onProgressMutation = useMutation({
    mutationKey: "reports",
    mutationFn: () => onProgressReport(param),
    onSuccess: (res) => {
    toast.success("تم تأكيد التقرير بنجاح");
    queryClient.invalidateQueries("reports")
    }
})

 
  return (
    <div className="grid gap-6 p-6">
      {/* Report Overview */}
      <Card>
        <CardHeader className="flex items-center flex-row-reverse justify-between ">
          <CardTitle>تقرير: {report?.creator?.name || "غير معروف"}</CardTitle>
          <img className="w-[50px] lg:w-[80px]" src={reportImg} />
        </CardHeader>
        <CardContent className="text-right *:justify-between *:flex *:flex-row-reverse *:gap-16 *:items-center  *:text-[12px] *:lg:text-[15px] flex flex-col gap-3 items-end ">
          <p><strong>حالة التقرير</strong> {report?.status === "pending" ? "في انتظار تاكيد المطابق": report?.status}</p>
          <p><strong>المبلغ المتبقي مع المشرف</strong> {report?.gottenRestCompanyMoney || 0}</p>
          <p><strong>الوصف</strong> {report?.description || "لا يوجد وصف"}</p>
          <p><strong>تاريخ التقرير</strong> {new Date(report?.reportDate).toLocaleDateString()}</p>
          <p><strong>تاريخ الانشاء</strong> {new Date(report?.createdAt).toLocaleDateString()}</p>
          <p><strong>تاريخ التعديل</strong> {new Date(report?.updatedAt).toLocaleDateString()}</p>
          {localStorage.getItem("role") === "validator" && ["معلق","قيد المطابقه" ].includes(report?.status)  &&  <Button disabled={mutation.isPending} type="button" onClick={mutation.mutate}>{mutation.isPending ? <Loader className="animate-spin" />:"تأكيد التقرير"}</Button>}
          {localStorage.getItem("role") === "validator" && report?.status=== "معلق" &&  report?.status != "قيد المطابقه" &&  <Button disabled={onProgressMutation.isPending} type="button" onClick={onProgressMutation.mutate}>{onProgressMutation.isPending ? <Loader className="animate-spin" />:"قيد المطابقة"}</Button>}
    
        </CardContent>
      </Card>
      
      {/* New Orders */}
      <Card>
        <CardHeader className="flex items-center flex-row-reverse justify-between ">
          <CardTitle>الطلبات الجديدة</CardTitle>
          <img className="w-[50px] lg:w-[80px]" src={newOrderImg} />
        </CardHeader>
        <CardContent >
          {report?.newOrders?.length > 0 ? (
            <ul className="space-y-2 ">
              {report?.newOrders?.map((order, i) => (
                <li key={i} className="border p-2 rounded-lg *:flex *:flex-row-reverse *:gap-16 *:items-center  *:text-[12px] *:lg:text-[15px]  ">
                  <p><strong>البائع</strong> {order?.salesMan}</p>
                  <p><strong>المنتج</strong> {order?.product}</p>
                  <p><strong>الكمية</strong> {order?.quantity}</p>
                  <p><strong>الإيداع</strong> {order?.deposit} ({order?.depositPaymentMethod})</p>
                </li>
              ))}
            </ul>
          ) : <p>لا يوجد طلبات جديدة</p>}
        </CardContent>
      </Card>
      
      {/* Delivered Orders */}
      <Card>
        <CardHeader className="flex items-center flex-row-reverse justify-between ">
          <CardTitle>الطلبات المسلمة</CardTitle>
          <img className="w-[50px] lg:w-[80px]" src={orderImg} />
        </CardHeader>
        <CardContent>
          {report?.deliveredOrders?.length > 0 ? (
            <ul className="space-y-2 ">
              {report?.deliveredOrders?.map((order, i) => (
                <li key={i} className="border p-2 rounded-lg *:flex *:flex-row-reverse *:gap-16 flex flex-col gap-2 *:items-center  *:text-[12px] *:lg:text-[15px]  ">
                  <p><strong>العميل</strong> {order?.order?.customerName}</p>
                  <p><strong>الإيصال</strong> {order?.order?.receipt}</p>
                  <p><strong>المشرف</strong> {order?.order?.supervisor?.name}</p>
                  <p><strong>البائع</strong> {order?.order?.salesPerson?.name}</p>
                  <p><strong>المنتج</strong> {order?.order?.product}</p>
                  <p><strong>المبلغ المتبقي لاستلام الطلب</strong> {order?.order?.orderPrice - order?.order?.deposit}</p>
                  {order?.restOrderCost?.map((item, i) => (
                    <div key={i} className="flex flex-col gap-2">
                      <p><strong>المبلغ</strong> {item?.amount}</p>
                      <p><strong>طريقة الدفع</strong> {item?.paymentMethod}</p>
                    </div>
                  ))    
                }
                </li>
              ))}
            </ul>
          ) : <p>لا يوجد طلبات مسلمة</p>}
        </CardContent>
      </Card>
      
      {/* Outgoings */}
      <Card>
        <CardHeader className="flex items-center flex-row-reverse justify-between ">
          <CardTitle>تصنيف الواردات</CardTitle>
          <img className="w-[50px] lg:w-[80px]" src={cashImg} />
        </CardHeader>
        <CardContent>
          {report?.categorizedMoney?.length > 0 ? (
            <ul className="space-y-2 ">
                 
              {report?.categorizedMoney?.map((item, i) => (
                <li key={i} className="border p-2 rounded-lg *:flex *:flex-row-reverse *:gap-16 flex flex-col gap-2 *:items-center  *:text-[12px] *:lg:text-[15px] ">
                  <p><strong>المبلغ</strong> {item?.amount || 0}</p>
                  <p><strong>طريقة التحصيل</strong> {item?.paymentMethod}</p>
                </li>
              ))}
            </ul>
          ) : <p>لا يوجد تصنيف</p>}
        </CardContent>
      </Card>



      <Card>
        <CardHeader className="flex items-center flex-row-reverse justify-between ">
          <CardTitle>المصاريف</CardTitle>
          <img className="w-[50px] lg:w-[80px]" src={cashImg} />
        </CardHeader>
        <CardContent>

          {report?.outgoings?.length > 0 ? (
            <ul className="space-y-2 ">
                 
              {report?.outgoings?.map((outgoing, i) => (
                <li key={i} className="border p-2 rounded-lg *:flex *:flex-row-reverse *:gap-16 flex flex-col gap-2 *:items-center  *:text-[12px] *:lg:text-[15px] ">
                  <p><strong>المستخدم</strong> {outgoing?.user?.name}</p>
                  <p><strong>العمولة المستحقة</strong> {outgoing?.deservedCommission}</p>
                  <p><strong>العمولة المستلمة</strong> {outgoing?.gottenCommission}</p>
                  <Badge>{outgoing?.userConfirmation}</Badge>
                </li>
              ))}
            </ul>
          ) : <p>لا يوجد مصاريف</p>}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex items-center flex-row-reverse justify-between ">
          <CardTitle>مصاريف اخري</CardTitle>
          <img className="w-[50px] lg:w-[80px]" src={cashImg} />
        </CardHeader>
        <CardContent>

          {report?.burnOuts?.length > 0 ? (
            <ul className="space-y-2 ">
                 
              {report?.burnOuts?.map((outgoing, i) => (
                <li key={i} className="border p-2 rounded-lg *:flex *:flex-row-reverse *:gap-16 flex flex-col gap-2 *:items-center  *:text-[12px] *:lg:text-[15px] ">

                  <p><strong>سبب المصروف</strong> {outgoing?.description}</p>
                  <p><strong>المبلغ</strong> {outgoing?.amount}</p>
                </li>
              ))}
            </ul>
          ) : <p>لا يوجد مصاريف</p>}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportCard;
