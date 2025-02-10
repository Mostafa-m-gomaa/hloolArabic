import React ,{useState} from 'react'
import { useQuery   } from '@tanstack/react-query'
import Loader from '@/components/Loader'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { getMyReports, getOrders } from '@/api/orders'
import toast from 'react-hot-toast'
import { PaginationDemo } from '@/components/Pagination'
import ReportCard from '@/components/ReportCard'
import { ReportsFilter } from '@/components/RepoertsFilter'
// import ComboboxDemo from '@/components/CompoBox'
const MyReports = () => {

const [page, setPage] = useState(1);
const [theVariable, setTheVariable] = useState("")
const [queryObj , setQueryObject] = useState({})
const [filters,setFilters]= useState({
  createdAt :"",
  creator :"",
  reportDate:"",
  status:""
})

const handleFilterChange = (key, value) => {
  setFilters((prev) => ({
    ...prev,
    [key]: value || undefined, // Ensure empty values are removed
  }));
};

const { data: reports, isLoading, isError } = useQuery({
  queryKey: [
    "reports",
    filters,
    page
  ],
  queryFn:({queryKey})=>{
    const params =queryKey[1] || {}
    const page = queryKey[2]
    return getMyReports(params , page)
  },
});

if (isError) {
  return <div>Internet Error</div>;
}
  
 
const reportItems = reports?.data || []
console.log(reportItems)

  return (
    <div className='w-[100%]  mx-auto flex flex-col gap-3'>
      <div className="flex w-[90%] mx-auto flex-row-reverse items-center py-4">
          <h1>تقاريري</h1>
          <Button>

          <Link to="/home/addreport"> اضافة تقرير</Link>
          </Button>
  
      </div>
 <ReportsFilter filterChange={handleFilterChange}/>
      {isLoading ? <Loader />: 
          <div className='w-[98%] lg:w-[95%] mx-auto flex flex-col items-end gap-3 justify-center'>
            {reportItems?.map((item,index)=>( 
            <ReportCard  key={index} number={index+1} item={item} />
          ))}
            </div>
   
          }
     
          <PaginationDemo currentPage={page} setPage={setPage} numberOfPages={reports?.paginationResult?.numberOfPages} />
      
   
          
      </div>
  )
}

export default MyReports