import { Link } from "react-router"
import MobileNav from "../MobileNav"
import { useEffect, useState } from "react"
import {
  Show,
  UserButton,
} from "@clerk/react";
const NavBar = () => {
  const [width, setWidth] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="flex flex-between fixed z-50 w-full bg-dark-1 px-6 py-4">
      <Link to="/home" className="flex items-center gap-1">
      <img src="/zoom/icons/logo.svg" className="size-12 max-sm:size-10" alt="Yoom logo" />
      <p className="text-[26px] font-extrabold text-white max-sm:hidden">Yoom</p>
      </Link>
      <div className="flex-between gap-5">
        <Show when="signed-in">
          <UserButton />
        </Show>
        {width < 768 && <MobileNav />}
      </div>
    </nav>
  )
}

export default NavBar;
