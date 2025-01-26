import React ,{useState} from 'react'
import { useQuery  } from '@tanstack/react-query'
import Loader from '@/components/Loader'
import {  getReports } from '@/api/orders'
import { ComboboxDemo } from '@/components/CompoBox'
import { Input } from "@/components/ui/input"
import { DatePickerDemo } from '@/components/DatePicker'
import toast from 'react-hot-toast'
import { PaginationDemo } from '@/components/Pagination'
import { ReportTable } from '@/components/ReportTable'
const Reports = () => {

const [page, setPage] = useState(1);
const [theVariable, setTheVariable] = useState("")
const [queryObj , setQueryObject] = useState({})

const handleSearchChange = (value) => {
  if(theVariable === ""){
    toast.error("اختر الفلتر اولا")
  }
setQueryObject({[theVariable]:value})
}


const { data: reports, isLoading, isError } = useQuery({
  queryKey: [
    "reports",
    queryObj,
    page
  ],
  queryFn:({queryKey})=>{
    const params =queryKey[1] || {}
    const page = queryKey[2]
    return getReports(params , page)
  },
});
console.log(reports)
if (isError) {
  return <div>Internet Error</div>;
}
   
const reportItems = reports?.data || []

  
  return (
    <div className='w-[100%]  mx-auto flex flex-col gap-3'>
      <div className="flex w-[90%] mx-auto flex-row-reverse items-center py-4">
          <h1>التقارير</h1>
          <div className="flex  w-[70%]">

         {/* <ComboboxDemo setVar={setTheVariable} />
         {theVariable === "createdAt" || theVariable === "deliveryDate" || theVariable === "sellingDate" ? <DatePickerDemo searchFunc={handleSearchChange} /> :   <Input type="text" placeholder="اكتب هنا" onChange={(e)=>handleSearchChange(e.target.value)} />} */}

          </div>

      </div>
          {isLoading ? <Loader />:  <ReportTable reports={reportItems} />}
     
          <PaginationDemo page={page} setPage={setPage} numberOfPages={reports?.paginationResult?.numberOfPages} />
      
   
          
      </div>
  )
}

export default Reports