let cart =
    JSON.parse(localStorage.getItem("lunaCart")) || [];


const cartItems =
    document.getElementById("cart-items");

const emptyCart =
    document.getElementById("empty-cart");

const subtotalElement =
    document.getElementById("subtotal");

const shippingElement =
    document.getElementById("shipping");

const totalElement =
    document.getElementById("total");

const checkoutButton =
    document.getElementById("checkout-button");



/* SAVE CART */

function saveCart() {

    localStorage.setItem(
        "lunaCart",
        JSON.stringify(cart)
    );

}



/* DISPLAY CART */

function displayCart() {

    cartItems.innerHTML = "";


    if (cart.length === 0) {

        emptyCart.style.display = "block";

        checkoutButton.style.display = "none";

        subtotalElement.textContent = "$0";

        shippingElement.textContent = "$0";

        totalElement.textContent = "$0";

        return;

    }


    emptyCart.style.display = "none";

    checkoutButton.style.display = "block";


    cart.forEach(item => {

        const product =
            products.find(
                product => product.id === item.id
            );


        if (!product) return;


        const cartItem =
            document.createElement("div");

        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
                class="cart-item-image"
            >


            <div class="cart-item-info">

                <h3>
                    ${product.name}
                </h3>

                <p class="cart-item-category">
                    ${product.category.toUpperCase()}
                </p>

                <p class="cart-item-price">
                    $${product.price}
                </p>


                <div class="cart-item-controls">

                    <div class="cart-quantity">

                        <button
                            onclick="changeQuantity(${product.id}, -1)">

                            −

                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            onclick="changeQuantity(${product.id}, 1)">

                            +

                        </button>

                    </div>


                    <button
                        class="remove-item"
                        onclick="removeItem(${product.id})">

                        Remove

                    </button>

                </div>

            </div>


            <div class="cart-item-total">

                $${product.price * item.quantity}

            </div>

        `;


        cartItems.appendChild(cartItem);

    });


    updateSummary();

}



/* CHANGE QUANTITY */

function changeQuantity(id, change) {

    const item =
        cart.find(
            item => item.id === id
        );


    if (!item) return;


    item.quantity += change;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                item => item.id !== id
            );

    }


    saveCart();

    displayCart();

}



/* REMOVE ITEM */

function removeItem(id) {

    cart =
        cart.filter(
            item => item.id !== id
        );


    saveCart();

    displayCart();

}



/* SUMMARY */

function updateSummary() {

    let subtotal = 0;


    cart.forEach(item => {

        const product =
            products.find(
                product => product.id === item.id
            );


        if (product) {

            subtotal +=
                product.price * item.quantity;

        }

    });


    let shipping = 0;


    if (subtotal > 0 && subtotal < 100) {

        shipping = 10;

    }


    const total =
        subtotal + shipping;


    subtotalElement.textContent =
        `$${subtotal.toFixed(2)}`;

    shippingElement.textContent =
        shipping === 0
            ? "FREE"
            : `$${shipping.toFixed(2)}`;

    totalElement.textContent =
        `$${total.toFixed(2)}`;

}



/* DISPLAY */

displayCart();