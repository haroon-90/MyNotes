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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-8">
      <div className="relative max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <button className='absolute top-3 right-3 px-4 py-1  rounded-full bg-blue-500 text-white' onClick={handleLogout}>Logout</button>
        <h1 className="text-4xl font-bold text-center text-purple-700 mb-4">
          📝 Welcome to MyNotes
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Your personal, secure place to save important thoughts.
        </p>
        <div>
          <AllNotes />
        </div>
        <div className="mt-8 border-t pt-6 text-center text-gray-400 text-sm">
          <p>Made with 💙 by Haroon</p>
        </div>
      </div>
    </div>
  )
}

export default App
