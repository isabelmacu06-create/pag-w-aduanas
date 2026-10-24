import { useState } from 'react';
import GuideDock from '@/components/game/GuideDock';
import ContinueButton from '@/components/game/ContinueButton';
import DocExplainer from '@/components/game/DocExplainer';
import BlHijoChallenge from '@/components/game/BlHijoChallenge';
import VolumeMath from '@/components/game/VolumeMath';

const DOC_LINES = [
  'Antes de cargar el barco, debemos entender los documentos clave. Primero está la FACTURA COMERCIAL, que detalla qué mercancía se vende, su valor y los datos de compra entre Pharma Supplies y Farma Salud.',
  'Luego están los documentos de transporte marítimo llamados BL (Bill of Lading o Conocimiento de Embarque). Como es una carga consolidada, existen dos tipos:',
  'El BL MASTER: Es el documento principal que emite la naviera para el agente de carga. Ampara el contenedor completo de 40 pies con las cargas de los 6 clientes juntas.',
  'El BL HIJO: Es el documento que emite el agente de carga específicamente para Farma Salud. Solo ampara sus rodilleras y muñequeras.',
];

const DIM_LINES = [
  '¡Excelente! Ahora debemos calcular el espacio. La naviera cobra $75.00 por CBM. En Estados Unidos nos dieron las medidas en Pies Cúbicos (CFT), pero en nuestro sistema local trabajamos en Metros Cúbicos (CBM).',
  'Ayúdame a pasar 286 Pies Cúbicos (CFT) a Metros Cúbicos (CBM). Pista: divide los Pies Cúbicos entre 35.32.',
];

export default function Phase2Docs({ onContinue }) {
  const [stage, setStage] = useState('docs');
  const [docIndex, setDocIndex] = useState(0);
  const [dimIndex, setDimIndex] = useState(0);
  const [hint, setHint] = useState(null);
  const [mathSolved, setMathSolved] = useState(false);

  const advanceDocs = () => {
    setHint(null);
    if (docIndex < DOC_LINES.length - 1) setDocIndex(docIndex + 1);
    else setStage('challenge');
  };

  const advanceDims = () => {
    setHint(null);
    if (dimIndex < DIM_LINES.length - 1) setDimIndex(dimIndex + 1);
    else setStage('math');
  };

  const titles = {
    docs: 'De los papeles al espacio en el buque',
    challenge: 'Reto 1 · Completa el BL Hijo',
    dims: 'Reto 2 · Dimensiona la carga',
    math: 'Reto 2 · Dimensiona la carga',
  };

  const subtitles = {
    docs: 'Tres documentos gobiernan el viaje de la carga consolidada.',
    challenge: 'Arrastra cada bloque de datos a la casilla correcta del documento.',
    dims: 'La naviera cobra por volumen: pasemos de pies cúbicos a metros cúbicos.',
    math: 'Convierte 286 CFT a CBM para saber cuánto espacio ocupa la carga.',
  };

  let dock = {
    text: DOC_LINES[docIndex],
    counter: `${docIndex + 1} / 4`,
    onAdvance: advanceDocs,
    note: 'Haz clic en el textos para continuar',
    action: null,
  };

  if (stage === 'challenge') {
    dock = {
      text:
        hint ||
        'Tu turno: arrastra cada bloque a su casilla del BL Hijo. Si algo no encaja, te doy una pista.',
      tone: hint ? 'warn' : 'info',
      counter: 'reto 1',
      action: null,
    };
  }

  if (stage === 'dims') {
    dock = {
      text: DIM_LINES[dimIndex],
      counter: `${dimIndex + 5} / 6`,
      onAdvance: advanceDims,
      note: 'Haz clic en el texto para continuar',
      action: null,
    };
  }

  if (stage === 'math') {
    dock = {
      text:
        hint ||
        (mathSolved
          ? '¡Exacto! 286 ÷ 35.32 = 8. Nuestra carga ocupa 8 CBM del contenedor y ya tiene su espacio reservado en el buque.'
          : 'Escribe el resultado en la calculadora y pulsa Calcular. Si te equivocas, te muestro cómo hacer la división.'),
      tone: hint ? 'warn' : 'info',
      counter: 'reto 2',
      action: mathSolved ? <ContinueButton onClick={onContinue}>Continuar</ContinueButton> : null,
    };
  }

  return (
    <section className="flex min-h-[calc(100dvh-64px)] flex-col">
      <div className="flex-1 pb-4 pt-8 sm:pt-10">
        <div key={stage} className="animate-rise">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
            Fase 2 · Documentación y consolidación
          </span>
          <h1 className="mt-4 max-w-3xl font-display text-[24px] font-semibold leading-tight tracking-tight sm:text-[34px]">
            {titles[stage]}
          </h1>
          <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-muted-foreground">{subtitles[stage]}</p>
        </div>

        <div className="mt-6">
          {stage === 'docs' && <DocExplainer activeLine={docIndex} />}
          {stage === 'challenge' && (
            <BlHijoChallenge
              onFeedback={setHint}
              onSolved={() => {
                setHint(null);
                setStage('dims');
              }}
            />
          )}
          {(stage === 'dims' || stage === 'math') && (
            <VolumeMath
              enabled={stage === 'math'}
              solved={mathSolved}
              onFeedback={setHint}
              onSolved={() => {
                setHint(null);
                setMathSolved(true);
              }}
            />
          )}
        </div>
      </div>

      <GuideDock {...dock} />
    </section>
  );
}