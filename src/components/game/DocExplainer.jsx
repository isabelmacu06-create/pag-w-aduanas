import { FileCheck2, FileText, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

const DOCS = [
  {
    key: 'factura',
    tag: 'Documento comercial',
    title: 'Factura Comercial',
    icon: FileText,
    body: 'Detalla qué mercancía se vende, su valor y los datos de compra entre Pharma Supplies y Farma Salud.',
    lines: ['Emisor: Pharma Supplies', 'Receptor: Farma Salud', 'Valor declarado: USD 118,518.75'],
  },
  {
    key: 'master',
    tag: 'Transporte marítimo',
    title: 'BL Master',
    icon: Layers,
    body: 'Lo emite la naviera para el agente de carga. Ampara el contenedor completo de 45 pies High Cube con las cargas de los 6 clientes juntas.',
    lines: ['Emisor: Naviera Oceanic Line', 'Receptor: Agente de carga', 'Cobertura: 6 clientes en 1 contenedor'],
  },
  {
    key: 'hijo',
    tag: 'Transporte marítimo',
    title: 'BL Hijo',
    icon: FileCheck2,
    body: 'Lo emite el agente de carga para Farma Salud. Solo ampara sus rodilleras y muñequeras.',
    lines: ['Emisor: Agente de carga', 'Receptor: Farma Salud', 'Cobertura: solo su carga (8 CBM)'],
  },
];

export default function DocExplainer({ activeLine = 0 }) {
  const isActive = (key, index) => {
    if (activeLine === 0) return key === 'factura';
    if (activeLine === 1) return key === 'master' || key === 'hijo';
    if (activeLine === 2) return key === 'master';
    return key === 'hijo';
  };

  return (
    <div className="grid gap-3.5 md:grid-cols-3">
      {DOCS.map((doc, index) => {
        const Icon = doc.icon;
        const active = isActive(doc.key, index);
        return (
          <article
            key={doc.key}
            className={cn(
              'panel p-5 transition-all duration-500',
              active
                ? 'border-primary/40 bg-primary/[0.08] shadow-xl shadow-primary/10 md:-translate-y-1'
                : 'opacity-70'
            )}
          >
            <div className="flex items-center justify-between">
              <span
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-lg border',
                  active ? 'border-primary/40 bg-primary/20 text-primary' : 'border-white/10 text-muted-foreground'
                )}
              >
                <Icon className="h-4 w-4" strokeWidth={1.9} />
              </span>
              <span className="text-[9.5px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                {doc.tag}
              </span>
            </div>
            <h3 className="mt-3 font-display text-[15.5px] font-semibold">{doc.title}</h3>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted-foreground">{doc.body}</p>
            <ul className="mt-3 space-y-1 border-t border-white/[0.06] pt-3">
              {doc.lines.map((line) => (
                <li key={line} className="text-[11px] text-foreground/70">
                  {line}
                </li>
              ))}
            </ul>
          </article>
        );
      })}
    </div>
  );
}