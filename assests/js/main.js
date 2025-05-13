/**
 * main.js - Common functionality across all pages
 */

// Store data between pages
const MulahApp = {
    // Store user data
    setUserData: function(data) {
        localStorage.setItem('mulahUserData', JSON.stringify(data));
    },
    
    // Get user data
    getUserData: function() {
        const data = localStorage.getItem('mulahUserData');
        return data ? JSON.parse(data) : {};
    },
    
    // Clear user data
    clearUserData: function() {
        localStorage.removeItem('mulahUserData');
    },
    
    // Navigate to a page
    navigate: function(page) {
        window.location.href = page;
    },
    
    // Format phone number with country code
    formatPhone: function(phone) {
        if (!phone) return '';
        return `+${phone.replace(/^\+/, '')}`;
    },
    
    // Show a notification message
    showNotification: function(message, type = 'info') {
        // Check if notification container exists
        let container = document.querySelector('.notification-container');
        
        // Create container if it doesn't exist
        if (!container) {
            container = document.createElement('div');
            container.className = 'notification-container';
            document.body.appendChild(container);
            
            // Add styles
            container.style.position = 'fixed';
            container.style.bottom = '20px';
            container.style.left = '50%';
            container.style.transform = 'translateX(-50%)';
            container.style.zIndex = '1000';
            container.style.width = '90%';
            container.style.maxWidth = '400px';
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Style notification
        notification.style.padding = '12px 20px';
        notification.style.marginBottom = '10px';
        notification.style.borderRadius = '4px';
        notification.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        notification.style.animation = 'fadeIn 0.3s ease-out';
        
        // Set background color based on type
        if (type === 'error') {
            notification.style.backgroundColor = '#ff6b6b';
            notification.style.color = 'white';
        } else if (type === 'success') {
            notification.style.backgroundColor = '#4CAF50';
            notification.style.color = 'white';
        } else {
            notification.style.backgroundColor = '#f0f0f0';
            notification.style.color = '#333';
        }
        
        // Add to container
        container.appendChild(notification);
        
        // Remove after timeout
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transition = 'opacity 0.3s ease-out';
            
            setTimeout(() => {
                container.removeChild(notification);
                
                // Remove container if empty
                if (container.childElementCount === 0) {
                    document.body.removeChild(container);
                }
            }, 300);
        }, 3000);
    }
};

// Add keyframe animations to document
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
});