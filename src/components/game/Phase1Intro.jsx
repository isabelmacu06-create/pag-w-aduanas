import { useState } from 'react';
import GuideDock from '@/components/game/GuideDock';
import ContinueButton from '@/components/game/ContinueButton';
import CaseBrief from '@/components/game/CaseBrief';

export const PHASE1_LINES = [
  '¡Hola! Te doy la bienvenida a este simulador logístico. Hoy aprenderás cómo llega mercancía consolidada desde el extranjero hasta las manos del cliente final.',
  "Imagina este caso: La empresa estadounidense 'Pharma Supplies' le vende un lote de rodilleras y muñequeras ortopédicas a la empresa local 'Farma Salud'.",
  'Pero hay un detalle: la carga de Farma Salud es pequeña y NO llena un contenedor marítimo completo por sí sola.',
  'Para solucionar esto, ahora conoceremos al AGENTE DE CARGA. Es el intermediario experto que contrata Farma Salud. Su función es coordinar el transporte y consolidar la carga; es decir, juntar la mercancía de nuestro cliente con la de otros 5 clientes independientes en un solo contenedor para abaratar costos. A esto lo llamamos un despacho LCL (Less than Container Load).',
  'El agente de carga se comunica con la NAVIERA, que es la empresa dueña de los barcos y contenedores, para reservar el espacio físico en el buque. ¡Comencemos con el papeleo!',
];

export default function Phase1Intro({ onContinue }) {
  const [index, setIndex] = useState(0);
  const lastIndex = PHASE1_LINES.length - 1;
  const finished = index === lastIndex;

  const advance = () => setIndex((current) => Math.min(current + 1, lastIndex));

  return (
    <section className="flex min-h-[calc(100dvh-64px)] flex-col">
      <div className="flex-1 pb-4 pt-9 sm:pt-14">
        <div className="animate-rise">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
            Fase 1 · Introducción
          </span>
          <h1 className="mt-5 max-w-3xl font-display text-[30px] font-semibold leading-[1.08] tracking-tight sm:text-[46px]">
            El viaje de un{' '}
            <span className="bg-gradient-to-r from-primary via-sky-300 to-emerald-300 bg-clip-text text-transparent">
            contenedor compartido
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-muted-foreground sm:text-base">
            Acompaña a Lía, nuestra guía logística, desde la compra de la mercancía en Estados Unidos hasta la
            entrega en la bodega de Farma Salud.
          </p>
        </div>

        <CaseBrief activeLine={index} />
      </div>

      <GuideDock
        text={PHASE1_LINES[index]}
        counter={finished ? 'listo' : `${index + 1} / ${PHASE1_LINES.length}`}
        onAdvance={finished ? undefined : advance}
        note={finished ? null : 'Haz clic en continuar'}
        action={finished ? <ContinueButton onClick={onContinue}>Continuar</ContinueButton> : null}
      />
    </section>
  );
}