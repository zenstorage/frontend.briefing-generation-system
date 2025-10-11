import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const Pricing = () => {
  const { t } = useTranslation();

  const plans = [
    {
      title: t("pricing.free_plan.title"),
      price: t("pricing.free_plan.price"),
      description: t("pricing.free_plan.description"),
      features: t("pricing.free_plan.features", { returnObjects: true }) as string[],
      cta: t("pricing.free_plan.cta"),
    },
    {
      title: t("pricing.pro_plan.title"),
      price: t("pricing.pro_plan.price"),
      description: t("pricing.pro_plan.description"),
      features: t("pricing.pro_plan.features", { returnObjects: true }) as string[],
      cta: t("pricing.pro_plan.cta"),
    },
    {
      title: t("pricing.enterprise_plan.title"),
      price: t("pricing.enterprise_plan.price"),
      description: t("pricing.enterprise_plan.description"),
      features: t("pricing.enterprise_plan.features", { returnObjects: true }) as string[],
      cta: t("pricing.enterprise_plan.cta"),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle py-12">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            {t("pricing.title")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("pricing.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-2xl">{plan.title}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-6">
                <div className="text-4xl font-bold">{plan.price}</div>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-accent" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <div className="p-6">
                <Button className="w-full">{plan.cta}</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
