import React, { useState } from 'react'
import ProfileIcon from '../../assets/ProfImg.png'
import PhoneIcon from '../../assets/Mobile.png'
import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const handleBookAppointmentClick = (setIsModalOpen) => {
    setIsModalOpen(true)
    document.body.style.overflow = 'hidden' // Disable scrolling when modal is open
}

const BookAppointmentForm = ({
    isModalOpen,
    setIsModalOpen,
    appointmentPic,
}) => {
    const [isPending, setIsPending] = useState(false)
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [formData, setFormData] = useState({
        service: '',
        email: '',
        phone: '',
        date: '',
    })
    const [errors, setErrors] = useState({})

    const baseUrl = 'http://localhost:5000'
    const validateForm = () => {
        const errors = {}

        if (!formData?.email) {
            errors.email = 'Email is required'
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            errors.email = 'Email is invalid'
        }
        if (!formData?.phone) {
            errors.phone = 'Phone number is required'
        } else if (!/^\d+$/.test(formData.phone)) {
            errors.phone = 'Phone number must contain only digits'
        } else if (formData.phone.length !== 10) {
            errors.phone = 'Mobile number should be 10 digits.'
        }
        if (!formData?.date) {
            errors.date = 'Date is required'
        }
        if (!formData?.service) {
            errors.service = 'Service is required'
        }

        return errors
    }

    const handleSubmit = async (e) => {
        const notifyA = () => toast.error('Error sending email')
        const notifyB = () => toast.success('Email sent successfully')
        e.preventDefault()
        setIsPending(true)

        const errors = validateForm()
        if (Object.keys(errors).length === 0) {
            try {
                const response = await fetch(`${baseUrl}/api/sendEmail`, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        service: formData.service,
                        email: formData.email,
                        phone: formData.phone,
                        date: formData.date,
                    }),
                })

                if (response.ok) {
                    setErrors({})
                    setIsPending(false)
                    setFormData({
                        service: '',
                        email: '',
                        phone: '',
                        date: '',
                    })
                    setFormSubmitted(true)
                    notifyB()
                } else {
                    console.error('Failed to submit the form', response)
                    setIsPending(false)
                    notifyA()
                }
            } catch (error) {
                console.error('Error submitting the form:', error)
            }
        } else {
            setErrors(errors)
        }
    }

    const handleChange = (fieldName, value) => {
        setFormData({
            ...formData,
            [fieldName]: value,
        })
        setErrors({
            ...errors,
            [fieldName]: false,
        })
    }

    const closeModal = ({ isModalOpen }) => {
        setIsModalOpen(false)
        document.body.style.overflow = 'auto' // Enable scrolling when modal is closed
    }
    return (
        <>
            {isModalOpen && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50"></div>
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-lg md:max-w-2xl md:w-[80%] md:p-10 lg:w-[80%]">
                            <button
                                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                                onClick={closeModal}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                            <div className="mt-1 text-center">
                                <p className="text-2xl lg:text-3xl xl:text-4xl font-semibold leading-tight text-gray-900">
                                    Book Appointment
                                </p>
                                <p className="text-gray-600 text-sm lg:text-base my-3">
                                    Please fill the form below and expedite your
                                    consultation process.
                                </p>
                            </div>
                            <div className="grid  py-4">
                                <div className="flex flex-col items-center w-full">
                                    {!formSubmitted ? (
                                        <form
                                            className="w-full px-6 md:px-8"
                                            onSubmit={handleSubmit}
                                        >
                                            <div className="flex flex-col gap-4">
                                                <div
                                                    className={`relative border rounded-md p-3 ${
                                                        errors?.service
                                                            ? 'border-red-600'
                                                            : 'border-gray-300'
                                                    }`}
                                                >
                                                    <select
                                                        name="service"
                                                        className="w-full focus:outline-none opacity-50 capitalize"
                                                        value={
                                                            formData.service ||
                                                            ''
                                                        }
                                                        onChange={(e) =>
                                                            handleChange(
                                                                'service',
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        <option value="">
                                                            Select Category
                                                        </option>
                                                        <option value="Hair Care">
                                                            Hair Care
                                                        </option>
                                                        <option value="Skin Care">
                                                            Skin Care
                                                        </option>
                                                        <option value="Cosmetic Procedures">
                                                            Cosmetic Procedures
                                                        </option>
                                                        <option value="Weight Management">
                                                            Weight Management
                                                        </option>
                                                    </select>
                                                </div>
                                                {errors.service && (
                                                    <span className="text-red-600">
                                                        {errors.service}
                                                    </span>
                                                )}

                                                <div
                                                    className={`relative border rounded-md p-3 ${
                                                        errors?.email
                                                            ? 'border-red-600'
                                                            : 'border-gray-300'
                                                    }`}
                                                >
                                                    <input
                                                        className="outline-none w-full"
                                                        type="email"
                                                        placeholder="Your Email"
                                                        name="email"
                                                        value={
                                                            formData.email || ''
                                                        }
                                                        onChange={(e) =>
                                                            handleChange(
                                                                'email',
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                    <img
                                                        src={ProfileIcon}
                                                        alt="ProfileIcon"
                                                        className="absolute right-0 top-0 p-5"
                                                    />
                                                </div>
                                                {errors.email && (
                                                    <span className="text-red-600">
                                                        {errors.email}
                                                    </span>
                                                )}

                                                <div
                                                    className={`relative border rounded-md p-3 ${
                                                        errors?.phone
                                                            ? 'border-red-600'
                                                            : 'border-gray-300'
                                                    }`}
                                                >
                                                    <input
                                                        className="outline-none w-full"
                                                        type="number"
                                                        name="phone"
                                                        placeholder="Phone Number"
                                                        value={
                                                            formData.phone || ''
                                                        }
                                                        onChange={(e) =>
                                                            handleChange(
                                                                'phone',
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                    <img
                                                        src={PhoneIcon}
                                                        alt="PhoneIcon"
                                                        className="absolute right-0 top-0 py-4 px-4"
                                                    />
                                                </div>
                                                {errors.phone && (
                                                    <span className="text-red-600">
                                                        {errors.phone}
                                                    </span>
                                                )}

                                                <div
                                                    className={`relative border rounded-md p-3 ${
                                                        errors?.date
                                                            ? 'border-red-600'
                                                            : 'border-gray-300'
                                                    }`}
                                                >
                                                    <input
                                                        className="outline-none w-full px-1 opacity-50"
                                                        type="date"
                                                        name="date"
                                                        placeholder="Date of Appointment"
                                                        onChange={(e) =>
                                                            handleChange(
                                                                'date',
                                                                e.target.value
                                                            )
                                                        }
                                                        value={
                                                            formData.date || ''
                                                        }
                                                        min={moment().format(
                                                            'YYYY-MM-DD'
                                                        )}
                                                    />
                                                </div>
                                                {errors.date && (
                                                    <span className="text-red-600">
                                                        {errors.date}
                                                    </span>
                                                )}

                                                <div className="flex justify-start py-5">
                                                    <button
                                                        type="submit"
                                                        className="bg-gradient-to-r bg-[#542136] via-pink-700 to-purple-700 text-white text-xs font-medium px-4 py-3 rounded-2xl"
                                                    >
                                                        {isPending
                                                            ? 'Booking...'
                                                            : 'BOOK APPOINTMENT NOW'}
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    ) : (
                                        <div className="text-center text-2xl text-purple-800 font-semibold">
                                            Your appointment has been booked
                                            successfully.
                                        </div>
                                    )}
                                </div>
                                <div className="relative p-10 md:p-6"></div>
                            </div>
                        </div>
                    </div>
                </>
            )}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </>
    )
}

export default BookAppointmentForm
