/**
 * page1.js - Functionality for the welcome/login page
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const phoneInput = document.getElementById('phoneInput');
    const verifyIcon = document.getElementById('verifyIcon');
    const checkButton = document.getElementById('checkButton');
    
    // Constant for valid phone number
    const VALID_PHONE = "60173527250";
    
    // Initialize any stored data
    const userData = MulahApp.getUserData();
    if (userData.phone) {
        phoneInput.value = userData.phone.replace(/^\+/, '');
        validatePhone();
    }
    
    // Phone input handler
    phoneInput.addEventListener('input', function() {
        // Only allow numbers
        this.value = this.value.replace(/[^0-9]/g, '');
        validatePhone();
    });
    
    // Function to validate phone number
    function validatePhone() {
        if (phoneInput.value === VALID_PHONE) {
            verifyIcon.classList.remove('hidden');
            checkButton.disabled = false;
        } else {
            verifyIcon.classList.add('hidden');
            checkButton.disabled = false; // Still allow clicking for showing error
        }
    }
    
    // Handle check button click
    checkButton.addEventListener('click', function() {
        if (phoneInput.value === VALID_PHONE) {
            // Store phone number
            MulahApp.setUserData({
                ...MulahApp.getUserData(),
                phone: phoneInput.value
            });
            
            // Navigate to page 2
            MulahApp.navigate('page2.html');
        } else {
            MulahApp.showNotification("Please enter valid phone number: 60173527250", "error");
            phoneInput.focus();
        }
    });
});