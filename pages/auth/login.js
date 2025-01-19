import React from 'react'
import { useForm } from 'react-hook-form'
import '@/app/globals.css'
import axios from 'axios'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues, // Destructure getValues here
  } = useForm()

  const onSubmit = async (data) => {
    console.log('Data being sent:', data) // Log data to check
    try {
      const response = await axios.post('/api/auth/login', data)
      console.log(response)
      if (response.status === 201) {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem(
          'user',
          JSON.stringify(response.data.userWithoutPassword),
        )
        alert('Logged in successfully')
        reset()
      }
    } catch (error) {
      console.error('Error during login:', error.response?.data || error.error)
      alert(error.response?.data?.error || 'Something went wrong!')
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Login
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 text-gray-800"
        >
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Invalid email address',
                },
              })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              {...register('password', { required: 'Password is required' })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Optional Confirm Password field for Login */}
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) =>
                  value === getValues('password') || 'Passwords do not match',
              })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
