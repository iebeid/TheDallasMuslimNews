const eventsData = [
    {
        name: "ISNA Day Dallas: Seeds of Knowledge",
        date: "2025-05-03",
        time: "10:00 AM - 5:00 PM",
        venue: "Richardson Convention Center",
        address: "411 W Arapaho Rd, Richardson, TX 75080",
        organizer: "ISNA",
        description: "An educational seminar focusing on contemporary issues and Islamic scholarship. Keynote speakers and workshops.",
        cost: "$25 Early Bird, $35 Regular",
        registrationLink: "#",
        type: "Educational",
        sourceUrl: "https://example.com/isna-day"
    },
    {
        name: "Marriage Matters: Faith & Connection",
        date: "2025-05-10",
        time: "1:00 PM - 4:00 PM",
        venue: "East Plano Islamic Center (EPIC)",
        address: "1350 Star Ct, Plano, TX 75074",
        organizer: "EPIC & Community Scholars",
        description: "Workshop for couples and singles on building strong, faith-centered marriages. Interactive sessions.",
        cost: "$15 per person, $25 per couple",
        registrationLink: "#",
        type: "Educational",
        sourceUrl: "https://example.com/epic-marriage"
    },
    {
        name: "Proposal Muslim Singles Eid Event",
        date: "2025-06-28",
        time: "6:00 PM - 9:00 PM",
        venue: "Dallas Palms",
        address: "2424 Marsh Ln, Carrollton, TX 75006",
        organizer: "Proposal App",
        description: "A special Eid gathering for Muslim singles to connect and network in a relaxed environment.",
        cost: "$50",
        registrationLink: "#",
        type: "Social",
        sourceUrl: "https://example.com/proposal-eid"
    },
    {
        name: "Mama and Me! Storytime & Crafts",
        date: "2025-05-07",
        time: "10:30 AM - 11:30 AM",
        venue: "IANT Quran Academy",
        address: "840 Abrams Rd, Richardson, TX 75081",
        organizer: "IANT Sister's Committee",
        description: "Weekly interactive session for mothers and young children (ages 2-5) featuring Islamic stories and crafts.",
        cost: "Free",
        registrationLink: "#",
        type: "Family",
        sourceUrl: "https://example.com/iant-mama"
    },
     {
        name: "Youth Halaqa Circle",
        date: "2025-05-04",
        time: "After Asr Prayer (Approx. 6:00 PM)",
        venue: "Islamic Center of Irving (ICI)",
        address: "2555 N Esters Rd, Irving, TX 75062",
        organizer: "ICI Youth Group",
        description: "Weekly discussion circle for youth (ages 13-18) on relevant Islamic topics and life skills.",
        cost: "Free",
        registrationLink: "#",
        type: "Family",
        sourceUrl: "https://example.com/ici-youth"
    },
    {
        name: "IACC Summer Camp Registration Opens",
        date: "2025-05-01",
        time: "All Day (Online)",
        venue: "Islamic Association of Collin County (IACC)",
        address: "6401 Independence Pkwy, Plano, TX 75023",
        organizer: "IACC",
        description: "Registration opens for IACC's popular summer camp program offering Islamic studies, sports, and fun activities for kids.",
        cost: "Varies by program",
        registrationLink: "#",
        type: "Family",
        sourceUrl: "https://example.com/iacc-camp"
    },
    {
        name: "Feed Children Everywhere - Volunteer Day",
        date: "2025-06-07",
        time: "9:00 AM - 12:00 PM",
        venue: "EPIC Masjid Parking Lot",
        address: "1350 Star Ct, Plano, TX 75074",
        organizer: "EPIC Outreach",
        description: "Join us to pack meals for underprivileged children in the local community. All ages welcome.",
        cost: "Free (donations appreciated)",
        registrationLink: "#",
        type: "Community",
        sourceUrl: "https://example.com/epic-feed"
    },
    {
        name: "TheMuslimCollective: Faith & Founders",
        date: "2025-06-14",
        time: "2:00 PM - 6:00 PM",
        venue: "The Slate, Dallas",
        address: "2403 Flora St, Dallas, TX 75201",
        organizer: "TheMuslimCollective",
        description: "An event for Muslim entrepreneurs, innovators, and tech enthusiasts to connect, learn, and discuss faith-based technology.",
        cost: "$40",
        registrationLink: "#",
        type: "Professional",
        sourceUrl: "https://example.com/muslimcollective"
    },
    {
        name: "Yaqeen DFW Community Iftar",
        date: "2025-05-17",
        time: "7:30 PM (Sunset)",
        venue: "Frisco Masjid (IECF)",
        address: "7700 Main St, Frisco, TX 75034",
        organizer: "Yaqeen Institute & DFW Masjids",
        description: "A community Iftar (breaking of fast) event with a short talk by Yaqeen scholars. Pre-Ramadan event.",
        cost: "Free (RSVP Required)",
        registrationLink: "#",
        type: "Social",
        sourceUrl: "https://example.com/yaqeen-iftar"
    },
    {
        name: "Islamic Relief Grand Iftar Dallas",
        date: "2025-05-24",
        time: "7:00 PM",
        venue: "Hyatt Regency Dallas",
        address: "300 Reunion Blvd, Dallas, TX 75207",
        organizer: "Islamic Relief USA",
        description: "Fundraising Iftar to support humanitarian projects worldwide. Special guest speakers. Pre-Ramadan event.",
        cost: "$75 per person, $700 per table",
        registrationLink: "#",
        type: "Community",
        sourceUrl: "https://example.com/ir-iftar"
    },
    {
        name: "Mukhtasar Minhaj Al Qasidin Lecture Series",
        date: "2025-05-05",
        time: "After Isha Prayer (Approx. 9:00 PM)",
        venue: "Islamic Association of North Texas (IANT)",
        address: "840 Abrams Rd, Richardson, TX 75081",
        organizer: "IANT Education Committee",
        description: "Ongoing weekly lecture series explaining 'Mukhtasar Minhaj Al Qasidin' (The Summary of the Path of the Worshippers).",
        cost: "Free",
        registrationLink: "#",
        type: "Educational",
        sourceUrl: "https://example.com/iant-lecture"
    },
    {
        name: "Quran Memorization Program (Adults)",
        date: "2025-06-02",
        time: "7:00 PM - 8:30 PM (Mon & Wed)",
        venue: "IACC Quran Institute",
        address: "6401 Independence Pkwy, Plano, TX 75023",
        organizer: "IACC",
        description: "Structured Quran memorization (Hifz) and Tajweed program for adult learners. New session starting.",
        cost: "$100 per month",
        registrationLink: "#",
        type: "Educational",
        sourceUrl: "https://example.com/iacc-quran"
    },
    {
        name: "Dallas Muslims Social Club: Paintball Challenge",
        date: "2025-06-21",
        time: "1:00 PM - 4:00 PM",
        venue: "DFW Adventure Park",
        address: "13055 Cleveland Gibbs Rd, Roanoke, TX 76262",
        organizer: "Dallas Muslims Social Club",
        description: "An afternoon of friendly paintball competition and team building. All skill levels welcome.",
        cost: "$45 (includes gear)",
        registrationLink: "#",
        type: "Social",
        sourceUrl: "https://example.com/dmsc-paintball"
    },
    {
        name: "MAS Dallas Special Needs Awareness Day",
        date: "2025-05-18",
        time: "2:00 PM - 5:00 PM",
        venue: "MAS Islamic Center of Dallas",
        address: "1515 Blake Dr, Richardson, TX 75081",
        organizer: "MAS Dallas & Muhsen",
        description: "Event to raise awareness and support for community members with special needs. Information sessions and activities.",
        cost: "Free",
        registrationLink: "#",
        type: "Special",
        sourceUrl: "https://example.com/mas-muhsen"
    },
    {
        name: "Muslim Singles DFW Meet & Greet",
        date: "2025-06-08",
        time: "3:00 PM - 5:00 PM",
        venue: "Local Coffee House (TBA)",
        address: "Dallas, TX (Venue revealed upon RSVP)",
        organizer: "Muslim Singles DFW Meetup Group",
        description: "Casual meetup for Muslim singles in the DFW area to socialize and network.",
        cost: "Free (purchase own refreshments)",
        registrationLink: "#",
        type: "Social",
        sourceUrl: "https://example.com/meetup-singles"
    },
    {
        name: "Islamic Art & Calligraphy Workshop",
        date: "2025-05-31",
        time: "11:00 AM - 2:00 PM",
        venue: "Irving Arts Center",
        address: "3333 N MacArthur Blvd, Irving, TX 75062",
        organizer: "DFW Muslim Artists Collective",
        description: "Introductory workshop on the principles of Islamic art and basic Arabic calligraphy techniques.",
        cost: "$30 (materials included)",
        registrationLink: "#",
        type: "Educational",
        sourceUrl: "https://example.com/islamic-art-workshop"
    },
    {
        name: "DFW Eid Fest 2025 Planning Meeting",
        date: "2025-06-10",
        time: "7:30 PM - 9:00 PM",
        venue: "Online (Zoom)",
        address: "Online",
        organizer: "DFW Eid Festival Committee",
        description: "Open planning meeting for volunteers interested in organizing the annual DFW Eid Festival.",
        cost: "Free",
        registrationLink: "#",
        type: "Community",
        sourceUrl: "https://example.com/eidfest-planning"
    },
     {
        name: "Advanced Tajweed for Sisters",
        date: "2025-05-06",
        time: "6:00 PM - 7:30 PM (Tuesdays)",
        venue: "Online via Zoom",
        address: "Online",
        organizer: "Qalam Institute",
        description: "An advanced course for sisters focusing on intricate rules of Tajweed and recitation practice.",
        cost: "$75 per month",
        registrationLink: "#",
        type: "Educational",
        sourceUrl: "https://example.com/qalam-tajweed"
    },
    {
        name: "Muslim Youth Leadership Summit",
        date: "2025-06-22",
        time: "9:00 AM - 4:00 PM",
        venue: "University of Texas at Dallas (UTD)",
        address: "800 W Campbell Rd, Richardson, TX 75080",
        organizer: "Young Muslim Leaders Initiative",
        description: "A day-long summit for Muslim high school and college students focusing on leadership skills, civic engagement, and community service.",
        cost: "$20 (includes lunch)",
        registrationLink: "#",
        type: "Family",
        sourceUrl: "https://example.com/youth-leadership-summit"
    },
    {
        name: "Refugee Support Drive & Welcome Kits",
        date: "2025-05-25",
        time: "12:00 PM - 3:00 PM",
        venue: "ICNA Relief Dallas Office",
        address: "1200 E Collins Blvd #106, Richardson, TX 75081",
        organizer: "ICNA Relief",
        description: "Collect donations (household items, toiletries) and assemble welcome kits for newly arrived refugee families.",
        cost: "Free (donations needed)",
        registrationLink: "#",
        type: "Community",
        sourceUrl: "https://example.com/icna-refugee-drive"
    }
];

const eventList = document.getElementById('event-list');
const searchInput = document.getElementById('event-search');
const typeFilter = document.getElementById('event-type-filter');
const noEventsMessage = document.getElementById('no-events-message');

const filterAllMonthsBtn = document.getElementById('filter-all-months');
const filterMayBtn = document.getElementById('filter-may');
const filterJuneBtn = document.getElementById('filter-june');
let currentMonthFilter = 'all';
let eventTypeChart = null;

function getMonthName(dateString) {
    const date = new Date(dateString + 'T00:00:00'); // Ensure correct parsing
    return date.toLocaleString('default', { month: 'long' });
}

function updateMonthButtonStyles() {
    [filterAllMonthsBtn, filterMayBtn, filterJuneBtn].forEach(btn => {
        btn.classList.remove('bg-teal-600', 'text-white');
        btn.classList.add('bg-slate-200', 'text-slate-700');
    });
    if (currentMonthFilter === 'all') {
        filterAllMonthsBtn.classList.add('bg-teal-600', 'text-white');
        filterAllMonthsBtn.classList.remove('bg-slate-200', 'text-slate-700');
    } else if (currentMonthFilter === 'May') {
        filterMayBtn.classList.add('bg-teal-600', 'text-white');
        filterMayBtn.classList.remove('bg-slate-200', 'text-slate-700');
    } else if (currentMonthFilter === 'June') {
        filterJuneBtn.classList.add('bg-teal-600', 'text-white');
        filterJuneBtn.classList.remove('bg-slate-200', 'text-slate-700');
    }
}

function renderEvents(filteredEvents) {
    eventList.innerHTML = '';
    if (filteredEvents.length === 0) {
        noEventsMessage.classList.remove('hidden');
    } else {
        noEventsMessage.classList.add('hidden');
    }

    filteredEvents.forEach(event => {
        const card = document.createElement('div');
        card.className = 'event-card bg-white p-6 rounded-lg shadow-md hover:shadow-xl border border-slate-200 flex flex-col';
        card.innerHTML = `
            <h3 class="text-xl font-semibold text-teal-700 mb-2">${event.name}</h3>
            <p class="text-sm text-slate-600 mb-1"><strong class="text-slate-700">Date:</strong> ${new Date(event.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p class="text-sm text-slate-600 mb-1"><strong class="text-slate-700">Time:</strong> ${event.time}</p>
            <p class="text-sm text-slate-600 mb-1"><strong class="text-slate-700">Venue:</strong> ${event.venue}</p>
            <p class="text-sm text-slate-600 mb-3"><strong class="text-slate-700">Address:</strong> ${event.address}</p>
            <p class="text-sm text-slate-600 mb-1"><strong class="text-slate-700">Organizer:</strong> ${event.organizer}</p>
            <p class="text-sm text-slate-700 my-2 flex-grow">${event.description}</p>
            <p class="text-sm text-slate-600 mb-1"><strong class="text-slate-700">Cost:</strong> ${event.cost}</p>
            <p class="text-sm text-slate-500 mb-3"><strong class="text-slate-600">Type:</strong> ${event.type}</p>
            <div class="mt-auto pt-3 border-t border-slate-200">
                <a href="${event.registrationLink}" target="_blank" rel="noopener noreferrer" class="inline-block bg-teal-600 text-white px-4 py-2 rounded-md text-sm hover:bg-teal-700 transition duration-150 ease-in-out">Register / Details</a>
                <a href="${event.sourceUrl}" target="_blank" rel="noopener noreferrer" class="ml-2 text-sm text-teal-600 hover:text-teal-800">Source</a>
            </div>
        `;
        eventList.appendChild(card);
    });
}

function filterAndRenderEvents() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedType = typeFilter.value;

    const filtered = eventsData.filter(event => {
        const matchesSearch = event.name.toLowerCase().includes(searchTerm) ||
                              event.description.toLowerCase().includes(searchTerm) ||
                              event.organizer.toLowerCase().includes(searchTerm) ||
                              event.venue.toLowerCase().includes(searchTerm);
        const matchesType = selectedType === 'all' || event.type === selectedType;
        const eventMonth = getMonthName(event.date);
        const matchesMonth = currentMonthFilter === 'all' || eventMonth === currentMonthFilter;

        return matchesSearch && matchesType && matchesMonth;
    });
    renderEvents(filtered);
}

function setupChart(events) {
    const ctx = document.getElementById('eventTypesChart').getContext('2d');
    const typeCounts = events.reduce((acc, event) => {
        acc[event.type] = (acc[event.type] || 0) + 1;
        return acc;
    }, {});

    const labels = Object.keys(typeCounts);
    const data = Object.values(typeCounts);

    if (eventTypeChart) {
        eventTypeChart.destroy();
    }

    eventTypeChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Number of Events',
                data: data,
                backgroundColor: [
                    'rgba(20, 184, 166, 0.6)', // teal-500
                    'rgba(15, 118, 110, 0.6)', // teal-700
                    'rgba(13, 148, 136, 0.6)', // teal-600
                    'rgba(100, 116, 139, 0.6)', // slate-500
                    'rgba(51, 65, 85, 0.6)', // slate-700
                    'rgba(245, 158, 11, 0.6)', // amber-500
                    'rgba(217, 119, 6, 0.6)' // amber-600
                ],
                borderColor: [
                    'rgba(20, 184, 166, 1)',
                    'rgba(15, 118, 110, 1)',
                    'rgba(13, 148, 136, 1)',
                    'rgba(100, 116, 139, 1)',
                    'rgba(51, 65, 85, 1)',
                    'rgba(245, 158, 11, 1)',
                    'rgba(217, 119, 6, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                },
                x: {
                    ticks: {
                         callback: function(value) {
                            const label = this.getLabelForValue(value);
                            if (label.length > 16) {
                                return label.substring(0,15) + '...';
                            }
                            return label;
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += context.parsed.y;
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });
}


searchInput.addEventListener('input', filterAndRenderEvents);
typeFilter.addEventListener('change', filterAndRenderEvents);

filterAllMonthsBtn.addEventListener('click', () => {
    currentMonthFilter = 'all';
    updateMonthButtonStyles();
    filterAndRenderEvents();
});
filterMayBtn.addEventListener('click', () => {
    currentMonthFilter = 'May';
    updateMonthButtonStyles();
    filterAndRenderEvents();
});
filterJuneBtn.addEventListener('click', () => {
    currentMonthFilter = 'June';
    updateMonthButtonStyles();
    filterAndRenderEvents();
});

document.addEventListener('DOMContentLoaded', () => {
    updateMonthButtonStyles();
    filterAndRenderEvents();
    setupChart(eventsData);
});