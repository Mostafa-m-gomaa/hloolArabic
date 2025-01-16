import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import logo from '../assets/logo.png'


import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export function MenuSheet() {
  const [isSheetOpen, setIsSheetOpen] = useState(false); // State to control sheet visibility

  const menu = [
    { name: "الطلبات", link: "/home" },
    { name: "المنتجات", link: "/home/products" },
    { name: "الموظفين", link: "/home/users" },
  ];

  const location = useLocation().pathname;

  const handleClose = () =>  setIsSheetOpen(false); // Function to close the sheet

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button onClick={() => setIsSheetOpen(true)}>القائمة</Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col border-2">
        <SheetHeader>
          <img src={logo} className="w-[50%] mx-auto rounded-md" alt="Logo" />
        </SheetHeader>
        <div className="flex flex-col gap-2">
          {menu.map((item, index) => (
            <Link
              to={item.link}
              key={index}
              className={`p-2 text-right rounded-md cursor-pointer transition-all hover:bg-myBlue ${
                location === item.link ? "bg-myBlue text-white" : "bg-gray-300"
              }`}
              onClick={handleClose} // Close sheet when link is clicked
            >
              {item.name}
            </Link>
          ))}
          <Link
            to={`/`}
            className="p-2 text-right rounded-md bg-red-600 cursor-pointer transition-all text-white w-fit"
            onClick={handleClose} // Close sheet when logout link is clicked
          >
            تسجيل الخروج
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}


// import { Link } from "react-router-dom"
// import { useLocation } from "react-router-dom"

// export function MenuSheet() {
//     const menu = [
//         {
//             name: 'الطلبات',
//             link: '/home'
//         } ,
//         {
//             name: 'المنتجات',
//             link: '/home/products'
//         } ,
//         {
//             name: 'الموظفين',
//             link: '/home/users'
//         } 
//     ]

//     const location = useLocation().pathname
//   return (
//     <Sheet>
//       <SheetTrigger asChild>
//         <Button >القائمة</Button>
//       </SheetTrigger>
//       <SheetContent className="flex flex-col border-2 ">
//         <SheetHeader>
//           <img src={logo} className="w-[50%] mx-auto rounded-md" alt="" />
          
 
//         </SheetHeader>
//         <div className="flex flex-col gap-2">
//             {menu.map((item,index)=>{
//                 return <Link to={`${item.link}`} key={index} className={`p-2 text-right rounded-md  cursor-pointer transition-all hover:bg-myBlue ${location === item.link  ? "bg-myBlue text-white": "bg-gray-300"}`}>{item.name}</Link>
//             })}
//             <Link to={`/`}  className={`p-2 text-right rounded-md bg-red-600  cursor-pointer transition-all text-white w-fit `}>تسجيل الخروج</Link>
//         </div>


//       </SheetContent>
//     </Sheet>
//   )
// }
