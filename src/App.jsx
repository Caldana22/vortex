import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import {gameData} from "./data/games";
import "./App.css";
import { GameCard } from "./components/GameCard";

function App() {
  return (
    <div className="vortex-app">
      <Sidebar />

      <main className="vortex-main">
        <Header />
        <div className="vortex-content">
          <h2 className="section-title">Jogos Recentes</h2>
          <div className="vortex-grid">
            {gameData.map((g) => (
            <GameCard
            key={g.id}
            title={g.title}
            category={g.category}
            imagem={g.imagem}
            />

            ))}
          </div>
        </div>
        
      </main>
    </div>
  );
}
export default App;
