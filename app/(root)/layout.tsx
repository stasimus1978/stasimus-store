import { LayoutProps } from "@/app/layout";

import AppFooter from "@/components/footer";
import AppHeader from "@/components/shared/header";

export default function RootLayout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen flex-col">
      <AppHeader />

      <main className="wrapper flex-1">{children}</main>

      <AppFooter />
    </div>
  );
}
