import { Link } from "wouter";
import { useEffect, useState } from "react";
import { initDropdowns } from "flowbite";
import { useAuth } from "../auth/useAuth";
import LogoutButton from "../views/LogoutView";
import { useCart } from "../context/cart/useCart";

function Navbar() {
  const { user } = useAuth();
  const { cartItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const totalCartItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  useEffect(() => {
    initDropdowns();
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setProfileDropdownOpen(false);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  return (
    <nav className="bg-transparent border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between relative">
        <Link to="/" className="flex items-center z-10">
          <img src="/images/logo.png" className="h-8" alt="Logo" />
        </Link>

        <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2">
          <ul className="flex space-x-8">
            <li>
              <Link to="/" className="nav-link hover:text-red-600">
                Home
              </Link>
            </li>
            <li>
              <Link to="/shop" className="nav-link hover:text-red-600">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/aboutus" className="nav-link hover:text-red-600">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contactus" className="nav-link hover:text-red-600">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex items-center space-x-6">
          <Link
            to="/cart"
            className="relative p-1 hover:text-red-600 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                d="M3 3h2l.4 2M7 13h10l4-8H5.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
            </svg>
            {totalCartItems > 0 && (
              <div className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full">
                {totalCartItems}
              </div>
            )}
          </Link>

          <div className="relative">
            <button
              onClick={toggleProfileDropdown}
              className="p-1 hover:text-red-600 transition-colors focus:outline-none"
              type="button"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.121 17.804A8.966 8.966 0 0112 15c2.485 0 4.735.994 6.379 2.621M15 10a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>

            {profileDropdownOpen && (
              <div className="z-50 absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 dark:bg-gray-700 border border-gray-100 dark:border-gray-600">
                <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-600">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {user ? user.name : "Guest"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user ? user.email : "Not signed in"}
                  </p>
                </div>
                <ul>
                  {!user ? (
                    <>
                      <li>
                        <Link
                          to="/login"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
                          onClick={() => setProfileDropdownOpen(false)}
                        >
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/register"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
                          onClick={() => setProfileDropdownOpen(false)}
                        >
                          Register
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex flex-col items-center">
                        <Link
                          to="/orders"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 w-full text-center"
                          onClick={() => setProfileDropdownOpen(false)}
                        >
                          My Orders
                        </Link>
                      </li>
                      <li className="flex flex-col items-center cursor-pointer">
                        <LogoutButton
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
                          onClick={() => setProfileDropdownOpen(false)}
                        >
                          Logout
                        </LogoutButton>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            )}
          </div>

          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-1 text-gray-500 hover:text-red-600 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 bg-white dark:bg-gray-800 lg:hidden flex flex-col items-center justify-center">
            <button
              onClick={toggleMobileMenu}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:text-red-600"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <ul className="flex flex-col items-center space-y-8 text-center">
              <li>
                <Link
                  to="/"
                  className="text-2xl font-medium hover:text-red-600"
                  onClick={toggleMobileMenu}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="text-2xl font-medium hover:text-red-600"
                  onClick={toggleMobileMenu}
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  to="/aboutus"
                  className="text-2xl font-medium hover:text-red-600"
                  onClick={toggleMobileMenu}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contactus"
                  className="text-2xl font-medium hover:text-red-600"
                  onClick={toggleMobileMenu}
                >
                  Contact Us
                </Link>
              </li>

              <li className="pt-8 border-t border-gray-200 dark:border-gray-700 mt-8">
                {user ? (
                  <div className="flex flex-col items-center space-y-6">
                    <Link
                      to="/orders"
                      className="text-xl font-medium hover:text-red-600"
                      onClick={toggleMobileMenu}
                    >
                      My Orders
                    </Link>
                    <LogoutButton
                      className="text-xl font-medium hover:text-red-600"
                      onClick={toggleMobileMenu}
                    >
                      Logout
                    </LogoutButton>
                  </div>
                ) : (
                  <div className="flex flex-col items-center space-y-6">
                    <Link
                      to="/login"
                      className="text-xl font-medium hover:text-red-600"
                      onClick={toggleMobileMenu}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="text-xl font-medium hover:text-red-600"
                      onClick={toggleMobileMenu}
                    >
                      Register
                    </Link>
                  </div>
                )}
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
