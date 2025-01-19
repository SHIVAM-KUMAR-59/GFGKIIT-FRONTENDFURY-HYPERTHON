import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { ClipLoader } from 'react-spinners'

const CreatePayment = ({ onNewPayment }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue, // Added setValue to manually set default values
  } = useForm()
  const [loading, setLoading] = useState(false) // State to handle submission loading

  // Set default value for category dropdown to an empty string
  React.useEffect(() => {
    setValue('category', '') // Reset category to 'Select Category' after reload
  }, [setValue])

  const onSubmit = async (data) => {
    console.log('Payment data submitted:', data) // Log data to check

    const token = localStorage.getItem('token')

    if (!token) {
      alert('Token not found. Please log in again.')
      return
    }

    setLoading(true) // Start loading animation

    try {
      const response = await axios.post('/api/payment/createPayment', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log('Response from backend:', response.data)

      if (response.data.success) {
        onNewPayment()
        reset() // Reset form after successful submission
      }
    } catch (error) {
      console.error('Error during payment creation:', error)
      alert('Something went wrong during payment creation!')
    } finally {
      setLoading(false) // Stop loading animation
    }
  }

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  }

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-6 bg-gray-800 rounded-lg shadow-lg"
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.h1
        className="text-2xl text-center p-2 text-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Add Payment
      </motion.h1>

      {['amount', 'description'].map((field, index) => (
        <motion.div key={field} variants={inputVariants}>
          <input
            type={field === 'amount' ? 'number' : 'text'}
            placeholder={`Enter ${field}`}
            {...register(field, { required: `${field} is required` })}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          />
          {errors[field] && (
            <p className="text-red-500 text-sm">{errors[field].message}</p>
          )}
        </motion.div>
      ))}

      <motion.div variants={inputVariants}>
        <select
          {...register('category', { required: 'Category is required' })}
          className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
        >
          <option value="" disabled>
            Select Category
          </option>
          <option value="housing">Housing</option>
          <option value="transportation">Transportation</option>
          <option value="food">Food</option>
          <option value="personal and health">Personal and Health</option>
          <option value="entertainment and leisure">
            Entertainment and Leisure
          </option>
          <option value="savings and debt">Savings and Debt</option>
        </select>
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category.message}</p>
        )}
      </motion.div>

      <motion.div variants={inputVariants}>
        <button
          type="submit"
          disabled={loading} // Disable button during loading
          className={`w-full py-3 font-semibold rounded-lg transition duration-200 ${
            loading
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {loading ? <ClipLoader color="#fff" size={20} /> : 'Submit'}
        </button>
      </motion.div>
    </motion.form>
  )
}

export default CreatePayment
