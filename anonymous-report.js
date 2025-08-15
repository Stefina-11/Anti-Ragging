document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        const incidentDetails = document.getElementById('incidentDetails').value;
        const imageInput = document.getElementById('imageUpload');
        const imageFile = imageInput.files[0]; // Get the selected image file

        const data = {
            incidentDetails: incidentDetails,
            imageName: imageFile ? imageFile.name : null // Send image name if file exists
        };

        // Send data to the backend server
        fetch('http://localhost:3000/send-anonymous-report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert(`Anonymous report submitted: ${data.message}`);
            } else {
                alert('Anonymous report submitted successfully!');
            }
            form.reset(); // Clear the form after submission
        })
        .catch((error) => {
            console.error('Error:', error);
            // Check if the error object has a message from the backend
            if (error.message) {
                alert(`Failed to submit anonymous report: ${error.message}`);
            } else {
                alert('Failed to submit anonymous report. Please ensure the backend server is running and configured correctly.');
            }
        });
    });
});
