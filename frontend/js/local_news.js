// frontend/js/local_news.js
document.addEventListener('DOMContentLoaded', () => {
    const itemsContainer = document.getElementById('items-container');

    // CORRECTED: Fetch from the /api/events/ endpoint
    fetch('http://127.0.0.1:8000/api/events/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(events => { // Changed variable name to be more descriptive
            // CORRECTED: Check if the container exists before using it
            if (!itemsContainer) {
                console.error('Error: Could not find element with id "items-container"');
                return;
            }

            // Clear any loading text
            itemsContainer.innerHTML = '';

            events.forEach(event => {
                const itemElement = document.createElement('div');
                itemElement.className = 'item'; // This class is not used, but keeping it

                // CORRECTED: Use JavaScript template literals `${...}` instead of `{{...}}`
                // Also, ensure you are creating valid table rows if you intend to put this in a table.
                // For now, creating a simple card-like structure.
                itemElement.innerHTML = `
                    <div class="p-4 mb-4 border rounded-lg shadow-sm">
                        <h3 class="text-xl font-bold">${event.event_name || 'Unnamed Event'}</h3>
                        <p class="text-gray-600">${event.event_description || ''}</p>
                        <div class="text-sm text-gray-500 mt-2">
                            <p><strong>Address:</strong> ${event.address || 'N/A'}</p>
                            <p><strong>Starts:</strong> ${event.start_time ? new Date(event.start_time).toLocaleString() : 'N/A'}</p>
                            <p><strong>Fee:</strong> ${event.fee || 'N/A'}</p>
                            <a href="${event.url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">More Info</a>
                        </div>
                    </div>
                `;
                itemsContainer.appendChild(itemElement);
            });
        })
        .catch(error => {
            console.error('There was a problem fetching the events:', error);
            if (itemsContainer) {
                itemsContainer.innerHTML = '<p>Could not load events from the server.</p>';
            }
        });
});