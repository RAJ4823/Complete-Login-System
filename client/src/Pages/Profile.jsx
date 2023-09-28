import { React, useState } from 'react'
import { Link } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { profileValidation } from '../Helper/Validate'
import convertToBase64 from '../Helper/convert'
import profileIcon from '/img/profile.png'
import '../Styles/card.css'

export default function Register() {
  const [file, setFile] = useState()

  const formik = useFormik({
    initialValues: {
      firstName: 'Raj',
      lastName: 'Patel',
      email: 'the_247@superverse.com',
      mobile: '',
      address: '',
    },
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = { ...values, profile: file || '' }
      console.log(values)
    },
  })

  const onUpload = async (ele) => {
    const base64 = await convertToBase64(ele.target.files[0])
    setFile(base64)
  }

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen p-5">
        <div className="glass h-full w-5/6">
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Profile</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              You can update the details.
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  src={file || profileIcon}
                  className="profile-img w-40 cursor-pointer"
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
              <div className="name flex w-3/4 gap-10">
                <input
                  {...formik.getFieldProps('firstName')}
                  className="textbox-input w-3/4"
                  type="text"
                  placeholder="FirstName"
                />
                <input
                  {...formik.getFieldProps('lastName')}
                  className="textbox-input w-3/4"
                  type="text"
                  placeholder="LastName"
                />
              </div>

              <div className="name flex w-3/4 gap-10">
                <input
                  {...formik.getFieldProps('mobile')}
                  className="textbox-input w-3/4"
                  type="text"
                  placeholder="Mobile No."
                />
                <input
                  {...formik.getFieldProps('email')}
                  className="textbox-input w-3/4"
                  type="text"
                  placeholder="Email*"
                />
              </div>

              <input
                {...formik.getFieldProps('address')}
                className="textbox-input w-3/4"
                type="text"
                placeholder="Address"
              />
              <button className="btn" type="submit">
                Update
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                come back later?{' '}
                <button to="/" className="text-red-500">
                  Logout
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
