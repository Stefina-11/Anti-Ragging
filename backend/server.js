const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // Or any other port you prefer

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON request bodies

// Configure Nodemailer transporter
// Replace with your actual email service credentials
const transporter = nodemailer.createTransport({
    service: 'gmail', // e.g., 'gmail', 'outlook', 'yahoo'
    auth: {
        user: '230171601177@crescent.education', // Your email address
        pass: 'hael szsy cfwo ttcc' // IMPORTANT: You need to generate an application-specific password from your Google Account security settings and replace 'StefinaE@2006' with it.
    }
});

// API endpoint for sending anonymous reports
app.post('/send-anonymous-report', async (req, res) => {
    const { incidentDetails, imageName } = req.body; // imageName is optional

    if (!incidentDetails) {
        return res.status(400).json({ message: 'Incident details are required.' });
    }

    let emailBody = `Incident Details:\n${incidentDetails}\n\nThis report was submitted anonymously through the Anti-Ragging System.`;

    if (imageName) {
        emailBody += `\n\nImage attached: ${imageName} (Note: In a real application, the image would be uploaded to a server and a link provided here.)`;
    }

    const mailOptions = {
        from: '230171601177@crescent.education', // Sender address
        to: '230171601177@crescent.education', // Recipient email
        subject: 'Anonymous Ragging Report',
        text: emailBody
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
        res.status(200).json({ message: 'Anonymous report sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        let errorMessage = 'Failed to send anonymous report.';
        // If authentication was previously required, this error might indicate a missing app password.
        // Now, it might indicate issues with the SMTP server configuration or network.
        errorMessage += ` ${error.message}`;
        res.status(500).json({ message: errorMessage });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
});
