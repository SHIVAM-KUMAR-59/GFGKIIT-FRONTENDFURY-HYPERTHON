import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllPayments = () => {
  const [payments, setPayments] = useState([]); // State to store payments
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        if (!token) {
          setError('You must be logged in to view payments.');
          setLoading(false);
          return;
        }

        const response = await axios.get('/api/payment/getPayment', {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the request header
          },
        });
        console.log(response.user);
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) return <div className="p-6 text-center">Loading payments...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">All Payments</h1>
      {payments.length === 0 ? (
        <p className="text-gray-700">No payments found.</p>
      ) : (
        <ul className="space-y-4">
          {payments.map((payment, index) => (
            <li
              key={index} // Using index since there's no unique ID for each payment
              className="bg-white p-4 rounded-lg shadow-md"
            >
              <p className="text-gray-800">
                <strong>Amount:</strong> ${payment.amount || '0.00'}
              </p>
              <p className="text-gray-800">
                <strong>Date:</strong>{' '}
                {payment.createdAt
                  ? formatDate(payment.createdAt)
                  : 'N/A'}
              </p>
              <p className="text-gray-800">
                <strong>Category:</strong> {payment.category || 'N/A'}
              </p>
              <p className="text-gray-800">
                <strong>Description:</strong>{' '}
                {payment.description || 'No description provided'}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
    // all payments done
  );
};

export default AllPayments;
