import { useState } from 'react';
import GameHeader from '@/components/game/GameHeader';
import Phase1Intro from '@/components/game/Phase1Intro';
import Phase2Docs from '@/components/game/Phase2Docs';
import Phase3Transit from '@/components/game/Phase3Transit';
import Phase4Delivery from '@/components/game/Phase4Delivery';

export default function Game() {
  const [phase, setPhase] = useState(1);

  const nextPhase = () => setPhase((current) => Math.min(4, current + 1));
  const restart = () => setPhase(1);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 stage-glow" />
      <div className="pointer-events-none fixed inset-0 grid-lines opacity-70" />

      <div className="relative">
        <GameHeader phase={phase} />
        <main className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          {phase === 1 && <Phase1Intro onContinue={nextPhase} />}
          {phase === 2 && <Phase2Docs onContinue={nextPhase} />}
          {phase === 3 && <Phase3Transit onContinue={nextPhase} />}
          {phase === 4 && <Phase4Delivery onRestart={restart} />}
        </main>
      </div>
    </div>
  );
}