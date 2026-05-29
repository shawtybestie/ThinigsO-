import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function RoomPage({ user }) {
  const { id } = useParams();

  const [room, setRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const rooms = JSON.parse(localStorage.getItem("forum_rooms")) || [];
    const found = rooms.find((r) => r.id === id);
    setRoom(found);

    const allMessages = JSON.parse(localStorage.getItem("forum_messages")) || {};
    setMessages(allMessages[id] || []);
  }, [id]);

  const sendMessage = () => {
    if (!text.trim()) return;

    const newMsg = {
      id: crypto.randomUUID(),
      username: user.username,
      text,
      created_at: new Date(),
    };

    const updated = [...messages, newMsg];
    setMessages(updated);

    const allMessages = JSON.parse(localStorage.getItem("forum_messages")) || {};
    allMessages[id] = updated;
    localStorage.setItem("forum_messages", JSON.stringify(allMessages));

    setText("");
  };

  // Перехват нажатия в чате комнаты
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!room) {
    return (
      <div className="text-white p-10 text-center text-xl min-h-screen flex items-center justify-center">
        Комната не найдена
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white px-8 py-10 overflow-x-hidden">
      <div className="w-full flex flex-col lg:flex-row gap-8 items-start">

        <div className="w-full lg:w-96 shrink-0 lg:sticky lg:top-6 space-y-6">
          <div className="bg-white text-black rounded-3xl p-6 border border-neutral-200 w-full">
            <h1 className="text-3xl font-bold mb-3 tracking-tight break-words">
              {room.title}
            </h1>
            <p className="text-neutral-600 text-sm break-words leading-relaxed">
              {room.description}
            </p>
            <div className="mt-4 pt-4 border-t border-neutral-100 text-xs text-neutral-400 font-medium">
              Владелец: @{room.username}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-neutral-200 flex flex-col w-full">
            <div className="border border-neutral-200 rounded-2xl p-3 focus-within:border-neutral-400 transition bg-neutral-50">
              <textarea
                className="w-full text-black min-h-[90px] resize-none outline-none text-base border-0 p-0 m-0 bg-transparent block"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Напишите сообщение... (Enter для отправки)"
                onKeyDown={handleKeyDown} // Добавили логику отправки
              />
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={sendMessage}
                className="bg-black hover:bg-neutral-800 text-white px-6 py-2 rounded-xl font-medium text-sm transition cursor-pointer shadow-sm w-full text-center block"
              >
                Отправить
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 min-w-0 w-full space-y-4">
          {messages.length === 0 ? (
            <div className="bg-neutral-950 border border-neutral-950 rounded-3xl p-10 text-center text-neutral-500">
              Здесь пока пусто. Будьте первым, кто начнет диалог!
            </div>
          ) : (
            messages.map((m) => (
              <div
                key={m.id}
                className="bg-white text-black rounded-3xl p-6 border border-neutral-100 min-w-0"
              >
                <div className="flex justify-between items-center mb-3 gap-4">
                  <span className="font-bold text-black truncate">
                    @{m.username}
                  </span>
                  <span className="text-xs text-neutral-400 shrink-0">
                    {new Date(m.created_at).toLocaleString()}
                  </span>
                </div>
                <p className="text-neutral-800 text-base whitespace-pre-wrap break-words min-w-0 [word-break:break-word] leading-relaxed">
                  {m.text}
                </p>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
