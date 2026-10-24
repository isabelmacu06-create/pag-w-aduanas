import { useState } from 'react';
import { Check, Package, Store } from 'lucide-react';
import GuideDock from '@/components/game/GuideDock';
import ContinueButton from '@/components/game/ContinueButton';
import { cn } from '@/lib/utils';

const LINES = [
  '¡Momento clave! El contenedor ya está seguro en el depósito aduanero. Ahora el personal del almacén va a DESCONSOLIDAR, es decir, vaciar el contenedor y separar la carga de cada uno de los 6 clientes.',
  'Para que Farma Salud pueda retirar sus rodilleras y muñequeras, su Agencia de Aduanas debe presentar la DECLARACIÓN DE IMPORTACIÓN, pagando los impuestos correspondientes ante el Estado basándose en la Factura y el BL Hijo.',
  '¡Perfecto! Has separado la mercancía correcta, la aduana ha validado la declaración y la carga está oficialmente liberada.',
  '¡Felicitaciones! Las rodilleras y muñequeras han sido entregadas con éxito a Farma Salud. Has completado con éxito todo el proceso de consolidación y desconsolidación internacional.',
];

const BOXES = [
  { id: 'b1', client: 'Logitech', detail: 'Teléfonos inteligentes', farma: false },
  { id: 'b2', client: 'Farma Salud', detail: 'Rodilleras ortopédicas', farma: true },
  { id: 'b3', client: 'Textile Global', detail: 'Tshirt para damas y caballeros con logos modernos', farma: false },
  { id: 'b4', client: 'Home Decor', detail: 'Mesa de centro para sala', farma: false },
  { id: 'b5', client: 'Farma Salud', detail: 'Muñequeras ortopédicas', farma: true },
  { id: 'b6', client: 'Auto Parts Co.', detail: 'Alfombras de plástico para autos', farma: false },
  { id: 'b7', client: 'Industrial Tools', detail: 'Taladros inalámbricos', farma: false },
  { id: 'b8', client: 'Organic Suppliers', detail: 'Nueces de Brazil', farma: false },
];

const RELEASE_STEPS = [
  'Declaración de importación presentada',
  'Impuestos de aduana pagados',
  'Carga liberada por la aduana',
  'Mercancía entregada a Farma Salud',
];

export default function Phase4Delivery({ onRestart }) {
  const [line, setLine] = useState(0);
  const [stage, setStage] = useState('talk');
  const [separated, setSeparated] = useState([]);
  const [hint, setHint] = useState(null);
  const [wrongBox, setWrongBox] = useState(null);

  const advance = () => {
    if (line < 1) setLine(line + 1);
    else setStage('sort');
  };

  const pick = (box) => {
    if (stage !== 'sort') return;

    if (box.farma) {
      const next = [...separated, box.id];
      setSeparated(next);
      setHint(null);
      if (next.length === 2) {
        setStage('done');
        setLine(2);
      }
      return;
    }

    setWrongBox(box.id);
    setHint(
      `Ese pallet es de ${box.client}. Revisa el BL Hijo de la esquina: solo debes separar la carga de Farma Salud.`
    );
    window.setTimeout(() => setWrongBox(null), 900);
  };

  const advanceFinal = () => {
    if (line < LINES.length - 1) setLine(line + 1);
  };

  let dock = {
    text: LINES[line],
    counter: `${line + 1} / 4`,
    onAdvance: advance,
    note: 'Haz clic en el texto para continuar',
    action: null,
  };

  if (stage === 'sort') {
    dock = {
      text:
        hint ||
        'Haz clic solo en las cajas de Farma Salud para separarlas del resto. Guíate por el BL Hijo que está en la esquina.',
      tone: hint ? 'warn' : 'info',
      counter: `${separated.length} / 2`,
      action: null,
    };
  }

  if (stage === 'done') {
    dock = {
      text: LINES[line],
      counter: `${line + 1} / 4`,
      onAdvance: line < LINES.length - 1 ? advanceFinal : undefined,
      note: line < LINES.length - 1 ? 'Haz clic en continuar' : null,
      action: line === LINES.length - 1 ? <ContinueButton onClick={onRestart}>Volver a jugar</ContinueButton> : null,
    };
  }

  const remaining = BOXES.filter((box) => !separated.includes(box.id));

  return (
    <section className="flex min-h-[calc(100dvh-64px)] flex-col">
      <div className="flex-1 pb-4 pt-8 sm:pt-10">
        <div className="animate-rise">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
            Fase 4 · Desconsolidación, declaración y entrega
          </span>
          <h1 className="mt-4 max-w-3xl font-display text-[24px] font-semibold leading-tight tracking-tight sm:text-[34px]">
            Vaciar el contenedor y liberar la carga
          </h1>
          <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-muted-foreground">
            Seis clientes, un solo contenedor. Separa la mercancía de Farma Salud del resto.
          </p>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.55fr_1fr]">
          <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0d1a26] to-card/60 p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[9.5px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Contenedor EMCU263018-1 · puertas abiertas
              </p>
              <p className="font-mono text-[10px] text-muted-foreground/80">
                {separated.length} de 2 de Farma Salud
              </p>
            </div>

            <div
              className={cn(
                'mt-3 grid grid-cols-2 gap-2.5 rounded-xl border border-dashed border-white/10 bg-black/20 p-3 transition-opacity sm:grid-cols-4',
                stage === 'talk' && 'opacity-60'
              )}
            >
              {remaining.map((box) => (
                <button
                  key={box.id}
                  data-testid={`box-${box.id}`}
                  type="button"
                  onClick={() => pick(box)}
                  disabled={stage !== 'sort'}
                  className={cn(
                    'group relative flex flex-col items-start gap-1.5 rounded-lg border p-2.5 text-left transition-all duration-200',
                    'border-white/10 bg-white/[0.04]',
                    stage === 'sort' && 'hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/10',
                    wrongBox === box.id && 'animate-shake border-red-500 bg-red-500/15'
                  )}
                >
                  <span
                    className={cn(
                      'flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-white/[0.05]',
                      box.farma ? 'text-primary' : 'text-muted-foreground'
                    )}
                  >
                    <Package className="h-3.5 w-3.5" strokeWidth={1.9} />
                  </span>
                  <span className="text-[10.5px] font-semibold leading-tight">{box.client}</span>
                  <span className="text-[9.5px] leading-tight text-muted-foreground">{box.detail}</span>
                </button>
              ))}
            </div>

            {stage === 'talk' && (
              <p className="mt-2 text-[10.5px] text-muted-foreground">Escucha al guía para comenzar la separación.</p>
            )}

            {stage === 'done' && (
              <div className="mt-4 animate-rise space-y-1.5 rounded-xl border border-emerald-400/30 bg-emerald-500/[0.07] p-3.5">
                {RELEASE_STEPS.map((step) => (
                  <p key={step} className="flex items-center gap-2 text-[11.5px] text-emerald-200">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-emerald-950">
                      <Check className="h-2.5 w-2.5" strokeWidth={4} />
                    </span>
                    {step}
                  </p>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="panel p-4">
              <p className="flex items-center gap-1.5 text-[9.5px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                <Store className="h-3.5 w-3.5" /> Zona de separación · Farma Salud
              </p>
              <div className="mt-3 space-y-2">
                {separated.length === 0 && (
                  <p className="rounded-lg border border-dashed border-white/10 px-3 py-4 text-center text-[11px] text-muted-foreground">
                    Aquí llegarán las cajas de Farma Salud
                  </p>
                )}
                {separated.map((id) => {
                  const box = BOXES.find((item) => item.id === id);
                  return (
                    <div
                      key={id}
                      className="animate-bubble flex items-center gap-2 rounded-lg border border-emerald-400/30 bg-emerald-500/10 px-3 py-2"
                    >
                      <Package className="h-3.5 w-3.5 text-emerald-300" />
                      <span className="text-[11px] text-emerald-100">{box.detail}</span>
                      <Check className="ml-auto h-3.5 w-3.5 text-emerald-300" strokeWidth={3} />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="paper rounded-xl border border-black/10 p-3.5 shadow-xl shadow-black/40">
              <p className="text-[8.5px] font-semibold uppercase tracking-[0.24em] text-slate-500">BL Hijo · referencia</p>
              <p className="mt-1 font-display text-[13px] font-semibold text-slate-900">Farma Salud S.A.</p>
              <p className="mt-1 font-mono text-[10.5px] leading-relaxed text-slate-600">
                Rodilleras y muñequeras ortopédicas
                <br />
                275 bulto · 8 CBM · Contenedor EMCU263018-1
              </p>
            </div>
          </div>
        </div>
      </div>

      <GuideDock {...dock} />
    </section>
  );
}