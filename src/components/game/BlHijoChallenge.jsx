import { useState } from 'react';
import { Check, GripVertical, Ship } from 'lucide-react';
import { cn } from '@/lib/utils';

const BLOCKS = [
  { id: 'shipper', label: 'Shipper / Exportador' },
  { id: 'consignee', label: 'Consignee / Importador' },
  { id: 'container', label: 'N° de Contenedor' },
  { id: 'description', label: 'Descripción de Carga' },
];

const ROWS = [
  { id: 'shipper', value: 'Pharma Supplies LLC · Miami, EE. UU.' },
  { id: 'consignee', value: 'Farma Salud S.A. · Ciudad de Panamá' },
  { id: 'container', value: 'EMCU-263018-1 · Contenedor 45 HC' },
  { id: 'description', value: 'Rodilleras y muñequeras ortopédicas · 275 bulto' },
];

const HINTS = {
  shipper:
    'El Shipper/Exportador es quien ENVÍA la carga desde el exterior: Pharma Supplies, la empresa que vende. Ese dato va en la primera línea del BL Hijo.',
  consignee:
    'El Consignee/Importador es quien RECIBE la mercancía en el país de destino: Farma Salud, Búscalo en la línea del importador, no en la del exportador.',
  container:
    'El N° de Contenedor es el código del equipo donde viaja la carga: EMCU-263018-1. Fíjate en qué línea aparece ese código.',
  description:
    'La Descripción de Carga detalla la mercancía: rodilleras y muñequeras ortopédicas. Va junto al texto que describe los productos.',
};

const OTHER_CLIENTS = ['Logitech', 'Textile Global', 'Home Decor', 'Auto Parts Co.', 'Industrial Tools', 'Organic Suppliers'];

export default function BlHijoChallenge({ onFeedback, onSolved }) {
  const [placed, setPlaced] = useState([]);
  const [selected, setSelected] = useState(null);
  const [wrongRow, setWrongRow] = useState(null);
  const [shaking, setShaking] = useState(null);

  const tryPlace = (rowId, blockId) => {
    setSelected(null);
    if (!blockId || placed.includes(blockId)) return;

    if (blockId === rowId) {
      const next = [...placed, blockId];
      setPlaced(next);
      setWrongRow(null);
      onFeedback(null);
      if (next.length === ROWS.length) onSolved();
      return;
    }

    setWrongRow(rowId);
    setShaking(blockId);
    onFeedback(HINTS[blockId]);
    window.setTimeout(() => setShaking(null), 600);
    window.setTimeout(() => setWrongRow(null), 1100);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
      <div className="paper rounded-2xl border border-black/10 p-4 shadow-2xl shadow-black/50 sm:p-5">
        <div className="flex items-start justify-between gap-3 border-b border-slate-900/10 pb-3">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-slate-500">Bill of Lading</p>
            <h3 className="font-display text-[16px] font-semibold text-slate-900">BL Hijo · Farma Salud</h3>
          </div>
          <span className="shrink-0 rounded-md bg-slate-900 px-2 py-1 font-mono text-[9.5px] text-white">
            GLC-2026-FS-014
          </span>
        </div>

        <div className="mt-3.5 space-y-2.5">
          {ROWS.map((row) => {
            const filled = placed.includes(row.id);
            const block = BLOCKS.find((item) => item.id === row.id);
            return (
              <div key={row.id} className="grid items-center gap-1.5 sm:grid-cols-[138px_1fr] sm:gap-2.5">
                <div
                  data-testid={`slot-${row.id}`}
                  onDragOver={(event) => {
                    event.preventDefault();
                    event.dataTransfer.dropEffect = 'move';
                  }}
                  onDrop={(event) => {
                    event.preventDefault();
                    tryPlace(row.id, event.dataTransfer.getData('text/plain'));
                  }}
                  onClick={() => selected && tryPlace(row.id, selected)}
                  className={cn(
                    'flex min-h-[32px] items-center justify-center rounded-md border border-dashed px-2 py-1.5 text-center transition-all duration-200',
                    filled && 'border-emerald-600/50 bg-emerald-600/10',
                    !filled && wrongRow === row.id && 'border-red-500 bg-red-500/15',
                    !filled && wrongRow !== row.id && 'border-slate-400/70 bg-white/50',
                    selected && !filled && 'cursor-pointer border-slate-900/60 bg-white'
                  )}
                >
                  {filled ? (
                    <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-800">
                      <Check className="h-3 w-3" strokeWidth={3} />
                      {block.label}
                    </span>
                  ) : (
                    <span className="text-[9.5px] uppercase tracking-[0.14em] text-slate-400">Arrastra aquí</span>
                  )}
                </div>
                <p className="font-mono text-[11.5px] leading-snug text-slate-700">{row.value}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-900/10 pt-3 text-[10px] text-slate-500">
          <span>Puerto de origen: Miami, EE. UU.</span>
          <span>Puerto de destino: Balboa, Panamá</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="panel p-4">
          <div className="flex items-center justify-between">
            <p className="text-[9.5px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Bloques de datos
            </p>
            <p className="font-mono text-[10px] text-muted-foreground/80">{placed.length} de 4</p>
          </div>

          <div className="mt-3 space-y-2.5">
            {BLOCKS.filter((block) => !placed.includes(block.id)).map((block) => (
              <button
                key={block.id}
                data-testid={`block-${block.id}`}
                type="button"
                draggable
                onDragStart={(event) => {
                  event.dataTransfer.setData('text/plain', block.id);
                  event.dataTransfer.effectAllowed = 'move';
                }}
                onClick={() => setSelected(selected === block.id ? null : block.id)}
                className={cn(
                  'flex w-full cursor-grab items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left text-[12px] font-medium transition-all duration-200 active:cursor-grabbing',
                  selected === block.id
                    ? 'border-primary bg-primary/15 text-primary shadow-lg shadow-primary/20'
                    : 'border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.07]',
                  shaking === block.id && 'animate-shake border-red-400/70 bg-red-500/10 text-red-200'
                )}
              >
                <GripVertical className="h-3.5 w-3.5 shrink-0 opacity-50" />
                <span className="flex-1">{block.label}</span>
              </button>
            ))}
            {placed.length === 4 && (
              <p className="flex items-center gap-1.5 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-3 py-2.5 text-[12px] font-medium text-emerald-300">
                <Check className="h-3.5 w-3.5" strokeWidth={3} /> BL Hijo completo
              </p>
            )}
          </div>

          <p className="mt-3 text-[10.5px] leading-relaxed text-muted-foreground">
            También puedes tocar un bloque y luego tocar su casilla.
          </p>
        </div>

        <div className="panel p-4">
          <p className="flex items-center gap-1.5 text-[9.5px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            <Ship className="h-3.5 w-3.5" /> Contenedor EMCU-263028-1
          </p>
          <p className="mt-2 text-[11.5px] text-muted-foreground">
            En el mismo contenedor viajan las cargas de otros 5 clientes. El BL Hijo solo cubre la mercancía de Farma Salud.
          </p>
          <ul className="mt-2.5 flex flex-wrap gap-1.5">
            {OTHER_CLIENTS.map((client) => (
              <li
                key={client}
                className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-1 text-[10px] text-muted-foreground"
              >
                {client}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}