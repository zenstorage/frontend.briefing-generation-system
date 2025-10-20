import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, CheckCircle, Lightbulb, Target, Users } from "lucide-react";
import { BriefingResult } from "./BriefingResult";
import { Stepper } from "./Stepper";
import { API_ENDPOINT } from "@/App";

interface BriefingGeneratorProps {
  onBack: () => void;
}

interface BriefingData {
  company_name: string;
  industry: string;
  target_audience: string;
  problem: string;
  solution: string;
  objectives: string;
  timeline: string;
  budget: string;
}

const steps = [
  {
    id: 1,
    title: "Informações da startup",
    description: "Dados básicos sobre sua empresa",
    icon: Users,
  },
  {
    id: 2,
    title: "Problema & Solução",
    description: "Defina o problema e sua proposta de valor",
    icon: Lightbulb,
  },
  {
    id: 3,
    title: "Objetivos & Recursos",
    description: "Metas, cronograma e orçamento",
    icon: Target,
  },
];




export const BriefingGenerator = ({ onBack }: BriefingGeneratorProps) => {
  const navigate = useNavigate();
  const { step } = useParams<{ step: string }>();
  const [currentStep, setCurrentStep] = useState(1);
  const [showResult, setShowResult] = useState(false);
  const [generatedBriefing, setGeneratedBriefing] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [briefingData, setBriefingData] = useState<BriefingData>({
  company_name: "",
  industry: "",
  target_audience: "",
  problem: "",
  solution: "",
  objectives: "",
  timeline: "",
  budget: ""
  });

  useEffect(() => {
    const initialStep = step ? parseInt(step, 10) : 1;
    if (!isNaN(initialStep) && initialStep >= 1 && initialStep <= steps.length) {
      setCurrentStep(initialStep);
    } else {
      navigate("/dashboard/new/1");
    }
  }, [step, navigate]);

  const updateStep = (newStep: number) => {
    setCurrentStep(newStep);
    navigate(`/dashboard/new/${newStep}`);
  };

  const updateData = (field: keyof BriefingData, value: string) => {
    setBriefingData(prev => ({ ...prev, [field]: value }));
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return briefingData.company_name.trim() !== "" && 
               briefingData.industry !== "" && 
               briefingData.target_audience.trim() !== "";
      case 2:
        return briefingData.problem.trim() !== "" && 
               briefingData.solution.trim() !== "";
      case 3:
        return briefingData.objectives.trim() !== "";
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < 3 && validateCurrentStep()) {
      updateStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      updateStep(currentStep - 1);
    }
  };

  const handleGenerate = async () => {
    if (!validateCurrentStep()) return;
    
    setIsGenerating(true);
    try {
      console.log("Generating briefing with data:", briefingData);

      const token = localStorage.getItem("token")

      const res = await fetch(`${API_ENDPOINT}/api/briefings`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(briefingData),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const resJson = await res.json();
      console.log("Generated briefing:", resJson);
      
      setGeneratedBriefing(resJson);
      setShowResult(true);
    } catch (error) {
      console.error("Error generating briefing:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleNewBriefing = () => {
    setShowResult(false);
    setGeneratedBriefing(null);
    updateStep(1);
    setBriefingData({
      company_name: "",
      industry: "",
      target_audience: "",
      problem: "",
      solution: "",
      objectives: "",
      timeline: "",
      budget: "",
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="companyName" required={true}>Nome da startup</Label>
              <Input
                id="companyName"
                placeholder="Ex: TechInova"
                value={briefingData.company_name}
                onChange={(e) => updateData("company_name", e.target.value)}
                required
                aria-describedby="companyName-help"
              />
              <p id="companyName-help" className="text-sm text-muted-foreground">
                Como sua startup é conhecida no mercado?
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry" required={true}>Setor de atuação</Label>
              <Select onValueChange={(value) => updateData("industry", value)}>
                <SelectTrigger id="industry" aria-describedby="industry-help">
                  <SelectValue placeholder="Selecione o setor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fintech">Fintech</SelectItem>
                  <SelectItem value="edtech">Edtech</SelectItem>
                  <SelectItem value="healthtech">Healthtech</SelectItem>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                  <SelectItem value="saas">SaaS</SelectItem>
                  <SelectItem value="marketplace">Marketplace</SelectItem>
                  <SelectItem value="other">Outro</SelectItem>
                </SelectContent>
              </Select>
              <p id="industry-help" className="text-sm text-muted-foreground">
                Em que segmento sua startup atua?
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetAudience" required={true}>Público-alvo</Label>
              <Textarea
                id="targetAudience"
                placeholder="Ex: Pequenos empreendedores entre 25-45 anos que buscam soluções financeiras digitais..."
                value={briefingData.target_audience}
                onChange={(e) => updateData("target_audience", e.target.value)}
                rows={3}
                required
                aria-describedby="targetAudience-help"
              />
              <p id="targetAudience-help" className="text-sm text-muted-foreground">
                Descreva detalhadamente quem são seus clientes ideais
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="problem" required={true}>Problema que resolve</Label>
              <Textarea
                id="problem"
                placeholder="Descreva o problema principal que sua startup resolve..."
                value={briefingData.problem}
                onChange={(e) => updateData("problem", e.target.value)}
                rows={4}
                required
                aria-describedby="problem-help"
              />
              <p id="problem-help" className="text-sm text-muted-foreground">
                Qual dor do mercado sua startup alivia?
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="solution" required={true}>Sua solução</Label>
              <Textarea
                id="solution"
                placeholder="Explique como sua startup resolve esse problema..."
                value={briefingData.solution}
                onChange={(e) => updateData("solution", e.target.value)}
                rows={4}
                required
                aria-describedby="solution-help"
              />
              <p id="solution-help" className="text-sm text-muted-foreground">
                Como vocês entregam valor para o cliente?
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="objectives" required={true}>Objetivos do projeto</Label>
              <Textarea
                id="objectives"
                placeholder="Ex: Aumentar reconhecimento da marca, gerar 1000 leads qualificados..."
                value={briefingData.objectives}
                onChange={(e) => updateData("objectives", e.target.value)}
                rows={3}
                required
                aria-describedby="objectives-help"
              />
              <p id="objectives-help" className="text-sm text-muted-foreground">
                Quais resultados esperam alcançar?
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="timeline">Prazo desejado</Label>
                <Select onValueChange={(value) => updateData("timeline", value)}>
                  <SelectTrigger id="timeline">
                    <SelectValue placeholder="Selecione o prazo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-month">1 mês</SelectItem>
                    <SelectItem value="3-months">3 meses</SelectItem>
                    <SelectItem value="6-months">6 meses</SelectItem>
                    <SelectItem value="1-year">1 ano</SelectItem>
                    <SelectItem value="flexible">Flexível</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">Orçamento disponível</Label>
                <Select onValueChange={(value) => updateData("budget", value)}>
                  <SelectTrigger id="budget">
                    <SelectValue placeholder="Faixa de investimento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="up-to-10k">Até R$ 10.000</SelectItem>
                    <SelectItem value="10k-50k">R$ 10.000 - R$ 50.000</SelectItem>
                    <SelectItem value="50k-100k">R$ 50.000 - R$ 100.000</SelectItem>
                    <SelectItem value="100k-plus">Acima de R$ 100.000</SelectItem>
                    <SelectItem value="flexible">A discutir</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (showResult && generatedBriefing) {
    const getBriefingContent = () => {
      try {
        if (generatedBriefing?.candidates?.[0]?.content?.parts?.[0]?.text) {
          const textContent = generatedBriefing.candidates[0].content.parts[0].text;
          const parsedContent = JSON.parse(textContent);
          return parsedContent.briefing || textContent;
        }
        return "Erro ao processar o briefing gerado.";
      } catch (error) {
        console.error("Error parsing briefing content:", error);
        return "Erro ao processar o briefing gerado.";
      }
    };

    return (
      <BriefingResult 
        briefingContent={getBriefingContent()}
        onBack={() => navigate("/dashboard")}
        onNewBriefing={handleNewBriefing}
      />
    );
  }

  const CurrentIcon = steps[currentStep - 1].icon;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/dashboard")}
          aria-label="Voltar para dashboard"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Gerador de Briefing</h1>
          <p className="text-muted-foreground">
            Crie um briefing detalhado para sua startup em 3 passos simples
          </p>
        </div>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="pt-6">
          <Stepper steps={steps} currentStep={currentStep} />
        </CardContent>
      </Card>

      {/* Step Content */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <CurrentIcon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Etapa {currentStep}: {steps[currentStep - 1].title}</CardTitle>
              <CardDescription>{steps[currentStep - 1].description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {renderStepContent()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handlePrevious}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="h-4 w-4" />
          Anterior
        </Button>

        {currentStep < 3 ? (
          <Button 
            variant="hero" 
            onClick={handleNext}
            disabled={!validateCurrentStep()}
          >
            Próximo
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button 
            variant="accent" 
            onClick={handleGenerate}
            disabled={!validateCurrentStep() || isGenerating}
          >
            <CheckCircle className="h-4 w-4" />
            {isGenerating ? "Gerando..." : "Gerar Briefing"}
          </Button>
        )}
      </div>
    </div>
  );
};