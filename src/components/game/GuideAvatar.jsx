import { Image } from '@/components/ui/image';
import { cn } from '@/lib/utils';

const AVATAR_URL =
  'https://media.base44.com/images/public/6ad81e7066f2c3262e950919/bb19ca05d_generated_image.png';

export default function GuideAvatar({ active = false }) {
  return (
    <div className="relative shrink-0">
      <div
        className={cn(
          'absolute -inset-1.5 rounded-full bg-gradient-to-br from-primary/50 to-emerald-400/30 blur-md',
          active && 'animate-soft-pulse'
        )}
      />
      <div className="relative h-14 w-14 overflow-hidden rounded-full border border-white/15 bg-secondary shadow-xl shadow-black/50 sm:h-[70px] sm:w-[70px]">
        <Image
          src={AVATAR_URL}
          alt="Lía, guía de carga"
          fittingType="fill"
          className="h-full w-full object-cover"
        />
      </div>
      <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-success ring-2 ring-background">
        <span className="h-1.5 w-1.5 rounded-full bg-success-foreground" />
      </span>
    </div>
  );
}