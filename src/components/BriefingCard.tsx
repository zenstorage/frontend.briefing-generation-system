import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Calendar, Users, ArrowRight } from "lucide-react";

interface BriefingCardProps {
  id: string;
  title: string;
  description: string;
  status: "draft" | "completed" | "in-progress";
  createdAt: string;
  clientName: string;
  onClick?: () => void;
}

const statusConfig = {
  draft: { label: "Rascunho", className: "bg-secondary text-secondary-foreground" },
  "in-progress": { label: "Em Progresso", className: "bg-gradient-accent text-accent-foreground" },
  completed: { label: "Finalizado", className: "bg-gradient-primary text-primary-foreground" },
};

export const BriefingCard = ({ 
  id, 
  title, 
  description, 
  status, 
  createdAt, 
  clientName, 
  onClick 
}: BriefingCardProps) => {
  const statusInfo = statusConfig[status];

  return (
    <Card 
      className="group hover:shadow-lg transition-all duration-300 hover:border-primary/20 cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      aria-label={`Briefing ${title} para ${clientName}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" aria-hidden="true" />
            <CardTitle className="text-lg group-hover:text-primary transition-colors">
              {title}
            </CardTitle>
          </div>
          <Badge className={statusInfo.className}>
            {statusInfo.label}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" aria-hidden="true" />
              <span>{clientName}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              <span>{createdAt}</span>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm"
            className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
            aria-label={`Abrir briefing ${title}`}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};