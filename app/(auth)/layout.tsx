import { LayoutProps } from "../layout";

export default function AuthLayout({ children }: LayoutProps) {
  return <div className="flex-center min-h-screen w-full">{children}</div>;
}
