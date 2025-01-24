import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
import toast from "react-hot-toast"
  
  export function PaginationDemo({currentPage , numberOfPages ,setPage}) {

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" onClick={()=>{
                if(currentPage > 1){
                    setPage(currentPage - 1)
                }else{
                    toast.error("لا يوجد صفحة سابقه")
                }
            }} />
          </PaginationItem>
          {Array.from({ length: numberOfPages }).map((_,index)=> (
            <PaginationItem key={index}>
            <PaginationLink href="#" isActive={currentPage === index + 1}>
              {index + 1}
            </PaginationLink>
            </PaginationItem>
          ))}
       
          <PaginationItem>
            <PaginationEllipsis  />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" onClick={()=>{
                if(currentPage < numberOfPages){
                    setPage(currentPage + 1)
                }else{
                    toast.error("انت في الصفحة الاخيرة")
                }
            }} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  }
  


//   <PaginationItem>
//   <PaginationLink href="#" isActive>1</PaginationLink>
// </PaginationItem>
// <PaginationItem>
//   <PaginationLink href="#" >
//     2
//   </PaginationLink>
// </PaginationItem>
// <PaginationItem>
//   <PaginationLink href="#">3</PaginationLink>
// </PaginationItem>