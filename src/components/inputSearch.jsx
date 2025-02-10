import React from 'react'

const InputSearch = ({title ,searchFunc ,type}) => {
  return (
    <div className="relative">
    <details className="group [&_summary::-webkit-details-marker]:hidden">
      <summary
        className=" bg-myBlue text-white flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 p-2 rounded transition hover:border-gray-600"
      >
        <span className=" min-w-[100px] text-sm font-medium"> {title} </span>

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
        <div className="w-96 rounded-sm border border-gray-200 bg-white p-8">
   
    {title}
<div class="mb-6 relative">

  <div class="relative">
    <input
      type="text"
      id="input"
      name="input"
      class="mt-1 p-4 border-2 border-blue-500 rounded-md focus:outline-none focus:border-blue-700 w-full transition duration-300 ease-in-out placeholder-gray-500 bg-gray-100"
      placeholder="اكتب هنا"
      onChange={(e)=>searchFunc(type ,e.target.value)}
    />
    <div
      class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
    >
      <svg
        class="h-6 w-6 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        ></path>
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M2 19l-2 2m0 0l2-2m-2 2h16a2 2 0 002-2V5a2 2 0 00-2-2H2a2 2 0 00-2 2v12a2 2 0 002 2z"
        ></path>
      </svg>
    </div>
  </div>
</div>


        </div>
      </div>
    </details>
  </div>
  )
}

export default InputSearch