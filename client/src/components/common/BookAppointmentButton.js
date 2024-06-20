import React from 'react'
import { Link } from 'react-router-dom'
// import BookAppointmentForm from './BookAppointmentForm'

const BookAppointmentButton = ({ onClick }) => {
    
    return (
        <>
            <Link smooth className="flex justify-end">
                <button
                    className="bg-gradient-to-r from-[#39063F] from-2.3% via-[#7C3057] via-72.44% to-[#602639] to-97.51% text-[#fff] text-base font-semibold text-[12.33px] px-4 py-3 rounded-2xl"
                    onClick={onClick}
                >
                    BOOK APPOINTMENT NOW
                </button>
            </Link>
            
        </>
    )
}

export default BookAppointmentButton

// const [isModalOpen, setIsModalOpen] = React.useState(false)
// {
//     /* <BookAppointmentButton onClick={() => handleBookAppointmentClick(setIsModalOpen) }/> */
// }
