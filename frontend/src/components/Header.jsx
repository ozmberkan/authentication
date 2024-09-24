import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { tabLinks } from "../data/data";

const Header = () => {
  const { user } = useSelector((store) => store.user);

  const signOut = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };
  return (
    <div className="w-full py-4 border-b border flex justify-between items-center px-6">
      <div className="flex items-center gap-x-4">
        {user && (
          <Link
            className="bg-white border hover:ring-2 ring-black transition-all duration-500 font-semibold py-1 rounded-md px-4"
            to="/"
          >
            Anasayfa
          </Link>
        )}
        {tabLinks.map((link) => (
          <Link
            key={link.id}
            className="bg-white border hover:ring-2 ring-black transition-all duration-500 font-semibold py-1 rounded-md px-4"
            to={link.to}
          >
            {link.label}
          </Link>
        ))}
      </div>
      {user && (
        <button
          onClick={signOut}
          className="bg-red-100 rounded-md font-semibold text-red-500 px-4 py-1"
        >
          Çıkış Yap
        </button>
      )}
    </div>
  );
};

export default Header;
