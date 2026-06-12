import {
  Sheet,SheetClose,SheetContent,SheetTrigger} from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { Link, NavLink } from "react-router";

const MobileNav = () => {
  return (
   <section className="w-full">
     <Sheet>
  <SheetTrigger asChild>
    <img src="/zoom/icons/hamburger.svg" className="size-8 cursor-pointer sm:hidden" alt="hamburger icon" />
  </SheetTrigger>
  <SheetContent side="left" className="border-none bg-dark-1 w-full max-w-80">
    
     <Link to="/home" className="pl-3 flex items-center gap-1">
      <img src="/zoom/icons/logo.svg" className="size-12 max-sm:size-10" alt="Yoom logo" />
      <p className="text-[26px] font-extrabold text-white">Yoom</p>
      </Link>
      <div className="flex h-[calc(100vh - 72px)] flex-col justify-between overflow-y-auto">
        <SheetClose asChild>
       <section className="flex h-full flex-col gap-6 pt-16 pl-3 text-white">
        {
          sidebarLinks.map((link) => (
            
            <NavLink to={link.route} className={({isActive}) => cn('flex gap-4 items-center p-4 rounded-lg w-full max-w-60', isActive ? "bg-blue-1": '')}>
              <SheetClose asChild key={link.label}>
              <span className="flex gap-4">
               <img src={link.imgUrl} alt={link.label} className="size-5"/>
              <p className="font-semibold">{link.label}</p>
              </span>
              </SheetClose>
              </NavLink>
          ))
        }
       </section>
        </SheetClose>
      </div>
  </SheetContent>
</Sheet>
   </section>
  )
}

export default MobileNav;
