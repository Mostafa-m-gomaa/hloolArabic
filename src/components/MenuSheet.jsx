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
import { House } from 'lucide-react';
import { User } from 'lucide-react';
import { ShoppingBasket } from 'lucide-react';
import { Users } from 'lucide-react';
import { ClipboardMinus } from 'lucide-react';
import { ClipboardPlus } from 'lucide-react';
import { ArrowDownUp } from 'lucide-react';
import { LogOut } from 'lucide-react';






import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export function MenuSheet() {
  const [isSheetOpen, setIsSheetOpen] = useState(false); // State to control sheet visibility
  const name = localStorage.getItem("name")

  const [menu,setMenu] = useState([
    { name: "الصفحة الرئيسية", link: "/home" },
    { name: "ادارة الطلبات", link: "/home/manageOrders" },
    { name: "المنتجات", link: "/home/products" },
    { name: "الموظفين", link: "/home/users" },
    { name: "طلباتي", link: "/home/myorders" },
    { name: "تقاريري", link: "/home/myreports" },
    { name: "التقارير", link: "/home/reports" },
  ])

  const location = useLocation().pathname;

  const handleClose = () =>  setIsSheetOpen(false); // Function to close the sheet
useEffect(()=>{
  const role = localStorage.getItem("role")
  if(role === "admin"){
    setMenu([
      { name: "الصفحة الرئيسية", link: "/home" , icon:<House/> },
      { name: "ادارة الطلبات", link: "/home/manageOrders" , icon:<ArrowDownUp/> },
      { name: "المنتجات", link: "/home/products" , icon:<ShoppingBasket/> },
      { name: "الموظفين", link: "/home/users" , icon:<Users/> },
      { name: "التقارير", link: "/home/reports", icon:<ClipboardMinus/> },
      { name: "المستحقات علي المشرفين", link: "/home/supervisorsdues", icon:<ClipboardMinus/> },
    ])
  }
  else if(role === "manager"){
    setMenu([
      { name: "الصفحة الرئيسية", link: "/home/managersHome" , icon:<House/> },
      { name: "ادارة الطلبات", link: "/home/manageOrders" , icon:<ArrowDownUp/> },
      { name: "التقارير", link: "/home/reports"},
      { name: "المستحقات علي المشرفين", link: "/home/supervisorsdues", icon:<ClipboardMinus/> },
    ])
  }
  else if(role === "sales"){
    setMenu([
      { name: "الصفحة الرئيسية", link: "/home/salesHome" , icon:<House/> },
      { name: "طلباتي", link: "/home/myorders" , icon:<ClipboardPlus/> },
    
    ])

  }
  else if(role === "supervisor"){
    setMenu([
      { name: "الصفحة الرئيسية", link: "/home/salesHome" , icon:<House/> },
      { name: "طلباتي", link: "/home/myorders" , icon:<ClipboardPlus/> },
      { name: "تقاريري", link: "/home/myreports" , icon:<ClipboardMinus/> },
      { name: "المستحقات عليا", link: "/home/supervisorsdues", icon:<ClipboardMinus/> },
    ])

  }
  else if(role === "validator"){
    setMenu([
      { name: "الصفحة الرئيسية", link: "/home" , icon:<House/> },
      { name: "التقارير", link: "/home/reports", icon:<ClipboardMinus/> },
      { name: "المستحقات علي المشرفين", link: "/home/supervisorsdues", icon:<ClipboardMinus/> },
    ])

  }
 

},[])
  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button onClick={() => setIsSheetOpen(true)}>القائمة</Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col border-2">
        <SheetHeader>
          <img src={logo} className="w-[50%] mx-auto rounded-md" alt="Logo" />
          <div className="flex gap-2 bg-myBlue w-fit mx-auto p-2 rounded-md text-white">
            مرحباً بعودتك
          <SheetTitle className="text-white">{name}</SheetTitle>
          <User />
          </div>
        </SheetHeader>
        <div className="flex flex-col gap-2">
          {menu.map((item, index) => (
            <Link
              to={item.link}
              key={index}
              className={`p-2 items-center text-right rounded-md cursor-pointer transition-all hover:bg-myBlue flex justify-end gap-4 ${
                location === item.link ? "bg-myBlue text-white" : "bg-gray-300"
              }`}
              onClick={handleClose} // Close sheet when link is clicked
            >
              {item.name}
              <span className="bg-white p-1 rounded-md text-black">

              {item.icon}
              </span>
            </Link>
          ))}
          <Link
            to={`/`}
            className="p-2 flex gap-4 text-right rounded-md bg-red-600 cursor-pointer transition-all text-white w-fit"
            onClick={()=>{
              localStorage.clear()
            }} 
          >
            تسجيل الخروج
            <LogOut/>
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
