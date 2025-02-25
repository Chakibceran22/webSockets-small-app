import { Check } from "lucide-react";

const MessaginContainer = ({ messages, darkMode, isTyping, messagesEndRef, username }) => {
  return (
    <div className={`flex-1 overflow-y-auto p-3 space-y-3 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {messages.map((message) => {
        const isSelf = message.sender === username;
        return (
          <div 
            key={message.id} 
            className={`flex ${isSelf ? "justify-end" : "justify-start"}`}
          >
            {/* If message is from another user, display their avatar */}
            {!isSelf && (
              <div className="h-8 w-8 rounded-full overflow-hidden mr-2 mt-1 flex-shrink-0">
                <img 
                  src={message.avatar || "/default-avatar.png"} 
                  alt="Avatar" 
                  className="h-full w-full object-cover" 
                />
              </div>
            )}
            <div 
              className={`max-w-xs rounded-2xl px-3 py-2 ${
                isSelf 
                  ? darkMode 
                    ? "bg-purple-800 text-white rounded-br-none" 
                    : "bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-none" 
                  : darkMode 
                    ? "bg-gray-800 text-white rounded-bl-none"
                    : "bg-white shadow-sm text-gray-800 rounded-bl-none"
              }`}
            >
              <p className="break-words text-sm">{message.text}</p>
              <div className="flex justify-end items-center mt-1 space-x-1">
                <p className={`text-xs ${isSelf ? "text-blue-100" : darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  {message.time}
                </p>
                {isSelf && (
                  <span className="text-xs">
                    {message.read ? (
                      <Check size={14} className="text-blue-300" />
                    ) : (
                      <Check size={14} className="text-gray-400" />
                    )}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {isTyping && (
        <div className="flex justify-start">
          <div className="h-8 w-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
            <img 
              src="/api/placeholder/40/40" 
              alt="Avatar" 
              className="h-full w-full object-cover" 
            />
          </div>
          <div className={`p-3 rounded-2xl rounded-bl-none ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex space-x-1">
              <div 
                className={`w-2 h-2 rounded-full ${darkMode ? 'bg-gray-400' : 'bg-gray-500'} animate-bounce`} 
                style={{ animationDelay: '0ms' }}
              ></div>
              <div 
                className={`w-2 h-2 rounded-full ${darkMode ? 'bg-gray-400' : 'bg-gray-500'} animate-bounce`} 
                style={{ animationDelay: '200ms' }}
              ></div>
              <div 
                className={`w-2 h-2 rounded-full ${darkMode ? 'bg-gray-400' : 'bg-gray-500'} animate-bounce`} 
                style={{ animationDelay: '400ms' }}
              ></div>
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessaginContainer;
