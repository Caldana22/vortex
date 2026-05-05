import { useState, useEffect } from "react"; //Importei o useEffect
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { gamesData } from "./data/games";
import { GameCard } from "./components/GameCard";
import { GameModal } from "./components/GameModal"; //Importa o componente gamemodal
import AOS from 'aos'; //importei o AOS
import "aos/dist/aos.css"; //Importei o css da biblioteca css
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("dash");
  const [favorites, setFavorites] = useState([]);

  //2. Estado para o modal (null significa modal fechado)
  const [selectedGame, setSelectedGame] = useState(null);

  const filteredGames = gamesData
  .filter((g) => activeTab === "dash" || favorites.includes(g.id))//inclui o id no favorites
  .filter((g) => g.title.toLowerCase().includes(search.toLowerCase()));

  const toggleFavorite = (id) => {
    setFavorites((prev) => prev.includes(id) ? prev.filter((favId) => favId != id) : [...prev, id]
    );
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once:false,
      easing: "zoom-out-up",
    })
  },[]);

  return (
    <div className="vortex-app">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="vortex-main">

        <Header search = {search} setSearch={setSearch} />

        <div className="vortex-content">

          <h2 className="section-title">
            {activeTab === "dash" && "Dashboard"}
            {activeTab === "favorites" && "Favoritos"}
            {activeTab === "profile" && "Perfil"}
          </h2>

          <div className="vortex-grid">

           {filteredGames.length > 0 ? (
            filteredGames.map((g, index) => (//passei o index como parametro
               <GameCard
                key={g.id}
                title={g.title}
                category={g.category}
                banner={g.banner}
                index={index} //coloco o index dentro do card
                isFavorite = {favorites.includes(g.id)}
                onFavorite = {() => toggleFavorite(g.id)}

                //Dispara o modal dentro do card selecionado
                onPlay={() => setSelectedGame(g)}
              />
            ))
           ) : (
            <p style={{color: "#94a3b8"}}>Nenhum jogo encontrado...</p>
           )}
            
          </div>
        </div>
      </main>

      {/* Renderização condicional do modal */}
      <GameModal game={selectedGame} onClose={() => setSelectedGame(null)} />
    </div>
  );
}
export default App;
