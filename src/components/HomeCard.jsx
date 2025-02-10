import React from 'react'

const HomeCard = ({color , number , title ,subTitle , icon}) => {
  return (
    <div className="w-[45%] lg:w-[20%] bg-white p-4 rounded-md shadow-lg flex flex-col items-end gap-4">
        <div className={`text-white w-[50px] h-[50px] ${color} rounded-full flex items-center justify-center`}>
            {icon}
        </div>
        <p className="text-[10px] lg:text-[13px] font-light">{subTitle}</p>
        <p className="text-[12px] lg:text-[15px] font-semibold">{title}</p>
        <p className="text-[16px] lg:text-[19px] font-bold">{number}</p>
    </div>
  )
}

export default HomeCard