import React, { useEffect, useState } from 'react'
import axios from 'axios'

const AllPayments = () => {
  const [payments, setPayments] = useState([]) // State to store payments
  const [loading, setLoading] = useState(true) // State to handle loading
  const [error, setError] = useState(null) // State to handle errors

  // Function to fetch payments from the server
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
        });
        console.log('response', response.data.user.expenseHistory);
        setPayments(response.data.user.expenseHistory || []); // Update state with payments data
      } catch (err) {
        console.error('Error fetching payments:', err);
        setError(err.response?.data?.message || 'Failed to fetch payments.');
      } finally {
        setLoading(false); // Stop loading after the request
      }
    };

    fetchPayments();
  }, []); // Empty dependency array to run on component mount

  // Format the date to a more readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const handleNewPayment = () => {
    fetchPayments()
  }

  if (loading)
    return <div className="p-6 text-center text-white">Loading payments...</div>
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>

  return (
    <div className="max-h-[350px] overflow-y-auto p-6 w-full mx-auto text-white shadow-lg bg-gray-800 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">All Payments</h1>
      {payments.length === 0 ? (
        <p className="text-gray-400">No payments found.</p>
      ) : (
        <ul className="space-y-4">
          {payments.map((payment, index) => (
            <li
              key={index} // Using index since there's no unique ID for each payment
              className="bg-gray-900 p-4 rounded-lg shadow-md hover:scale-105 hover:cursor-pointer hover:shadow-lg transition duration-200"
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
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default AllPayments
