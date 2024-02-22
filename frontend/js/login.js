document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('register-form');

    registerForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Get form data
        const formData = new FormData(registerForm);

        // Convert form data to JSON object
        const jsonData = {};
        formData.forEach((value, key) => {
            jsonData[key] = value;
        });

        // Send POST request to the backend
        fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        })
            .then(response => {
                if (response.ok) {
                    // Registration successful
                    alert('Registration successful! You can now login.');
                    // Reset registration form
                    registerForm.reset();
                } else {
                    // Registration failed
                    alert('Registration failed. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred. Please try again later.');
            });
    });
});

  

const otpModal = document.getElementById('otp-modal');
const otpInput = document.getElementById('otp-input');
const submitOtpBtn = document.getElementById('submit-otp');

document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form submission
    const email = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    try {
        // Make POST request to login API endpoint
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        // Handle response
        if (response.ok) {
            // Login successful, prompt user to enter OTP
            // Show OTP modal
            otpModal.style.display = 'block';
        } else {
            // Login failed, display error message
            alert('Invalid email or password, please try again.');
        }
    } catch (error) {
        console.error('Error logging in:', error);
        // Display error message to the user
        alert('An error occurred while logging in, please try again later.');
    }
});



// Close modal when close button is clicked
document.querySelector('.close').addEventListener('click', () => {
    otpModal.style.display = 'none';
});

// Handle OTP submission
submitOtpBtn.addEventListener('click', async () => {
    const otp = otpInput.value.trim();
    if (otp) {
        // Make POST request to verify OTP
        try {
            const email = document.getElementById('login-username').value;
            const otpResponse = await fetch('http://localhost:3000/api/auth/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, otp })
            });

            // Handle OTP verification response
            if (otpResponse.ok) {
                const jwtToken = await otpResponse.json();
                // Store JWT token in local storage
                localStorage.setItem('jwt', jwtToken);
                // Redirect to home page or perform any other action
                window.location.href = 'index.html';
            } else {
                // OTP verification failed, display error message
                alert('Invalid OTP, please try again.');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            // Display error message to the user
            alert('An error occurred while verifying OTP, please try again later.');
        }
    } else {
        // OTP is empty, display error message
        alert('Please enter OTP.');
    }
});