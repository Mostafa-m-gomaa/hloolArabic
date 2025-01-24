"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"



export function ComboboxOrders({setParam ,forWhat}) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [label, setLabel] = React.useState("")
  const [frameworks, setFrameworks] = React.useState([])
  const usersSearchKeys = [
    {
      value: "name",
      label: "اسم الموظف",
    },
    {
      value: "email",
      label: "ايميل الموظف",
    },
    {
      value: "role",
      label: "الدور",
    }
  
  ]
  const productsSearchKeys = [
    {
      value: "title",
      label: "اسم المنتح",
    }
  
  ]

  React.useEffect(()=>{
    if(forWhat === "users"){
      setFrameworks(usersSearchKeys)
    }
    else if(forWhat === "products"){
        setFrameworks(productsSearchKeys)
        }

  },[])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
            {label ? label:"اختر الفلتر" }
      
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
         
          <CommandList>
            
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)        
                    setLabel(framework.label)
                    setParam(currentValue)
                           }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
