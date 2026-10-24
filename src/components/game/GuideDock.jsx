import GuideAvatar from '@/components/game/GuideAvatar';
import { cn } from '@/lib/utils';

export default function GuideDock({ text, tone = 'info', counter, onAdvance, action, note }) {
  const warn = tone === 'warn';
  const Tag = onAdvance ? 'button' : 'div';

  return (
    <div className="sticky bottom-0 z-30 pt-10">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 top-0 bg-gradient-to-t from-background via-background/92 to-transparent" />
      <div className="relative mx-auto flex w-full max-w-5xl items-end gap-3 pb-5 sm:gap-4">
        <GuideAvatar active={Boolean(onAdvance) || warn} />

        <div className="min-w-0 flex-1">
          <div
            className={cn(
              'relative rounded-2xl border p-4 shadow-2xl shadow-black/40 backdrop-blur-xl transition-colors duration-300 sm:p-5',
              warn ? 'border-amber-400/40 bg-amber-500/[0.13]' : 'border-white/10 bg-card/85'
            )}
          >
            <span
              className={cn(
                'absolute -left-[7px] bottom-6 hidden h-3.5 w-3.5 rotate-45 border-b border-l sm:block',
                warn ? 'border-amber-400/40 bg-[#3a2e14]' : 'border-white/10 bg-[#141d2a]'
              )}
            />
            <div className="flex items-center justify-between gap-3">
              <p className="text-[9.5px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                {warn ? 'Pista del guía' : 'Lía · guía de carga'}
              </p>
              {counter && (
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">{counter}</p>
              )}
            </div>

            <Tag
              type={onAdvance ? 'button' : undefined}
              onClick={onAdvance}
              className={cn('mt-1.5 block w-full text-left', onAdvance && 'cursor-pointer')}
            >
              <span
                className={cn(
                  'block text-[14.5px] leading-relaxed transition-colors sm:text-[16px]',
                  warn ? 'text-amber-50' : 'text-foreground/95'
                )}
              >
                {text}
              </span>
            </Tag>

            {note && <p className="mt-2 text-[10.5px] text-muted-foreground">{note}</p>}
          </div>

          {action && <div className="mt-3 flex justify-end">{action}</div>}
        </div>
      </div>
    </div>
  );
}