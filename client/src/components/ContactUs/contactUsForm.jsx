import React, { useState } from 'react'
import cx from 'classnames'
import ProfileIcon from '../../assets/ProfImg.png'
import PhoneIcon from '../../assets/Mobile.png'
import MapSlider from './mapSlider'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ContactForm = ({ hideFogEffect, isReversed, appointmentPic }) => {
    const [isPending, setIsPending] = useState(false)
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [formData, setFormData] = useState({
        Subject: '',
        email: '',
        phone: '',
        Message: '',
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
        if (!formData?.Message) {
            errors.Message = 'Message is required'
        }
        if (!formData?.Subject) {
            errors.Subject = 'Subject is required'
        }

        return errors
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const notifyA = () => toast.error('Error sending email')
        const notifyB = () => toast.success('Email sent successfully')
        setIsPending(true)

        const errors = validateForm()
        if (Object.keys(errors).length === 0) {
            try {
                const response = await fetch(`${baseUrl}/api/contactEmail`, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        Subject: formData.Subject,
                        email: formData.email,
                        phone: formData.phone,
                        Message: formData.Message,
                    }),
                })

                if (response.ok) {
                    setErrors({})
                    setIsPending(false)
                    setFormData({
                        Subject: '',
                        email: '',
                        phone: '',
                        Message: '',
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
        // if (Object.keys(errors).length === 0) {
        //     console.log('Form Data:', formData)
        //     setErrors({})
        //     setFormSubmitted(true)
        // } else {
        //     setErrors(errors)
        // }
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

    return (
        <>
            <div id="book-appointment" className="sm:pb-24 lg:py-5">
                <div className="mt-10 text-center relative ">
                    <p className="text-[28px] lg:text-[36px] xl:text-[40px] font-semibold leading-[50px] text-[#060606]">
                        Contact Us
                    </p>
                    <p className="text-[#3e3e3e] text-[14px] lg:text-[18px] font-normal my-3">
                        Please Fill the Form to Contact Us
                    </p>
                    <div className="hidden xl:block absolute right-24 top-5 italic text-[#ccc] font-normal text-[32px] leading-10">
                        <p className="pr-[108px]">Let’s</p>
                        <p>Get in Touch</p>
                    </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-2 justify-stretch py-4 ">
                    <div className="flex md:block md:translate-y-[20%] gap-x-2 p-2 h-[100%] w-full md:w-[90%] justify-center items-center">
                        {!formSubmitted ? (
                            <form className="px-6 " onSubmit={handleSubmit}>
                                <div className="flex flex-col justify-center gap-3 ">
                                    <div
                                        className={cx(
                                            'relative border rounded-md p-3 border-[#D3D3D3]',
                                            {
                                                'border-[1px] border-[#af4141]':
                                                    errors?.Subject,
                                            }
                                        )}
                                    >
                                        <input
                                            name="subject"
                                            className="w-full focus:outline-none opacity-50 capitalize"
                                            value={formData.Subject || ''}
                                            onChange={(e) =>
                                                handleChange(
                                                    'Subject',
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Subject "
                                        ></input>
                                    </div>
                                    {errors.Subject && (
                                        <span className="text-[#af4141]">
                                            {errors.Subject}
                                        </span>
                                    )}

                                    <div
                                        className={cx(
                                            'relative border rounded-md p-3 border-[#D3D3D3]',
                                            {
                                                'border-[1px] border-[#af4141]':
                                                    errors?.email,
                                            }
                                        )}
                                    >
                                        <input
                                            className="outline-none h-5 w-full "
                                            type="email"
                                            placeholder="Your Email"
                                            name="email"
                                            value={formData.email || ''}
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
                                            className="absolute z-10 right-0 top-0 p-5"
                                        />
                                    </div>
                                    {errors.email && (
                                        <span className="text-[#af4141]">
                                            {errors.email}
                                        </span>
                                    )}
                                    <div
                                        className={cx(
                                            'relative border rounded-md p-3 border-[#D3D3D3]',
                                            {
                                                'border-[1px] border-[#af4141]':
                                                    errors.phone,
                                            }
                                        )}
                                    >
                                        <input
                                            className="outline-none h-5 w-full  "
                                            type="text"
                                            name="phone"
                                            placeholder="Phone Number"
                                            value={formData.phone || ''}
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
                                            className="absolute z-10 right-0 top-0 py-4 px-4  "
                                        />
                                    </div>
                                    {errors.phone && (
                                        <span className="text-[#af4141]">
                                            {errors.phone}
                                        </span>
                                    )}
                                    <div
                                        className={cx(
                                            'relative border rounded-md p-3 border-[#D3D3D3]',
                                            {
                                                'border-[1px] border-[#af4141]':
                                                    errors?.Message,
                                            }
                                        )}
                                    >
                                        <input
                                            className="outline-none h-5 w-full px-1 opacity-50 "
                                            type="text"
                                            name="message"
                                            placeholder="Message"
                                            onChange={(e) =>
                                                handleChange(
                                                    'Message',
                                                    e.target.value
                                                )
                                            }
                                            value={formData.Message || ''}
                                        />
                                    </div>
                                    {errors.Message && (
                                        <span className="text-[#af4141]">
                                            {errors.Message}
                                        </span>
                                    )}
                                    <div className="flex justify-start py-5">
                                        <button
                                            type="submit"
                                            className="bg-gradient-to-r from-[#39063F] from-2.3% via-[#7C3057] via-72.44% to-[#602639] to-97.51% text-[#fff] text-[12px] font-medium  px-4 py-3 rounded-2xl"
                                        >
                                            {isPending
                                                ? 'Sending...'
                                                : 'Send Message'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        ) : (
                            <div className="text-center text-[24px] text-[#39063F] font-semibold  ">
                                Your Message is delivered Successfully.
                            </div>
                        )}
                    </div>

                    <div
                        className={cx(
                            'flex flex-wrap object-contain overflow-hidden justify-center relative p-10',
                            {
                                'row-start-1 px-2 md:px-0': isReversed,
                            }
                        )}
                    >
                        <div>
                            <img
                                src={appointmentPic}
                                alt="pic"
                                className="object-contain sm:px-0 px-3"
                            />
                            <div
                                className={cx('m-0 p-0', {
                                    hidden: hideFogEffect,
                                })}
                            >
                                <div className="absolute right-0 w-20 lg:w-36 h-[330px] md:h-[200px] xl:h-[446px] bg-gradient-to-l from-[#fff] from-30%"></div>

                                <div className="absolute bottom-0 h-10 md:h-36 w-[500px] md:w-[390px] lg:w-[490px] xl:w-[720px] bg-gradient-to-t from-[#fff] from-30%"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" w-full">
                <MapSlider />
            </div>
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

export default ContactForm
