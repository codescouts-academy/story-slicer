import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Scissors } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface StoryCreatorProps {
  onAddStory: (story: { role: string; action: string; benefit: string }) => void;
  defaultRole?: string;
}

export function StoryCreator({ onAddStory, defaultRole = '' }: StoryCreatorProps) {
  const [role, setRole] = useState(defaultRole);
  const [action, setAction] = useState('');
  const [benefit, setBenefit] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role.trim() && action.trim() && benefit.trim()) {
      onAddStory({ role: role.trim(), action: action.trim(), benefit: benefit.trim() });
      setAction('');
      setBenefit('');
      setIsExpanded(false);
    }
  };

  const isValid = role.trim() && action.trim() && benefit.trim();

  return (
    <motion.div
      layout
      className="bg-card rounded-2xl border-2 border-dashed border-primary/30 hover:border-primary/50 transition-colors overflow-hidden"
    >
      {!isExpanded ? (
        <motion.button
          onClick={() => setIsExpanded(true)}
          className="w-full p-6 flex items-center justify-center gap-3 text-primary hover:bg-primary/5 transition-colors"
        >
          <div className="p-2 bg-primary/10 rounded-full">
            <Plus className="w-6 h-6" />
          </div>
          <span className="font-display font-semibold text-lg">Crear Nueva Historia</span>
        </motion.button>
      ) : (
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleSubmit}
          className="p-6 space-y-4"
        >
          <div className="flex items-center gap-2 mb-4">
            <Scissors className="w-5 h-5 text-primary" />
            <h3 className="font-display font-bold text-lg">Nueva Historia de Usuario</h3>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="role" className="text-sm font-semibold text-muted-foreground">
                Como
              </Label>
              <Input
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="usuario, administrador, comprador..."
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="action" className="text-sm font-semibold text-muted-foreground">
                Quiero
              </Label>
              <Input
                id="action"
                value={action}
                onChange={(e) => setAction(e.target.value)}
                placeholder="poder realizar una acción..."
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="benefit" className="text-sm font-semibold text-muted-foreground">
                Para
              </Label>
              <Input
                id="benefit"
                value={benefit}
                onChange={(e) => setBenefit(e.target.value)}
                placeholder="obtener un beneficio..."
                className="mt-1"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsExpanded(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={!isValid}
              className="flex-1 gradient-hero text-white font-semibold"
            >
              <Plus className="w-4 h-4 mr-2" />
              Agregar
            </Button>
          </div>
        </motion.form>
      )}
    </motion.div>
  );
}
