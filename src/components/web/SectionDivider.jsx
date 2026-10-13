export default function SectionDivider() {
  return (
    <div className="w-full flex items-center justify-center py-8 opacity-75">
      <div className="w-24 sm:w-40 h-px bg-gradient-to-r from-transparent via-[#E5C158]/50 to-transparent" />
      <span className="mx-4 text-[#E5C158] text-sm font-display select-none">✦</span>
      <div className="w-24 sm:w-40 h-px bg-gradient-to-r from-transparent via-[#E5C158]/50 to-transparent" />
    </div>
  );
}
