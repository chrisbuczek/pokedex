import { BrowserRouter, Routes, Route } from "react-router";
import { NotFound, PokemonDetails, PokemonList } from "./pages";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="pokemon">
          <Route path=":idOrName" element={<PokemonDetails />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
