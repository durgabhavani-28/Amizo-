// Sample assigned orders (In real project, this comes from a database)
let assignedOrders = [
    { id: "ORD12349", customer: "John Doe", address: "123 Street, Peddapuram", status: "Picked Up" },
    { id: "ORD12350", customer: "Jane Smith", address: "456 Avenue, Samarlakota", status: "Out for Delivery" }
];

// Load assigned orders
function loadOrders() {
    let orderList = document.getElementById("delivery-orders");
    orderList.innerHTML = "";

    assignedOrders.forEach((order, index) => {
        orderList.innerHTML += `
            <li>
                Order ID: ${order.id} - ${order.customer} <br>
                📍 Address: ${order.address} <br>
                <span>Status: ${order.status}</span>
                <button onclick="updateDeliveryStatus(${index})">✔ Mark as Delivered</button>
            </li>
        `;
    });
}

// Update delivery status
function updateDeliveryStatus(index) {
    assignedOrders[index].status = "Delivered";
    loadOrders();
}

// Load orders on page load
loadOrders();
