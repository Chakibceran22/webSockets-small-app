import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  Video, 
  Sun, 
  Moon, 
  Send, 
  Paperclip, 
  Smile, 
  Check,
  Menu,
  ArrowLeft
} from 'lucide-react';
import Header from './Header';

const MessagingApp = () => {
  const messagesEndRef = useRef(null);
  const [darkMode, setDarkMode] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey there! How are you doing today?", sender: "other", time: "10:30 AM", read: true, avatar: "/api/placeholder/40/40" },
    { id: 2, text: "I'm good, thanks! Just working on some new projects.", sender: "self", time: "10:32 AM", read: true },
    { id: 3, text: "That sounds interesting! What kind of projects?", sender: "other", time: "10:33 AM", read: true, avatar: "/api/placeholder/40/40" },
    { id: 4, text: "Building a new messaging app interface with React and Tailwind!", sender: "self", time: "10:35 AM", read: true },
    { id: 5, text: "Wow, that's exactly what we're looking at right now. Meta!", sender: "other", time: "10:36 AM", read: true, avatar: "/api/placeholder/40/40" },
  ]);
  
  const [newMessage, setNewMessage] = useState("");

  const emojis = ["😊", "😂", "❤️", "👍", "🎉", "🔥", "✨", "🙌", "😍", "🤔"];
  
  // Check for mobile view on initial load and window resize
  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobileView();
    
    // Add resize listener
    window.addEventListener('resize', checkMobileView);
    
    // Clean up
    return () => window.removeEventListener('resize', checkMobileView);
  }, []);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].sender === "self") {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setIsTyping(false);
        const responses = [
          "That's interesting! Tell me more.",
          "Cool! What else is on your mind?",
          "Nice! How's your day going?",
          "Sounds good! Anything else?",
          "Awesome! What are your plans for later?",
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        setMessages([...messages, {
          id: messages.length + 1,
          text: randomResponse,
          sender: "other",
          time: timeString,
          read: true,
          avatar: "/api/placeholder/40/40"
        }]);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const newMsg = {
      id: messages.length + 1,
      text: newMessage,
      sender: "self",
      time: timeString,
      read: false
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage("");
    setShowEmoji(false);
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const addEmoji = (emoji) => {
    setNewMessage(newMessage + emoji);
  };
  
  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };
  
  return (
    <div className="absolute inset-0 flex flex-col w-full h-full overflow-hidden" style={{ height: '100vh', width: '100vw' }}>
      <div className={`flex flex-col h-full w-full ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} isMobileView={isMobileView} toggleMobileMenu={toggleMobileMenu} showMobileMenu={showMobileMenu} />
        
        
        
        {/* Date Indicator */}
        <div className="flex justify-center my-2">
          <span className={`text-xs px-3 py-1 rounded-full ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>
            Today
          </span>
        </div>
        
        {/* Messages Container */}
        <div className={`flex-1 overflow-y-auto p-3 space-y-3 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === "self" ? "justify-end" : "justify-start"}`}
            >
              {message.sender === "other" && (
                <div className="h-8 w-8 rounded-full overflow-hidden mr-2 mt-1 flex-shrink-0">
                  <img src={message.avatar} alt="Avatar" className="h-full w-full object-cover" />
                </div>
              )}
              <div 
                className={`max-w-xs rounded-2xl px-3 py-2 ${
                  message.sender === "self" 
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
                  <p className={`text-xs ${
                    message.sender === "self" ? "text-blue-100" : darkMode ? "text-gray-400" : "text-gray-500"
                  }`}>
                    {message.time}
                  </p>
                  {message.sender === "self" && (
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
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="h-8 w-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
                <img src="/api/placeholder/40/40" alt="Avatar" className="h-full w-full object-cover" />
              </div>
              <div className={`p-3 rounded-2xl rounded-bl-none ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex space-x-1">
                  <div className={`w-2 h-2 rounded-full ${darkMode ? 'bg-gray-400' : 'bg-gray-500'} animate-bounce`} style={{ animationDelay: '0ms' }}></div>
                  <div className={`w-2 h-2 rounded-full ${darkMode ? 'bg-gray-400' : 'bg-gray-500'} animate-bounce`} style={{ animationDelay: '200ms' }}></div>
                  <div className={`w-2 h-2 rounded-full ${darkMode ? 'bg-gray-400' : 'bg-gray-500'} animate-bounce`} style={{ animationDelay: '400ms' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Emoji Picker */}
        {showEmoji && (
          <div className={`grid grid-cols-5 gap-1 p-2 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            {emojis.map((emoji, index) => (
              <button 
                key={index} 
                className={`text-xl p-2 rounded-full transition ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                onClick={() => addEmoji(emoji)}
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
        
        {/* Message Input */}
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
      </div>
    </div>
  );
};

export default MessagingApp;