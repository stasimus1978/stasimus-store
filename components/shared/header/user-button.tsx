import { UserIcon } from "lucide-react";
import Link from "next/link";

import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { signOutUser } from "@/lib/actions/user.actions";

const UserButton = async () => {
  const session = await auth();

  if (!session) {
    return (
      <Button asChild>
        <Link href="/sign-in">
          <UserIcon /> Sign In
        </Link>
      </Button>
    );
  }

  const initialName = session.user?.name?.charAt(0).toUpperCase() ?? "U";

  return (
    <>
      <div className="item-center flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="item-center flex">
              <Button
                variant="ghost"
                className="item-center relative ml-2 flex h-8 w-8 justify-center rounded-full bg-gray-300"
              >
                {initialName}
              </Button>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56 md:mr-4">
            <DropdownMenuLabel className="w-56">
              <div className="flex flex-col space-y-1">
                <div className="text-sm leading-none font-bold">{session.user?.name}</div>
                <div className="text-sm leading-none font-normal text-gray-600">
                  {session.user?.email}
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="mb-1 p-0">
              <form action={signOutUser} className="w-full">
                <Button variant="ghost" className="h-4 w-full justify-start px-2 py-4">
                  Sign Out
                </Button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default UserButton;
