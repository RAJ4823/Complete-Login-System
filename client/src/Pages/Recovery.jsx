import React from 'react'
import { Toaster } from 'react-hot-toast'
import '../Styles/card.css'

export default function Recovery() {

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex justify-center items-center py-10">
        <div className="card glass">
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Recovery</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Enter OTP to recover password.
            </span>
          </div>

          <form className="pt-10">
            <div className="textbox flex flex-col items-center justify-center gap-6">
              <span className="py-4 text-sm text-left text-gray-500">
                Enter 6 Digit OTP sent to your email address.
              </span>
              <input
                className="textbox-input"
                type="number"
                placeholder="OTP"
              />
              <button className="btn" type="submit">
                Sign In
              </button>
            </div>

            <div className="text-center py-2">
              <span>
                Can't Get OTP?{' '}
                <button className="text-green-600 ">Resend</button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
