import React from 'react'

const FormikError = ({children}) => {
  return (
    <div className='bg-red-600 text-white text-center mt-4 rounded-md text-[10px] lg:text-[12px] w-fit px-3'>{children}</div>
  )
}

export default FormikError