import React from 'react'

const Loader = () => {
  return (
    <div className="w-full h-[80vh] flex justify-center items-center flex-wrap relative left-0 top-0 border-2 " >
        {[1,2,3,4,5,6].map((items , index)=> <div key={index} className=" relative flex w-[30%] animate-pulse gap-2 p-4">
  <div className="h-12 w-12 rounded-full bg-slate-400"></div>
  <div className="flex-1">
    <div className="mb-1 h-5 w-3/5 rounded-lg bg-slate-400 text-lg"></div>
    <div className="h-5 w-[90%] rounded-lg bg-slate-400 text-sm"></div>
  </div>
  <div className="absolute bottom-5 right-0 h-4 w-4 rounded-full bg-slate-400"></div>
</div>)}
    </div>
  )
}

export default Loader