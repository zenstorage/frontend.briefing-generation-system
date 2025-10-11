import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileText, Menu } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { useMobile } from "@/hooks/use-mobile";

const Header = () => {
  const { t } = useTranslation();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const isMobile = useMobile();

  const navLinks = (
    <>
      <Link to="/pricing" onClick={() => setIsSheetOpen(false)}>
        <Button variant="ghost">{t("home.header.pricing")}</Button>
      </Link>
      <Link to="/login" onClick={() => setIsSheetOpen(false)}>
        <Button variant="outline">{t("home.header.login")}</Button>
      </Link>
      <Link to="/register" onClick={() => setIsSheetOpen(false)}>
        <Button>{t("home.header.register")}</Button>
      </Link>
    </>
  );

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container flex items-center justify-between h-16 px-4 sm:px-6">
        <Link to="/" className="flex items-center space-x-2">
          <FileText className="h-8 w-8 text-primary" />
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">{t("home.header.brand")}</h1>
        </Link>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          <LanguageSwitcher />
          {isMobile ? (
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs">
                <nav className="flex flex-col space-y-4 mt-8">
                  {navLinks}
                </nav>
              </SheetContent>
            </Sheet>
          ) : (
            <nav className="flex items-center space-x-2">
              {navLinks}
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
