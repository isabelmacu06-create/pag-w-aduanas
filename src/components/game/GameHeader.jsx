import { Check, Download, PackageSearch } from 'lucide-react';
import { cn } from '@/lib/utils';

const STEPS = [
  { n: 1, label: 'Caso' },
  { n: 2, label: 'Documentos' },
  { n: 3, label: 'Tránsito' },
  { n: 4, label: 'Entrega' },
];

export default function GameHeader({ phase }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-sky-400 shadow-lg shadow-primary/25">
            <PackageSearch className="h-[18px] w-[18px] text-primary-foreground" strokeWidth={2.2} />
          </div>
          <div className="leading-tight">
            <p className="font-display text-[13.5px] font-semibold tracking-tight">Consolidación y Desconsolidación</p>
            <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Simulador logístico</p>
          </div>
        </div>

        <nav className="hidden items-center md:flex">
          {STEPS.map((step, index) => {
            const active = phase === step.n;
            const done = phase > step.n;
            return (
              <div key={step.n} className="flex items-center">
                <div
                  className={cn(
                    'flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-3 transition-colors',
                    active && 'bg-primary/12 text-primary',
                    done && 'text-success',
                    !active && !done && 'text-muted-foreground'
                  )}
                >
                  <span
                    className={cn(
                      'flex h-5 w-5 items-center justify-center rounded-full border text-[10px] font-semibold',
                      active && 'border-primary/40 bg-primary text-primary-foreground',
                      done && 'border-success/40 bg-success/15 text-success',
                      !active && !done && 'border-white/15'
                    )}
                  >
                    {done ? <Check className="h-3 w-3" strokeWidth={3} /> : step.n}
                  </span>
                  <span className="text-[12px] font-medium">{step.label}</span>
                </div>
                {index < STEPS.length - 1 && (
                  <span className={cn('mx-1.5 h-px w-6', phase > step.n ? 'bg-success/40' : 'bg-white/10')} />
                )}
              </div>
            );
          })}
        </nav>

        <p className="text-[11px] font-medium text-muted-foreground md:hidden">
          Paso {phase} de 4 · {STEPS[phase - 1].label}
        </p>

      </div>
    </header>
  );
}