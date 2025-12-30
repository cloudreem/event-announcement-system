const API_BASE = 'https://YOUR-API-ID.execute-api.us-east-1.amazonaws.com/prod';  // ← REPLACE WITH YOUR API GATEWAY URL

const EVENTS_JSON_URL = 'https://YOUR-BUCKET.s3-website-us-east-1.amazonaws.com/events.json';  // ← REPLACE WITH YOUR S3 WEBSITE URL + /events.json

async function loadEvents() {
    try {
        const cacheBuster = new Date().getTime();
        const response = await fetch(`${EVENTS_JSON_URL}?t=${cacheBuster}`);
        
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const events = await response.json();
        
        events.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        const list = document.getElementById('eventsList');
        list.innerHTML = '';
        
        if (events.length === 0) {
            list.innerHTML = '<li>No events announced yet.</li>';
            return;
        }
        
        events.forEach(event => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${event.title}</strong> — ${event.date}<br>${event.description || ''}`;
            list.appendChild(li);
        });
        
    } catch (err) {
        console.error('Error loading events:', err);
        document.getElementById('eventsList').innerHTML = '<li>Could not load events. Check connection.</li>';
    }
}

async function subscribe() {
    const email = document.getElementById('email').value.trim();
    if (!email) {
        document.getElementById('subMsg').textContent = 'Please enter a valid email.';
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/subscribe`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email})
        });
        
        const data = await response.json();
        document.getElementById('subMsg').textContent = data.message || 'Subscription request sent! Check your email.';
        
    } catch (err) {
        console.error('Subscribe error:', err);
        document.getElementById('subMsg').textContent = 'Network error. Try again later.';
    }
}

async function createEvent() {
    const eventData = {
        title: document.getElementById('title').value.trim(),
        description: document.getElementById('desc').value.trim(),
        date: document.getElementById('date').value
    };
    
    if (!eventData.title || !eventData.date) {
        document.getElementById('eventMsg').textContent = 'Title and date are required.';
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/create-event`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(eventData)
        });
        
        const data = await response.json();
        document.getElementById('eventMsg').textContent = data.message || 'Event announced successfully!';
        
        // Clear form
        document.getElementById('title').value = '';
        document.getElementById('desc').value = '';
        document.getElementById('date').value = '';
        
        loadEvents();  // Refresh list with new event
        
    } catch (err) {
        console.error('Create event error:', err);
        document.getElementById('eventMsg').textContent = 'Network error. Try again later.';
    }
}

// Attach listeners and load events
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('subscribeBtn').addEventListener('click', subscribe);
    document.getElementById('createEventBtn').addEventListener('click', createEvent);
    loadEvents();
});
