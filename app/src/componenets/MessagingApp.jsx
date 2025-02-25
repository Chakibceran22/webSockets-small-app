import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';
import MessaginContainer from './MessaginContainer';
import EmojiPicker from './EmojiPicker';
import DateIndicator from './DateIndicator';
import MessageInput from './MessageInput';

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
      
        <DateIndicator darkMode={darkMode} />
        
        <MessaginContainer messages={messages} darkMode={darkMode} isTyping={isTyping} messagesEndRef={messagesEndRef} />
        
        <EmojiPicker emojis={emojis} showEmoji={showEmoji} darkMode={darkMode} addEmoji={addEmoji} />
        
        <MessageInput darkMode={darkMode} isMobileView={isMobileView} showEmoji={showEmoji} setShowEmoji={setShowEmoji} newMessage={newMessage} setNewMessage={setNewMessage} handleKeyPress={handleKeyPress} handleSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default MessagingApp;