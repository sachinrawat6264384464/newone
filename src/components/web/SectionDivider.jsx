export default function SectionDivider() {
  return (
    <div className="relative py-8 flex flex-col items-center justify-center">
      <div className="absolute left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
      <div className="relative z-10 bg-background p-2">
        <div className="w-12 h-12 rounded-full border-2 border-primary/40 flex items-center justify-center bg-card/80 backdrop-blur-sm animate-bounce">
          <svg
            className="w-6 h-6 text-primary"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>
    </div>
  );
}
