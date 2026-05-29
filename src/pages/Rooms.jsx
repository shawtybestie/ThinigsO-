import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Rooms({ user }) {
  const [rooms, setRooms] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [hasRoom, setHasRoom] = useState(false);

  useEffect(() => {
    const savedRooms = JSON.parse(localStorage.getItem("forum_rooms")) || [];
    setRooms(savedRooms);

    const myRoom = savedRooms.find((room) => room.userId === user.id);
    if (myRoom) {
      setHasRoom(true);
    }
  }, [user.id]);

  const createRoom = () => {
    if (!title.trim()) return;

    const newRoom = {
      id: crypto.randomUUID(),
      userId: user.id,
      username: user.username,
      title,
      description,
      created_at: new Date(),
    };

    const updatedRooms = [newRoom, ...rooms];
    setRooms(updatedRooms);
    localStorage.setItem("forum_rooms", JSON.stringify(updatedRooms));
    setHasRoom(true);
    setTitle("");
    setDescription("");
  };

  // Перехват нажатия в описании комнаты
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      createRoom();
    }
  };

  return (
    <div className="min-h-screen text-white px-8 py-10 overflow-x-hidden">
      <div className="w-full">

        <h1 className="text-5xl font-bold mb-10 tracking-tight">
          Авторские комнаты
        </h1>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          <div className="w-full lg:w-80 shrink-0 lg:sticky lg:top-6">
            {!hasRoom ? (
              <div className="bg-white text-black rounded-3xl p-5 border border-neutral-200 flex flex-col w-full">
                <h2 className="text-xl font-bold mb-4 tracking-tight">
                  Создать комнату
                </h2>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Название комнаты"
                    className="w-full border border-neutral-200 rounded-xl p-3 text-black text-sm outline-none focus:border-neutral-400 transition bg-neutral-50"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <textarea
                    placeholder="Описание... (Enter для отправки)"
                    className="w-full border border-neutral-200 rounded-xl p-3 min-h-[90px] text-black text-sm resize-none outline-none focus:border-neutral-400 transition bg-neutral-50"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onKeyDown={handleKeyDown} // Добавили логику отправки
                  />
                </div>
                <div className="flex justify-start mt-4">
                  <button
                    onClick={createRoom}
                    className="bg-black hover:bg-neutral-800 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition cursor-pointer w-full text-center shadow-sm"
                  >
                    Создать комнату
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-5 text-neutral-400 text-sm text-center w-full">
                Вы уже создали свою авторскую комнату. Можно иметь только одно пространство.
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className="bg-white text-black rounded-3xl p-6 border border-neutral-100 flex flex-col justify-between min-w-0"
                >
                  <div className="min-w-0">
                    <h3 className="text-2xl font-bold mb-2 tracking-tight truncate">
                      {room.title}
                    </h3>
                    <p className="text-neutral-600 mb-6 text-sm break-words line-clamp-3">
                      {room.description}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-neutral-100 gap-4">
                    <span className="text-xs font-semibold text-neutral-400 truncate">
                      @{room.username}
                    </span>
                    <Link
                      to={`/rooms/${room.id}`}
                      className="bg-black text-white px-5 py-2 rounded-xl hover:bg-neutral-800 transition text-xs font-bold shrink-0 shadow-sm"
                    >
                      Войти
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
