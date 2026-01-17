import "./index.css";
import "./App.css";
import { US } from "country-flag-icons/react/3x2";

function Nav() {
  return (
    <>
      <div>
        <nav className="w-screen bg-gradient-to-r from-rose-950 via-red-700 to-red-500 text-white">
          <div className="flex h-16 items-center justify-between px-6">
            {/* Logo */}
            <svg
              className="w-6 h-6 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 6h8M6 10h12M8 14h8M6 18h12"
              />
            </svg>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6 items-center">
              <a href="/" className="pr-3 hover:opacity-80">
                <US className="w-6 h-4" />
              </a>

              <a href="/" className="hover:opacity-80">
                <svg
                  className="w-[29px] h-[29px] text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.4"
                    d="M8 4H4m0 0v4m0-4 5 5m7-5h4m0 0v4m0-4-5 5M8 20H4m0 0v-4m0 4 5-5m7 5h4m0 0v-4m0 4-5-5"
                  />
                </svg>
              </a>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Nav;
