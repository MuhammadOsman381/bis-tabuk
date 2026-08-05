type MenuWordIconProps = {
  className?: string;
};

export default function MenuWordIcon({ className = '' }: MenuWordIconProps) {
  return (
    <span aria-hidden="true" className={`flex flex-col items-center justify-center gap-0.5 ${className}`}>
      <span className="h-0.5 w-full rounded-full bg-current" />
      <span className="text-[8px] font-black uppercase leading-none tracking-[0.08em]">MENU</span>
      <span className="h-0.5 w-full rounded-full bg-current" />
    </span>
  );
}
