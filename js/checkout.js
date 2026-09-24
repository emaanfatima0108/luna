const checkoutItems =
    document.getElementById("checkout-items");

const checkoutSubtotal =
    document.getElementById("checkout-subtotal");

const checkoutShipping =
    document.getElementById("checkout-shipping");

const checkoutTotal =
    document.getElementById("checkout-total");


let cart =
    JSON.parse(
        localStorage.getItem("lunaCart")
    ) || [];



/* DISPLAY ORDER */

function displayCheckout() {

    checkoutItems.innerHTML = "";

    let subtotal = 0;


    cart.forEach(item => {

        const product =
            products.find(
                product => product.id === item.id
            );


        if (!product) return;


        subtotal +=
            product.price * item.quantity;


        const element =
            document.createElement("div");

        element.className =
            "checkout-item";


        element.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >


            <div class="checkout-item-info">

                <h3>
                    ${product.name}
                </h3>

                <p>
                    Quantity: ${item.quantity}
                </p>

            </div>


            <div class="checkout-item-price">

                $${product.price * item.quantity}

            </div>

        `;


        checkoutItems.appendChild(element);

    });


    let shipping = 0;


    if (subtotal > 0 && subtotal < 100) {

        shipping = 10;

    }


    const total =
        subtotal + shipping;


    checkoutSubtotal.textContent =
        `$${subtotal.toFixed(2)}`;

    checkoutShipping.textContent =
        shipping === 0
            ? "FREE"
            : `$${shipping.toFixed(2)}`;

    checkoutTotal.textContent =
        `$${total.toFixed(2)}`;

}


displayCheckout();



/* PAYMENT SWITCH */

const paymentOptions =
    document.querySelectorAll(
        'input[name="payment"]'
    );

const cardFields =
    document.getElementById("card-fields");


paymentOptions.forEach(option => {

    option.addEventListener(
        "change",
        () => {

            if (option.value === "card") {

                cardFields.style.display =
                    "block";

            } else {

                cardFields.style.display =
                    "none";

            }

        }
    );

});



/* CARD NUMBER FORMAT */

const cardNumber =
    document.getElementById("card-number");


cardNumber.addEventListener(
    "input",
    () => {

        let value =
            cardNumber.value
                .replace(/\D/g, "")
                .slice(0, 16);


        value =
            value.match(/.{1,4}/g)?.join(" ")
            || "";


        cardNumber.value =
            value;

    }
);



/* EXPIRY FORMAT */

const expiry =
    document.getElementById("expiry");


expiry.addEventListener(
    "input",
    () => {

        let value =
            expiry.value
                .replace(/\D/g, "")
                .slice(0, 4);


        if (value.length >= 3) {

            value =
                value.slice(0, 2)
                + "/"
                + value.slice(2);

        }


        expiry.value =
            value;

    }
);



/* FORM SUBMISSION */

const checkoutForm =
    document.getElementById("checkout-form");


checkoutForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        if (cart.length === 0) {

            alert(
                "Your bag is empty."
            );

            return;

        }


        const payment =
            document.querySelector(
                'input[name="payment"]:checked'
            ).value;


        if (payment === "card") {

            const card =
                cardNumber.value
                    .replace(/\s/g, "");

            const expiryValue =
                expiry.value;

            const cvv =
                document
                    .getElementById("cvv")
                    .value;


            if (
                card.length !== 16 ||
                expiryValue.length !== 5 ||
                cvv.length !== 3
            ) {

                alert(
                    "Please enter valid card details."
                );

                return;

            }

        }


        alert(
            "Order placed successfully! Thank you for shopping with LUNA."
        );


        localStorage.removeItem(
            "lunaCart"
        );


        window.location.href =
            "index.html";

    }
);