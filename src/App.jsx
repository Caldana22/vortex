import { useState, useEffect } from "react"; //Importei o useEffect
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { gamesData } from "./data/games";
import { GameCard } from "./components/GameCard";
import AOS from 'aos'; //importei o AOS
import "aos/dist/aos.css"; //Importei o css da biblioteca css
import "./App.css";

function App() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState("dash");
  const [favorites, setFavorites] = useState([]);

  const filteredGames = gamesData
  .filter((game) => activeTab === "dash" || favorites.includes(game.id))//inclui o id no favorites
  .filter((game) => game.title.toLowerCase().includes(search.toLowerCase()));

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
              />
            ))
           ) : (
            <p style={{color: "#94a3b8"}}>Nenhum jogo encontrado...</p>
           )}
            
          </div>
        </div>
      </main>
    </div>
  );
}
export default App;
