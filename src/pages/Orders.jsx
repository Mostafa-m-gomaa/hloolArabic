import React ,{useState} from 'react'
import { OrdersTable} from '@/components/OrdersTable'
import { useQuery ,useQueryClient  } from '@tanstack/react-query'
import Loader from '@/components/Loader'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { getOrders } from '@/api/orders'
import { ComboboxDemo } from '@/components/CompoBox'
import { Input } from "@/components/ui/input"
import { DatePickerDemo } from '@/components/DatePicker'
import toast from 'react-hot-toast'
import { PaginationDemo } from '@/components/Pagination'
import { OrdersFilter } from '@/components/OrdersFilter'
import { TabsDemo } from '@/components/tabs'
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Download, LoaderPinwheel } from 'lucide-react';

const Orders = () => {

const [page, setPage] = useState(1);
const [theVariable, setTheVariable] = useState("")
const [queryObj , setQueryObject] = useState({})
const [deliveryStatus, setDeliveryStatus] = useState("غير جاهز للتسليم")
const [loader, setLoader] = useState(false)
const [filters,setFilters]= useState({
  DeliveryReceipt :"",
  ValidityPeriod :"",
  birthDate:"",
  country:"",
  createdAt:"",
  customerName:"",
  deliveryCommission:"",
  deliveryDate:"",
  deliveryMan:"",
  deliveryStatus:"",
  gender:"",
  orderNumber:"",
  orderPrice:"",
  phone:"",
  product:"",
  receipt:"",
  salesManCommission:"",
  salesPerson:"",
  sellingDate:"",
  supervisor:"",
  supervisorCommission:"",
})

const handleFilterChange = (key, value) => {
  setFilters((prev) => ({
    ...prev,
    [key]: value || undefined, // Ensure empty values are removed
  }));
};


const handleSearchChange = (value) => {
  if(theVariable === ""){
    toast.error("اختر الفلتر اولا")
  }
setQueryObject({[theVariable]:value})
}




const { data: orders, isLoading, isFetching, isError } = useQuery({
  queryKey: [
    "orders",
    filters,
    page
  ],
  queryFn: ({ queryKey }) => {
    const params = queryKey[1] || {};
    const page = queryKey[2] ;
    return getOrders(params , page); // Pass the entire object
  },
});


if (isError) {
  return <div>Internet Error</div>;
}
  
  console.log(orders)
const orderItems = orders?.data || []

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

const exportToExcel = () => {
  setLoader(true)
  const worksheetData = orderItems.map((item) => ({
    "المنتج": item?.product || "N/A",
    "سعر المنتج": item?.productPrice || "N/A",
    "سعر الطلبية": item?.orderPrice || "N/A",
    "البلد": item?.country || "N/A",
    "تاريخ الإنشاء": formatDate(item?.createdAt),
    "تاريخ الميلاد": formatDate(item?.birthDate),
    "اسم العميل": item?.customerName || "N/A",
    "تاريخ التوصيل": formatDate(item?.deliveryDate),
    "حالة التوصيل": item?.deliveryStatus || "N/A",
    "اصدار البطاقة": item?.productIssuanceDate ? formatDate(item.productIssuanceDate) : "لا يوجد",
    "سند التسليم": item?.DeliveryReceipt || "N/A",
    "الدفعة المقدمة": item?.deposit || "N/A",
    "طريقة دفع الدفعة المقدمة": item?.depositPaymentMethod || "N/A",
    "طريقة دفع الدفعة الباقي": item?.restMoneyPaymentMethod || "N/A",
    "ملاحظات": item?.notes || "N/A",
    "الكمية": item?.quantity || "N/A",
    "اسم المندوب": item?.salesPerson?.name || "N/A",
    "عمولة المندوب": item?.salesManCommission || "N/A",
    "تاريخ البيع": formatDate(item?.sellingDate),
    "المشرف": item?.supervisor?.name || "N/A",
    "عمولة المشرف": item?.supervisorCommission || "N/A",
    "تاريخ التحديث": formatDate(item?.updatedAt),
    "رقم الهاتف": item?.phone || "N/A",
    "فترة السماح": item?.ValidityPeriod || "N/A",
    "ينتهي بعد": item?.expireAfter || "N/A",
    "الجنس": item?.gender || "N/A",
    "رقم الطلب": item?.orderNumber || "N/A",
    "تاريخ انتهاء المنتج": formatDate(item?.productEndDate),
  }));

  const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });

  saveAs(data, "orders.xlsx");
  setLoader(false)
};


  
  return (
    <div className='w-[100%]  mx-auto flex flex-col gap-3'>
      <div className="flex flex-col w-[90%] mx-auto gap-4 items-center py-4">
        <div className="flex justify-between w-full items-center">

          <Button onClick={exportToExcel}>{loader ?<LoaderPinwheel className='animate-spin' /> : <Download /> }</Button>
          <h1>الطلبات</h1>
        </div>
        <OrdersFilter filterChange={handleFilterChange} />
            
             <TabsDemo filterChang={handleFilterChange}  setDeliveryStatus={setDeliveryStatus}/>

      </div>
          {isLoading ? <Loader />:  <OrdersTable orders={orderItems} />}
     
          <PaginationDemo page={page} setPage={setPage} numberOfPages={orders?.paginationResult?.numberOfPages} />
      
   
          
      </div>
  )
}

export default Orders