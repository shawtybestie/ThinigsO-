import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center px-6">
      
      {/* Стеклянный полупрозрачный блок, чтобы на фоне Lofi.jpg текст читался идеально */}
      <div className="bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-3xl p-8 max-w-xl w-full text-center shadow-2xl flex flex-col items-center">
        
        <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight text-white block">
          Мысли.Онлайн
        </h1>

        <p className="text-neutral-300 text-base md:text-lg leading-relaxed mb-10 max-w-md block">
          Форум без лайков, рейтингов и алгоритмов.
          Только мысли и диалог между пользователями.
        </p>

        <div className="flex gap-4 w-full justify-center">
          <button
            onClick={() => navigate("/auth")}
            className="bg-white hover:bg-neutral-200 text-black px-6 py-3 rounded-xl font-bold text-sm transition cursor-pointer shadow-md w-full sm:w-auto block"
          >
            Войти
          </button>

          <button
            onClick={() => navigate("/app")}
            className="border border-white/30 hover:border-white text-white px-6 py-3 rounded-xl font-bold text-sm transition cursor-pointer bg-white/5 w-full sm:w-auto block"
          >
            Войти в форум
          </button>
        </div>

      </div>

    </div>
  );
}
