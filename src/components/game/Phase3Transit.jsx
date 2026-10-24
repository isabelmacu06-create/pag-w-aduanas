import { useState } from 'react';
import { Check, Loader2, ScanLine, ShieldCheck, Truck, Warehouse } from 'lucide-react';
import GuideDock from '@/components/game/GuideDock';
import ContinueButton from '@/components/game/ContinueButton';
import { cn } from '@/lib/utils';

const LINES = [
  '¡El barco ha llegado al puerto local! Como la mercancía viene consolidada y aún no se han pagado los impuestos de aduana, no puede ir directo a los clientes.',
  'Se realiza un TRÁNSITO INTERNO (TI). Esto es un permiso aduanero para trasladar el contenedor cerrado y sellado en un camión, desde el puerto hasta un Depósito Autorizado.',
  'El camión acaba de llegar al depósito. Ahora tú eres el funcionario que lo recibe. Debes cotejar que el Número de Contenedor y el número del Precinto físico (sello de seguridad) que trae el conductor coincidan exactamente con lo que dice el sistema.',
];

const PAPER = [
  { label: 'Transportista', value: 'Solution Transport S.A.' },
  { label: 'Contenedor', value: 'EMCU263018-1' },
  { label: 'Precinto', value: 'S-5068465' },
  { label: 'Bultos', value: '1352' },
  { label: 'Peso bruto', value: '22,365 kg' },
];

const SYSTEM = [
  { label: 'Contenedor esperado', value: 'EMCU263018-1', match: true },
  { label: 'Precinto declarado', value: 'S-5068465', match: true },
  { label: 'BL Master', value: 'EGLV301826', match: false },
  { label: 'Estado', value: 'Pendiente de ingreso', match: false },
];

export default function Phase3Transit({ onContinue }) {
  const [line, setLine] = useState(0);
  const [stage, setStage] = useState('talk');
  const [working, setWorking] = useState(false);

  const advance = () => {
    if (line < LINES.length - 1) setLine(line + 1);
    else setStage('check');
  };

  const approve = () => {
    setWorking(true);
    window.setTimeout(() => {
      setWorking(false);
      setStage('done');
    }, 1600);
  };

  let dock = {
    text: LINES[line],
    counter: `${line + 1} / 3`,
    onAdvance: advance,
    note: 'Haz clic en el texto para continuar',
    action: null,
  };

  if (stage === 'check') {
    dock = {
      text: 'Coteja los datos del papel con la pantalla del sistema. Si el contenedor y el precinto coinciden, pulsa el botón verde.',
      counter: 'cotejo',
      action: null,
    };
  }

  if (stage === 'done') {
    dock = {
      text: 'Registro exitoso: el contenedor ingresó al depósito cerrado y sellado. La carga ya puede desconsolidarse y declararse.',
      counter: 'ingresado',
      action: <ContinueButton onClick={onContinue}>Continuar</ContinueButton>,
    };
  }

  return (
    <section className="flex min-h-[calc(100dvh-64px)] flex-col">
      <div className="flex-1 pb-4 pt-8 sm:pt-10">
        <div className="animate-rise">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
            Fase 3 · Tránsito interno e ingreso a depósito
          </span>
          <h1 className="mt-4 max-w-3xl font-display text-[24px] font-semibold leading-tight tracking-tight sm:text-[34px]">
            El contenedor cruza la ciudad
          </h1>
          <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-muted-foreground">
            Un camión traslada el contenedor del puerto al depósito aduanero. Tú controlas el ingreso.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-white/[0.07] bg-card/50 p-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-primary">
              <Truck className="h-4 w-4" strokeWidth={1.9} />
            </span>
            <span className="leading-tight">
              <span className="block text-[12px] font-medium">Camión con TI</span>
              <span className="block text-[10.5px] text-muted-foreground">Precinto intacto</span>
            </span>
          </div>
          <span className="h-px flex-1 min-w-6 bg-gradient-to-r from-primary/50 to-transparent" />
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
              <Warehouse className="h-4 w-4" strokeWidth={1.9} />
            </span>
            <span className="leading-tight">
              <span className="block text-[12px] font-medium">Depósito autorizado</span>
              <span className="block text-[10.5px] text-muted-foreground">Puerto Balboa, Panamá</span>
            </span>
          </div>
          <span className="h-px flex-1 min-w-6 bg-white/10" />
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-emerald-300">
              <ShieldCheck className="h-4 w-4" strokeWidth={1.9} />
            </span>
            <span className="leading-tight">
              <span className="block text-[12px] font-medium">Control de aduana</span>
              <span className="block text-[10.5px] text-muted-foreground">Pendiente de ingreso</span>
            </span>
          </div>
        </div>

        <div key={stage} className="mt-4 grid animate-rise gap-4 lg:grid-cols-2">
          <div className="paper rounded-2xl border border-black/10 p-5 shadow-2xl shadow-black/40">
            <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-slate-500">
              Documento del transportista
            </p>
            <h3 className="font-display text-[16px] font-semibold text-slate-900">Formulario de tránsito interno</h3>
            <dl className="mt-3 divide-y divide-slate-900/10">
              {PAPER.map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2">
                  <dt className="text-[11px] uppercase tracking-wide text-slate-500">{item.label}</dt>
                  <dd className="font-mono text-[12px] font-medium text-slate-800">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-2xl border border-primary/25 bg-[#08121d] p-5 shadow-2xl shadow-black/50">
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.2em] text-primary/80">
                <ScanLine className="h-3.5 w-3.5" /> Sistema de recepción
              </p>
              <span className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-wider text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> en línea
              </span>
            </div>
            <dl className="mt-3 divide-y divide-white/[0.06]">
              {SYSTEM.map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-3 py-2">
                  <dt className="font-mono text-[10.5px] uppercase tracking-wide text-muted-foreground">{item.label}</dt>
                  <dd className="flex items-center gap-2 font-mono text-[11.5px] text-foreground/90">
                    {item.value}
                    {item.match && (
                      <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-emerald-300">
                        coincide
                      </span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            {stage === 'done' ? (
              <div className="mt-4 flex items-center gap-3 rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-emerald-950">
                  <Check className="h-4 w-4" strokeWidth={3} />
                </span>
                <div>
                  <p className="text-[12.5px] font-semibold text-emerald-200">Ingreso registrado · 09:30</p>
                  <p className="text-[10.5px] text-emerald-300/70">Contenedor recibido en depósito autorizado</p>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={approve}
                disabled={working || stage === 'talk'}
                className={cn(
                  'mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3.5 text-[13.5px] font-semibold text-emerald-950 shadow-lg shadow-emerald-500/25 transition-all duration-200 hover:bg-emerald-400 active:scale-[0.99]',
                  (working || stage === 'talk') && 'cursor-not-allowed opacity-50'
                )}
              >
                {working ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Validando precinto…
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4" strokeWidth={3} /> Aprobado / Contenedor Recibido
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      <GuideDock {...dock} />
    </section>
  );
}