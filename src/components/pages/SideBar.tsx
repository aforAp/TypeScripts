import { sidebarLinks } from "@/constants"
import { cn } from "@/lib/utils"
import { NavLink } from "react-router"
const SideBar = () => {
  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-66">
      <div className="flex flex-1 flex-col gap-6">
        {
          sidebarLinks.map((link) => (
            <NavLink to={link.route} className={({isActive}) => cn('flex gap-4 items-center p-4 rounded-lg justify-start', isActive ? "bg-blue-1": '')}>
              <span className="flex gap-4">
               <img src={link.imgUrl} alt={link.label} />
              <p className="text-lg font-semibold max-lg:hidden">{link.label}</p>
              </span>
              </NavLink>
          ))
        }
      </div>
    </section>
  )
}

export default SideBar
