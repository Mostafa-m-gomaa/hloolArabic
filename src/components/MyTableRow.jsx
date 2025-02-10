import React from 'react'

const MyTableRow = ({title , content}) => {
  return (
    <div className="flex w-full justify-between  text-white border-b-2 border-white flex-row-reverse">
    <div className="w-[40%] bg-myBlue text-center py-2 text-white">{title}</div>
    <div className="w-[56%] text-black p-2">{content}</div>
    </div>
  )
}

export default MyTableRow