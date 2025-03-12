
import React ,{useState} from 'react'
import { useQuery   } from '@tanstack/react-query'
import Loader from '@/components/Loader'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { getCompanydues, getDues, getMyReports, getOrders, getReports } from '@/api/orders'
import toast from 'react-hot-toast'
import { PaginationDemo } from '@/components/Pagination'
import ReportCard from '@/components/ReportCard'
import { ReportsFilter } from '@/components/RepoertsFilter'
import { DuesFilter } from '@/components/duesFilter'
import DuesCard from '@/components/DuesCard'
// import ComboboxDemo from '@/components/CompoBox'
const SuperVisorsDues = () => {

const [page, setPage] = useState(1);
const [filters,setFilters]= useState({
  createdAt:"",
  supervisor :"",
  status:""
})

const handleFilterChange = (key, value) => {
  setFilters((prev) => ({
    ...prev,
    [key]: value || undefined, // Ensure empty values are removed
  }));
};



const { data: dues , isLoading, isError} = useQuery({
  queryKey: [
    "dues",
    filters,
    page
  ],
  queryFn:({queryKey})=>{
    const params =queryKey[1] || {}
    const page = queryKey[2]
    return getDues(params , page)
  },
});




if (isError) {
  return <div>Internet Error</div>;
}
  


const duesItems = dues?.data || []


  
  return (
    <div className='w-[100%]  mx-auto flex flex-col gap-3'>
      <div className="flex w-[90%] mx-auto flex-row-reverse items-center py-4">
          <h1>المستحقات</h1>
    
      </div>
 <DuesFilter filterChange={handleFilterChange}/>
      {isLoading ? <Loader />: 
          <div className='w-[98%] lg:w-[95%] mx-auto flex flex-col items-end gap-3 justify-center'>
            {duesItems?.map((item)=>( 
           <DuesCard key={item._id} item={item} />
          ))}
            </div>
   
          }
     
          <PaginationDemo currentPage={page} setPage={setPage} numberOfPages={dues?.paginationResult?.numberOfPages} />
      
   
          
      </div>
  )
}

export default SuperVisorsDues