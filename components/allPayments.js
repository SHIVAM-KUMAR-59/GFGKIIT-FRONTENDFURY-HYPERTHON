import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ClipLoader } from 'react-spinners' // React Spinners
import { motion, AnimatePresence } from 'framer-motion' // Framer Motion for animations

const SkeletonLoader = () => (
  <ul className="space-y-4 p-2">
    {Array.from({ length: 3 }).map((_, index) => (
      <li
        key={index}
        className="bg-gray-700 p-4 rounded-lg shadow-md animate-pulse"
      >
        <div className="h-4 bg-gray-600 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-600 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-600 rounded w-1/3"></div>
      </li>
    ))}
  </ul>
)

const AllPayments = ({ newPayment }) => {
  const [payments, setPayments] = useState([]) // State to store payments
  const [loading, setLoading] = useState(true) // State to handle loading
  const [error, setError] = useState(null) // State to handle errors

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          setError('You must be logged in to view payments.')
          setLoading(false)
          return
        }

        const response = await axios.get('/api/payment/getPayment', {
          headers: { Authorization: `Bearer ${token}` },
        })
        setPayments((response.data.user.expenseHistory || []).reverse())
      } catch (err) {
        setError('Failed to fetch payments.')
      } finally {
        setLoading(false)
      }
    }

    fetchPayments()
  }, [newPayment])

  useEffect(() => {
    if (newPayment) {
      // Add the new payment to the top of the list
      setPayments((prevPayments) => [newPayment, ...prevPayments])
    }
  }, [newPayment])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  if (error) return <div className="p-6 text-center text-red-500">{error}</div>

  return (
    <div className="h-[500px] overflow-y-auto p-6 w-full mx-auto text-white shadow-lg bg-gray-800 rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-100">All Payments</h1>
      {loading ? (
        <SkeletonLoader />
      ) : payments.length === 0 ? (
        <p className="text-gray-400">No payments found.</p>
      ) : (
        <ul className="space-y-4 p-2">
          <AnimatePresence>
            {payments.map((payment, index) => (
              <motion.li
                key={index} // Using index since there's no unique ID for each payment
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-lg hover:scale-105 hover:cursor-pointer hover:bg-gray-600 transition duration-200"
              >
                <p className="text-gray-300">
                  <strong>Amount:</strong> ${payment.amount || '0.00'}
                </p>
                <p className="text-gray-300">
                  <strong>Date:</strong>{' '}
                  {payment.createdAt ? formatDate(payment.createdAt) : 'N/A'}
                </p>
                <p className="text-gray-300">
                  <strong>Category:</strong> {payment.category || 'N/A'}
                </p>
                <p className="text-gray-300">
                  <strong>Description:</strong>{' '}
                  {payment.description || 'No description provided'}
                </p>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  )
}

export default AllPayments
