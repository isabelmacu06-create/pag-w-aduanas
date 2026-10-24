import { ArrowRight, Boxes, Building2, Package, Ship, Store, Warehouse } from 'lucide-react';
import { cn } from '@/lib/utils';

const ROUTE = [
  { icon: Building2, label: 'Exportador', note: 'Pharma Supplies · EE. UU.' },
  { icon: Boxes, label: 'Agente de carga', note: 'Consolida 6 clientes' },
  { icon: Ship, label: 'Naviera', note: 'Reserva el espacio' },
  { icon: Package, label: 'Contenedor LCL', note: '40 pies · carga mixta' },
  { icon: Warehouse, label: 'Depósito aduanero', note: 'Tránsito interno' },
  { icon: Store, label: 'Importador', note: 'Farma Salud · Panamá' },
];

export default function CaseBrief({ activeLine = 0 }) {
  return (
    <div className="mt-8 space-y-4 sm:mt-10">
      <div className="grid gap-4 lg:grid-cols-5">
        <div className="panel animate-rise p-5 sm:p-6 lg:col-span-3">
          <p className="text-[9.5px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">El caso</p>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-stretch">
            <div className="flex-1 rounded-xl border border-white/[0.07] bg-white/[0.03] p-4">
              <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Exportador</p>
              <p className="mt-1 font-display text-[15px] font-semibold">Pharma Supplies</p>
              <p className="text-[12px] text-muted-foreground">Miami, Estados Unidos</p>
            </div>
            <div className="flex items-center justify-center text-primary/70">
              <ArrowRight className="h-5 w-5 rotate-90 sm:rotate-0" />
            </div>
            <div className="flex-1 rounded-xl border border-white/[0.07] bg-white/[0.03] p-4">
              <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Importador</p>
              <p className="mt-1 font-display text-[15px] font-semibold">Farma Salud</p>
              <p className="text-[12px] text-muted-foreground">Panamá</p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
              Rodilleras ortopédicas
            </span>
            <span className="rounded-md bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
              Muñequeras ortopédicas
            </span>
        
          </div>
        </div>

        <div
          className={cn(
            'panel p-5 transition-all duration-500 sm:p-6 lg:col-span-2',
            activeLine >= 3 ? 'border-emerald-400/30 bg-emerald-500/[0.06]' : 'opacity-80'
          )}
        >
          <p className="text-[9.5px] font-semibold uppercase tracking-[0.22em] text-emerald-300/80">
            Concepto clave
          </p>
          <h3 className="mt-2 font-display text-lg font-semibold">Despacho LCL</h3>
          <p className="mt-1 text-[11.5px] uppercase tracking-[0.14em] text-muted-foreground">Less than Container Load</p>
          <p className="mt-3 text-[13px] leading-relaxed text-foreground/80">
            La carga de Farma Salud no llena un contenedor completo, así que se consolida con la de otros 5
            clientes y todos comparten el costo del flete.
          </p>
        </div>
      </div>

      <div className="panel p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-x-1 gap-y-3">
          {ROUTE.map((node, index) => {
            const Icon = node.icon;
            return (
              <div key={node.label} className="flex items-center">
                <div className="flex items-center gap-2.5 px-1.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-primary">
                    <Icon className="h-4 w-4" strokeWidth={1.8} />
                  </span>
                  <span className="leading-tight">
                    <span className="block text-[12px] font-medium">{node.label}</span>
                    <span className="block text-[10.5px] text-muted-foreground">{node.note}</span>
                  </span>
                </div>
                {index < ROUTE.length - 1 && (
                  <span className="hidden h-px w-4 bg-white/12 sm:block" aria-hidden="true" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}