import { motion } from "framer-motion";
import { ChevronLeft, Lightbulb, Send, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Level, slicingPatterns } from "@/data/gameData";
import { CreatedStory } from "@/hooks/useGameState";
import { EpicCard } from "@/components/game/EpicCard";
import { PatternBadge } from "@/components/game/PatternBadge";
import { StoryCard } from "@/components/game/StoryCard";
import { StoryCreator } from "@/components/game/StoryCreator";
import { HintPanel } from "@/components/game/HintPanel";

interface GameScreenProps {
  level: Level;
  createdStories: CreatedStory[];
  showHint: boolean;
  currentHintIndex: number;
  onBack: () => void;
  onAddStory: (story: {
    role: string;
    action: string;
    benefit: string;
  }) => void;
  onRemoveStory: (id: string) => void;
  onUseHint: () => void;
  onSubmit: () => void;
  onCloseHint: () => void;
}

export function GameScreen({
  level,
  createdStories,
  showHint,
  currentHintIndex,
  onBack,
  onAddStory,
  onRemoveStory,
  onUseHint,
  onSubmit,
  onCloseHint,
}: GameScreenProps) {
  const pattern = slicingPatterns.find((p) => p.id === level.patternId);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-muted-foreground"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Salir
          </Button>

          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground">
              Nivel {level.id}:
            </span>
            <span className="font-display font-bold">{level.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onUseHint}
              className="text-warning border-warning/30 hover:bg-warning/20 hover:text-warning"
            >
              <Lightbulb className="w-4 h-4 mr-2" />
              Pista
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-6">
          {/* Left column - Epic and Pattern */}
          <div className="space-y-6">
            <EpicCard epic={level.epic} />

            {pattern && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <HelpCircle className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">
                    Técnica sugerida:
                  </span>
                </div>
                <PatternBadge pattern={pattern} showDescription size="lg" />
              </motion.div>
            )}

            {/* Expected count hint */}
            <div className="p-4 bg-muted/50 rounded-xl">
              <p className="text-sm text-muted-foreground">
                💡 <span className="font-medium">Sugerencia:</span> Esta épica
                puede dividirse en aproximadamente{" "}
                <span className="font-bold text-foreground">
                  {level.expectedStories.length}
                </span>{" "}
                historias de usuario.
              </p>
            </div>
          </div>

          {/* Right column - Created stories */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-bold text-lg">
                Historias Creadas ({createdStories.length})
              </h2>
              {createdStories.length >= 2 && (
                <Button
                  onClick={onSubmit}
                  className="gradient-hero text-white font-semibold"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Validar Slicing
                </Button>
              )}
            </div>

            {/* Stories grid */}
            <div className="grid gap-4">
              {createdStories.map((story, index) => (
                <StoryCard
                  key={story.id}
                  story={story}
                  onRemove={onRemoveStory}
                  index={index}
                />
              ))}

              <StoryCreator
                onAddStory={onAddStory}
                defaultRole={level.epic.role}
              />
            </div>

            {/* Submit button for mobile */}
            {createdStories.length >= 2 && (
              <div className="lg:hidden pt-4">
                <Button
                  onClick={onSubmit}
                  className="w-full gradient-hero text-white font-semibold py-6"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Validar mi Slicing
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Hint panel */}
      <HintPanel
        hints={level.hints}
        currentIndex={currentHintIndex}
        isVisible={showHint}
        onClose={onCloseHint}
        onNext={onUseHint}
      />
    </div>
  );
}
