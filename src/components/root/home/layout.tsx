import NavBar from "@/components/pages/NavBar";
import SideBar from "@/components/pages/SideBar";
import { type ReactNode} from "react";
import {  Outlet, useNavigate } from "react-router";
import { useAuth } from "@clerk/react";

const HomeLayout = ({children}: {children: ReactNode}) => {
  const navigate = useNavigate();
  const {isSignedIn} = useAuth();
   
   if(!isSignedIn) {
      navigate('/sign-in');
   }


  return (
    <main className="relative bg-dark-2">
        <NavBar />
        <div className="flex">
            <SideBar />
            <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
                   <div className="w-full">
                    <Outlet />
                   </div>
            </section>
        </div>
    </main>
  )
}

export default HomeLayout;