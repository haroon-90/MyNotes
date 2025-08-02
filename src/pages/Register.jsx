import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'

const Register = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
    })

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', user)
            const { token } = res.data
            console.log(token)
            localStorage.setItem('token', token)
            alert('Registration successful!')
            navigate('/')
        } catch (err) {
            alert(err.response?.data?.msg || 'Registration failed')
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-green-500'>
            <form
                onSubmit={handleSubmit}
                className='bg-white p-6 rounded shadow-md w-80'
            >
                <h2 className='text-xl font-bold mb-4 text-center'>Register</h2>

                <input
                    type='text'
                    name='username'
                    placeholder='Username'
                    value={user.username}
                    onChange={handleChange}
                    className='w-full p-2 mb-4 border rounded'
                    required
                />

                <input
                    type='email'
                    name='email'
                    placeholder='Email'
                    value={user.email}
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
                    className='w-full bg-green-600 text-white p-2 rounded hover:bg-green-700'
                >
                    Register
                </button>
            </form>
        </div>
    )
}

export default Register