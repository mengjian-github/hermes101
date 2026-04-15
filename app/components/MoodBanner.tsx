interface MoodBannerProps {
  text: string;
}

export default function MoodBanner({ text }: MoodBannerProps) {
  return (
    <div className="bg-[#008378]/10 border border-[#00685f]/20 rounded-xl px-5 py-4 mt-5 flex items-center gap-3.5 flex-wrap">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#00685f] shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
      </svg>
      <span className="text-base font-bold text-[#00685f]">{text}</span>
    </div>
  );
}
