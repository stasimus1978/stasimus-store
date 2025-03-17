"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Image
        src="/images/logo.png"
        alt={`${APP_NAME} logo`}
        height={100}
        width={100}
        priority={true}
      />
      <div className="rounded-lg p-6 text-center shadow-md">
        <h1 className="m-4 text-3xl font-bold">Page Not Found!</h1>
        <p className="text-destructive">Could not find requested page.</p>
        <Button className="mt-4 ml-2" onClick={() => (window.location.href = "/")}>
          Back to the home page
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
