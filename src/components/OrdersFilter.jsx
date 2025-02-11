"use client"

import * as React from "react"
import { useQuery } from "@tanstack/react-query"
import { getUsers } from "@/api/users"
import { DatePickerDemo } from "./DatePicker"
import  InputSearch from "./inputSearch"
import { getProducts } from "@/api/products"


export function OrdersFilter({filterChange}) {


  const {data : allUsers} =useQuery({
    queryKey:["users"] ,
    queryFn:getUsers
  })

  const users =allUsers?.data || []

  const {data : products} =useQuery({
    queryKey:["products"] ,
    queryFn:getProducts
  })

  const productsItems =products?.data || []


  return (
<div className="transition-all flex gap-8 relative z-10 bg-white w-full justify-center p-2 items-center shadow-md  "> 
<div className="transition-all max-w-[95%] relative z-10 flex gap-8 bg-white w-full justify-start py-2 px-4 items-center overflow-x-auto ">
<div className="relative">
    <details className="group [&_summary::-webkit-details-marker]:hidden">
      <summary
        className=" bg-myBlue text-white flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 p-2 rounded transition hover:border-gray-600"
      >
        <span className="text-sm font-medium"> المشرف </span>

        <span className="transition group-open:-rotate-180">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </span>
      </summary>

      <div className="z-50 transition-all group-open:relative group-open:start-0 group-open:top-auto group-open:mt-2">
        <div className="w-96 rounded-sm border border-gray-200 bg-white">
          <header className="flex items-center justify-between p-4">
       

            <button type="button" className="text-sm text-gray-900 underline underline-offset-4" onClick={()=>filterChange("supervisor" ,"")}>
            الكل
            </button>
          </header>
          <ul className="space-y-1 border-t border-gray-200 p-4">
  {users?.map((item, i) =>
    item.role === "supervisor" && (
      <li key={item._id || i}>
        <label htmlFor={`supervisor-${i}`} className="inline-flex items-center gap-2">
          <input
            type="radio"
            id={`supervisor-${i}`} // Unique ID for each radio
            name="supervisorFilter" // Ensure all radios belong to the same group
            className="size-5 rounded-sm border-gray-300"
            onChange={() => filterChange("supervisor", item?._id)}
          />

          <span className="text-sm font-medium text-gray-700">
            {item?.name}
          </span>
        </label>
      </li>
    )
  )}
</ul>

        </div>
      </div>
    </details>
  </div>
<div className="relative">
    <details className=" group [&_summary::-webkit-details-marker]:hidden">
      <summary
        className=" bg-myBlue text-white flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 p-2 rounded transition hover:border-gray-600"
      >
        <span className="min-w-[100px] text-sm font-medium"> مسئول التوصيل </span>

        <span className="transition group-open:-rotate-180">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </span>
      </summary>

      <div className="z-50 transition-all group-open:relative group-open:start-0 group-open:top-auto group-open:mt-2">
        <div className="w-96 rounded-sm border border-gray-200 bg-white">
          <header className="flex items-center justify-between p-4">
       

            <button type="button" className="text-sm text-gray-900 underline underline-offset-4" onClick={()=>filterChange("deliveryMan" ,"")}>
            الكل
            </button>
          </header>
          <ul className="space-y-1 border-t border-gray-200 p-4">
  {users?.map((item, i) =>
    item.role === "supervisor" && (
      <li key={item._id || i}>
        <label htmlFor={`delivery-${i}`} className="inline-flex items-center gap-2">
          <input
            type="radio"
            id={`delivery-${i}`} // Unique ID for each radio
            name="deliveryFilte" // Ensure all radios belong to the same group
            className="size-5 rounded-sm border-gray-300"
            onChange={() => filterChange("deliveryMan", item?._id)}
          />

          <span className="text-sm font-medium text-gray-700">
            {item?.name}
          </span>
        </label>
      </li>
    )
  )}
</ul>

        </div>
      </div>
    </details>
  </div>


<div className="relative">
    <details className="group [&_summary::-webkit-details-marker]:hidden">
      <summary
        className=" bg-myBlue text-white flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 p-2 rounded transition hover:border-gray-600"
      >
        <span className="text-sm font-medium"> المندوب </span>

        <span className="transition group-open:-rotate-180">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </span>
      </summary>

      <div className="z-50 transition-all group-open:relative group-open:start-0 group-open:top-auto group-open:mt-2">
        <div className="w-96 rounded-sm border border-gray-200 bg-white">
          <header className="flex items-center justify-between p-4">
       

            <button type="button" className="text-sm text-gray-900 underline underline-offset-4" onClick={()=>filterChange("supervisor" ,"")}>
            الكل
            </button>
          </header>
          <ul className="space-y-1 border-t border-gray-200 p-4">
  {users?.map((item, i) =>
    item.role === "sales" && (
      <li key={item._id || i}>
        <label htmlFor={`supervisor-${i}`} className="inline-flex items-center gap-2">
          <input
            type="radio"
            id={`supervisor-${i}`} // Unique ID for each radio
            name="supervisorFilter" // Ensure all radios belong to the same group
            className="size-5 rounded-sm border-gray-300"
            onChange={() => filterChange("salesPerson", item?._id)}
          />

          <span className="text-sm font-medium text-gray-700">
            {item?.name}
          </span>
        </label>
      </li>
    )
  )}
</ul>

        </div>
      </div>
    </details>
  </div>
<div className="relative">
    <details className="group [&_summary::-webkit-details-marker]:hidden">
      <summary
        className=" bg-myBlue text-white flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 p-2 rounded transition hover:border-gray-600"
      >
        <span className="text-sm font-medium"> المنتج </span>

        <span className="transition group-open:-rotate-180">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </span>
      </summary>

      <div className="z-50 transition-all group-open:relative group-open:start-0 group-open:top-auto group-open:mt-2">
        <div className="w-96 rounded-sm border border-gray-200 bg-white">
          <header className="flex items-center justify-between p-4">
       

            <button type="button" className="text-sm text-gray-900 underline underline-offset-4" onClick={()=>filterChange("supervisor" ,"")}>
            الكل
            </button>
          </header>
          <ul className="space-y-1 border-t border-gray-200 p-4">
  {productsItems?.map((item, i) =>
    
      <li key={item._id || i}>
        <label htmlFor={`product-${i}`} className="inline-flex items-center gap-2">
          <input
            type="radio"
            id={`product-${i}`} // Unique ID for each radio
            name="productFilter" // Ensure all radios belong to the same group
            className="size-5 rounded-sm border-gray-300"
            onChange={() => filterChange("product", item?._id)}
          />

          <span className="text-sm font-medium text-gray-700">
            {item?.title}
          </span>
        </label>
      </li>
    
  )}
</ul>

        </div>
      </div>
    </details>
  </div>


<InputSearch title="مده الصلاحية" searchFunc={filterChange} type={"ValidityPeriod"} />
<InputSearch title="البلد" searchFunc={filterChange} type={"country"} />
<InputSearch title="اسم العميل" searchFunc={filterChange} type={"customerName"} />
<InputSearch title="عمولة التوصيل" searchFunc={filterChange} type={"deliveryCommission"} />
<InputSearch title="رقم الطلب" searchFunc={filterChange} type={"orderNumber"} />
<InputSearch title="سعر الطلب" searchFunc={filterChange} type={"orderPrice"} />
<InputSearch title="رقم الهاتف" searchFunc={filterChange} type={"phone"} />
<InputSearch title="عمولة المندوب" searchFunc={filterChange} type={"salesManCommission"} />
<InputSearch title="عمولة المشرف" searchFunc={filterChange} type={"supervisorCommission"} />

  <DatePickerDemo searchFunc={filterChange} title="تاريخ التوصيل" type={"deliveryDate"} /> 
  <DatePickerDemo searchFunc={filterChange} title ="تاريخ الميلاد" type={"birthDate"} /> 
  <DatePickerDemo searchFunc={filterChange} title ="تاريخ الانشاء" type={"createdAt"} /> 
  <DatePickerDemo searchFunc={filterChange} title ="تاريخ البيع" type={"sellingDate"} /> 
 
</div>

 
</div>
  )
}


