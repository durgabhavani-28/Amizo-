// Sample orders (In real project, this comes from a database)
let orders = [
    { id: "ORD12345", status: "Processing" },
    { id: "ORD12346", status: "Out for Delivery" }
];

// Load orders into the admin panel
function loadOrders() {
    let orderList = document.getElementById("order-list");
    orderList.innerHTML = "";
    
    orders.forEach((order, index) => {
        orderList.innerHTML += `
            <li>
                Order ID: ${order.id} - Status: <span>${order.status}</span>
                <button onclick="updateOrder(${index})">Update Status</button>
            </li>
        `;
    });
}

// Update order status
function updateOrder(index) {
    if (orders[index].status === "Processing") {
        orders[index].status = "Out for Delivery";
    } else if (orders[index].status === "Out for Delivery") {
        orders[index].status = "Delivered";
    }

    loadOrders(); // Reload UI
}

// Add a new restaurant (dummy function)
function addRestaurant() {
    alert("Feature coming soon!");
}

// Load orders on page load
loadOrders();
