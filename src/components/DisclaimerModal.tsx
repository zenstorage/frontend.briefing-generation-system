import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DisclaimerModal = ({ isOpen, onClose }: DisclaimerModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <DialogTitle>Aviso Importante</DialogTitle>
          </div>
          <DialogDescription className="text-base leading-relaxed pt-4">
            Este site foi criado para um trabalho de faculdade. Os números apresentados aqui são fictícios e foram usados para tornar a experiência mais real.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end pt-4">
          <Button onClick={() => {
            localStorage.setItem("disclaimer-accepted", "true");
            onClose();
          }}>
            Entendi
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DisclaimerModal;