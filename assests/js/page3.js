/**
 * page3.js - Functionality for the user details page
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const phoneDisplay = document.getElementById('phoneDisplay');
    const nameDisplay = document.getElementById('nameDisplay');
    const birthdayDisplay = document.getElementById('birthdayDisplay');
    const emailDisplay = document.getElementById('emailDisplay');
    
    // Retrieve user data from storage
    const userData = MulahApp.getUserData();
    
    // Check if data exists
    if (!userData.phone || !userData.name || !userData.birthday) {
        MulahApp.showNotification("Missing user data! Please complete the previous steps.", "error");
        setTimeout(() => {
            MulahApp.navigate('index.html');
        }, 2000);
        return;
    }
    
    // Display user data
    phoneDisplay.textContent = MulahApp.formatPhone(userData.phone);
    nameDisplay.textContent = userData.name || 'N/A';
    birthdayDisplay.textContent = userData.birthday || 'N/A';
    emailDisplay.textContent = userData.email || 'N/A';
    
    // Add event listeners to buttons
    document.getElementById('editButton').addEventListener('click', goBack);
    document.getElementById('confirmButton').addEventListener('click', confirm);
});

// Function to go back to edit details
function goBack() {
    MulahApp.navigate('page2.html');
}

// Function to confirm details
function confirm() {
    // In a real app, this would submit data to a server
    MulahApp.showNotification('Details confirmed successfully!', 'success');
    
    // Wait for notification to show before redirecting
    setTimeout(() => {
        // Clear user data and go back to first page
        MulahApp.clearUserData();
        MulahApp.navigate('index.html');
    }, 1500);
}