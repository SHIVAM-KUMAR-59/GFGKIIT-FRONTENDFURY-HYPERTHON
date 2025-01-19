import React, { useEffect } from 'react'
import '@/app/globals.css'
import CreatePayment from '@/components/createPayment'
import AllPayments from '@/components/allPayments'
import UserInfo from '@/components/userInfo'

const Dashboard = () => {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Payment Dashboard
          </h2>
          <UserInfo />
          <CreatePayment />
          <AllPayments />
        </div>
      </div>
    </>
  )
}

export default Dashboard
