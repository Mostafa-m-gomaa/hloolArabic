import React from 'react'
import { Button } from './ui/button'
import moneyImg from '../assets/cash.png'
import { useMutation } from '@tanstack/react-query'
import { verifyCash } from '@/api/orders'
import { Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { useQueryClient } from '@tanstack/react-query'

const SalesMoneyCard = ({amount ,user ,id}) => {
  const queryClient = useQueryClient()
const mutation =useMutation({
    mutationFn:()=>verifyCash(id),
    onSuccess:(res)=>{
        console.log(res)
        if(res.status === "fail"){
            toast.error("حدث خطأ ما")
        }
        else {

          toast.success("تم تأكيد العمولة بنجاح")
          queryClient.invalidateQueries("myCash")
          queryClient.invalidateQueries("myDues")
        }

    }
})

  return (
<div
  className="relative rounded-xl overflow-hidden flex flex-col items-center shadow-lg bg-white font-Roboto-light"
>
  <div className="h-16 w-full bg-[#1e3d52]"></div>
  <div className="top-16 z-10 flex items-center flex-col gap-4 px-5 py-5">
    <div className="-mt-20 rounded-[50%] border-2 border-white overflow-hidden">
        <img src={moneyImg} alt="money" className="w-20 h-20" />
    </div>

    <div className="flex items-center flex-col">
      <p title="name/نام" className="text-black font-Roboto-md">طلب استلام عمولة</p>
      <p title="name/نام" className="text-black font-Roboto-md">المبلغ / {amount}</p>

    </div>

    <div className="flex flex-col-reverse lg:flex-row items-center gap-3">
      <Button
      onClick={mutation.mutate} 
      disabled={mutation.isPending}
        className="bg-[#1e3d52] transition-all gradient text-[15px] text-white px-3 py-[6px] rounded-full flex items-center gap-1"
      >
        {mutation.isPending ? <Loader2 className='animate-spin' /> : "تأكيد استلام العمولة"}
        
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m4.5 12.75 6 6 9-13.5"
          ></path>
        </svg>
      </Button>
      <span
        className="bg-gray-200/65 hover:bg-gray-200 transition-colors p-2 rounded-full flex items-center gap-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
          ></path>
        </svg>
        <span className='text-[11px] lg:text-[13px]'>

        من المشرف / {user}
        </span>
      </span>
    </div>
  </div>
</div>

  )
}

export default SalesMoneyCard