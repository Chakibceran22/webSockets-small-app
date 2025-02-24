import { Phone, Video, Paperclip } from 'react-feather';

const MobileHeader = ({isMobileView, showMobileMenu, darkMode}) => {
    return (
        
        isMobileView && showMobileMenu ? (
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-3 shadow-md flex justify-around`}>
              <button className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'} transition flex flex-col items-center`}>
                <Phone size={20} />
                <span className="text-xs mt-1">Call</span>
              </button>
              <button className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'} transition flex flex-col items-center`}>
                <Video size={20} />
                <span className="text-xs mt-1">Video</span>
              </button>
              <button className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'} transition flex flex-col items-center`}>
                <Paperclip size={20} />
                <span className="text-xs mt-1">Files</span>
              </button>
            </div>
          ): null
    )
}