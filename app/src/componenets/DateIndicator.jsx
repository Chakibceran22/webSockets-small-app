const DateIndicator = ({ darkMode}) => {
    return(
        <div className="flex justify-center my-2">
          <span className={`text-xs px-3 py-1 rounded-full ${darkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-800'}`}>
            Today
          </span>
        </div>
    )
}
export default DateIndicator;