// Get elements
const usernameInput = document.getElementById('usernameInput');
const searchBtn = document.getElementById('searchBtn');
const resultBox = document.getElementById('result');
const phoneList = document.getElementById('phoneList');
const resultUsername = document.getElementById('resultUsername');
const loadingBox = document.getElementById('loading');
const errorBox = document.getElementById('error');
const errorMessage = document.getElementById('errorMessage');

// Search button click event
searchBtn.addEventListener('click', searchInstagram);

// Enter key press event
usernameInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchInstagram();
    }
});

async function searchInstagram() {
    const username = usernameInput.value.trim();

    // Validation
    if (!username) {
        showError('Please enter an Instagram username');
        return;
    }

    if (username.length < 2) {
        showError('Username must be at least 2 characters');
        return;
    }

    // Clear previous results
    hideResults();
    showLoading();

    try {
        // IMPORTANT: Replace with your actual API call
        // Example using a phone lookup API (you need to add your API key)
        
        // For now, showing a placeholder implementation
        const result = await fetchPhoneNumbers(username);
        
        if (result.success) {
            displayResults(username, result.phones);
        } else {
            showError(result.message);
        }
    } catch (error) {
        showError('Error searching for phone numbers. Please try again.');
        console.error('Error:', error);
    }
}

async function fetchPhoneNumbers(username) {
    // PLACEHOLDER: Replace this with your actual API call
    // Example structure:
    
    /*
    // Option 1: Using a third-party API
    const apiKey = 'YOUR_API_KEY_HERE';
    const response = await fetch(`https://api.example.com/search?username=${username}`, {
        headers: {
            'Authorization': `Bearer ${apiKey}`
        }
    });
    const data = await response.json();
    return data;
    
    // Option 2: Using your own backend
    const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
    });
    const data = await response.json();
    return data;
    */

    // For demonstration - replace with actual API
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                phones: [
                    '+91-98765-43210',
                    '+91-87654-32109'
                ]
            });
        }, 2000);
    });
}

function displayResults(username, phones) {
    hideLoading();
    resultUsername.textContent = '@' + username;
    phoneList.innerHTML = '';

    if (phones.length === 0) {
        phoneList.innerHTML = '<p style="color: #666;">No phone numbers found for this account.</p>';
    } else {
        phones.forEach(phone => {
            const phoneItem = document.createElement('div');
            phoneItem.className = 'phone-item';
            phoneItem.innerHTML = `
                <span class="phone-number">${phone}</span>
                <button class="copy-btn" onclick="copyToClipboard('${phone}')">Copy</button>
            `;
            phoneList.appendChild(phoneItem);
        });
    }

    resultBox.style.display = 'block';
    hideError();
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Phone number copied! ✓');
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

function showLoading() {
    loadingBox.style.display = 'block';
}

function hideLoading() {
    loadingBox.style.display = 'none';
}

function showError(message) {
    hideLoading();
    errorMessage.textContent = message;
    errorBox.style.display = 'block';
}

function hideError() {
    errorBox.style.display = 'none';
}

function hideResults() {
    resultBox.style.display = 'none';
    errorBox.style.display = 'none';
}