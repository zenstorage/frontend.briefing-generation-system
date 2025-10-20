import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BriefingCard } from "./BriefingCard";
import { BriefingResult } from "./BriefingResult";
import { Skeleton } from "@/components/ui/skeleton";


import {
  Plus,
  Search,
  Filter,
  FileText,
  TrendingUp,
  Users,
  Clock,
  BarChart3,
  Award,
  CloudCog
} from "lucide-react";
import heroImage from "@/assets/hero-briefing.jpg";

import { useTranslation } from "react-i18next";
import Markdown from "react-markdown";

interface Briefing {
  id: string;
  title: string;
  description: string;
  status: "draft" | "completed" | "in-progress";
  createdAt: string;
  clientName: string;
  briefingResult?: any;
}

export const Dashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [briefings, setBriefings] = useState<Briefing[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBriefing, setSelectedBriefing] = useState<Briefing | null>(null);

  useEffect(() => {
    const fetchBriefings = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/api/briefings", {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
          console.error("Fetched data is not an array:", data);
          setBriefings([]);
          return;
        }
        const formattedBriefings = data.map((briefing: any) => ({
          id: briefing.id,
          title: briefing.briefing_result.briefing_short_title ?? 'Untitled Briefing',
          description: (briefing.briefing_result?.briefing?.substring(0, 100) ?? 'No description available') + "...",
          status: "completed" as const,
          createdAt: new Date(briefing.created_at).toLocaleDateString(),
          clientName: briefing.company_name ?? 'Unknown Client',
          briefingResult: briefing.briefing_result,
        }));
        setBriefings(formattedBriefings);
      } catch (error) {
        console.error("Error fetching briefings:", error);
        setBriefings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBriefings();
  }, []);

  const filteredBriefings = briefings.filter(briefing =>
    (briefing.title?.toLowerCase() ?? '').includes(searchTerm.toLowerCase()) ||
    (briefing.clientName?.toLowerCase() ?? '').includes(searchTerm.toLowerCase())
  );

  const handleBriefingClick = (briefing: Briefing) => {
    console.log("Briefing clicked:", briefing);
    setSelectedBriefing(briefing);
  };

  const handleBack = () => {
    setSelectedBriefing(null);
  };
  

  const stats = [
    {
      title: t("dashboard.stats.total_briefings.title"),
      value: "24",
      description: t("dashboard.stats.total_briefings.description"),
      icon: FileText,
      trend: "+12%",
    },
    {
      title: t("dashboard.stats.active_clients.title"),
      value: "18",
      description: t("dashboard.stats.active_clients.description"),
      icon: Users,
      trend: "+5%",
    },
    {
      title: t("dashboard.stats.success_rate.title"),
      value: "94%",
      description: t("dashboard.stats.success_rate.description"),
      icon: TrendingUp,
      trend: "+2%",
    },
    {
      title: t("dashboard.stats.avg_time.title"),
      value: "5.2d",
      description: t("dashboard.stats.avg_time.description"),
      icon: Clock,
      trend: "-8%",
    },
  ];

  if (selectedBriefing) {
    console.log(selectedBriefing.briefingResult.briefing)
    return (
      <BriefingResult
        briefingContent={selectedBriefing.briefingResult.briefing.replaceAll("\\n", "\n")}
        onBack={handleBack}
        onNewBriefing={() => navigate("/dashboard/new")}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              
              <div className="p-2 rounded-lg bg-gradient-primary">
                <FileText className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-foreground">{t("dashboard.header.brand")}</h1>
                <p className="text-sm text-muted-foreground hidden sm:block">{t("dashboard.header.subtitle")}</p>
              </div>
            </div>

            <Button
              variant="hero"
              size="lg"
              onClick={() => navigate("/dashboard/new")}
              className="shadow-lg"
            >
              <Plus className="h-5 w-5 sm:mr-2" />
              <span className="hidden sm:inline">{t("dashboard.header.new_briefing_button")}</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0">
            <img
              src={heroImage}
              alt="Ilustração profissional de briefings para startups"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
          </div>
          <div className="relative px-6 sm:px-8 py-10 sm:py-12 text-primary-foreground">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                {t("dashboard.hero.title")}
              </h2>
              <p className="text-lg sm:text-xl mb-6 text-primary-foreground/90">
                {t("dashboard.hero.subtitle")}
              </p>
              <Button
                variant="accent"
                size="lg"
                onClick={() => navigate("/dashboard/new")}
                className="shadow-xl"
              >
                {t("dashboard.hero.cta")}
                <BarChart3 className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const isPositive = stat.trend.startsWith('+');

            return (
              <Card key={stat.title} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <Badge
                      variant={isPositive ? "default" : "secondary"}
                      className={isPositive ? "bg-gradient-accent" : ""}
                    >
                      {stat.trend}
                    </Badge>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                    <p className="font-medium text-sm">{stat.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </section>

        {/* Gamification Section */}
        {/*
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">{t("gamification.title")}</h2>
            <p className="text-muted-foreground">
              {t("gamification.subtitle")}
            </p>
          </div>
          <Card>
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="flex flex-col items-center md:items-start">
                <div className="text-sm text-muted-foreground">{t("gamification.points")}</div>
                <div className="text-4xl font-bold">1,250</div>
                <div className="text-sm text-muted-foreground mt-2">{t("gamification.level")} 5</div>
              </div>
              <div className="md:col-span-2">
                <div className="text-sm text-muted-foreground mb-2">{t("gamification.achievements")}</div>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center gap-1">
                    <div className="p-3 rounded-full bg-yellow-400 text-white">
                      <Award className="h-6 w-6" />
                    </div>
                    <div className="text-xs text-center">{t("gamification.pioneer_badge")}</div>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="p-3 rounded-full bg-blue-400 text-white">
                      <Award className="h-6 w-6" />
                    </div>
                    <div className="text-xs text-center">{t("gamification.five_briefings_badge")}</div>
                  </div>
                  <div className="flex flex-col items-center gap-1 opacity-50">
                    <div className="p-3 rounded-full bg-gray-400 text-white">
                      <Award className="h-6 w-6" />
                    </div>
                    <div className="text-xs text-center">{t("gamification.master_badge")}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>*/}

        {/* Briefings Section */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">{t("dashboard.briefings_section.title")}</h2>
              <p className="text-muted-foreground">
                {t("dashboard.briefings_section.subtitle")}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t("dashboard.briefings_section.search_placeholder")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                  aria-label={t("dashboard.briefings_section.search_aria_label")}
                />
              </div>
              <Button variant="outline" size="icon" aria-label={t("dashboard.briefings_section.filter_aria_label")}>
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-3 w-full mb-4" />
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-1/4" />
                      <Skeleton className="h-4 w-1/4" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredBriefings.length === 0 ? (
            <Card className="py-12">
              <CardContent className="text-center">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  {searchTerm ? t("dashboard.briefings_section.no_briefings_found_title") : t("dashboard.briefings_section.no_briefings_created_title")}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {searchTerm
                    ? `${t("dashboard.briefings_section.no_results_for")} "${searchTerm}"`
                    : t("dashboard.briefings_section.start_creating_briefing")
                  }
                </p>
                {!searchTerm && (
                  <Button
                    variant="outline-primary"
                    onClick={() => navigate("/dashboard/new")}
                  >
                    <Plus className="h-4 w-4" />
                    {t("dashboard.briefings_section.create_first_briefing_button")}
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBriefings.map((briefing) => (
                <BriefingCard
                  key={briefing.id}
                  {...briefing}
                  onClick={() => handleBriefingClick(briefing)}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};
