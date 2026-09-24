const shopContainer =
    document.getElementById("shop-products");

const searchInput =
    document.getElementById("search-input");

const categoryFilter =
    document.getElementById("category-filter");

const priceFilter =
    document.getElementById("price-filter");

const sortFilter =
    document.getElementById("sort-filter");

const productCount =
    document.getElementById("product-count");

const noProducts =
    document.getElementById("no-products");


function displayProducts(productList) {

    shopContainer.innerHTML = "";

    productCount.textContent = productList.length;


    if (productList.length === 0) {

        noProducts.style.display = "block";

        return;

    }


    noProducts.style.display = "none";


    productList.forEach(product => {

        const card =
            document.createElement("div");

        card.className = "product-card";


        card.innerHTML = `

            <a href="product.html?id=${product.id}">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    class="product-image"
                >

            </a>


            <div class="product-actions">

                <button
                    onclick="addToWishlist(${product.id})">

                    ♡

                </button>

            </div>


            <div class="product-info">

                <h3>
                    ${product.name}
                </h3>

                <p class="product-price">
                    $${product.price}
                </p>


                <button
                    class="add-cart"
                    onclick="addToCart(${product.id})">

                    Add to Bag

                </button>

            </div>

        `;


        shopContainer.appendChild(card);

    });

}


function filterProducts() {

    let filtered =
        [...products];


    // SEARCH

    const search =
        searchInput.value
            .toLowerCase()
            .trim();


    if (search !== "") {

        filtered =
            filtered.filter(product =>
                product.name
                    .toLowerCase()
                    .includes(search)
            );

    }


    // CATEGORY

    const category =
        categoryFilter.value;


    if (category !== "all") {

        filtered =
            filtered.filter(product =>
                product.category === category
            );

    }


    // PRICE

    const maxPrice =
        priceFilter.value;


    if (maxPrice !== "all") {

        filtered =
            filtered.filter(product =>
                product.price <= Number(maxPrice)
            );

    }


    // SORT

    const sort =
        sortFilter.value;


    if (sort === "low") {

        filtered.sort(
            (a, b) => a.price - b.price
        );

    }


    if (sort === "high") {

        filtered.sort(
            (a, b) => b.price - a.price
        );

    }


    if (sort === "name") {

        filtered.sort(
            (a, b) =>
                a.name.localeCompare(b.name)
        );

    }


    displayProducts(filtered);

}


/* EVENTS */

searchInput.addEventListener(
    "input",
    filterProducts
);

categoryFilter.addEventListener(
    "change",
    filterProducts
);

priceFilter.addEventListener(
    "change",
    filterProducts
);

sortFilter.addEventListener(
    "change",
    filterProducts
);


/* INITIAL DISPLAY */

displayProducts(products);


/* TEMPORARY FUNCTIONS */

function addToCart(id) {

    const product =
        products.find(
            product => product.id === id
        );

    alert(
        `${product.name} added to your bag!`
    );

}


function addToWishlist(id) {

    const product =
        products.find(
            product => product.id === id
        );

    alert(
        `${product.name} added to wishlist!`
    );

}