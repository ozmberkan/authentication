import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const { user } = useSelector((store) => store.user);

  const signOut = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };
  return (
    <div className="w-full py-4 border-b border flex justify-between items-center px-6">
      <div className="flex items-center gap-x-4">
        <Link
          className="bg-yellow-100 text-yellow-500 font-semibold py-1 rounded-md px-4"
          to="/"
        >
          Anasayfa
        </Link>
        <Link
          className="bg-yellow-100 text-yellow-500 font-semibold py-1 rounded-md px-4"
          to="/register"
        >
          Kayıt Ol
        </Link>
        <Link
          className="bg-yellow-100 text-yellow-500 font-semibold py-1 rounded-md px-4"
          to="/login"
        >
          Giriş Yap
        </Link>
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
