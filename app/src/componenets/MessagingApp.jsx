import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';
import MessaginContainer from './MessaginContainer';
import EmojiPicker from './EmojiPicker';
import DateIndicator from './DateIndicator';
import MessageInput from './MessageInput';
import { io } from "socket.io-client";

const MessagingApp = () => {
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);         // For storing the socket instance
  const usernameRef = useRef('');          // For storing the current username

  const [darkMode, setDarkMode] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState([
    ]);
  const [newMessage, setNewMessage] = useState("");
  const emojis = ["😊", "😂", "❤️", "👍", "🎉", "🔥", "✨", "🙌", "😍", "🤔"];

  // Initialize socket and prompt for username (runs once on mount)
  useEffect(() => {
    const promptedUserName = prompt('Enter your username');
    setUsername(promptedUserName);
    usernameRef.current = promptedUserName;

    // Create a single socket instance
    socketRef.current = io('http://localhost:3000', { autoConnect: false });
    socketRef.current.connect();

    // Listen for messages from the backend
    socketRef.current.on('receiveMessage', ({ message, sender }) => {
      // Avoid duplicate: if this message is from the current user, ignore it.
      if (sender === usernameRef.current) return;
      setMessages(prevMessages => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
          text: message,
          sender,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  // Check for mobile view on initial load and on resize
  useEffect(() => {
    const checkMobileView = () => setIsMobileView(window.innerWidth < 768);
    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    return () => window.removeEventListener('resize', checkMobileView);
  }, []);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);



  // Function to send a message
  const sendMessage = () => {
    if (newMessage.trim() === "") return;
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg = {
      id: messages.length + 1,
      text: newMessage,
      sender: username,
      time: timeString,
      read: false
    };

    setMessages(prevMessages => [...prevMessages, newMsg]);
    socketRef.current.emit("sendMessage", { message: newMessage, sender: username });
    setNewMessage("");
  };

  // Handler for send button / Enter key
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    sendMessage();
    setShowEmoji(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const addEmoji = (emoji) => {
    setNewMessage(prev => prev + emoji);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(prev => !prev);
  };

  return (
    <div className="absolute inset-0 flex flex-col w-full h-full overflow-hidden" style={{ height: '100vh', width: '100vw' }}>
      <div className={`flex flex-col h-full w-full ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
        <Header 
          darkMode={darkMode} 
          setDarkMode={setDarkMode} 
          isMobileView={isMobileView} 
          toggleMobileMenu={toggleMobileMenu} 
          showMobileMenu={showMobileMenu} 
        />
      
        <DateIndicator darkMode={darkMode} />
        
        {/* Pass the username prop to the container */}
        <MessaginContainer 
          messages={messages} 
          darkMode={darkMode} 
          isTyping={isTyping} 
          messagesEndRef={messagesEndRef} 
          username={username}
        />
        
        <EmojiPicker 
          emojis={emojis} 
          showEmoji={showEmoji} 
          darkMode={darkMode} 
          addEmoji={addEmoji} 
        />
        
        <MessageInput 
          darkMode={darkMode} 
          isMobileView={isMobileView} 
          showEmoji={showEmoji} 
          setShowEmoji={setShowEmoji} 
          newMessage={newMessage} 
          setNewMessage={setNewMessage} 
          handleKeyPress={handleKeyPress} 
          handleSendMessage={handleSendMessage} 
        />
      </div>
    </div>
  );
};

export default MessagingApp;
