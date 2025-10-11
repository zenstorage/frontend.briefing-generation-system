import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

const Sales = () => {
  const { t } = useTranslation();

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>{t("sales.title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{t("sales.subtitle")}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Sales;
