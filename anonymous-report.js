document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';

        const location = document.getElementById('location').value;
        const incidentDetails = document.getElementById('incidentDetails').value;
        const imageInput = document.getElementById('imageUpload');
        const imageFile = imageInput.files[0]; // Get the selected image file

        let imageData = null;
        if (imageFile) {
            const reader = new FileReader();
            reader.readAsDataURL(imageFile);
            reader.onload = () => {
                imageData = reader.result; // Base64 string
                sendReport(location, incidentDetails, imageFile.name, imageData);
            };
            reader.onerror = (error) => {
                console.error('Error reading file:', error);
                    alert('Failed to read image file.');
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            };
        } else {
            sendReport(location, incidentDetails, null, null);
        }

        function sendReport(location, incidentDetails, imageName, imageData) {
            const data = {
                location: location,
                incidentDetails: incidentDetails,
                imageName: imageName,
                imageData: imageData // Send Base64 image data
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
            })
            .finally(() => {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            });
        } // Closing brace for sendReport function
    });
});
