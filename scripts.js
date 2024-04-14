
document.addEventListener('DOMContentLoaded', () => {
    const buttonsContainer = document.getElementById('buttons');
    const phaseDetailsContainer = document.getElementById('phase-details');
   

    function toggleTheme() {
        const body = document.body;
        body.classList.toggle('dark-theme');
        if (body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    }
    
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    
    // Check for stored theme preference
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
    

    // Fetch data from JSON server for a specific phase
    async function fetchPhaseData(phaseName) {
        try {
            const response = await fetch('http://localhost:3000/phases');
            const data = await response.json();
            const phase = data.find(phase => phase.name === phaseName);
            return phase;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Display phase details
    function displayPhaseDetails(phase) {
        phaseDetailsContainer.innerHTML = `
            <h2>${phase.name}</h2>
            <p>Date: ${phase.date}</p>
            <p>Next Phase: ${phase.nextPhase}</p>
            <p>Description: ${phase.description}</p>
        `;
    }

    // Create buttons for each phase
    async function createPhaseButtons() {
        try {
            const response = await fetch('http://localhost:3000/phases');
            const data = await response.json();
            data.forEach(phase => {
                const button = document.createElement('button');
                button.textContent = phase.name;
                button.classList.add('phase-button'); // Add a class for styling
                button.addEventListener('click', async () => {
                    const phaseData = await fetchPhaseData(phase.name);
                    displayPhaseDetails(phaseData);
                });
                buttonsContainer.appendChild(button);
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Initialize the app
    createPhaseButtons();
});