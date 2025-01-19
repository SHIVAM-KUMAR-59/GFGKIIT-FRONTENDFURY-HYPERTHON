import React, { useEffect, useState } from 'react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const LineChart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('You must be logged in to view the chart.');
          setLoading(false);
          return;
        }

        const response = await axios.get('/api/payment/getPayment', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const payments = response.data.user.expenseHistory;

        // Grouping payments by categories
        const categorizedData = {};

        payments.forEach((payment, index) => {
          const category = payment.category || 'Unknown'; // Default category if none exists
          if (!categorizedData[category]) {
            categorizedData[category] = [];
          }

          // Creating new data points for each transaction
          categorizedData[category].push({
            name: `Transaction ${index + 1}`,
            amount: payment.amount,
            cumulative: payments.slice(0, index + 1).reduce((sum, p) => sum + p.amount, 0),
          });
        });

        // Formatting data for each category
        const formattedData = Object.keys(categorizedData).map(category => ({
          category,
          data: categorizedData[category],
        }));

        setChartData(formattedData);
      } catch (err) {
        console.error('Error fetching payments:', err);
        setError(err.response?.data?.message || 'Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-6 text-center">Loading chart...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">Expense Trends by Category</h1>
      <ResponsiveContainer width="100%" height={400}>
        <RechartsLineChart
          data={chartData[0]?.data || []}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" label={{ value: 'Transactions', position: 'insideBottom', offset: -5 }} />
          <YAxis label={{ value: 'Amount ($)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend verticalAlign="top" />
          
          {/* Line for each category */}
          {chartData.map((categoryData, index) => (
            <Line
              key={index}
              type="monotone"
              dataKey="amount"
              data={categoryData.data}
              stroke={index % 2 === 0 ? '#8884d8' : '#82ca9d'}
              name={`${categoryData.category} Expenses`}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;
