import { ChevronRight } from 'lucide-react';

export default function ContinueButton({ onClick, children = 'Continuar' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-[13px] font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-200 hover:bg-primary/90 hover:shadow-primary/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 active:scale-[0.98] animate-bubble"
    >
      {children}
      <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
    </button>
  );
}