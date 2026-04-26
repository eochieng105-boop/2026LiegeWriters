const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// Configure your email transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'liegewriters6000@gmail.com', // Your Gmail address
        pass: 'YOUR_APP_PASSWORD' // Use an App Password, not your Gmail password
    }
});

app.post('/api/send-email', async (req, res) => {
    const { name, email, subject, message } = req.body;
    try {
        await transporter.sendMail({
            from: email,
            to: 'liegewriters6000@gmail.com',
            subject: subject,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        });
        res.status(200).json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to send email.', error });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
