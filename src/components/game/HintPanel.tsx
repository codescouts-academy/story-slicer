import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HintPanelProps {
  hints: string[];
  currentIndex: number;
  isVisible: boolean;
  onClose: () => void;
  onNext: () => void;
}

export function HintPanel({
  hints,
  currentIndex,
  isVisible,
  onClose,
  onNext,
}: HintPanelProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-card rounded-2xl shadow-lg border p-4 z-50"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 bg-warning/20 rounded-xl">
              <Lightbulb className="w-6 h-6 text-warning" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-display font-bold text-sm">
                  Pista {currentIndex + 1} de {hints.length}
                </h4>
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-muted rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-muted-foreground">
                {hints[currentIndex]}
              </p>
              {currentIndex < hints.length - 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onNext}
                  className="mt-2 text-primary"
                >
                  Siguiente pista
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
