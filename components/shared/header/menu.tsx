import { EllipsisVertical, ShoppingCart } from "lucide-react";
import Link from "next/link";

import { ThemeToggle } from "./theme-toggle";
import UserButton from "./user-button";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";

const Menu = () => {
  return (
    <div className="flex justify-end gap-3">
      <nav className="hidden w-full max-w-xs gap-1 md:flex">
        <ThemeToggle />

        <Button asChild variant="ghost">
          <Link href="/cart">
            <ShoppingCart /> Cart
          </Link>
        </Button>
        <UserButton />
      </nav>
      <nav className="md:hidden">
        <Sheet>
          <SheetTrigger className="align-middle">
            <EllipsisVertical />
          </SheetTrigger>
          <SheetContent className="item-start flex flex-col">
            <SheetHeader className="item-start flex flex-col">
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>
            <ThemeToggle />
            <div className="flex flex-col items-start space-y-2">
              <Button asChild variant="ghost" className="justify-start">
                <Link href="/cart">
                  <ShoppingCart /> Cart
                </Link>
              </Button>
              <UserButton />
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default Menu;
