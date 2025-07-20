// Cart data will be fetched from backend orders API
let cart = [];

const apiBaseUrl = "/.netlify/functions";

async function fetchOrders(email) {
    try {
        const response = await fetch(`${apiBaseUrl}/orders?email=${encodeURIComponent(email)}`);
        if (!response.ok) throw new Error("Failed to fetch orders");
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function placeOrder(order) {
    try {
        const response = await fetch(`${apiBaseUrl}/orders`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(order),
        });
        if (!response.ok) throw new Error("Failed to place order");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

function loadCart() {
    let cartTable = document.getElementById("cart-items");
    let totalPrice = 0;
    cartTable.innerHTML = ""; // Clear previous content

    cart.forEach((item, index) => {
        let total = item.price * item.quantity;
        totalPrice += total;

        let row = `
            <tr>
                <td>${item.name}</td>
                <td>₹${item.price}</td>
                <td>${item.quantity}</td>
                <td>₹${total}</td>
                <td><button onclick="removeItem(${index})">❌</button></td>
            </tr>
        `;
        cartTable.innerHTML += row;
    });

    document.getElementById("total-price").innerText = totalPrice;
}

function removeItem(index) {
    cart.splice(index, 1);
    loadCart();
}

window.onload = async function () {
    const storedEmail = localStorage.getItem("userEmail");
    if (!storedEmail) {
        alert("Please login to view your cart.");
        window.location.href = "login.html";
        return;
    }
    cart = await fetchOrders(storedEmail);
    loadCart();
};

// Function to handle order placement
async function handlePlaceOrder() {
    const storedEmail = localStorage.getItem("userEmail");
    if (!storedEmail) {
        alert("Please login to place an order.");
        window.location.href = "login.html";
        return;
    }
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }
    const order = {
        userEmail: storedEmail,
        items: cart,
    };
    const result = await placeOrder(order);
    if (result) {
        alert("Order placed successfully!");
        cart = [];
        loadCart();
        window.location.href = "order-confirmation.html";
    } else {
        alert("Failed to place order. Please try again.");
    }
}
