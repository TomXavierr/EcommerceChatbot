import { Link } from "react-router-dom";
import { headerLogo } from "../assets/images";
import { hamburger } from "../assets/icons";
import { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';

const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logoutUser } = useContext(AuthContext);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className="padding-x py-6 absolute z-10 w-full bg-white shadow-md">
      <nav className="flex justify-between items-center max-container relative">
        <Link to="/">
          <img src={headerLogo} alt="Logo" width={130} height={29} />
        </Link>

        <ul className="flex-1 flex justify-center items-center gap-12 max-lg:hidden">
          <li>
            <Link
              to="/"
              className="font-montserrat text-lg text-slate-gray hover:text-black"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/store"
              className="font-montserrat text-lg text-slate-gray hover:text-black"
            >
              Store
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              className="font-montserrat text-lg text-slate-gray hover:text-black"
            >
              Cart
            </Link>
          </li>
          <li>
            <Link
              to="/orders"
              className="font-montserrat text-lg text-slate-gray hover:text-black"
            >
              Orders
            </Link>
          </li>
          {!user ? (
            <li><Link to="/login" className="font-montserrat text-lg text-slate-gray hover:text-black">Login</Link></li>
          ) : (
            <li>
              <button onClick={logoutUser} className="font-montserrat text-lg text-red-500 hover:text-red-700">
                Logout
              </button>
            </li>
          )}
        </ul>

        <div
          className="hidden max-lg:block cursor-pointer"
          onClick={toggleMobileMenu}
        >
          <img src={hamburger} alt="Menu" width={25} height={25} />
        </div>

        {isMobileMenuOpen && (
          <div className="absolute top-full right-0 bg-white shadow-md w-full flex flex-col items-center gap-4 py-6 lg:hidden z-50">
            <Link
              to="/"
              onClick={toggleMobileMenu}
              className="text-lg text-slate-gray hover:text-black"
            >
              Home
            </Link>
            <Link
              to="/store"
              onClick={toggleMobileMenu}
              className="text-lg text-slate-gray hover:text-black"
            >
              Store
            </Link>
            <Link
              to="/cart"
              onClick={toggleMobileMenu}
              className="text-lg text-slate-gray hover:text-black"
            >
              Cart
            </Link>
            <Link
              to="/orders"
              onClick={toggleMobileMenu}
              className="text-lg text-slate-gray hover:text-black"
            >
              Orders
            </Link>
            <Link
              to="/login"
              onClick={toggleMobileMenu}
              className="text-lg text-slate-gray hover:text-black"
            >
              Login
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Nav;
