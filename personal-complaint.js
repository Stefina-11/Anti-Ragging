document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        const fullName = document.getElementById('fullName').value;
        const studentId = document.getElementById('studentId').value;
        const contactEmail = document.getElementById('contactEmail').value;
        const incidentDetails = document.getElementById('incidentDetails').value;

        const recipientEmail = '230171601177@crescent.education';
        const subject = 'Personal Ragging Complaint';
        const body = `Full Name: ${fullName}\nStudent ID: ${studentId || 'N/A'}\nContact Email: ${contactEmail}\n\nIncident Details:\n${incidentDetails}\n\nThis complaint was submitted through the Anti-Ragging System.`;

        // In a real application, this data would be sent to a backend server
        // which would then securely email the details to the recipient.
        // Send data to the backend
        fetch('http://localhost:3000/send-personal-complaint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fullName, studentId, contactEmail, incidentDetails }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert(data.message);
                form.reset(); // Clear the form on success
            } else {
                alert('An unknown error occurred.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to submit personal complaint. Please try again later.');
        });
    });
});
