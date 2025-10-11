import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Share2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { toast } from "@/components/ui/use-toast";

interface BriefingResultProps {
  briefingData: any;
  onBack: () => void;
  onNewBriefing: () => void;
}

export const BriefingResult = ({ briefingData, onBack, onNewBriefing }: BriefingResultProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const getBriefingContent = () => {
    try {
      if (briefingData?.candidates?.[0]?.content?.parts?.[0]?.text) {
        const textContent = briefingData.candidates[0].content.parts[0].text;
        const parsedContent = JSON.parse(textContent);
        return parsedContent.briefing || textContent;
      }
      return "Erro ao processar o briefing gerado.";
    } catch (error) {
      console.error("Error parsing briefing content:", error);
      return "Erro ao processar o briefing gerado.";
    }
  };

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const content = getBriefingContent();
      const blob = new Blob([content], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'briefing-startup.md';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading briefing:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Briefing da Startup',
          text: getBriefingContent(),
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(getBriefingContent());
        toast({
          title: "Briefing copiado!",
          description: "O briefing foi copiado para a área de transferência.",
        });
      } catch (error) {
        console.error("Error copying to clipboard:", error);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto mb-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={onBack}
            aria-label="Voltar para gerador"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Briefing Gerado</h1>
            <p className="text-muted-foreground">
              Seu briefing está pronto para ser usado
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleShare}
            aria-label="Compartilhar briefing"
          >
            <Share2 className="h-4 w-4" />
            Compartilhar
          </Button>
          <Button 
            variant="secondary" 
            onClick={handleDownload}
            disabled={isLoading}
            aria-label="Baixar briefing"
          >
            <Download className="h-4 w-4" />
            {isLoading ? "Baixando..." : "Baixar"}
          </Button>
        </div>
      </div>

      {/* Briefing Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📋 Briefing da Startup
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-2xl font-bold text-primary mb-4 border-b border-border pb-2">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-xl font-semibold text-foreground mt-6 mb-3">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-lg font-medium text-foreground mt-4 mb-2">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                    {children}
                  </ul>
                ),
                li: ({ children }) => (
                  <li className="leading-relaxed">
                    {children}
                  </li>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-foreground">
                    {children}
                  </strong>
                ),
              }}
            >
              {getBriefingContent()}
            </ReactMarkdown>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-center mb-6">
        <Button 
          variant="hero" 
          onClick={onNewBriefing}
          size="lg"
        >
          Criar Novo Briefing
        </Button>
      </div>
    </div>
  );
};