"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePickerDemo({searchFunc , ...props}) {
  const [date, setDate] = React.useState()
  function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: '2-digit' };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
  }
  function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
  

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{props.title || "اختر تاريخ"}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selectedDate)=>{
            setDate (selectedDate),
            searchFunc(props.type, formatDate(selectedDate))
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
