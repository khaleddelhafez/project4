// //////////////   register section

let registerBtn = document.getElementById("register-btn");

function register() {
    const customerFirstName = document.querySelector(".customer-name").value;
    const customerLastName = document.querySelector(".customer-lastname").value;
    const customerEmail = document.querySelector(".customer-email").value;
    const customerPassword = document.querySelector(".customer-password").value;
    console.log(customerFirstName, customerLastName, customerEmail, customerPassword);
}

// registerBtn.addEventListener("click", ()=>{
//     register();
// });
let searchdrop = document.querySelectorAll(".dropdown-menu");
let dropBtn = document.querySelector(".drop-btn");
let dropdownItems = document.querySelectorAll(".dropdown-item");

dropdownItems.forEach(item => {
    item.addEventListener("click", () => {
        dropBtn.textContent = item.textContent;
    })
})


// //////////////   login section





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
]

function displayProducts(productsList = products) {
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML=''
    
    // if (productsList.length === 0) {
    //     const searchError = document.querySelector(".search-result");
    //     searchError.innerHTML = 'No results found for your search';
    //     return;
    // } else {
    //     document.querySelector(".search-result").innerHTML = '';
    // }
        
    productsList.forEach(product => {
        const productContent = 
        `<div class="col-12 col-md-6 col-xl-4 mb-4">
            <div class="card">
                <img src="${product.image}" alt="${product.name}" class="card-img-top">
                <div class="card-body text-center">
                    <h4 class="card-title mb-3 fw-bold">${product.name}</h4>
                    <p class="card-text mb-2 text-secondary">Price: <span class="text-danger fw-semibold text-dark">$${product.price}</span></p>
                    <p class="card-text mb-4 text-secondary">Category: <span class="text-danger fw-semibold text-dark">${product.category}</span></p>
                    <div class="action-container d-flex gap-3 align-items-center justify-content-center">
                        <i class="fa-solid fa-heart favorite-icon" onclick="toggleFavorite(${product.id})"></i>
                        <button class="btn btn-primary add-cart-btn fw-semibold mb-2">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>`;
        productsContainer.insertAdjacentHTML("beforeend", productContent)
    })
}

displayProducts();


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

// function toggleFavorite(productId) {
//     const heartanimation = document.querySelectorAll(".favorite-icon");
//     heartanimation.forEach(heart =>{
//         heart.onclick = heart.classList.add('active');
//         return heart;
//     })
// }





