import { makeOrderReady } from "@/api/orders"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useMutation , useQueryClient } from "@tanstack/react-query"
import { Form, Formik , Field } from "formik"
import toast from "react-hot-toast"

export function PopoverDemo({id }) {
    const queryClient = useQueryClient()
    const initialValues ={
        productIssuanceDate:"",
        DeliveryReceipt:""
    }

    const mutation =useMutation({
        mutationFn:({mutationId,values})=>makeOrderReady(mutationId,values) ,
        onSuccess:(res)=>{
            console.log(res)
            queryClient.invalidateQueries({queryKey:["orders"]})
            if(res.status === "success"){
               toast.success("تم تحديث الطلب بنجاح")
            }
            else if(res.status === "fail"){
                toast.error(res.message)
            }

        } ,
        onError:(err)=>{
            toast.error(err)
        }
    })


    const onSubmit =(values)=>{
        values.productIssuanceDate = new Date(values.productIssuanceDate).toISOString()
   console.log(values)
        mutation.mutate({mutationId : id ,values})
    }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button >اعداد الطلب</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">اعداد الطلب</h4>
          </div>
          <div className="grid gap-2">
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                {({...sayed})=>(

            <Form className="grid grid-cols-3 items-center gap-4">
                
              <Label htmlFor="width">سند التسليم</Label>
             
                     <Field
                      as={Input}
                      name="DeliveryReceipt"
                      placeholder="Enter delivery receipt"
                      className="col-span-2 h-8"
                      required
                    />
                     <Label htmlFor="width">اصدار البطاقة</Label>
              <Field
              as={Input}
              name="productIssuanceDate"
              type="date"
              className="col-span-2 h-8"
              required
            />
       <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Loading..." : "تحديث"}
       </Button>
            </Form>
                )}

            </Formik>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
