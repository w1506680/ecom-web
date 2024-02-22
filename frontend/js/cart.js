document.addEventListener('DOMContentLoaded', function () {
    displayCartItems();
});

function displayCartItems() {
    // Get cart items from local storage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Select the container to append cart items
    const cartContainer = document.getElementById('cart-items');

    // Clear previous content
    cartContainer.innerHTML = '';

    // Create table structure
    const table = document.createElement('table');
    table.classList.add('cart-table'); // Add a class for styling purposes
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
    <th>Product</th>
    <th>Price</th>
    <th>Quantity</th>
    <th>Total</th>
    <th></th> <!-- Add a column for action (e.g., remove item) -->
`;
    thead.appendChild(headerRow);
    table.appendChild(thead);
    table.appendChild(tbody);

    // Append table to cart container
    cartContainer.appendChild(table);

    // Array to store promises for all fetch requests
    const fetchPromises = [];

    let total = 0; // Initialize total variable

    // Loop through cart items
    cartItems.forEach(cartItem => {
        // Push each fetch request promise to the array
        fetchPromises.push(
            fetch(`http://localhost:3000/api/products/${cartItem.productId}`)
                .then(response => response.json())
                .then(product => {
                    // Calculate total price for the item
                    const totalPrice = cartItem.quantity * product.price;

                    // Add item total to the overall total
                    total += totalPrice;

                    // Create table row for the cart item
                    const row = document.createElement('tr');
                    row.innerHTML = `
                <td>${product.name}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>${cartItem.quantity}</td>
                <td>$${totalPrice.toFixed(2)}</td>
                <td><button class="remove-item-btn" data-product-id="${cartItem.productId}">Remove</button></td> <!-- Add a button to remove the item -->
            `;

                    // Append row to table body
                    tbody.appendChild(row);
                })
                .catch(error => {
                    console.error('Error fetching product details:', error);
                })
        );
    });

    // Wait for all fetch requests to complete
    Promise.all(fetchPromises)
        .then(() => {
            // If shopping cart is not empty, add a checkout button
            if (cartItems.length > 0) {
                // Add a row for the total
                const totalRow = document.createElement('tr');
                totalRow.innerHTML = `
            <td colspan="3"></td>
            <td>$${total.toFixed(2)}</td> <!-- Display the total -->
            <td colspan="5" style="text-align: right;"><button id="checkout-btn">Checkout</button></td>
        `;
                tbody.appendChild(totalRow);

            }

            // Listen for click events on remove item buttons and the checkout button
            cartContainer.addEventListener('click', function (event) {
                if (event.target.classList.contains('remove-item-btn')) {
                    const productId = event.target.getAttribute('data-product-id');
                    removeCartItem(productId);
                    // Refresh cart display after removing item
                    displayCartItems();
                } else if (event.target.id === 'checkout-btn') {
                    // Redirect to checkout page
                    window.location.href = 'checkout.html';
                }
            });
        });
}


function removeCartItem(productId) {
    // Get cart items from local storage
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Find index of item to remove
    const index = cartItems.findIndex(item => item.productId === productId);

    // Remove item if found
    if (index !== -1) {
        cartItems.splice(index, 1);
        // Save updated cart items to local storage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        // Update cart badge
        updateCartBadge();
    }
}