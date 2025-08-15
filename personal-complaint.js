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
        // For this static website, we simulate the submission and inform the user.

        alert(`Personal complaint submitted!\n\nIn a real system, these details would be securely sent to:\n${recipientEmail}\n\nThank you for your complaint.`);

        // Optionally, clear the form after "submission"
        form.reset();
    });
});
