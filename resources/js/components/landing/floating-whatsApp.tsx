export default function FloatingWhatsApp() {
  return (
    <a
      href="#"
      className="
        fixed bottom-24 right-4 z-50 flex items-center gap-3 rounded-full
        bg-green-500 px-4 py-3 text-white shadow-2xl shadow-green-500/30
        transition-all duration-300 hover:scale-105 md:bottom-6 md:right-6 md:px-5 md:py-4
      "
    >
      <div className="text-xl">💬</div>

      <div className="hidden sm:block">
        <p className="text-xs opacity-80">Need help?</p>
        <p className="text-sm font-semibold">Chat WhatsApp</p>
      </div>
    </a>
  );
}