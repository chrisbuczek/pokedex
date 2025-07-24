import { BrowserRouter, Routes, Route } from "react-router";
import { NotFound, PokemonDetails, PokemonList } from "./pages";
import "./App.css";
import { Navbar } from "./components";

function App() {
  return (
    <main>
      <BrowserRouter>
        <Navbar />
        <div className="h-[80px]"></div>
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
