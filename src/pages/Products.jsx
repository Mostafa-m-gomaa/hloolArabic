import React from 'react'

import { useQuery } from '@tanstack/react-query'
import { getProducts } from '@/api/products'
import Loader from '@/components/Loader'
import { UsersTable } from '@/components/UsersTable'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { ProductTable } from '@/components/ProductsTable'

const Products = () => {

  const {data : products , isLoading ,isFetching , isError} = useQuery({
    queryKey:["products"],
    queryFn: getProducts
  })


  const productItems = products?.data || []
  return (
      <div className='w-[100%] mx-auto flex flex-col gap-3'>
     <div className="flex w-[90%] mx-auto flex-row-reverse items-center py-4">
          <h1>المنتجات</h1>
          <Button > <Link to="/home/addProduct"> اضافة منتج</Link> </Button>

      </div>
          {isLoading ? <Loader />: <ProductTable products={productItems} isLoading={isLoading}/>}
          </div>
  )
}

export default Products