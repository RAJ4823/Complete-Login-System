import { React, useState } from 'react'
import { Link } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { profileValidation } from '../Helper/Validate'
import { useNavigate } from 'react-router-dom'
import { updateUser } from '../Helper/helper'
import useFetch from '../hooks/fetch'
import convertToBase64 from '../Helper/convert'
import profileIcon from '/img/profile.png'
import '../Styles/card.css'

export default function Register() {
  const [file, setFile] = useState()
  const [{ isLoading, error, status, apiData }] = useFetch()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      firstName: apiData?.firstName || '',
      lastName: apiData?.lastName || '',
      email: apiData?.email || '',
      mobile: apiData?.mobile || '',
      address: apiData?.address || '',
    },

    enableReinitialize: true,
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: async (values) => {
      values = { ...values, profile: file || apiData?.profile || '' }
      const updatePromise = updateUser(values)

      toast.promise(updatePromise, {
        loading: 'Updating...',
        success: <b>Profile Update Successfully...!</b>,
        error: <b>Could'nt Update the Profile...!</b>,
      })

      updatePromise.catch((err) => {
        console.log(err)
        setFile(null)
      })
    },
  })

  const onUpload = async (ele) => {
    const uploadedImage = ele.target.files[0]
    if (uploadedImage) {
      const convertPromise = convertToBase64(uploadedImage)
      convertPromise.then((base64Image) => setFile(base64Image))
    }
  }

  const onLogout = async () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center flex-col mt-20">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <h1 className="text-2xl font-bold text-blue-500">Loading...</h1>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center flex-col mt-20">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <h1 className="text-2xl font-bold text-red-500">Server Error</h1>
        <p>{error?.message}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-start h-full p-5">
        <div className="glass h-full profile-page">
          <div className="title flex flex-col items-center">
            <h4 className="text-3xl font-bold">Profile</h4>
            <span className="py-1 text-lg w-full text-center text-gray-500">
              You can update the details.
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center">
              <label htmlFor="profile">
                <img
                  src={file || apiData?.profile || profileIcon}
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
                  maxLength="32"
                />
                <input
                  {...formik.getFieldProps('lastName')}
                  className="textbox-input w-3/4"
                  type="text"
                  placeholder="LastName"
                  maxLength="32"
                />
              </div>

              <div className="name flex w-3/4 gap-10">
                <input
                  {...formik.getFieldProps('mobile')}
                  className="textbox-input w-3/4"
                  type="text"
                  placeholder="Mobile No."
                  maxLength="16"
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
          </form>

          <div className="text-center py-4">
            <span className="text-gray-500">
              Come back later?{' '}
              <button onClick={onLogout} className="text-red-500 link">
                Logout
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
