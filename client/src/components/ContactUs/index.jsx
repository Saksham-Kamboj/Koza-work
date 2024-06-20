import Footer from '../layout/footer'
import Header from '../layout/header'
import appointmentPic from '../../assets/homeImg/AppointmentPic.png'
import ContactForm from './contactUsForm'

const ReadMore = () => {
    return (
        <>
            <Header />
            <ContactForm appointmentPic={appointmentPic} isReversed />
            <Footer />
        </>
    )
}
export default ReadMore
