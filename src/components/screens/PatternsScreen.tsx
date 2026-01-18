import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { slicingPatterns } from "@/data/gameData";
import { PatternBadge } from "@/components/game/PatternBadge";

interface PatternsScreenProps {
  onBack: () => void;
}

export function PatternsScreen({ onBack }: PatternsScreenProps) {
  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-muted-foreground"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Volver
        </Button>
      </div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
          Patrones de Slicing
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Aprende las diferentes técnicas para dividir épicas en historias de
          usuario manejables
        </p>
      </motion.div>

      {/* Patterns grid */}
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
        {slicingPatterns.map((pattern, index) => (
          <motion.div
            key={pattern.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <PatternBadge pattern={pattern} showDescription size="lg" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
