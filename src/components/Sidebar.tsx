import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Home, LayoutDashboard, Shirt, User } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { ModeToggle } from "./ModeToggle";
import { getCurrentUser, checkAdmin } from "@/lib/utils";

const SIDEBAR_LINKS = [
  {
    icon: Home,
    label: "Home",
    href: "/",
  },
  {
    icon: Shirt,
    label: "Merch",
    href: "/merch",
  },
];

const Sidebar = async () => {
  const user = await getCurrentUser();
  const isAdmin = checkAdmin(user?.email);
  return (
    <div className="sticky left-0 top-0 flex h-screen flex-col gap-3 border-r px-2 lg:w-1/5">
      <Link href="/update-profile" className="max-w-fit">
        <Avatar className="mt-4 cursor-pointer">
          <AvatarImage
            src={user?.picture || "/user-placeholder.png"}
            className="rounded-full object-cover"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </Link>
      <nav className="flex flex-col gap-3">
        {SIDEBAR_LINKS.map((linkObj) => (
          <Link
            key={linkObj.href}
            href={linkObj.href}
            className="flex w-12 items-center justify-center gap-2 rounded-full px-2 py-1 font-bold hover:bg-primary-foreground hover:text-primary lg:w-full lg:justify-normal"
          >
            <linkObj.icon className="h-6 w-6" />
            <span className="hidden lg:block">{linkObj.label}</span>
          </Link>
        ))}

        {isAdmin && (
          <Link
            href={"/secret-dashboard"}
            className="flex w-12 items-center justify-center gap-2 rounded-full px-2 py-1 font-bold hover:bg-primary-foreground hover:text-primary lg:w-full lg:justify-normal"
          >
            <LayoutDashboard className="h-6 w-6" />
            <span className="hidden lg:block">Dash board</span>
          </Link>
        )}

        <DropdownMenu>
          <div className="flex w-12 items-center justify-center gap-2 rounded-full px-2 py-1 font-bold hover:bg-primary-foreground hover:text-primary lg:w-full lg:justify-normal">
            <DropdownMenuTrigger className="flex items-center gap-2">
              <User className="h-6 w-6" />
              <span className="hidden lg:block">Setting</span>
            </DropdownMenuTrigger>
          </div>

          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={"#"}>
              <DropdownMenuItem>Billing</DropdownMenuItem>
            </Link>
            <LogoutLink>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </LogoutLink>
          </DropdownMenuContent>
        </DropdownMenu>

        <ModeToggle />
      </nav>
    </div>
  );
};

export default Sidebar;
