import type { ThemeMode } from "@/types";

type Props = {
  theme: ThemeMode;
};

export default function AmbientBackground({ theme }: Props) {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div
        className={`
          absolute left-[-10%] top-[-10%]
          h-[300px] w-[300px] md:h-[500px] md:w-[500px]
          rounded-full blur-3xl
          ${theme === "dark" ? "bg-orange-500/20" : "bg-orange-300/30"}
        `}
      />

      <div
        className={`
          absolute right-[-5%] top-[20%]
          h-[250px] w-[250px] md:h-[400px] md:w-[400px]
          rounded-full blur-3xl
          ${theme === "dark" ? "bg-amber-400/10" : "bg-yellow-300/30"}
        `}
      />

      <div
        className={`
          absolute bottom-[-20%] left-[30%]
          h-[300px] w-[300px] md:h-[500px] md:w-[500px]
          rounded-full blur-3xl
          ${theme === "dark" ? "bg-orange-700/10" : "bg-orange-200/40"}
        `}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,180,80,0.15),transparent_35%)]" />
    </div>
  );
}