import React, { useEffect } from 'react'

import { useQuery ,useQueryClient } from '@tanstack/react-query'
import { getProducts } from '@/api/products'
import Loader from '@/components/Loader'
import { UsersTable } from '@/components/UsersTable'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { ProductTable } from '@/components/ProductsTable'
import { PaginationDemo } from '@/components/Pagination'
import { useState } from 'react'
import { ComboboxOrders } from '@/components/CompoBoxForOrders'
import { Input } from "@/components/ui/input"
import { toast } from 'react-hot-toast'


const Products = () => {
  const [page,setPage]=useState(1)
  const [searchParam , setSearchParam] = useState("")
  const queryClient = useQueryClient()
  const [searchObject , setSearchObject] = useState({})
  const [numberOfPages, setNumberOfPages] = useState(1);


  const {data : products , isLoading ,isFetching , isError} = useQuery({
    queryKey:["products" , page , searchObject],
    queryFn: ({queryKey})=>{
      const page = queryKey[1] || []
      const params = queryKey[2] || []
      return getProducts(page ,params)
    }
  })
  
  const productItems = products?.data || []



  const onSearchChange = (value) => {
    if(searchParam === ""){
      toast.error("اختر الفلتر اولا")
    }
    setSearchObject({[searchParam]:value})
   }

  useEffect(()=>{
    queryClient.invalidateQueries({queryKey:["products"]})
    if(products?.data){
      setNumberOfPages(products.paginationResult.numberOfPages)  
      setPage(products.paginationResult.currentPage)
    }
  },[products ,page])
  return (
      <div className='w-[100%] mx-auto flex flex-col gap-3'>
     <div className="flex w-[90%] mx-auto flex-col lg:flex-row-reverse items-center py-4 justify-between gap-8">
                  <h1>المنتجات</h1>
                    <div className="flex w-full lg:w-[50%] gap-4">
                    <ComboboxOrders  setParam={setSearchParam} forWhat="products"/>
                     <Input type="text" placeholder="اكتب هنا"  onChange={(e)=>onSearchChange(e.target.value)} />
                    </div>
          <Button > <Link to="/home/addProduct"> اضافة منتج</Link> </Button>

      </div>
          {isLoading || productItems.length === 0 ? <Loader />: <ProductTable products={productItems} />}
          <PaginationDemo currentPage={page} numberOfPages={numberOfPages} setPage={setPage} />
          </div>
  )
}

export default Products