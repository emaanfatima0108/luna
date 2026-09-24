const params =
    new URLSearchParams(window.location.search);

const productId =
    Number(params.get("id"));


const product =
    products.find(
        item => item.id === productId
    );


const productImage =
    document.getElementById("product-image");

const productName =
    document.getElementById("product-name");

const productCategory =
    document.getElementById("product-category");

const productPrice =
    document.getElementById("product-price");

const productDescription =
    document.getElementById("product-description");

const quantityDisplay =
    document.getElementById("quantity");


let quantity = 1;



/* LOAD PRODUCT */

if (product) {

    productImage.src =
        product.image;

    productImage.alt =
        product.name;

    productName.textContent =
        product.name;

    productCategory.textContent =
        product.category.toUpperCase();

    productPrice.textContent =
        `$${product.price}`;

    productDescription.textContent =
        product.description;

}



/* QUANTITY */

document
    .getElementById("plus")
    .addEventListener("click", () => {

        quantity++;

        quantityDisplay.textContent =
            quantity;

    });


document
    .getElementById("minus")
    .addEventListener("click", () => {

        if (quantity > 1) {

            quantity--;

            quantityDisplay.textContent =
                quantity;

        }

    });



/* ADD TO CART */

document
    .getElementById("add-cart")
    .addEventListener("click", () => {

        let cart =
            JSON.parse(
                localStorage.getItem("lunaCart")
            ) || [];


        const existingItem =
            cart.find(
                item => item.id === product.id
            );


        if (existingItem) {

            existingItem.quantity += quantity;

        } else {

            cart.push({

                id: product.id,

                quantity: quantity

            });

        }


        localStorage.setItem(
            "lunaCart",
            JSON.stringify(cart)
        );


        window.location.href =
            "cart.html";

    });



/* WISHLIST */

document
    .getElementById("add-wishlist")
    .addEventListener("click", () => {

        alert(
            `${product.name} added to your wishlist!`
        );

    });