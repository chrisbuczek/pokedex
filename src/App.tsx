import { BrowserRouter, Routes, Route } from "react-router";
import { NotFound, PokemonDetails, PokemonList } from "./pages";
import "./App.css";

function App() {
  return (
    <main>
      <nav className="w-full p-2 flex justify-center items-center text-[2rem]">
        Pokedex
      </nav>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="pokemon">
            <Route path=":idOrName" element={<PokemonDetails />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
