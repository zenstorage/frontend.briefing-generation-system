import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  return (
    <div className="flex gap-2">
      <Button
        variant={i18n.language === "en" ? "secondary" : "ghost"}
        size="sm"
        onClick={() => i18n.changeLanguage("en")}
      >
        EN
      </Button>
      <Button
        variant={i18n.language === "pt-BR" ? "secondary" : "ghost"}
        size="sm"
        onClick={() => i18n.changeLanguage("pt-BR")}
      >
        PT
      </Button>
    </div>
  );
};
