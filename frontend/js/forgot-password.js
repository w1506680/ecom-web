document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('forgot-password-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;

        // Send request to backend to reset password
        resetPassword(email);
    });
});

function resetPassword(email) {
    // Send request to backend to reset password
    fetch('http://localhost:3000/api/auth/forgot-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        // Handle response
        // console.log('Reset password:', data);
        alert("If a valid email is found, a password reset email will be sent.");
    })
    .catch(error => {
        // Handle error (e.g., display error message)
        console.error('Reset password error:', error.message);
        alert('Failed to reset password. Please try again later.');
    });
}
