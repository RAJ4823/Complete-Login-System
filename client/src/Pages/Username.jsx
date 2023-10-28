import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { usernameValidate } from '../Helper/Validate'
import { useAuthStore } from '../Helper/store'
import profileIcon from '/img/profile.png'
import '../Styles/card.css'

export default function Login() {
  const setUsername = useAuthStore((state) => state.setUsername)
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: { username: '' },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      setUsername(values.username)
      navigate('/password')
    },
  })

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex justify-center items-center h-full p-5">
        <div className="card glass h-full">
          <div className="title flex flex-col items-center">
            <h4 className="text-4xl font-bold">Hello Again!</h4>
            <span className="py-2 text-lg w-2/3 text-center text-gray-500">
              Explore more by connecting with us
            </span>
          </div>

          <form onSubmit={formik.handleSubmit} className="py1">
            <div className="profile justify-center items-center">
              <img
                src={profileIcon}
                alt="avatar"
                className="profile-img"
              />
            </div>

            <div className="textbox flex flex-col items-center justify-center gap-6">
              <input
                {...formik.getFieldProps('username')}
                className="textbox-input"
                type="text"
                placeholder="username"
                maxLength="32"
              />
              <button className="btn" type="submit">
                Let's Go
              </button>
            </div>

            <div className="text-center py-2">
              <span>
                Not a member,{' '}
                <Link to="/register" className="text-blue-500 link">
                  Register Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
