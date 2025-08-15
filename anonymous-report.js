document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        const incidentDetails = document.getElementById('incidentDetails').value;
        const recipientEmail = '230171601177@crescent.education';
        const subject = 'Anonymous Ragging Report';
        const body = `Incident Details:\n${incidentDetails}\n\nThis report was submitted anonymously through the Anti-Ragging System.`;

        // In a real application, this data would be sent to a backend server
        // which would then securely email the details to the recipient.
        // For this static website, we simulate the submission and inform the user.

        alert(`Anonymous report submitted!\n\nIn a real system, these details would be securely sent to:\n${recipientEmail}\n\nThank you for your report.`);

        // Optionally, clear the form after "submission"
        form.reset();
    });
});
