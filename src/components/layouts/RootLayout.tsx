import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import {
  IconReceiptDollar,
  IconBrandTabler,
//  IconSettings,
  IconApi,
  IconLayoutDashboard,
  IconGrid3x3,
  IconSun,
  IconMoon,
} from "@tabler/icons-react";
import { NavLink, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { useState } from "react";
import useFetchUser from "../../hooks/useFetchUser";

export function RootLayout() {
  const {user,error}=useFetchUser()
  const [dark, setDark] = useState(false);
  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  }
  const links = [
    {
      label: "Dashboard",
      href: "./",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Projects",
      href: "projects",
      icon: (
        <IconLayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Templates",
      href: "templates",
      icon: (
        <IconGrid3x3  className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    /* {
      label: "Settings",
      href: "settings",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    }, */
    {
      label: "API",
      href: "api",
      icon: (
        <IconApi className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Billing",
      href: "billing",
      icon: (
        <IconReceiptDollar className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1  mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-[100vh]" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: user?.name || "manu kumar",
                href: "settings",
                icon: (
                  <img
                    src= {user?.profileImage||"https://assets.aceternity.com/manu.png"}
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
            {error && (
            <div className="mt-3 text-sm text-red-600 bg-red-100 p-2 rounded dark:bg-red-800 dark:text-red-300">
            {error}
            </div>)}
          </div>
        </SidebarBody>
      </Sidebar>
      {/* Scrollable Outlet */}
      <div className="flex-1 overflow-y-auto">
        <Outlet />
        <button onClick={()=> darkModeHandler()} 
        className="fixed md:absolute bottom-4 md:bottom-auto md:top-4 right-4 p-1 bg-transparent text-gray-600 rounded-s hover:bg-lime-300 dark:hover:bg-purple-950">
          {dark ? 
          <IconSun className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />: 
          <IconMoon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
          } 
        </button>
      </div>
    </div>
  );
}
export const Logo = () => {
  return (
    <NavLink
      to="./"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <img 
      src="/logo.png" 
      alt="WebGen Logo"
      className="h-5 w-6 flex-shrink-0"
      />
      <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="font-medium text-black dark:text-white whitespace-pre"
      >
      WebGen
      </motion.span>
    </NavLink>
  );
};
export const LogoIcon = () => {
  return (
    <NavLink
      to="./"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <img 
      src="/logo.png" 
      alt="WebGen Logo"
      className="h-5 w-6 flex-shrink-0"
      />
    </NavLink>
  );
};


