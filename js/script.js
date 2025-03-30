// //////////////   register section

let registerBtn = document.getElementById("register-btn");

let loggedIn = false;

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
        localStorage.setItem('loggedInUser' , JSON.stringify(users[email]));
        loggedIn = true;
        localStorage.setItem('loggedIn', loggedIn);

        window.location.href = 'loggedin.html';
    } else {
        alert("Incorrect Email or Password");
    }
}


function logout() {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('loggedIn');
    loggedIn = false;
    localStorage.removeItem('favorites');
    localStorage.removeItem('cart');
    /////////
    window.location.href = 'index.html';
}

// ////////////// products section

class product {
    constructor(id,name, price, category, genre, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
        this.genre = genre;
        this.image = image;
        this.isfavorite = false;
        this.isInCart = false;
        this.quantity = 1;
    }
}

const products = [
    new product(1, 'watch', 100, 'Watches', 'men', 'images/freepik__background__628022.jpg'),
    new product(2, 'PS5', 1200 , 'Video Games', 'sexual', 'images/f61138da5e0a3af7c7c83b6166f1cb03dbfee30ff.jpg'),
    new product(3, 'PS4', 1000 , 'Video Games', 'sexual', ''),
    new product(4, 'PS3', 800 , 'Video Games', 'sexual', ''),
    new product(5, 'PS2', 600 , 'Video Games', 'sexual', ''),
    new product(6, 'PS1', 400 , 'Video Games', 'sexual', ''),
    new product(7, 'breclet', 100, 'breclets', 'men', 'images/freepik__background__628022.jpg')
]

function displayProducts(productsList = products) {
    const productsContainer = document.getElementById('products-container');
    
    // Only proceed if we're on a page with a products container
    if (!productsContainer) {
        return;
    }
    
    productsContainer.innerHTML = '';
        
    productsList.forEach(product => {
        const productContent = 
        `<div class=" col-6 col-xl-4 mb-4 px-1 px-md-3">
            <div class="card product-card">
                <img src="${product.image}" alt="${product.name}" class="card-img-top product-image">
                <div class="card-body text-center">
                    <h4 class="card-title mb-3 fw-bold">${product.name}</h4>
                    <p class="card-text mb-2 text-secondary">Price: <span class="text-danger fw-semibold text-dark">$${product.price}</span></p>
                    <p class="card-text mb-4 text-secondary">Category: <span class="text-danger fw-semibold text-dark">${product.category}</span></p>
                    <div class="action-container d-flex gap-3 align-items-center justify-content-center">
                        <i class="fa-solid fa-heart favorite-icon mb-1" onclick="toggleFavorite(${product.id})"></i>
                        <button class="btn btn-primary add-cart-btn fw-semibold mb-2">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>`;
        productsContainer.insertAdjacentHTML("beforeend", productContent)
    })
}

// Only call displayProducts if we're on a page with products
if (document.getElementById('products-container')) {
    displayProducts();
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
    const heartanimation = document.querySelectorAll(".favorite-icon");
    heartanimation.forEach(heart =>{
        heart.onclick = heart.classList.add('active');
        return heart;
    })
}

const cartCount = document.querySelector(".cart-count");

if(cartCount.innerHTML >= 10){
    cartCount.style.fontSize = '18px';
    // cartCount.style.height = '30px';
}

const cartProductContainer = document.getElementById("cart-product-container");
const cartStatus = document.querySelector(".cart-status");

if(cartProductContainer.innerHTML.trim() === ''){
    cartStatus.textContent = 'Cart is empty';
}else{
    cartStatus.textContent = 'Products'
}

