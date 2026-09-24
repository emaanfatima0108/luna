/* FEATURED PRODUCTS */

const featuredContainer =
    document.getElementById("featured-products");


if (featuredContainer) {

    function displayFeaturedProducts() {

        featuredContainer.innerHTML = "";

        products.slice(0, 4).forEach(product => {

            const card =
                document.createElement("div");

            card.className =
                "product-card";


            card.innerHTML = `

                <a href="product.html?id=${product.id}">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        class="product-image"
                    >

                </a>


                <div class="product-info">

                    <h3>
                        ${product.name}
                    </h3>

                    <p class="product-price">
                        $${product.price}
                    </p>

                </div>

            `;


            featuredContainer.appendChild(card);

        });

    }


    displayFeaturedProducts();

}



/* UPDATE CART COUNT */

function updateCartCount() {

    const cart =
        JSON.parse(
            localStorage.getItem("lunaCart")
        ) || [];


    const count =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    const cartCount =
        document.getElementById("cart-count");


    if (cartCount) {

        cartCount.textContent =
            count;

    }

}


updateCartCount();