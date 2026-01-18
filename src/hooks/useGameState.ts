import { useState, useCallback } from "react";
import { levels } from "@/data/gameData";

export interface GameProgress {
  currentLevel: number;
  completedLevels: number[];
  scores: Record<number, number>;
  stars: Record<number, number>;
  totalScore: number;
  achievements: string[];
  hintsUsed: Record<number, number>;
}

export interface CreatedStory {
  id: string;
  role: string;
  action: string;
  benefit: string;
  isValid?: boolean;
  feedback?: string;
}

const initialProgress: GameProgress = {
  currentLevel: 1,
  completedLevels: [],
  scores: {},
  stars: {},
  totalScore: 0,
  achievements: [],
  hintsUsed: {},
};

export function useGameState() {
  const [gameScreen, setGameScreen] = useState<
    "home" | "tutorial" | "level-select" | "game" | "results" | "patterns"
  >("home");
  const [difficulty, setDifficulty] = useState<
    "beginner" | "intermediate" | "advanced"
  >("beginner");
  const [progress, setProgress] = useState<GameProgress>(() => {
    const saved = localStorage.getItem("slicing-game-progress");
    return saved ? JSON.parse(saved) : initialProgress;
  });
  const [currentLevelId, setCurrentLevelId] = useState<number>(1);
  const [createdStories, setCreatedStories] = useState<CreatedStory[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(-1);
  const [levelStartTime, setLevelStartTime] = useState<number>(0);
  const [lastResults, setLastResults] = useState<{
    score: number;
    stars: number;
    correctCount: number;
    totalExpected: number;
    bonusNoHints: boolean;
    bonusSpeed: boolean;
  } | null>(null);

  const saveProgress = useCallback((newProgress: GameProgress) => {
    localStorage.setItem("slicing-game-progress", JSON.stringify(newProgress));
    setProgress(newProgress);
  }, []);

  const startLevel = useCallback((levelId: number) => {
    setCurrentLevelId(levelId);
    setCreatedStories([]);
    setShowHint(false);
    setCurrentHintIndex(-1);
    setLevelStartTime(Date.now());
    setGameScreen("game");
  }, []);

  const addStory = useCallback((story: Omit<CreatedStory, "id">) => {
    const newStory: CreatedStory = {
      ...story,
      id: `story-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
    setCreatedStories((prev) => [...prev, newStory]);
  }, []);

  const updateStory = useCallback(
    (id: string, updates: Partial<CreatedStory>) => {
      setCreatedStories((prev) =>
        prev.map((story) =>
          story.id === id ? { ...story, ...updates } : story,
        ),
      );
    },
    [],
  );

  const removeStory = useCallback((id: string) => {
    setCreatedStories((prev) => prev.filter((story) => story.id !== id));
  }, []);

  const useHint = useCallback(() => {
    const level = levels.find((l) => l.id === currentLevelId);
    if (!level) return;

    debugger;
    setShowHint(true);
    if (currentHintIndex < level.hints.length - 1) {
      setCurrentHintIndex((prev) => prev + 1);
    }

    setProgress((prev) => ({
      ...prev,
      hintsUsed: {
        ...prev.hintsUsed,
        [currentLevelId]: (prev.hintsUsed[currentLevelId] || 0) + 1,
      },
    }));
  }, [currentLevelId, currentHintIndex]);

  const validateAndSubmit = useCallback(() => {
    const level = levels.find((l) => l.id === currentLevelId);
    if (!level) return;

    const timeSpent = (Date.now() - levelStartTime) / 1000;
    const hintsUsedCount = progress.hintsUsed[currentLevelId] || 0;

    // Simple validation - check if stories cover the expected patterns
    let correctCount = 0;
    const validatedStories = createdStories.map((story) => {
      const fullText =
        `Como ${story.role} quiero ${story.action} para ${story.benefit}`.toLowerCase();
      const isValid = level.expectedStories.some((expected) => {
        const expectedFull =
          `Como ${expected.role} quiero ${expected.action} para ${expected.benefit}`.toLowerCase();
        // Fuzzy match - check if key words are present
        const keywords = expected.action
          .toLowerCase()
          .split(" ")
          .filter((w) => w.length > 3);
        return keywords.some((kw) => fullText.includes(kw));
      });
      if (isValid) correctCount++;
      return {
        ...story,
        isValid,
        feedback: isValid
          ? "¡Excelente historia!"
          : "Esta historia podría mejorarse",
      };
    });

    setCreatedStories(validatedStories);

    // Calculate score
    const basePoints = correctCount * 50;
    const patternBonus =
      correctCount >= level.expectedStories.length * 0.75
        ? level.bonusPoints
        : 0;
    const noHintsBonus = hintsUsedCount === 0 ? 200 : 0;
    const speedBonus = timeSpent < 120 ? 100 : 0;
    const totalLevelScore =
      basePoints + patternBonus + noHintsBonus + speedBonus;

    // Calculate stars
    const percentage = correctCount / level.expectedStories.length;
    const stars =
      percentage >= 0.9 ? 3 : percentage >= 0.7 ? 2 : percentage >= 0.5 ? 1 : 0;

    // Update achievements
    const newAchievements = [...progress.achievements];
    if (!newAchievements.includes("first-slice") && correctCount > 0) {
      newAchievements.push("first-slice");
    }
    if (!newAchievements.includes("perfect-score") && stars === 3) {
      newAchievements.push("perfect-score");
    }
    if (
      !newAchievements.includes("no-hints") &&
      hintsUsedCount === 0 &&
      correctCount >= level.expectedStories.length * 0.5
    ) {
      newAchievements.push("no-hints");
    }
    if (
      !newAchievements.includes("speed-demon") &&
      timeSpent < 120 &&
      correctCount >= level.expectedStories.length * 0.5
    ) {
      newAchievements.push("speed-demon");
    }
    if (
      !newAchievements.includes("spidr-supreme") &&
      level.id === 7 &&
      stars >= 2
    ) {
      newAchievements.push("spidr-supreme");
    }

    const newProgress: GameProgress = {
      ...progress,
      completedLevels: progress.completedLevels.includes(currentLevelId)
        ? progress.completedLevels
        : [...progress.completedLevels, currentLevelId],
      scores: {
        ...progress.scores,
        [currentLevelId]: Math.max(
          progress.scores[currentLevelId] || 0,
          totalLevelScore,
        ),
      },
      stars: {
        ...progress.stars,
        [currentLevelId]: Math.max(progress.stars[currentLevelId] || 0, stars),
      },
      totalScore: Object.values({
        ...progress.scores,
        [currentLevelId]: Math.max(
          progress.scores[currentLevelId] || 0,
          totalLevelScore,
        ),
      }).reduce((a, b) => a + b, 0),
      achievements: newAchievements,
    };

    saveProgress(newProgress);

    setLastResults({
      score: totalLevelScore,
      stars,
      correctCount,
      totalExpected: level.expectedStories.length,
      bonusNoHints: hintsUsedCount === 0,
      bonusSpeed: timeSpent < 120,
    });

    setGameScreen("results");
  }, [currentLevelId, createdStories, levelStartTime, progress, saveProgress]);

  const resetGame = useCallback(() => {
    localStorage.removeItem("slicing-game-progress");
    setProgress(initialProgress);
    setGameScreen("home");
  }, []);

  const getCurrentLevel = useCallback(() => {
    return levels.find((l) => l.id === currentLevelId);
  }, [currentLevelId]);

  const getFilteredLevels = useCallback(() => {
    return levels.filter((l) => l.difficulty === difficulty);
  }, [difficulty]);

  return {
    gameScreen,
    setGameScreen,
    difficulty,
    setDifficulty,
    progress,
    currentLevelId,
    createdStories,
    showHint,
    currentHintIndex,
    lastResults,
    startLevel,
    addStory,
    updateStory,
    removeStory,
    useHint,
    validateAndSubmit,
    resetGame,
    getCurrentLevel,
    getFilteredLevels,
    setShowHint,
  };
}
