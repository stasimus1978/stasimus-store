import type { Metadata } from "next";
import { Roboto } from "next/font/google";

// import { ErrorWrapper } from "./error-wrapper";
import "@/assets/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { APP_DESCRIPTION, APP_NAME, SERVER_URL } from "@/lib/constants";

const roboto = Roboto({
  weight: ["300", "700"],
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_NAME}`,
    absolute: `${APP_NAME}`
  },
  description: `${APP_DESCRIPTION}`,
  metadataBase: new URL(SERVER_URL)
};

export type LayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* <ErrorWrapper> */}
          {children}
          <Toaster richColors />
          {/* </ErrorWrapper> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
