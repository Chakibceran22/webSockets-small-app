import { Paperclip, Send, Smile } from "lucide-react"

const MessageInput = ({darkMode, isMobileView, newMessage,setNewMessage,setShowEmoji,showEmoji, handleKeyPress, handleSendMessage}) => {
    return(
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t p-3`}>
    <div className="flex items-center">
      <button 
        className={`p-2 rounded-full transition ${darkMode ? 'text-gray-400 hover:bg-gray-700 hover:text-gray-200' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
        onClick={() => setShowEmoji(!showEmoji)}
      >
        <Smile size={isMobileView ? 20 : 24} />
      </button>
      {!isMobileView && (
        <button className={`p-2 rounded-full transition ${darkMode ? 'text-gray-400 hover:bg-gray-700 hover:text-gray-200' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}>
          <Paperclip size={24} />
        </button>
      )}
      <div className={`flex-1 mx-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-full px-3 py-2 focus-within:ring-2 ${darkMode ? 'focus-within:ring-purple-500' : 'focus-within:ring-blue-500'}`}>
        <textarea
          className={`w-full bg-transparent border-0 focus:outline-none resize-none text-sm ${darkMode ? 'placeholder-gray-400' : 'placeholder-gray-500'}`}
          placeholder="Type a message..."
          rows="1"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>
      <button 
        className={`${darkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'} text-white rounded-full p-2 transition focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-purple-500' : 'focus:ring-blue-500'}`}
        onClick={handleSendMessage}
      >
        <Send size={isMobileView ? 18 : 20} />
      </button>
    </div>
  </div>
    )
    
}
export default MessageInput;