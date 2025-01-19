import React, { useState } from 'react'
import '@/app/globals.css'
import CreatePayment from '@/components/createPayment'
import AllPayments from '@/components/allPayments'
import UserInfo from '@/components/userInfo'
import DonutChart from '@/components/donutChart'
import LineChart from '@/components/lineChart'

const Dashboard = () => {
  const [newPayment, setNewPayment] = useState(false) // State to trigger re-fetch

  // Function to be passed to CreatePayment to trigger re-fetch
  const handleNewPayment = () => {
    console.log('newPayment', newPayment)
    setNewPayment((prevState) => !prevState) // Toggle state to re-fetch payments
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center w-full p-3 lg:p-5">
      <h2 className="text-3xl text-gray-100 mb-6">Payment Dashboard</h2>
      <div className="flex flex-col md:flex-row justify-between w-[95%] gap-4">
        <div className="min-h-[700px] flex-1 bg-gray-800 p-6 rounded-lg shadow-lg w-[95%]">
          <UserInfo />
          <div className="flex flex-col md:flex-row">
            <DonutChart />
            <LineChart />
          </div>
        </div>

        {/* CreatePayment and AllPayments - fixed width */}
        <div className="w-full md:w-[30%] flex flex-col gap-4">
          <CreatePayment onNewPayment={handleNewPayment} />
          <AllPayments newPayment={newPayment} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
