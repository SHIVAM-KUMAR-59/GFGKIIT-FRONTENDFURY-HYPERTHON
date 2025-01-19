import React, { useEffect, useState } from 'react'
import axios from 'axios'

const AllPayments = () => {
  const [payments, setPayments] = useState([]) // State to store payments
  const [loading, setLoading] = useState(true) // State to handle loading
  const [error, setError] = useState(null) // State to handle errors

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem('token') // Get the token from localStorage
        if (!token) {
          setError('You must be logged in to view payments.')
          setLoading(false)
          return
        }

        const response = await axios.get('/api/payment/getPayment', {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the request header
          },
        })
        console.log('response', response.data.user.expenseHistory)
        setPayments(response.data.user.expenseHistory) // Update state with payments data
      } catch (err) {
        console.error('Error fetching payments:', err)
        setError(err.response?.data?.message || 'Failed to fetch payments.')
      } finally {
        setLoading(false) // Stop loading after the request
      }
    }

    fetchPayments()
  }, []) // Empty dependency array to run on component mount

  if (loading) return <div>Loading payments...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Payments</h1>
      {payments.length === 0 ? (
        <p>No payments found.</p>
      ) : (
        <ul className="space-y-4">
          {payments.map((payment) => (
            <li
              key={payment.id}
              className="bg-gray-100 p-4 rounded-lg shadow-md"
            >
              <p>
                <strong>ID:</strong> {payment.id}
              </p>
              <p>
                <strong>Amount:</strong> ${payment.amount}
              </p>
              <p>
                <strong>Date:</strong>{' '}
                {new Date(payment.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Description:</strong> {payment.description || 'N/A'}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default AllPayments
