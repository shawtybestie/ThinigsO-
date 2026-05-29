import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Home({ user }) {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [thought, setThought] = useState("«Чем тише пространство — тем громче мысль.»"); // Дефолтное значение

  const fetchData = async () => {
    setLoading(true);
    
    // 1. Загрузка постов
    const { data: postsData } = await supabase
      .from("global_posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (postsData) setPosts(postsData);

    // 2. Загрузка живой фразы дня из Supabase
    const { data: thoughtData } = await supabase
      .from("daily_thought")
      .select("text")
      .eq("id", 1)
      .single();
    if (thoughtData) setThought(thoughtData.text);

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createPost = async () => {
    if (!content.trim()) return;

    const { error } = await supabase.from("global_posts").insert([
      { user_id: user.id, username: user.username, content: content.trim() },
    ]);

    if (!error) {
      setContent("");
      fetchData();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      createPost();
    }
  };

  return (
    <div className="min-h-screen text-white px-8 py-10 overflow-x-hidden">
      <div className="w-full"> 
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* ФОРМА СЛЕВА */}
          <div className="w-full lg:w-80 shrink-0 lg:sticky lg:top-6">
            <div className="bg-white text-black rounded-3xl p-5 border border-neutral-200 flex flex-col w-full">
              <h3 className="font-bold mb-3 text-lg tracking-tight">Новая мысль</h3>
              <div className="border border-neutral-200 rounded-2xl p-3 focus-within:border-neutral-400 transition bg-neutral-50">
                <textarea
                  placeholder="Поделитесь мыслью..."
                  className="w-full text-black min-h-[100px] resize-none outline-none text-base border-0 p-0 m-0 bg-transparent block"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div className="flex justify-start mt-4">
                <button onClick={createPost} className="bg-black hover:bg-neutral-800 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition cursor-pointer shadow-sm block w-full text-center">
                  Опубликовать
                </button>
              </div>
            </div>
          </div>

          {/* ЛЕНТА СПРАВА */}
          <div className="flex-1 min-w-0 w-full space-y-6">
            {/* Текст Фразы дня теперь выводится из стейта thought */}
            <div className="bg-white text-black rounded-3xl p-8 w-full border border-neutral-200">
              <p className="uppercase tracking-widest text-xs text-neutral-400 font-semibold mb-2">
                Мысль дня
              </p>
              <h2 className="text-3xl font-bold leading-tight md:text-4xl">
                {thought}
              </h2>
              <p className="mt-3 text-neutral-600 text-sm">
                Платформа для идей, наблюдений и диалогов.
              </p>
            </div>

            <div className="space-y-4 w-full">
              {loading ? (
                <div className="text-neutral-400 text-center py-10">Синхронизация...</div>
              ) : posts.length === 0 ? (
                <div className="bg-white/10 backdrop-blur-md border border-neutral-800 rounded-3xl p-10 text-center text-neutral-400">
                  Лента пуста.
                </div>
              ) : (
                posts.map((post) => (
                  <div key={post.id} className="bg-white text-black rounded-3xl p-6 border border-neutral-100 min-w-0">
                    <div className="flex justify-between items-center mb-3 gap-4">
                      <h3 className="font-bold text-black truncate">@{post.username}</h3>
                      <span className="text-xs text-neutral-400 shrink-0">{new Date(post.created_at).toLocaleString()}</span>
                    </div>
                    <p className="text-neutral-800 text-base whitespace-pre-wrap break-words min-w-0 [word-break:break-word] leading-relaxed">{post.content}</p>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
