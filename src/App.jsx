import './App.css'
import AllNotes from './pages/AllNotes'
import axios from 'axios'

function App() {

  // const isLogin=async ()=>{
  //   try {
  //     const res = await axios.post('http://localhost:5000/api/auth/login', )
  //   } catch (err) {
      
  //   }
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-4xl font-bold text-center text-purple-700 mb-4">
          📝 Welcome to MyNotes
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Your personal, secure place to save important thoughts.
        </p>
        <div>
          <AllNotes/>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-gray-400 text-sm">
          <p>Made with 💙 by Haroon</p>
        </div>
      </div>
    </div>
  )
}

export default App
