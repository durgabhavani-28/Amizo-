const apiBaseUrl = "/.netlify/functions";

let menuItems = [];
let restaurantOrders = [];

async function fetchMenu() {
    try {
        const response = await fetch(`${apiBaseUrl}/restaurants`);
        if (!response.ok) throw new Error("Failed to fetch menu");
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function fetchOrders() {
    try {
        const response = await fetch(`${apiBaseUrl}/orders`);
        if (!response.ok) throw new Error("Failed to fetch orders");
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function addMenuItem() {
    let newItem = prompt("Enter new dish name:");
    let newPrice = prompt("Enter price:");

    if (newItem && newPrice) {
        const newMenuItem = { name: newItem, price: `₹${newPrice}` };
        try {
            const response = await fetch(`${apiBaseUrl}/restaurants`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newMenuItem),
            });
            if (!response.ok) throw new Error("Failed to add menu item");
            menuItems = await fetchMenu();
            loadMenu();
        } catch (error) {
            console.error(error);
            alert("Failed to add menu item");
        }
    }
}

async function removeMenuItem(index) {
    const item = menuItems[index];
    if (!item || !item._id) {
        alert("Invalid menu item");
        return;
    }
    try {
        const response = await fetch(`${apiBaseUrl}/restaurants`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: item._id }),
        });
        if (!response.ok) throw new Error("Failed to remove menu item");
        menuItems = await fetchMenu();
        loadMenu();
    } catch (error) {
        console.error(error);
        alert("Failed to remove menu item");
    }
}

async function updateOrderStatus(index) {
    const order = restaurantOrders[index];
    if (!order || !order._id) {
        alert("Invalid order");
        return;
    }
    try {
        const response = await fetch(`${apiBaseUrl}/orders`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: order._id, status: "Completed" }),
        });
        if (!response.ok) throw new Error("Failed to update order status");
        restaurantOrders = await fetchOrders();
        loadOrders();
    } catch (error) {
        console.error(error);
        alert("Failed to update order status");
    }
}

function loadMenu() {
    let menuList = document.getElementById("menu-list");
    menuList.innerHTML = "";

    menuItems.forEach((item, index) => {
        menuList.innerHTML += `
            <li>${item.name} - ${item.price} <button onclick="removeMenuItem(${index})">❌ Remove</button></li>
        `;
    });
}

function loadOrders() {
    let orderList = document.getElementById("restaurant-orders");
    orderList.innerHTML = "";

    restaurantOrders.forEach((order, index) => {
        orderList.innerHTML += `
            <li>
                Order ID: ${order._id} - ${order.items ? order.items.map(i => i.name).join(", ") : ""} 
                <span>Status: ${order.status}</span>
                <button onclick="updateOrderStatus(${index})">✔ Complete</button>
            </li>
        `;
    });
}

window.onload = async function () {
    menuItems = await fetchMenu();
    restaurantOrders = await fetchOrders();
    loadMenu();
    loadOrders();
};
