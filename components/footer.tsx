import { APP_NAME } from "@/lib/constants";

const AppFooter = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t">
      <div className="flex-center p-2">
        {currentYear} {APP_NAME}. All Rights Reserved.
      </div>
    </footer>
  );
};

export default AppFooter;
