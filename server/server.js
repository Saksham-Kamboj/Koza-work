import path from 'path'
import express from 'express'
import nodemailer from 'nodemailer'
import cors from 'cors'
import dotenv from 'dotenv'
import colors from 'colors'

const __dirname = path.resolve()

dotenv.config()

const app = express()

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(express.json())

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.REACT_APP_EMAIL,
        pass: process.env.REACT_APP_PASSWORD,
    },
})

// Route to send email for appointment booking
app.post('/api/sendEmail', (req, res) => {
    const { email, service, date, phone } = req.body

    // Validate the input
    if (!email || !service || !date || !phone) {
        return res.status(400).json({ error: 'All fields are required.' })
    }

    const mailOptions = {
        from: process.env.REACT_APP_EMAIL,
        to: email,
        subject: 'Book an Appointment',
        text: `Customer ${service} wants to book an appointment for ${date}. Customer Mobile No: ${phone}`,
    }

    // Send the email
    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            console.error('Error sending email:', error)
            return res.status(500).json({ error: 'Failed to send email.' })
        }
        res.status(200).json({ message: 'Email sent successfully' })
    })
})

// Route to send email from the contact form
app.post('/api/contactEmail', (req, res) => {
    const { Subject, email, phone, Message } = req.body

    // Validate the input
    if (!Subject || !email || !phone || !Message) {
        return res.status(400).json({ error: 'All fields are required.' })
    }

    const mailOptions = {
        from: process.env.REACT_APP_EMAIL,
        to: email, // Send to your own email
        subject: `Contact Us Form: ${Subject}`,
        text: `You have received a new message from ${email}.\n\nPhone: ${phone}\n\nMessage: ${Message}`,
    }

    // Send the email
    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            console.error('Error sending email:', error)
            return res.status(500).json({ error: 'Failed to send email.' })
        }
        res.status(200).json({ message: 'Email sent successfully' })
    })
})

app.use(express.static(path.join(__dirname, '/client/build')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})

// Start the server
const port = 5000
app.listen(process.env.PORT || port, () =>
    console.log(
        `Server running on port ${process.env.PORT || port}`.bgMagenta.bold
    )
)
