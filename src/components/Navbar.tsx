import Search from "./Search";

export const Navbar = () => {
  return (
    <nav className="w-full p-2 bg-white flex flex-col md:flex-row justify-between items-center text-[2rem] border-b-1 fixed z-10">
      <div className="w-[200px]"></div>
      <div>Pokedex</div>
      <Search />
    </nav>
  );
};
