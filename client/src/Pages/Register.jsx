import { React, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { registerValidation } from '../Helper/Validate'
import convertToBase64 from '../Helper/convert'
import { register } from '../Helper/helper'
import profileIcon from '/img/profile.png'
import '../Styles/card.css'

export default function Register() {
  const [file, setFile] = useState()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: 'the_247@superverse.com',
      username: 'the_247',
      password: 'admin@123',
    },

    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: async (values) => {
      values = { ...values, profile: file || '' }
      const registerPromise = register(values)

      toast.promise(registerPromise, {
        loading: 'Creating...',
        success: <b>Registred Successfully...!</b>,
        error: <b>Could Not Register...!</b>,
      })

      registerPromise.then(() => navigate('/'))
    }, 
  })

  const onUpload = async (ele) => {
    const base64 = await convertToBase64(ele.target.files[0])
    setFile(base64)
  }

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-full">
        <div className="glass">
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Register</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Happy to join you!
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  src={file || profileIcon}
                  className="profile-img"
                  alt="avatar"
                />
              </label>

              <input
                onChange={onUpload}
                type="file"
                id="profile"
                name="profile"
              />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps('email')}
                className="textbox-input"
                type="text"
                placeholder="Email*"
              />
              <input
                {...formik.getFieldProps('username')}
                className="textbox-input"
                type="text"
                placeholder="Username*"
              />
              <input
                {...formik.getFieldProps('password')}
                className="textbox-input"
                type="text"
                placeholder="Password*"
              />
              <button className="btn" type="submit">
                Register
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Already Register?{' '}
                <Link className="text-blue-500" to="/">
                  Login Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
