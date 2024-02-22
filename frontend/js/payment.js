document.addEventListener('DOMContentLoaded', function () {
    // Get the payment form
    const paymentForm = document.getElementById('payment-form');

    // Add event listener for form submission
    paymentForm.addEventListener('submit', function (event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Simulate payment processing (replace this with actual API call)
        setTimeout(() => {
            // Simulated success behavior
            alert('Payment successful! Redirecting to homepage.');

            // Clear cart items from local storage
            localStorage.removeItem('cartItems');

            // Redirect to the homepage
            window.location.href = 'index.html';
        }, 2000); // Simulate 2 seconds delay for payment processing
    });
});