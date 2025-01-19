import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'
import axios from 'axios'

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#FF6384',
  '#36A2EB',
  '#FF9F40',
]

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      fontSize="14"
      fontWeight="bold"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      style={{ textShadow: '0px 0px 3px rgba(0, 0, 0, 0.7)' }}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

// Predefined categories
const predefinedCategories = [
  'housing',
  'transportation',
  'food',
  'personal and health',
  'entertainment and health',
  'savings and debt',
]

const DonutChart = () => {
  const [chartData, setChartData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const payments = response.data.user.expenseHistory

        // Initialize a map with predefined categories set to 0
        const categoryTotals = predefinedCategories.reduce((acc, category) => {
          acc[category] = 0
          return acc
        }, {})

        // Aggregate expenses into predefined categories
        payments.forEach((payment) => {
          const { category, amount } = payment
          if (categoryTotals.hasOwnProperty(category)) {
            categoryTotals[category] += amount
          }
        })

        // Convert to array format for Recharts
        const processedData = Object.entries(categoryTotals).map(
          ([key, value]) => ({
            name: key,
            value,
          }),
        )

        setChartData(processedData)
      } catch (err) {
        console.error('Error fetching payments:', err)
        setError(err.response?.data?.message || 'Failed to fetch payments.')
      } finally {
        setLoading(false)
      }
    }

    fetchPayments()
  }, [])

  if (loading) return <div className="p-6 text-center">Loading chart...</div>
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-white">Payment Categories</h1>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={120}
            innerRadius={60}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend
            verticalAlign="bottom"
            align="center"
            payload={chartData.map((entry, index) => ({
              id: entry.name,
              type: 'circle',
              value: `${entry.name} (${entry.value})`,
              color: COLORS[index % COLORS.length],
            }))}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default DonutChart
