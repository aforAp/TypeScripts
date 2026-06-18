import NavBar from "@/components/pages/NavBar";
import SideBar from "@/components/pages/SideBar";
import { type ReactNode} from "react";
import {  Outlet, useNavigate } from "react-router";
import { useAuth } from "@clerk/react";
import { Navigate } from "react-router";
import Loader from "@/components/Loader";

const HomeLayout = ({children}: {children: ReactNode}) => {
  const navigate = useNavigate();
  const {isLoaded, isSignedIn} = useAuth();

  console.log(isSignedIn);
   console.log("is this signed in", isSignedIn);
   if(!isLoaded) {
      return <Loader />;
   }
   if(!isSignedIn) {
    console.log("HomeLayout rendered");
      return <Navigate to="/sign-in" replace />;
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
  );
}

export default HomeLayout;