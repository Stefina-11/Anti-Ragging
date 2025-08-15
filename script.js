document.addEventListener('DOMContentLoaded', () => {
    const anonymousReportButton = document.getElementById('anonymousReport');
    const personalComplaintButton = document.getElementById('personalComplaint');
    const chatbotButton = document.getElementById('chatbot');
    const contactInfoButton = document.getElementById('contactInfo');

    anonymousReportButton.addEventListener('click', () => {
        window.location.href = 'anonymous-report.html';
    });

    personalComplaintButton.addEventListener('click', () => {
        window.location.href = 'personal-complaint.html';
    });

    chatbotButton.addEventListener('click', () => {
        window.location.href = 'chatbot.html';
    });

    contactInfoButton.addEventListener('click', () => {
        window.location.href = 'contact.html';
    });
});
