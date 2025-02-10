"use client"

import * as React from "react"
import { useQuery } from "@tanstack/react-query"
import { getSuperVisors, getUsers } from "@/api/users"
import { DatePickerDemo } from "./DatePicker"


export function ReportsFilter({filterChange}) {


  const {data : supervisors} =useQuery({
    queryKey:["users"] ,
    queryFn:getSuperVisors
  })

  const supervisorsItems =supervisors?.data || []


  return (
<div className="flex gap-8 bg-white w-full justify-center p-2 items-center shadow-md"> 
 {localStorage.getItem("role") !== "supervisor" &&
  <div className="relative">
  <details className="group [&_summary::-webkit-details-marker]:hidden">
    <summary
      className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600"
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

    <div className="z-50 group-open:absolute group-open:start-0 group-open:top-auto group-open:mt-2">
      <div className="w-96 rounded-sm border border-gray-200 bg-white">
        <header className="flex items-center justify-between p-4">
     

          <button type="button" className="text-sm text-gray-900 underline underline-offset-4" onClick={()=>filterChange("creator" ,"")}>
          الكل
          </button>
        </header>
        <ul className="space-y-1 border-t border-gray-200 p-4">
{supervisorsItems?.map((item, i) =>
  item.role === "supervisor" && (
    <li key={item._id || i}>
      <label htmlFor={`supervisor-${i}`} className="inline-flex items-center gap-2">
        <input
          type="radio"
          id={`supervisor-${i}`} // Unique ID for each radio
          name="supervisorFilter" // Ensure all radios belong to the same group
          className="size-5 rounded-sm border-gray-300"
          onChange={() => filterChange("creator", item?._id)}
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
</div>}
  <div className="relative">
    <details className="group [&_summary::-webkit-details-marker]:hidden">
      <summary
        className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600"
      >
        <span className="text-sm font-medium"> حالة التقرير </span>

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

      <div className="z-50 group-open:absolute group-open:start-0 group-open:top-auto group-open:mt-2">
        <div className="w-96 rounded-sm border border-gray-200 bg-white">
          <header className="flex items-center justify-between p-4">
       

            <button type="button" className="text-sm text-gray-900 underline underline-offset-4" onClick={()=>filterChange("status" ,"")}>
            الكل
            </button>
          </header>
          <ul className="space-y-1 border-t border-gray-200 p-4">
          <li >
        <label className="inline-flex items-center gap-2">
          <input
            type="radio"
            id={`a`} // Unique ID for each radio
            name="supervisorFilter" // Ensure all radios belong to the same group
            className="size-5 rounded-sm border-gray-300"
            onChange={() => filterChange("status", "approved")}
          />

          <span className="text-sm font-medium text-gray-700">
            تمت الموافقه عليه
          </span>
        </label>
      </li>
          <li >
        <label className="inline-flex items-center gap-2">
          <input
            type="radio"
            id={`a`} // Unique ID for each radio
            name="supervisorFilter" // Ensure all radios belong to the same group
            className="size-5 rounded-sm border-gray-300"
            onChange={() => filterChange("status", "pending")}
          />

          <span className="text-sm font-medium text-gray-700">
            لم يتم الموافقه عليه بعد
          </span>
        </label>
      </li>
</ul>

        </div>
      </div>
    </details>
  </div>



  <DatePickerDemo searchFunc={filterChange} title="تاريخ الانشاء" type={"day"} /> 
  <DatePickerDemo searchFunc={filterChange} title ="تاريخ التقرير" type={"reportDate"} /> 

 
</div>
  )
}


