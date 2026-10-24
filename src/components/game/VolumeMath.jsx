import { useState } from 'react';
import { Calculator, Check, Ruler } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function VolumeMath({ enabled, solved, onFeedback, onSolved }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  const submit = (event) => {
    event.preventDefault();
    if (!enabled) return;

    const cleaned = value.replace(',', '.').replace(/[^0-9.]/g, '');
    const number = parseFloat(cleaned);

    if (!Number.isNaN(number) && Math.abs(number - 8) < 0.02) {
      setError(false);
      onFeedback(null);
      onSolved();
      return;
    }

    setError(true);
    onFeedback(
      'Casi lo tienes. Divide los Pies Cúbicos entre 35.32: 286 ÷ 35.32 = 8. Escribe ese resultado en la casilla y vuelve a calcular.'
    );
    window.setTimeout(() => setError(false), 1400);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
      <div className="panel p-5 sm:p-6">
        <div className="flex items-center gap-2 text-[9.5px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          <Calculator className="h-3.5 w-3.5" /> Calculadora de volumen
        </div>

        <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-3">
            <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Dato de origen</p>
            <p className="mt-1 font-display text-xl font-semibold">286</p>
            <p className="text-[11px] text-muted-foreground">Pies cúbicos (CFT)</p>
          </div>
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-3">
            <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Factor</p>
            <p className="mt-1 font-display text-xl font-semibold">35.32</p>
            <p className="text-[11px] text-muted-foreground">1 CBM = 35.32 CFT</p>
          </div>
          <div
            className={cn(
              'rounded-xl border p-3 transition-colors',
              solved ? 'border-emerald-400/40 bg-emerald-500/10' : 'border-primary/25 bg-primary/[0.07]'
            )}
          >
            <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Resultado</p>
            <p className="mt-1 font-display text-xl font-semibold">
              {solved ? '8' : '—'} <span className="text-[12px] font-normal text-muted-foreground">CBM</span>
            </p>
            <p className="text-[11px] text-muted-foreground">Metros cúbicos</p>
          </div>
        </div>

        <form onSubmit={submit} className="mt-5">
          <label htmlFor="cbm" className="block text-[11.5px] font-medium text-foreground/80">
            286 CFT ÷ 35.32 =
          </label>
          <div className="mt-2 flex flex-col gap-2 sm:flex-row">
            <div className="relative flex-1">
              <input
                id="cbm"
                value={value}
                onChange={(event) => {
                  setValue(event.target.value);
                  if (error) setError(false);
                }}
                disabled={!enabled || solved}
                inputMode="decimal"
                placeholder={enabled ? 'Escribe el resultado' : 'Escucha al guía…'}
                className={cn(
                  'w-full rounded-xl border bg-background/60 px-3.5 py-2.5 pr-14 text-[14px] outline-none transition-all duration-200',
                  error
                    ? 'animate-shake border-red-500 bg-red-500/10 text-red-100 ring-2 ring-red-500/40'
                    : 'border-white/12 focus:border-primary/60 focus:ring-2 focus:ring-primary/30',
                  solved && 'border-emerald-400/50 bg-emerald-500/10 text-emerald-100',
                  !enabled && 'cursor-not-allowed opacity-60'
                )}
              />
              <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 font-mono text-[11px] text-muted-foreground">
                CBM
              </span>
            </div>
            <button
              type="submit"
              disabled={!enabled || solved}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-[13px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {solved ? <Check className="h-4 w-4" strokeWidth={3} /> : null}
              {solved ? 'Correcto' : 'Calcular'}
            </button>
          </div>
        </form>
      </div>

      <div className="panel p-5">
        <div className="flex items-center gap-2 text-[9.5px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          <Ruler className="h-3.5 w-3.5" /> ¿Por qué importa?
        </div>
        <p className="mt-3 text-[12.5px] leading-relaxed text-foreground/80">
          La naviera cobra por volumen ocupado y no por peso. Si la carga de Farma Salud ocupa 8 CBM, el agente de
          carga reserva exactamente ese espacio dentro del contenedor de 45 pies High Cube y lo comparte con los otros 5
          clientes.
        </p>
        <div className="mt-4 rounded-xl border border-white/[0.07] bg-white/[0.03] p-3">
          <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Capacidad del contenedor</p>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className={cn(
                'h-full rounded-full bg-gradient-to-r from-primary to-emerald-400 transition-all duration-700',
                solved ? 'w-1/3' : 'w-0'
              )}
            />
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">8 CBM de 85.7 CBM utilizables</p>
        </div>
      </div>
    </div>
  );
}