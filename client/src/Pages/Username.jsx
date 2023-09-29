import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { usernameValidate } from '../Helper/Validate'
import profileIcon from '/img/profile.png'
import '../Styles/card.css'

export default function Login() {
  const formik = useFormik({
    initialValues: { username: '' },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values)
    },
  })

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex justify-center items-center py-10">
        <div className="card glass">
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Hello Again!</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Explore more by connecting with us
            </span>
          </div>

          <form onSubmit={formik.handleSubmit} className="py1">
            <div className="profile justify-center items-center py-4">
              <img
                src={profileIcon}
                alt="avatar"
                className="profile-img mx-auto"
              />
            </div>

            <div className="textbox flex flex-col items-center justify-center gap-6">
              <input
                {...formik.getFieldProps('username')}
                className="textbox-input"
                type="text"
                placeholder="username"
              />
              <button className="btn" type="submit">
                Let's Go
              </button>
            </div>

            <div className="text-center py-2">
              <span>
                Not a member{' '}
                <Link to="/register" className="text-blue-500">
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