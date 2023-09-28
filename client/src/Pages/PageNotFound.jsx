import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function PageNotFound() {
  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center h-screen">
        <div className="glass" style={{ width: '50%' }}>
          <div className="title flex flex-col items-center">
            <h3 className="text-9xl font-bold">404</h3>
            <h4 className="text-3xl font-bold">Page Not Found</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Go back to Login / Register Page
            </span>
          </div>

          <div className="flex flex-col w-full items-center justify-center gap-6 py-6">
            <Link to="/" className="w-full text-center">
              <button className="btn w-3/4">Login</button>
            </Link>
            <Link to="/register" className="w-full text-center">
              <button className="btn w-3/4">Register</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
