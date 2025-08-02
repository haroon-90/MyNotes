import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Loading from '../components/loading';

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setLoading(true);
            const res = await axios.post('http://localhost:5000/api/auth/login', user)
            const { token } = res.data
            localStorage.setItem('token', token)
            // alert('Login successful!')
            setTimeout(() => {
                setLoading(false);
                navigate('/');
            }, 1000);
        } catch (err) {
            setLoading(false);
            alert(err.response?.data?.msg || 'Login failed')
        }
    }

    if (loading) return <Loading />

    return (
        <div className='min-h-screen flex items-center justify-center bg-blue-500'>
            <form
                onSubmit={handleSubmit}
                className='bg-white p-6 rounded shadow-md w-80'
            >
                <h2 className='text-xl font-bold mb-4 text-center'>Login</h2>

                <input
                    type='email'
                    name='email'
                    placeholder='Email'
                    value={user.email}
                    autoComplete="email"
                    onChange={handleChange}
                    className='w-full p-2 mb-4 border rounded'
                    required
                />

                <input
                    type='password'
                    name='password'
                    placeholder='Password'
                    value={user.password}
                    onChange={handleChange}
                    className='w-full p-2 mb-4 border rounded'
                    required
                />

                <button
                    type='submit'
                    className='w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700'
                >
                    Login
                </button>
                <div className='px-2 pt-2 text-center'>Don't have account?
                    <a className='underline hover:text-blue-700' href="/register">Register</a>
                </div>
            </form>
        </div>
    )
}

export default Login
