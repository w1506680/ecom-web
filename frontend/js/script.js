document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.querySelector('.toggle-menu');
    const navMenu = document.querySelector('nav ul');

    toggleButton.addEventListener('click', function() {
        navMenu.classList.toggle('open');
    });

    fetchProducts();

    // Load cart items from localStorage when the page loads
    loadCart();
   
});


function fetchProducts() {
    fetch('http://localhost:3000/api/products')
        .then(response => response.json())
        .then(data => {
            displayProducts(data);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
}

function displayProducts(products) {
    const productGrid = document.querySelector('.product-grid');

    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');

        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.name;

        const name = document.createElement('h3');
        name.textContent = product.name;

        const price = document.createElement('p');
        price.textContent = '$' + product.price;

        const description = document.createElement('p');
        description.textContent = product.description;

        const addToCartBtn = document.createElement('button');
        addToCartBtn.textContent = 'Add to Cart';
        addToCartBtn.classList.add('add-to-cart-btn');
        addToCartBtn.setAttribute('data-product-id', product.id);
        
        productItem.appendChild(img);
        productItem.appendChild(name);
        productItem.appendChild(price);
        productItem.appendChild(description);
        productItem.appendChild(addToCartBtn);

        productGrid.appendChild(productItem);

    });

    // Listen for click events on the "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const productId = button.getAttribute('data-product-id');
            addToCart(productId);
        });
    });
}

function addToCart(productId) {
    // Load existing cart items from localStorage
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Check if the product is already in the cart
    const existingItem = cartItems.find(item => item.productId === productId);

    if (existingItem) {
        // If the product is already in the cart, increment its quantity
        existingItem.quantity++;
    } else {
        // If the product is not in the cart, add it with a quantity of 1
        cartItems.push({ productId: productId, quantity: 1 });
    }

    // Save updated cart items to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Update the cart badge in the navigation menu
    updateCartBadge();
}

function loadCart() {
    // Load cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Update the cart badge in the navigation menu
    updateCartBadge();
}

function updateCartBadge() {
    // Get the cart badge element
    const cartBadge = document.querySelector('.badge-counter');

    // Load cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Calculate the total number of items in the cart
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    // Update the cart badge with the total number of items
    cartBadge.textContent = totalItems;
}

// Check if the user is logged in
const isLoggedIn = localStorage.getItem('jwt') !== null;

// Show the login link only if the user is not logged in
if (isLoggedIn == false) {
    document.getElementById('login-link').style.display = 'block';
    document.getElementById('logout-link').style.display = 'none';
} else {
    document.getElementById('login-link').style.display = 'none';
    document.getElementById('logout-link').style.display = 'block';
}

// Function to handle logout
function handleLogout() {
    // Clear JWT token from local storage
    localStorage.removeItem('jwt');
    // Redirect the user to the login page or any other desired page
    window.location.href = 'login.html'; // Redirect to login page
}

document.getElementById('logout').addEventListener('click', handleLogout);
