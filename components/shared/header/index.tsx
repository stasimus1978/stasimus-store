import { ShoppingCart, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";

const AppHeader = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex-between">
        <div className="flex-start">
          <Link href="/" className="flex-start">
            <Image
              src="/images/logo.png"
              alt={`${APP_NAME} logo`}
              height={48}
              width={48}
              priority={true}
            />
          </Link>
          <span className="ml-3 hidden text-2xl font-bold lg:block">{APP_NAME}</span>
        </div>
        {/* <Menu/> */}
        <div className="space-x-2">
          <ThemeToggle />

          <Button variant={"ghost"} asChild>
            <Link href="/cart">
              <ShoppingCart /> Cart
            </Link>
          </Button>

          <Button asChild>
            <Link href="/sign-in">
              <UserIcon /> Sign In
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
