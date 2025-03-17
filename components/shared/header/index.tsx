import Image from "next/image";
import Link from "next/link";

import Menu from "./menu";
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
        <Menu />
      </div>
    </header>
  );
};

export default AppHeader;
