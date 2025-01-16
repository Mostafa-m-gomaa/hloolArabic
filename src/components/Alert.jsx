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
  import { Button } from "@/components/ui/button"
  import { deleteUser } from "@/api/users"
  import { useMutation, useQueryClient } from "@tanstack/react-query"
  import toast from "react-hot-toast"
  
  export function AlertDelete({id}) {

    const queryClient =useQueryClient()

const mutation =useMutation({
    mutationKey : ["users"] ,
    mutationFn : (id)=>deleteUser(id) ,
    onSuccess:(res)=>{

queryClient.invalidateQueries({queryKey:["users"]})
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
  