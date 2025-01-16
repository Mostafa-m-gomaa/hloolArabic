import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { useMutation, useQueryClient } from "@tanstack/react-query"
  import toast from "react-hot-toast"
import { deleteProduct } from "@/api/products"
  
  export function AlertDeleteProduct({id}) {

    const queryClient =useQueryClient()

const mutation =useMutation({
    mutationKey : ["products"] ,
    mutationFn : (id)=>deleteProduct(id) ,
    onSuccess:(res)=>{

queryClient.invalidateQueries({queryKey:["products"]})
if(res.status === 'success'){
    toast.success("تم الحذف بنجاح")
}
    }
})

    return (
      <AlertDialog>
        <AlertDialogTrigger  className="text-left  w-full px-2">
          حذف
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>هل انت متاكد من انك تريد حذف هذا ؟</AlertDialogTitle>
        
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>الغاء</AlertDialogCancel>
            <AlertDialogAction onClick={()=>mutation.mutate(id)}>حذف</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  