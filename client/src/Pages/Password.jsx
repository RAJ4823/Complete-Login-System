import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { passwordValidate } from '../Helper/Validate'
import useFetch from '../hooks/fetch'
import { useAuthStore } from '../Helper/store'
import profileIcon from '/img/profile.png'
import '../Styles/card.css'

export default function Password() {
  const { username } = useAuthStore((state) => state.auth)
  const [{ isLoading, error, status, apiData }] = useFetch(`user/${username}`)

  useEffect(() => {
    console.log(apiData, error)
  }, [])

  const formik = useFormik({
    initialValues: { password: '' },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values)
    },
  })

  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <h1 className="text-2xl font-bold text-blue-500">Loading...</h1>
      </div>
    )

  if (error)
    return (
      <div className="flex justify-center items-center">
        <h1 className="text-2xl font-bold text-red-500">Server Error</h1>
        <p>{error}</p>
      </div>
    )

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex justify-center items-center py-10">
        <div className="card glass">
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">
              Hello {apiData?.firstName || apiData?.username}
            </h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Explore more by connecting with us
            </span>
          </div>

          <form onSubmit={formik.handleSubmit} className="py1">
            <div className="profile justify-center items-center py-4">
              <img
                src={apiData?.profile || profileIcon}
                alt="avatar"
                className="profile-img mx-auto"
              />
            </div>

            <div className="textbox flex flex-col items-center justify-center gap-6">
              <input
                {...formik.getFieldProps('password')}
                className="textbox-input"
                type="password"
                placeholder="password"
              />
              <button className="btn" type="submit">
                Sign In
              </button>
            </div>

            <div className="text-center py-2">
              <span>
                Forgot Password?{' '}
                <Link to="/recovery" className="text-red-500">
                  Recover Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
