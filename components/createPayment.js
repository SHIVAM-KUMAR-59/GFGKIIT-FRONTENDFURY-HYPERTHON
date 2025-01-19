import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'

const CreatePayment = ({ onNewPayment }) => {
  const onSubmit = async (data) => {
    console.log('Payment data submitted:', data) // Log data to check

    const token = localStorage.getItem('token')

    if (!token) {
      alert('Token not found. Please log in again.')
      return
    }

    try {
      const response = await axios.post('/api/payment/createPayment', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log('Response from backend:', response.data)

      // After successfully creating a payment, call the parent function to update the list
      if (response.data.success) {
        onNewPayment() // Trigger a re-fetch of payments in the parent component
        reset()
      }
    } catch (error) {
      console.error('Error during payment creation:', error)
      alert('Something went wrong during payment creation!')
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-6 bg-gray-800 rounded-lg shadow-lg"
    >
      <h1 className="text-2xl text-center p-2 text-gray-100">Add Payment</h1>
      <div>
        <input
          type="number"
          placeholder="Enter amount"
          {...register('amount', { required: 'Amount is required' })}
          className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
        />
        {errors.amount && (
          <p className="text-red-500 text-sm">{errors.amount.message}</p>
        )}
      </div>

      <div>
        <input
          type="text"
          placeholder="Enter description"
          {...register('description', { required: 'Description is required' })}
          className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>

      <div>
        <input
          type="text"
          placeholder="Enter category"
          {...register('category', { required: 'Category is required' })}
          className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
        />
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
      >
        Submit
      </button>
    </form>
  )
}

export default CreatePayment
