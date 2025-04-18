let loggedIn = false;

// ////////////// products section

class Product {
    constructor(id,name, price, category, genre, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
        this.genre = genre;
        this.image = image;
        this.isFavorite = false;
        this.isInCart = false;
        this.quantity = 1;
    }
}

const products = [
    new Product(1, 'Golden Watch', 400, 'Watches', 'women', 'https://img.freepik.com/premium-photo/silver-gold-watch-isolated-white-background-ai-generated_1022157-5368.jpg'),
    new Product(2, 'Nike Black Shoes', 470 , 'Shoes', 'men', 'https://us.thesportsedit.com/cdn/shop/files/nike-motiva-shoes-black-anthracite-white-dv1238-001_2.jpg?v=1730195688'),
    new Product(3, 'PS5', 600 , 'Video Games', 'sexual', 'images/f61138da5e0a3af7c7c83b6166f1cb03dbfee30ff.jpg'),
    new Product(4, 'Silver Bracelet', 200 , 'Bracelets', 'women', 'https://img.freepik.com/premium-photo/luxury-metal-braclet-woman-silver-braided-bracelet-isolated-blue-background-top-view_116124-15295.jpg'),
    new Product(5, 'Nintendo Switch', 420 , 'Video Games', 'sexual', 'https://static.independent.co.uk/2025/04/03/8/54/nintendo-switch-2.png'),
    new Product(6, 'Nike Blue Shoes', 390 , 'Shoes', 'men', 'https://www.cosmossport.gr/3030148/nike-gt-hustle-academy.jpg'),
    new Product(7, 'Diamond Bracelet', 150, 'bracelets', 'women', 'https://media.istockphoto.com/id/1718392741/photo/beautiful-gemstone-crystal-bracelet-unique-handmade-stone-bead-jewelry-background-promotional.jpg?s=612x612&w=0&k=20&c=hYDVWIRpObQDcoZxMqxvqME2JI-ZaypfcmHAz7lOBsU='),
    new Product(8, 'Platinum Watch', 350, 'Watches', 'men', 'images/freepik__background__628022.jpg'),
    new Product(9, 'Silver Necklace', 100, 'Necklaces', 'men', 'https://img.freepik.com/premium-psd/ankle-bracelet-mockup-design_23-2151053612.jpg')
]

function displayProducts(productsList) {
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '';
        
    productsList.forEach(product => {
        const productContent =
        `<div class="product-contain col-6 col-xl-4 mb-3 mb-md-4 px-md-3">
            <div class="card product-card">
                <img src="${product.image}" alt="${product.name}" class="card-img-top product-image">
                <div class="card-body w-100 text-md-center px-2 py-2 py-md-3">
                    <h4 class="card-title mb-2 mb-md-3 fw-bold">${product.name}</h4>
                    <p class="card-text mb-1 mb-md-2 text-secondary">Price: <span class="text-danger fw-semibold text-dark">$${product.price}</span></p>
                    <p class="card-text mb-3 mb-md-4 text-secondary">Category: <span class="text-danger fw-semibold text-dark">${product.category}</span></p>
                    <div class="action-container d-flex gap-3 align-items-center justify-content-center">
                        <i class="fa-solid fa-heart favorite-icon mb-0 mb-md-1 ${product.isFavorite ? 'active' : ''}" onclick="toggleFavorite(${product.id})"></i>
                        <button class="btn add-cart-btn fw-semibold mb-1 mb-md-2 ${product.isInCart ? 'add-cart-remove px-1 px-md-3' : 'add-cart-add px-2 px-md-3'}" onclick= "toggleCart(${product.id})">
                            ${product.isInCart ? 'Remove from cart' : 'Add to Cart'}
                        </button>
                    </div>
                </div>
            </div>
        </div>`;
        productsContainer.insertAdjacentHTML("beforeend", productContent)
    })
}
// Only call displayProducts if we're on a page with products
//if (window.location.href.includes('index.html') || window.location.href.includes('loggedin.html')) {
    displayProducts(products);
// }

// /////////////////  functions 

function saveCartAndFavorites() {
    const cart = products.filter(product => product.isInCart)
    const favorites = products.filter(product => product.isFavorite)
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function loadCartAndFavorites(){
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    products.forEach(product =>{
        const cartProduct = cart.find(p => p.id === product.id);
        const favoriteProduct = favorites.find(p => p.id === product.id)
        if(cartProduct){
            product.isInCart = true;
            product.quantity = cartProduct.quantity;
        }else{
            product.isInCart = false;
            product.quantity = 0;
        }
        product.isFavorite = !!favoriteProduct;
    });
}
function updateTotalPrice(){
    const totalPrice = products.filter(product => product.isInCart)
    .reduce((total, product)=> total + product.price * product.quantity, 0);
    document.getElementById('totalPrice').textContent = "$" + totalPrice.toFixed(2);
}
function removeFromCart(productId){
    const product = products.find(p => p.id === productId);
    if(product){
        product.isInCart = false;
        product.quantity = 0;
        saveCartAndFavorites();
        displayCartItems();
        updateTotalPrice();
        updateCartCollapse();
        document.querySelector(`#cart-items .`)
    }
}
function increaseQuantity(productId) {
    const product = products.find(p => p.id === productId);
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    product.quantity++;
    const cartItem = cart.find(p => p.id === productId);
    if (cartItem) {
        cartItem.quantity = product.quantity;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart items display
    const quantityElement = document.getElementById(`itemQuantity${productId}`);
    const priceElement = document.querySelector(`.cart-item[data-product-id="${productId}"] .price-text span`);
    if (quantityElement) quantityElement.textContent = product.quantity;
    if (priceElement) priceElement.textContent = `$${product.price * product.quantity}`;
    
    // Update cart collapse display
    const collapseQuantityElement = document.querySelector(`#cart-product-container #itemQuantity${productId}`);
    const collapsePriceElement = document.querySelector(`#cart-product-container .cart-icon-item[data-product-id="${productId}"] .text-success`);
    if (collapseQuantityElement) collapseQuantityElement.textContent = product.quantity;
    if (collapsePriceElement) collapsePriceElement.textContent = `$${product.price * product.quantity}`;
    
    updateCartCollapse();
    displayCartItems();
    updateTotalPrice();
    updateCartCount();
}
function decreaceQuantity(productId){
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(p => p.id === productId);
    if(product && product.isInCart){
        product.quantity--;
        if(product.quantity <= 0) {
            product.isInCart = false;
            const index = cart.findIndex(p => p.id === productId)
            if (index > -1) {
                cart.splice(index,1);
            }
            localStorage.setItem('cart', JSON.stringify(cart));
                        updateCartCollapse();
            // Update product card button
            const productCardButton = document.querySelector(`button[onclick="toggleCart(${productId})"]`)
            if(productCardButton){
                productCardButton.textContent = 'Add to Cart';
                productCardButton.classList.remove("add-cart-remove");
                productCardButton.classList.add("add-cart-add");
            }

            // Remove from cart items view
            const cartItemElement = document.querySelector(`.cart-item[data-product-id="${productId}"]`);
            if(cartItemElement) {
                cartItemElement.remove();
            }

            // Remove from collapse view
            const collapseItemElement = document.querySelector(`#cart-product-container .cart-icon-item[data-product-id="${productId}"]`);
            if(collapseItemElement) {
                collapseItemElement.remove();
            }

            // Update displays
            displayCartItems();

            updateTotalPrice();
        } else {
            const cartItem = cart.find(p => p.id === productId)
            if(cartItem){
                cartItem.quantity = product.quantity
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Update cart items display
            const cartItemContainer = document.querySelector(`.cart-item div[data-product-id="${productId}"]`);
            if (cartItemContainer) {
                const quantityElement = cartItemContainer.querySelector(`#itemQuantity${productId}`);
                const priceElement = cartItemContainer.querySelector('.price-text span');
                if (quantityElement) quantityElement.textContent = product.quantity;
                if (priceElement) priceElement.textContent = `$${product.price * product.quantity}`;
            }
            
            // Update cart collapse display
            const collapseQuantityElement = document.querySelector(`#cart-product-container #itemQuantity${productId}`);
            const collapsePriceElement = document.querySelector(`#cart-product-container .cart-icon-item[data-product-id="${productId}"] .text-success`);
            if (collapseQuantityElement) collapseQuantityElement.textContent = product.quantity;
            if (collapsePriceElement) collapsePriceElement.textContent = `$${product.price * product.quantity}`;
            
            updateTotalPrice();
            updateCartCount();
        }
    }
}

function removeFavorite(productId) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const product = products.find(p =>  p.id === productId);
    if(product && product.isFavorite){
        product.isFavorite = false;
        const index = favorites.findIndex(p => p.id === productId)
        if(index > -1){
            favorites.splice(index,1);
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
        const productCardHeart = document.querySelector(`.fa-heart[onclick = 'toggleFavorite(${productId}']`);
        if(productCardHeart){
            productCardHeart.classList.remove('active');
        }
        const favouriteItemCard = document.querySelector(`#favorite-items . card[data-product-id="${productId}]`);
        if(favouriteItemCard){
            favouriteItemCard.remove();
        }
        displayProducts()
    }
}

function displayFavoriteItems(){
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoriteItemsContainer = document.getElementById('favorite-items');
    favoriteItemsContainer.innerHTML = '';
    
    if(favorites.length === 0 || favorites === null) {
        favoriteItemsContainer.innerHTML = '<p class="text-center">You have no favorite products</p>';
        return;
    }
    const favoriteItemsHtml = favorites.map(item => {
        const product = products.find(p => p.id === item.id);
        const category = product ? product.category : (item.category || 'Unknown');
        return `
        <div class="fav-item card col-3 col-md-4 my-3" data-product-id="${item.id}">
            <img src="${item.image}" alt="${item.name}" class="card-img-top object-fit-cover" width="100%" height="220px">
            <div class="card-body text-center py-2 py-md-3">
                <h4 class="fw-semibold">${item.name}</h4>
                <h6 class="my-2 mb-md-4 mt-md-3">Category: <span class="text-secondary">${category}</span></h6>
                <i class="fa-solid fa-heart favorite-icon ${item.isFavorite ? 'active' : ''}" onclick="toggleFavorite(${item.id})"></i>
            </div>
        </div>`;
    }).join('');
    favoriteItemsContainer.innerHTML = favoriteItemsHtml;
}
function updateCartCount(){
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-count').textContent = cartCount;
}

// //////////////   register section

let registerBtn = document.getElementById("register-btn");


function register() {
    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    console.log(firstName, lastName, email, password);
    if (!firstName || !lastName || !email || !password) {
        alert('Please fill in all fields.');
        return;
    }


    const users = JSON.parse(localStorage.getItem('users')) || {};
    users[email] = {password , firstName, lastName};
    localStorage.setItem('users', JSON.stringify(users))
    alert("Account created successfuly!");
    window.location.href = "login.html"
}

// //////////////   login section
function login(){
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const users = JSON.parse(localStorage.getItem("users")) || {};

    if(users[email] && users[email].password === password ){
        loggedIn = true;
        localStorage.setItem('loggedInUser' , JSON.stringify(users[email]));
        localStorage.setItem('loggedIn', loggedIn);
        console.log("loggedIn:", loggedIn);

        window.location.href = 'loggedin.html';
        console.log("redirecting to loggedin.html");
    } else {
        alert("Incorrect Email or Password");
    }
}


function logout() {
    loggedIn = false;
    localStorage.removeItem('loggedInUser');
    console.log(loggedIn);
    console.log(localStorage.getItem('loggedIn'));
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('favorites');
    localStorage.removeItem('cart');
    window.location.href = 'index.html';
}


function searchProducts() {
    const searchType = document.getElementById("searchType").value;
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const searchError = document.querySelector(".search-result");

    const filteredproducts = products.filter(product => {
        if(searchType === 'name'){
            return product.name.toLowerCase().includes(searchInput)
        }else if(searchType === 'category'){
            return product.category.toLowerCase().includes(searchInput)
        }
        return false
    });

    // Check for empty results after filtering
    if(filteredproducts.length === 0){
        searchError.innerHTML = 'No results found for your search';
    }else{
        searchError.innerHTML = '';
    }

    displayProducts(filteredproducts)
}

function toggleFavorite(productId) {
    const isLoggedin = JSON.parse(localStorage.getItem('loggedIn'));
    if(!isLoggedin && window.location.href.includes('index.html')){
        const confirm = window.confirm('You need to login to add items to your favourite list. Do you wish to login now ?');
        if(confirm) {
            window.location.href = 'login.html';
        }
        return;
    }
    const product = products.find(p => p.id === productId);
    if(!product) return;

    // Toggle favorite state
    product.isFavorite = !product.isFavorite;
    
    // Update localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if(product.isFavorite) {
        if(!favorites.find(p => p.id === productId)) {
            favorites.push({id: product.id, name: product.name, price: product.price, image: product.image});
        }
    } else {
        const index = favorites.findIndex(f => f.id === productId);
        if(index > -1) {
            favorites.splice(index, 1);
        }
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    
    const heartIcon = document.querySelector(`.fa-heart[onclick='toggleFavorite(${productId})']`);
    if(heartIcon) {
        heartIcon.classList.toggle('active', product.isFavorite);
    }

    // Update displays
    if(window.location.href.includes('cart.html')){
        displayFavoriteItems();
        saveCartAndFavorites();
        loadCartAndFavorites();
    }
}



// ///////////////////////////////// cart ///////////////////////////////////////////

let cartcount = 0 ;

function toggleCart(productId) {
    const isLoggedIn = JSON.parse(localStorage.getItem('loggedIn'));
    console.log("toggleCart clicked", isLoggedIn);
    if(!isLoggedIn && window.location.href.includes('index.html')) {
        const confirm = window.confirm('You need to login to add items to your cart. Do you wish to login now ?');
        if(confirm) {
            window.location.href = 'login.html';
        }
        return;
    }
    const product = products.find(p => p.id === productId);

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if(product.isInCart){
        product.isInCart = false;
        product.quantity = 0;
        const index = cart.findIndex(p => p.id === productId);
        if(index > -1) cart.splice(index,1)
    }else {
        product.isInCart = true;
        product.quantity = 1;
        cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, quantity: product.quantity});    
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    displayProducts(products);
    updateCartCount();
    updateCartCollapse();

    if(window.location.href.includes('cart.html')){
        displayCartItems();
    }
}


function displayCartItems(){
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    
    if(cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-center">Your cart is Empty</p>';
        updateTotalPrice();
        return;
    }


    const cartItemsHtml = cartItems.map(item => {
        const product = products.find(p => p.id === item.id);
        return `
        <div class="cart-item col-12 col-xl-5 align-items-center rounded-4 px-2 py-2 py-md-3 position-relative">
            <div class="d-flex h-100" data-product-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" class="cart-image align-self-center object-fit-cover align-self-lg-auto  me-2 me-md-4 rounded-4" width="187px">
                <div class="d-flex flex-column w-100 justify-content-center mt-md-1">
                    <h3 class="fw-semibold product-name">${item.name}</h3>
                    <h5 class="my-2 my-md-3 category-name text-secondary">Category: <span class="text-body">${product ? product.category : item.category}</span></h5>
                    <h5 class="price-text text-secondary">Price: <span class="text-success">$${item.price * item.quantity}</span></h5>
                    <div class="d-flex align-items-center justify-content-between mt-2 mt-md-3">
                        <div class="justify-content-center align-items-center d-flex gap-1">
                            <button class="btn btn-sm btn-outline-secondary mp-btn fw-bold" onclick="decreaceQuantity(${item.id})">-</button>
                            <span id="itemQuantity${item.id}" class="mx-md-3 mx-1">${item.quantity}</span>
                            <button class="btn btn-sm btn-outline-secondary mp-btn fw-bold" onclick="increaseQuantity(${item.id})">+</button>
                        </div>
                        <button class="btn btn-danger fw-bold remove-item px-2 px-md-4 me-md-3" onclick="removeFromCart(${item.id})">Remove item</button>
                    </div>
                </div>
            </div>
        </div>`;
    }).join('');
    
    cartItemsContainer.innerHTML = cartItemsHtml;
    updateTotalPrice();
}

function updateCartCollapse(){
    const cartItems = products.filter(product => product.isInCart);
    const cartDropdownContainer = document.getElementById("cart-product-container");
    const cartStatus = document.querySelector(".cart-status");
    cartDropdownContainer.innerHTML = '';

    if(cartItems.length === 0){
        cartStatus.innerHTML = "<p class='text-center'>Your cart is Empty</p>";
    } else {
        cartStatus.innerHTML = "";
        updateCartCount();
        cartItems.forEach(item => {
            const cartItem = `
                <div class="cart-icon-item d-flex align-items-center flex-column" data-product-id="${item.id}">
                    <div class="d-flex justify-content-between w-100 px-1">
                        <h4 class="mb-3 me-3">${item.name}</h4>
                        <h5 class="me-1 me-md-3">Price: <br><span class="text-success">$${item.price * item.quantity}</span></h5>
                    </div>
                    <div class="d-flex align-items-center">
                        <button class="btn btn-sm btn-outline-secondary mp-btn fw-bold" onclick="decreaceQuantity(${item.id})">-</button>
                        <span class="mx-3" id="itemQuantity${item.id}">${item.quantity}</span>
                        <button class="btn btn-sm btn-outline-secondary mp-btn fw-bold" onclick="increaseQuantity(${item.id})">+</button>
                    </div>
                </div>`;
            cartDropdownContainer.insertAdjacentHTML('beforeend', cartItem);
        });
    }
    updateCartCount();
}

// ///////////////////////////////////////

document.addEventListener('DOMContentLoaded', ()=> {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const isLoggedIn = JSON.parse(localStorage.getItem('loggedIn'));
    if(loggedInUser && isLoggedIn){
        loggedIn = true;
        const welcomeText = document.querySelector('.welcome-text');
        if(welcomeText) {
            welcomeText.textContent = `Welcome, ${loggedInUser.firstName}`;
        }
    } else {
        loggedIn = false;
    }
    loadCartAndFavorites()
    updateCartCollapse()
    updateCartCount()
    displayProducts(productsList = products)
    if (window.location.href.includes('cart.html')){
        displayFavoriteItems()
    }
})