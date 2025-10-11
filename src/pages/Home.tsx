import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { FileText, Zap, Users, Shield, ArrowRight, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-briefing.jpg";
import { useTranslation, Trans } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: t("home.features.fast_creation.title"),
      description: t("home.features.fast_creation.description"),
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: t("home.features.collaboration.title"),
      description: t("home.features.collaboration.description"),
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: t("home.features.security.title"),
      description: t("home.features.security.description"),
    },
  ];

  const benefits = t("home.benefits.items", { returnObjects: true }) as string[];

  return (
    <>
      <div className="min-h-screen bg-gradient-subtle">
      

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                  <Trans i18nKey="home.hero.title">
                    Crie briefings
                    <span className="bg-gradient-primary bg-clip-text text-transparent">inteligentes</span>
                  </Trans>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  {t("home.hero.subtitle")}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="lg" className="group">
                    {t("home.hero.cta")}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg">
                    {t("home.hero.cta_secondary")}
                  </Button>
                </Link>
              </div>

              <div className="flex items-center space-x-6 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">10k+</div>
                  <div className="text-sm text-muted-foreground">{t("home.hero.stats.briefings")}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">500+</div>
                  <div className="text-sm text-muted-foreground">{t("home.hero.stats.companies")}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">99%</div>
                  <div className="text-sm text-muted-foreground">{t("home.hero.stats.satisfaction")}</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur-2xl opacity-20"></div>
              <img 
                src={heroImage} 
                alt="Briefing profissional sendo criado"
                className="relative rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-background">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t("home.features.title")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("home.features.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center text-primary-foreground mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                {t("home.benefits.title")}
              </h3>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <Card className="p-8 bg-gradient-subtle border-0 shadow-card">
              <CardHeader className="text-center p-0 pb-6">
                <CardTitle className="text-2xl">{t("home.cta_section.title")}</CardTitle>
                <CardDescription>
                  {t("home.cta_section.subtitle")}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 space-y-4">
                <Link to="/register" className="block">
                  <Button size="lg" className="w-full">
                    {t("home.cta_section.cta")}
                  </Button>
                </Link>
                <p className="text-center text-sm text-muted-foreground">
                  {t("home.cta_section.no_credit_card")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-muted">
        <div className="container max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <FileText className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold text-foreground">{t("home.header.brand")}</span>
            </div>
            <p className="text-muted-foreground text-center">
              {t("home.footer.copyright")}
            </p>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
};

export default Home;