import React, { useEffect, useState } from 'react'

const UserInfo = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userInfo = localStorage.getItem('user')

    if (userInfo) {
      setUser(JSON.parse(userInfo))
    }
  }, [])

  return (
    <div className="bg-gray-700 p-6 rounded-lg shadow-lg shadow-slate-800 hover:shadow-slate-900  transition-all duration-200">
      <h2 className="text-2xl font-semibold text-gray-100 mb-4">
        User Information
      </h2>
      {user ? (
        <div className="space-y-4">
          <p className="text-lg text-gray-200">
            <strong className="font-semibold">Name:</strong> {user.name}
          </p>
          <p className="text-lg text-gray-200">
            <strong className="font-semibold">Email:</strong> {user.email}
          </p>
          <p className="text-lg text-gray-200">
            <strong className="font-semibold">Username:</strong> {user.username}
          </p>
        </div>
      ) : (
        <p className="text-gray-500">Loading user information...</p>
      )}
    </div>
  )
}

export default UserInfo
