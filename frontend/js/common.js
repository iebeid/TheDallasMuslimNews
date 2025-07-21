// Function to get current date and format it
function updateDate() {
    const dateElement = document.getElementById('current-date-display');
    if (dateElement) {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = now.toLocaleDateString('en-US', options);
    }
}

// Call the function when the DOM is fully loaded on any page using common.js
document.addEventListener('DOMContentLoaded', updateDate);