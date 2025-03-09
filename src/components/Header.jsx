import { NavLink } from "react-router-dom";
function Header() {
  return (
    <div className=" bg-[#141c4d] shadow-sm h-20 fixed top-0 left-0 right-0 z-50 flex items-center">
      <div className="container mx-auto flex items-center justify-between">
        <NavLink to="/">
          <h1 className="text-white text-2xl font-bold">Futbol yangiliklari</h1>
        </NavLink>
      </div>
    </div>
  );
}

export default Header;
