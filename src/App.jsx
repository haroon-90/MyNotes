import './App.css'
import AllNotes from './pages/AllNotes'
import { useNavigate } from 'react-router-dom'

function App() {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logout is called")
    localStorage.removeItem("token")
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-100 to-blue-200 p-6 md:p-12">
      <div className="relative max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl px-8 py-10 sm:px-10 sm:py-12">

        <button
          className="absolute top-5 right-5 px-5 py-1.5 rounded-full bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold shadow-md transition duration-200"
          onClick={handleLogout}
        >
          Logout
        </button>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-purple-700 mb-4 tracking-tight">
          📝 MyNotes
        </h1>

        <p className="text-center text-gray-600 text-base sm:text-lg mb-8">
          Your secure space to capture and organize thoughts.
        </p>

        <div>
          <AllNotes />
        </div>

        <div className="mt-10 border-t pt-6 text-center text-gray-400 text-sm">
          <p>Made with 💙 by Haroon</p>
        </div>
      </div>
    </div>

  )
}

export default App
