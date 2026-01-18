import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Scissors, Target, CheckCircle2, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { investCriteria } from '@/data/gameData';

interface TutorialScreenProps {
  onBack: () => void;
  onStart: () => void;
}

const tutorialSteps = [
  {
    title: '¿Qué es una Épica?',
    icon: Target,
    content: (
      <div className="space-y-4">
        <p className="text-lg">
          Una <strong className="text-primary">épica</strong> es una historia de usuario grande y compleja que no puede completarse en un solo sprint.
        </p>
        <div className="p-4 gradient-epic rounded-xl text-white">
          <p className="font-medium">Ejemplo de épica:</p>
          <p className="mt-2 text-lg font-display">
            "Como usuario quiero gestionar todos mis pedidos de forma completa"
          </p>
        </div>
        <p className="text-muted-foreground">
          Las épicas son demasiado grandes para estimarlas con precisión y requieren ser divididas.
        </p>
      </div>
    ),
  },
  {
    title: '¿Qué es Slicing?',
    icon: Scissors,
    content: (
      <div className="space-y-4">
        <p className="text-lg">
          <strong className="text-primary">Slicing</strong> (o splitting) es la técnica de dividir épicas en historias más pequeñas y manejables.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-destructive/10 rounded-xl border border-destructive/20">
            <p className="font-semibold text-destructive mb-2">❌ Sin Slicing</p>
            <p className="text-sm text-muted-foreground">
              Épica grande → Difícil de estimar → Riesgo alto → Feedback tardío
            </p>
          </div>
          <div className="p-4 bg-success/10 rounded-xl border border-success/20">
            <p className="font-semibold text-success mb-2">✓ Con Slicing</p>
            <p className="text-sm text-muted-foreground">
              Historias pequeñas → Fácil estimar → Entregas frecuentes → Feedback temprano
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Criterios INVEST',
    icon: CheckCircle2,
    content: (
      <div className="space-y-4">
        <p className="text-lg">
          Cada historia dividida debe cumplir los criterios <strong className="text-primary">INVEST</strong>:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {investCriteria.map((criterion) => (
            <div
              key={criterion.letter}
              className="p-3 bg-card rounded-xl border shadow-sm"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="w-8 h-8 flex items-center justify-center gradient-hero text-white font-bold rounded-lg">
                  {criterion.letter}
                </span>
                <span className="font-semibold text-sm">{criterion.name}</span>
              </div>
              <p className="text-xs text-muted-foreground">{criterion.description}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: 'Patrones de Slicing',
    icon: Layers,
    content: (
      <div className="space-y-4">
        <p className="text-lg">
          Existen varios <strong className="text-primary">patrones</strong> para dividir épicas:
        </p>
        <div className="space-y-3">
          {[
            { name: 'CRUD', desc: 'Crear, Leer, Actualizar, Eliminar', color: 'bg-card-green' },
            { name: 'Workflow', desc: 'Pasos del proceso', color: 'bg-card-blue' },
            { name: 'Reglas de Negocio', desc: 'Una regla por historia', color: 'bg-card-purple' },
            { name: 'Happy Path', desc: 'Camino feliz primero, excepciones después', color: 'bg-card-yellow' },
          ].map((pattern) => (
            <div
              key={pattern.name}
              className={`p-3 ${pattern.color} rounded-xl flex items-center gap-3`}
            >
              <span className="font-display font-bold">{pattern.name}</span>
              <span className="text-sm opacity-75">— {pattern.desc}</span>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          Aprenderás a usar cada patrón durante los niveles del juego.
        </p>
      </div>
    ),
  },
];

export function TutorialScreen({ onBack, onStart }: TutorialScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const step = tutorialSteps[currentStep];
  const Icon = step.icon;

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onStart();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Button variant="ghost" onClick={onBack} className="text-muted-foreground">
          <ChevronLeft className="w-5 h-5 mr-1" />
          Volver
        </Button>
        <div className="flex gap-2">
          {tutorialSteps.map((_, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                i === currentStep ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-2xl w-full"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 gradient-hero rounded-xl text-white">
                <Icon className="w-8 h-8" />
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold">{step.title}</h2>
            </div>
            
            <div className="bg-card rounded-2xl border p-6 shadow-card">
              {step.content}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8">
        <Button variant="outline" onClick={prevStep}>
          <ChevronLeft className="w-5 h-5 mr-1" />
          {currentStep === 0 ? 'Salir' : 'Anterior'}
        </Button>

        <Button onClick={nextStep} className="gradient-hero text-white font-semibold">
          {currentStep === tutorialSteps.length - 1 ? (
            <>¡Empezar a Jugar!</>
          ) : (
            <>
              Siguiente
              <ChevronRight className="w-5 h-5 ml-1" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
