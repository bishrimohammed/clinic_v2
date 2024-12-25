import { NavUser } from "@/components/nav-user";
import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

const Header = () => {
  return (
    <div className="w-full">
      <div className="flex h-[60px] items-center justify-between  border-b border-[#00002f26] px-2">
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
