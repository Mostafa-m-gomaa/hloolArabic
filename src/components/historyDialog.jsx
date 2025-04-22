import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,

  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"

import { Link } from "react-router-dom"


export function HistoryDialog({history}) {

    
  const formatDate = (date) => {
    if (!date) return "N/A"; // Return a default value if the date is undefined
    const validDate = new Date(date);
  
    if (isNaN(validDate.getTime())) {
      return "Invalid Date"; // Return a fallback value if the date is invalid
    }
  
    // Extract month, day, and year
    const month = validDate.getMonth() + 1; // Months are zero-based
    const day = validDate.getDate();
    const year = validDate.getFullYear();
  
    return `${day}/${month}/${year}`;
  };



    const [open, setOpen] = useState(false);
    



  return (
    <Dialog  open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button >السجل</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[70%] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>سجل الاموال</DialogTitle>
 
        </DialogHeader>
           


<div className='w-[98%] lg:w-[95%] mx-auto flex flex-col items-end gap-3 justify-center'>
            {history?.map((item,index)=>( 
            <div className="flex bg-slate-400 p-4 rounded-md w-[90%] mx-auto my-2 flex-col gap-2 items-end" key={index}>
                <span>{item?.amount}</span>
                <span>{item?.type}</span>
                <span>{formatDate(item?.amount)}</span>
                {item.report &&  <Button>
<Link to={`/home/onereport/${item?.report}`}>
        التقرير
</Link>
    </Button> }
                </div>
          ))}
            </div>

    
   
      </DialogContent>
    </Dialog>
  )
}
