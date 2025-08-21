const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // Or any other port you prefer

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json({ limit: '100mb' })); // Parse JSON request bodies with increased limit
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true })); // Handle URL-encoded bodies with increased limit

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
    const { location, incidentDetails, imageName, imageData } = req.body; // location, imageName and imageData are optional

    if (!incidentDetails) {
        return res.status(400).json({ message: 'Incident details are required.' });
    }

    let htmlBody = `
        <p><strong>Location:</strong> ${location || 'N/A'}</p>
        <p><strong>Incident Details:</strong></p>
        <p>${incidentDetails.replace(/\n/g, '<br>')}</p>
        <p>This report was submitted anonymously through the Anti-Ragging System.</p>
    `;

    const mailOptions = {
        from: '230171601177@crescent.education', // Sender address
        to: '230171601177@crescent.education', // Recipient email
        subject: 'Anonymous Ragging Report',
        html: htmlBody,
        attachments: []
    };

    if (imageData && imageName) {
        // Remove the "data:image/png;base64," prefix if it exists
        const base64Data = imageData.replace(/^data:image\/\w+;base64,/, "");
        const cid = 'uniqueImage@crescent.education'; // Unique Content ID for embedding

        mailOptions.attachments.push({
            filename: imageName,
            content: base64Data,
            encoding: 'base64',
            cid: cid // Link to the image in HTML
        });

        htmlBody += `<p><img src="cid:${cid}" alt="Attached Image"></p>`;
        mailOptions.html = htmlBody; // Update html body with image
    }

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

// API endpoint for sending personal complaints
app.post('/send-personal-complaint', async (req, res) => {
    const { fullName, studentId, contactEmail, incidentDetails } = req.body;

    if (!fullName || !contactEmail || !incidentDetails) {
        return res.status(400).json({ message: 'Full Name, Contact Email, and Incident Details are required.' });
    }

    const emailBody = `Full Name: ${fullName}\nStudent ID: ${studentId || 'N/A'}\nContact Email: ${contactEmail}\n\nIncident Details:\n${incidentDetails}\n\nThis complaint was submitted through the Anti-Ragging System.`;

    const mailOptions = {
        from: '230171601177@crescent.education', // Sender address
        to: '230171601177@crescent.education', // Recipient email
        subject: 'Personal Ragging Complaint',
        text: emailBody
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Personal complaint email sent successfully!');
        res.status(200).json({ message: 'Personal complaint sent successfully!' });
    } catch (error) {
        console.error('Error sending personal complaint email:', error);
        let errorMessage = 'Failed to send personal complaint.';
        errorMessage += ` ${error.message}`;
        res.status(500).json({ message: errorMessage });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
});
