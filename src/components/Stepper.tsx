"use client";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Step {
  id: number;
  title: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
}

export const Stepper = ({ steps, currentStep }: StepperProps) => {
  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold",
                currentStep > step.id
                  ? "bg-primary text-primary-foreground"
                  : currentStep === step.id
                  ? "bg-primary/20 text-primary border-2 border-primary"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {currentStep > step.id ? <Check size={16} /> : step.id}
            </div>
            <p
              className={cn(
                "mt-2 text-xs text-center",
                currentStep >= step.id
                  ? "font-semibold text-primary"
                  : "text-muted-foreground"
              )}
            >
              {step.title}
            </p>
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                "flex-1 h-1 mx-4",
                currentStep > step.id ? "bg-primary" : "bg-muted"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
};
