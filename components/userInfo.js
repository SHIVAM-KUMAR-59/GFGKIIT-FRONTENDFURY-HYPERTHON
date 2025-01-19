import React, { useEffect, useState } from 'react'

const UserInfo = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userInfo = localStorage.getItem('user')

    if (userInfo) {
      console.log(userInfo)
      setUser(JSON.parse(userInfo))
    }
  }, [])

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          User Information
        </h2>
        {user ? (
          <div className="space-y-4 text-gray-800">
            <p className="text-lg">
              <strong>Name:</strong> {user.name}
            </p>
            <p className="text-lg">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="text-lg">
              <strong>Username:</strong> {user.username}
            </p>
          </div>
        ) : (
          <p className="text-gray-500">Loading user information...</p>
        )}
      </div>
    </div>
  )
}

export default UserInfo
