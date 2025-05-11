function Navbar({ children }) {
  return (
    <>
      <nav className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <a href="main.html" className="flex items-center space-x-2">
              <img
                className="h-8 w-auto"
                src="./main_work/WongNok_Logo.png"
                alt="WongNok Logo"
              />
              <h3 className="text-2xl font-bold">WongNok</h3>
            </a>
            <div className="flex-1 mx-6 hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for restaurants, menu items, etc."
                  className="w-full border border-gray-200 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 103 10.5a7.5 7.5 0 0013.65 6.15z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-700 hover:text-orange-500 text-sm font-medium">
                Restaurants
              </a>
              <a href="#" className="text-gray-700 hover:text-orange-500 text-sm font-medium">
                Profile
              </a>
              <a
                href="login.html"
                className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded-full transition-colors"
              >
                Log In
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* ✅ ต้องใส่ children ตรงนี้ */}
      <div className="p-8">
        {children}
      </div>
    </>
  );
}

export default Navbar;
