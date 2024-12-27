import { NavUser } from "@/components/nav-user";
import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

const Header = () => {
  return (
    <div className="w-full shadow-sm">
      <div className="flex h-[60px] items-center justify-between  border-b border-[#3f3f4126] px-2">
        <div className="flex items-center justify-between">
          <SidebarTrigger className="-ml-1" />
        </div>
        <div>
          <NavUser />
        </div>
      </div>
    </div>
  );
};

export default Header;
