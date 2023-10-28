import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useAuthStore } from '../Helper/store'
import { generateOTP, verifyOTP } from '../Helper/helper'
import { useNavigate } from 'react-router-dom'
import OtpInput from 'react-otp-input'

import '../Styles/card.css'

export default function Recovery() {
  const { username } = useAuthStore((state) => state.auth)
  const [otp, setOtp] = useState('')
  const [otpGenerated, setOtpGenerated] = useState(false)
  const navigate = useNavigate()

  const sendOTP = () => {
    const sendPromise = generateOTP(username)
    toast.promise(sendPromise, {
      loading: 'Sending OTP...',
      success: <b>OTP has been send to your email.</b>,
      error: <b>Problem while generating OTP...!</b>,
    })
    sendPromise.then((OTP) => {
      console.log(OTP)
    })
  }

  const sendFirstOTP = (e) => {
    e.preventDefault()
    if (!otpGenerated) {
      setOtpGenerated((otpGenerated) => !otpGenerated)
      sendOTP()
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      let { status } = await verifyOTP({ username, otp })
      if (status === 201) {
        toast.success('OTP Verified Successfully!')
        return navigate('/reset')
      }
    } catch (error) {
      return toast.error('Invalid OTP!, Check email again.')
    }
  }

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex justify-center items-center py-10">
        <div className="card glass">
          <div className="title flex flex-col items-center">
            <h4 className="text-4xl font-bold">Recovery</h4>
            <span className="py-2 text-lg w-2/3 text-center text-gray-500">
              {otpGenerated
                ? 'Enter OTP to recover password.'
                : 'Generate OTP and verify it to reset the password.'}
            </span>
          </div>

          <form className="pt-5">
            <div className="textbox flex flex-col items-center justify-center gap-6">
              <span className="py-4 text-left text-gray-500">
                {otpGenerated
                  ? 'Enter 6 Digit OTP sent to your email address.'
                  : 'The OTP will be sent to your registered email.'}
              </span>
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                separator={<span style={{ width: '8px' }}></span>}
                renderInput={(props) => (
                  <input
                    {...props}
                    className="otp-input"
                    disabled={!otpGenerated}
                  />
                )}
                isInputNum={true}
                shouldAutoFocus={true}
              />
              {otpGenerated ? (
                <button className="btn" onClick={onSubmit}>
                  Verify OTP
                </button>
              ) : (
                <button className="btn" onClick={sendFirstOTP}>
                  Generate OTP
                </button>
              )}
            </div>
          </form>

          <div className="text-center py-2">
            {otpGenerated ? (
              <span>
                Can't Get OTP?{' '}
                <button className="text-green-600 link" onClick={sendOTP}>
                  Resend
                </button>
              </span>
            ) : (
              <span className="text-red-500">
                Don't refresh or leave the Page.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
