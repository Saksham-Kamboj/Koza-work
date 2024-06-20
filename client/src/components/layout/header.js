import React, { useState } from 'react'
import BookAppointmentForm, {
    handleBookAppointmentClick,
} from '../common/BookAppointmentForm.js'
import Navbar from './navbar'
import kozaLogo from '../../assets/navImg/KOZAUpdated.png'
import help from '../../assets/help.png'
import { NavLink } from 'react-router-dom'
import MenuIcon from '../../assets/navImg/menu.png'
import cx from 'classnames'
import frontlogo from '../../assets/navImg/logo.png'
import Logo from '../../assets/navImg/secondLogo.png'
import cross from '../../assets/navImg/cross.png'
import phone from '../../assets/navImg/phone.png'
import calender from '../../assets/navImg/calender.png'
import Opendrawer from '../layout/optionrule.js'
import appointmentPic from '../../assets/homeImg/AppointmentPic.png'
import BookAppointmentButton from '../common/BookAppointmentButton.js'

const Header = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false)
    const activeClass = 'font-medium opacity-100'
    const inactiveClass =
        'opacity-[80%] text-[#353535] cursor-pointer text-[16px] border-black-500'
    const dotClass = 'border-2 border-[#fff]'

    const [nav, setNav] = useState(false)

    const handleClick = () => {
        setNav(!nav)
    }

    const handelColse = () => {
        setNav(!nav)
    }

    const data = [
        {
            title: 'Weight Management',
            details: [
                { detail: 'Weight loss and gain', Link: '/weight-management' },
                { detail: 'Inch loss', Link: '/inchLoss' },
                {
                    detail: 'Cryo cool sculpting',
                    Link: '/cryocool',
                },
            ],
        },
        {
            title: 'Skin',
            details: [
                {
                    detail: 'Skin tone and pigmentation',
                    Link: '/skin',
                },
                { detail: 'Acne and acne scars', Link: '/acne-acne-scars' },
                { detail: 'Anti ageing', Link: '/anti-ageing' },
                { detail: 'Dark circles', Link: '/dark-circles' },
            ],
        },
        {
            title: 'Hair',
            details: [
                {
                    detail: 'Anti dandruff and hair fall',
                    Link: '/antiDandruff',
                },
                {
                    detail: 'Hair transplantation',
                    Link: '/hairTransplant',
                },
            ],
        },
    ]
    const MobileMenus = ({ label = '', onClick, to = '' }) => {
        return (
            <div className="border-b-[1px] w-full border-[#000]/20 py-3 pl-3">
                <NavLink
                    to={to}
                    onClick={onClick}
                    className={({ isActive }) =>
                        isActive ? `${activeClass} ${dotClass}` : inactiveClass
                    }
                >
                    {label}
                </NavLink>
            </div>
        )
    }
    return (
        <>
            <div className="bg-white sticky top-0 z-50 ">
                {/* header on lg screen */}

                <div className="hidden lg:flex  px-3 xl:px-10 ">
                    <div className=" w-[40%]">
                        <a href="/" target="_self" rel="noopener noreferrer">
                            <img src={Logo} alt="logo" className="h-16" />
                        </a>
                    </div>
                    <div className="w-[60%] flex justify-end items-center gap-x-8 px-3 ">
                        <NavLink
                            to="tel:+9606009079"
                            className="flex justify-end cursor-pointer"
                        >
                            <img src={help} alt="help" className="" />
                            <span className="text-[#000000] font-semibold">
                                (+91) 960 600 9079
                            </span>
                        </NavLink>
                        <BookAppointmentButton
                            onClick={() =>
                                handleBookAppointmentClick(setIsModalOpen)
                            }
                        />
                    </div>
                </div>
                {/*  header on sm screen */}
                <div
                    onBlur={() => setNav(false)}
                    tabIndex={1}
                    className=" grid grid-cols-2 lg:hidden"
                >
                    <div className="flex p-2 ml-5  ">
                        <img src={kozaLogo} alt="logo" className="h-16" />
                    </div>
                    <div className=" flex justify-center sm:justify-around items-center gap-2    ">
                        <div className="w-[24px] h-[24px]">
                            <NavLink to="tel:+9606009079">
                                <img
                                    src={phone}
                                    alt="phone"
                                    className="cursor-pointer"
                                />
                            </NavLink>
                        </div>
                        <div  onClick={() =>
                                handleBookAppointmentClick(setIsModalOpen)
                            } className="w-[24px] h-[24px]">
                                <img
                                    src={calender}
                                    alt="calendar"
                                    className="cursor-pointer"
                                />
                        </div>
                        {/* <div className=" w-[24px] h-[24px] ">
                            <img
                                src={search}
                                alt="search"
                                className="cursor-pointer"
                            />
                        </div> */}
                        <div>
                            <div className=" ">
                                <div className=" mr-5" onClick={handleClick}>
                                    <img
                                        src={MenuIcon}
                                        alt="memu"
                                        className="cursor-pointer"
                                    />
                                </div>

                                <div
                                    className={cx(
                                        'absolute left-0 top-2  bg-[#fff] z-50 w-[90%] px-1 transition-all duration-300 -translate-x-full',
                                        {
                                            'translate-x-0 ': nav,
                                        }
                                    )}
                                >
                                    <div className=" flex  justify-between items-center px-6 ">
                                        <img
                                            src={frontlogo}
                                            alt="logo"
                                            className="  h-[80%] object-contain "
                                        />
                                        <div>
                                            <img
                                                src={cross}
                                                alt="memu"
                                                onClick={handelColse}
                                                className="cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                    <div className=" gap-y-5  z-50  ">
                                        <MobileMenus
                                            to="/"
                                            onClick={handelColse}
                                            label="Home"
                                        />
                                        <MobileMenus
                                            to="/aboutus"
                                            onClick={handelColse}
                                            label="About Us"
                                        />
                                        {/* <div className="relative">
                                            <div className="border-b-[1px] flex justify-between items-center w-full border-[#000]/20 py-3 pl-3">
                                                <p>Weight Management</p>
                                                <div
                                                    onClick={toggleOpen}
                                                    className="mr-3"
                                                >
                                                    {!open ? (
                                                        <img
                                                            src={arrow}
                                                            alt="memu"
                                                        />
                                                    ) : (
                                                        <img
                                                            src={arrow}
                                                            alt="cross"
                                                            className="rotate-180"
                                                        />
                                                    )}
                                                </div>
                                                {open && (
                                                    <div className="absolute top-10 left-0 w-full bg-[#fff] z-10 mt-2 py-2 px-1">
                                                        <ul className="flex flex-col gap-y-4 ml-4">
                                                            <li>Management</li>
                                                            <li>Management</li>
                                                            <li>Management</li>
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </div> */}
                                        <Opendrawer data={data} />

                                        <MobileMenus
                                            to="/*"
                                            onClick={handelColse}
                                            label="Cosmetic Alternatives"
                                        />
                                        {/* <MobileMenus
                                            to="/cosmetic-procedures"
                                            onClick={handelColse}
                                            label="Cosmetic Procedures"
                                        />
                                        <MobileMenus
                                            to="/cosmetic-dentistry"
                                            onClick={handelColse}
                                            label="Cosmetic Dentistry"
                                        /> */}
                                        <MobileMenus
                                            to="/ContactUs"
                                            onClick={handelColse}
                                            label="ContactUs"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden lg:block sticky top-16 z-10">
                <Navbar />
            </div>
            {isModalOpen && (
                <div className="absolute top-10">
                    <BookAppointmentForm
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                        appointmentPic={appointmentPic}
                    />
                </div>
            )}
        </>
    )
}

export default Header
