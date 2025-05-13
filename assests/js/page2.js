/**
 * page2.js - Functionality for the registration page
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const form = document.getElementById('registrationForm');
    const nameInput = document.getElementById('name');
    const dayInput = document.getElementById('day');
    const monthInput = document.getElementById('month');
    const yearInput = document.getElementById('year');
    const emailInput = document.getElementById('email');
    const noEmailCheckbox = document.getElementById('noEmail');
    
    // Get user data if available
    const userData = MulahApp.getUserData();
    
    // Fill form with existing data if available
    if (userData.name) {
        nameInput.value = userData.name;
    }
    
    if (userData.birthday) {
        const [day, month, year] = userData.birthday.split('/');
        dayInput.value = day;
        monthInput.value = month;
        yearInput.value = year;
    }
    
    if (userData.email) {
        if (userData.email === 'N/A') {
            noEmailCheckbox.checked = true;
            emailInput.disabled = true;
        } else {
            emailInput.value = userData.email;
        }
    }
    
    // Only allow numbers in date fields
    [dayInput, monthInput, yearInput].forEach(input => {
        input.addEventListener('input', function() {
            // Only allow numbers
            this.value = this.value.replace(/[^0-9]/g, '');
            
            // Auto-advance to next field when max length reached
            if (this.value.length >= parseInt(this.getAttribute('maxlength'))) {
                const nextInput = this.nextElementSibling;
                if (nextInput && nextInput.tagName === 'INPUT') {
                    nextInput.focus();
                }
            }
        });
    });
    
    // Toggle email field based on checkbox
    noEmailCheckbox.addEventListener('change', function() {
        emailInput.disabled = this.checked;
        if (this.checked) {
            emailInput.value = "";
        } else {
            emailInput.focus();
        }
    });
    
    // Field completion animation
    const addCompletionAnimation = (input) => {
        input.addEventListener('blur', function() {
            if (this.value) {
                this.classList.add('field-completed');
                setTimeout(() => {
                    this.classList.remove('field-completed');
                }, 1000);
            }
        });
    };
    
    [nameInput, dayInput, monthInput, yearInput, emailInput].forEach(addCompletionAnimation);
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate inputs
        if (!nameInput.value) {
            MulahApp.showNotification("Please enter your name", "error");
            nameInput.focus();
            return;
        }
        
        // Validate date
        if (!dayInput.value || !monthInput.value || !yearInput.value) {
            MulahApp.showNotification("Please enter a complete birthday", "error");
            if (!dayInput.value) dayInput.focus();
            else if (!monthInput.value) monthInput.focus();
            else yearInput.focus();
            return;
        }
        
        const day = parseInt(dayInput.value);
        const month = parseInt(monthInput.value);
        const year = parseInt(yearInput.value);
        
        if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1900 || year > new Date().getFullYear()) {
            MulahApp.showNotification("Please enter a valid birthday", "error");
            return;
        }
        
        // Validate email unless checkbox is checked
        if (!noEmailCheckbox.checked && (!emailInput.value || !emailInput.value.includes('@'))) {
            MulahApp.showNotification("Please enter a valid email address or check 'No email address'", "error");
            emailInput.focus();
            return;
        }
        
        // Store data for page 3
        const userData = MulahApp.getUserData();
        
        MulahApp.setUserData({
            ...userData,
            name: nameInput.value,
            birthday: `${dayInput.value.padStart(2, '0')}/${monthInput.value.padStart(2, '0')}/${yearInput.value}`,
            email: noEmailCheckbox.checked ? "N/A" : emailInput.value
        });
        
        // Navigate to page 3
        MulahApp.navigate('page3.html');
    });
});