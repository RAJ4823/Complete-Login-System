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
      email: '',
      username: '',
      password: '',
      confirm_password: ''
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
    const uploadedImage = ele.target.files[0]
    if (uploadedImage) {
      const convertPromise = convertToBase64(uploadedImage)
      convertPromise.then((base64Image) => setFile(base64Image))
    }
  }

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-full py-5 px-1">
        <div className="glass">
          <div className="title flex flex-col items-center">
            <h4 className="text-4xl font-bold">Register</h4>
            <span className="py-1 text-lg w-2/3 text-center text-gray-500">
              Happy to join you!
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center">
              <label htmlFor="profile">
                <img
                  src={file || profileIcon}
                  className="profile-img cursor-pointer"
                  alt="avatar"
                />
              </label>

              <input
                onChange={onUpload}
                accept=".jpg, .png, .jpeg"
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
                placeholder="Email*    (Ex. user123@email.com)"
              />
              <input
                {...formik.getFieldProps('username')}
                className="textbox-input"
                type="text"
                placeholder="Username*    (Ex. User_123)"
                maxLength="32"
              />
              <input
                {...formik.getFieldProps('password')}
                className="textbox-input"
                type="password"
                placeholder="Create Password*"
              />
              <input
                {...formik.getFieldProps('confirm_password')}
                className="textbox-input"
                type="password"
                placeholder="Confirm Password*"
              />
              <button className="btn" type="submit">
                Register
              </button>
            </div>

            <div className="text-center py-4">
              <span>
                Already Register?{' '}
                <Link className="text-blue-500 link" to="/">
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
