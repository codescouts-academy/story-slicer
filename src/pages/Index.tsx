import { levels } from '@/data/gameData';
import { useGameState } from '@/hooks/useGameState';
import { HomeScreen } from '@/components/screens/HomeScreen';
import { TutorialScreen } from '@/components/screens/TutorialScreen';
import { LevelSelectScreen } from '@/components/screens/LevelSelectScreen';
import { GameScreen } from '@/components/screens/GameScreen';
import { ResultsScreen } from '@/components/screens/ResultsScreen';
import { PatternsScreen } from '@/components/screens/PatternsScreen';

const Index = () => {
  const {
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
    removeStory,
    useHint,
    validateAndSubmit,
    getCurrentLevel,
    setShowHint,
  } = useGameState();

  const currentLevel = getCurrentLevel();
  const hasNextLevel = levels.some((l) => l.id === currentLevelId + 1);

  return (
    <div className="min-h-screen bg-background">
      {gameScreen === 'home' && (
        <HomeScreen
          onStartGame={() => setGameScreen('level-select')}
          onTutorial={() => setGameScreen('tutorial')}
          onPatterns={() => setGameScreen('patterns')}
          progress={progress}
        />
      )}

      {gameScreen === 'tutorial' && (
        <TutorialScreen
          onBack={() => setGameScreen('home')}
          onStart={() => setGameScreen('level-select')}
        />
      )}

      {gameScreen === 'level-select' && (
        <LevelSelectScreen
          onBack={() => setGameScreen('home')}
          onSelectLevel={startLevel}
          difficulty={difficulty}
          onChangeDifficulty={setDifficulty}
          progress={progress}
        />
      )}

      {gameScreen === 'game' && currentLevel && (
        <GameScreen
          level={currentLevel}
          createdStories={createdStories}
          showHint={showHint}
          currentHintIndex={currentHintIndex}
          onBack={() => setGameScreen('level-select')}
          onAddStory={addStory}
          onRemoveStory={removeStory}
          onUseHint={useHint}
          onSubmit={validateAndSubmit}
          onCloseHint={() => setShowHint(false)}
        />
      )}

      {gameScreen === 'results' && currentLevel && lastResults && (
        <ResultsScreen
          level={currentLevel}
          results={lastResults}
          createdStories={createdStories}
          onNextLevel={() => startLevel(currentLevelId + 1)}
          onRetry={() => startLevel(currentLevelId)}
          onHome={() => setGameScreen('home')}
          hasNextLevel={hasNextLevel}
        />
      )}

      {gameScreen === 'patterns' && (
        <PatternsScreen onBack={() => setGameScreen('home')} />
      )}
    </div>
  );
};

export default Index;
