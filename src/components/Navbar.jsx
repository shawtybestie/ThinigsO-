import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ user }) {
  // Доступные темы: lofi, dark, light
  const [theme, setTheme] = useState(localStorage.getItem("site_theme") || "lofi");

  useEffect(() => {
    // Удаляем старые классы тем с тега body
    document.body.classList.remove("theme-lofi", "theme-dark", "theme-light");
    // Добавляем текущую тему
    document.body.classList.add(`theme-${theme}`);
    // Сохраняем выбор в память устройства
    localStorage.setItem("site_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    if (theme === "lofi") setTheme("dark");
    else if (theme === "dark") setTheme("light");
    else setTheme("lofi");
  };

  return (
    <header className="bg-black border-b border-neutral-800 relative w-full select-none">
      <div className="w-full px-8 py-5 flex items-center justify-between">

        {/* Left */}
        <div className="flex items-center gap-6">
          <Link
            to={user ? "/app" : "/"}
            className="text-white text-lg hover:text-neutral-300 transition font-medium"
          >
            Мысль дня
          </Link>

          {user?.is_admin && (
            <Link
              to="/admin"
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-md"
            >
              Панель управления (CRUD)
            </Link>
          )}
        </div>

        {/* Center */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link to="/">
            <h1 className="text-3xl font-bold text-white tracking-wide hover:text-neutral-300 transition cursor-pointer">
              Мысли.Онлайн
            </h1>
          </Link>
        </div>

        {/* Right */}
        <div className="flex items-center gap-5">
          {/* Дипломный элемент: Кнопка переключения тем */}
          <button
            onClick={toggleTheme}
            className="border border-neutral-700 hover:border-neutral-500 text-white text-xs font-bold px-3 py-2 rounded-xl transition cursor-pointer bg-neutral-900"
            title="Сменить тему оформления"
          >
            {theme === "lofi" && "🎨 Lofi Фронт"}
            {theme === "dark" && "🌙 Ночь"}
            {theme === "light" && "☀️ День"}
          </button>

          <Link
            to="/rooms"
            className="text-white hover:text-neutral-300 transition font-medium text-sm"
          >
            Авторские комнаты
          </Link>

          {user && (
            <Link
              to="/profile"
              className="bg-white text-black px-4 py-2 rounded-xl hover:bg-neutral-200 transition font-bold text-sm"
            >
              @{user.username}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
