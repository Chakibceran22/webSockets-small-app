import { ArrowLeft, Phone ,Video, Moon, Sun, Menu } from "lucide-react"


const Header = ({darkMode, setDarkMode, isMobileView, toggleMobileMenu, showMobileMenu}) => {
    return(
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-blue-500 to-purple-600'} text-white p-3 shadow-md flex items-center justify-between`}>
          {isMobileView ? (
            <>
              <div className="flex items-center">
                <button 
                  className={`p-2 mr-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-opacity-30 hover:bg-blue-400'} transition`}
                  onClick={toggleMobileMenu}
                >
                  {showMobileMenu ? <ArrowLeft size={20} /> : <Menu size={20} />}
                </button>
                <div className="flex items-center">
                  <div className="relative">
                    <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center mr-2 overflow-hidden">
                      <img src="/api/placeholder/40/40" alt="Avatar" className="h-full w-full object-cover" />
                      <div className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 border-2 border-white"></div>
                    </div>
                  </div>
                  <div>
                    <h1 className="font-bold text-sm">Chakib Grb</h1>
                    <p className="text-xs opacity-80">Online</p>
                  </div>
                </div>
              </div>
              <div className="flex">
                <button 
                  className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-opacity-30 hover:bg-blue-400'} transition`}
                  onClick={() => setDarkMode(!darkMode)}
                >
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center">
                <div className="relative">
                  <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center mr-3 overflow-hidden">
                    <img src="/api/placeholder/48/48" alt="Avatar" className="h-full w-full object-cover" />
                    <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
                  </div>
                </div>
                <div>
                  <h1 className="font-bold text-lg">Alex Johnson</h1>
                  <p className="text-xs opacity-80">Online • Last seen just now</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-opacity-30 hover:bg-blue-400'} transition`}>
                  <Phone size={20} />
                </button>
                <button className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-opacity-30 hover:bg-blue-400'} transition`}>
                  <Video size={20} />
                </button>
                <button 
                  className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-opacity-30 hover:bg-blue-400'} transition`}
                  onClick={() => setDarkMode(!darkMode)}
                >
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>
            </>
          )}
        </div>)
}
export default Header