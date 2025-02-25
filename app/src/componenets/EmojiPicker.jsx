const EmojiPicker = ({showEmoji, darkMode, emojis, addEmoji}) => {
    return (
        showEmoji && (
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
          )
    )
}
export default EmojiPicker;