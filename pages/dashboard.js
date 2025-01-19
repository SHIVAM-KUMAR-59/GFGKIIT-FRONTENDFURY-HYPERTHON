import React, { useEffect } from 'react'
import '@/app/globals.css'
import { useForm } from 'react-hook-form'
import axios from 'axios'

const Dashboard = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const getAllPayments = async () => {
    try {
      console.log('Fetching payments...')
      const payments = await axios.get('/api/payment/getPayment') // Updated endpoint
      console.log('Payments:', payments.data)
    } catch (error) {
      console.error('Error fetching payments:', error)
      alert('Failed to fetch payments')
    }
  }

  useEffect(() => {
    getAllPayments()
  }, [])

  const onSubmit = async (data) => {
    // Get the token from local storage
    const token = localStorage.getItem('token')

    if (!token) {
      alert('Token not found. Please log in again.')
      return
    }

    try {
      // Send the request with the token in the headers
      const response = await axios.post('/api/payment/createPayment', data, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token to the request headers
        },
      })
      console.log('Response:', response.data)
    } catch (error) {
      console.error('Error during payment creation:', error)
      alert('Something went wrong during payment creation!')
    }

    console.log('Form Data:', data)
  }

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Dashboard
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 text-gray-800"
          >
            <div>
              <input
                type="number"
                placeholder="Enter amount"
                {...register('amount', { required: 'Amount is required' })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.amount && (
                <p className="text-red-500 text-sm">{errors.amount.message}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="Enter description"
                {...register('description', {
                  required: 'Description is required',
                })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="Enter category"
                {...register('category', { required: 'Category is required' })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.category && (
                <p className="text-red-500 text-sm">
                  {errors.category.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Dashboard
