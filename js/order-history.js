// Load order history from localStorage
window.onload = function () {
    let orders = JSON.parse(localStorage.getItem("orderHistory")) || [];
    let orderList = document.getElementById("order-list");

    if (orders.length === 0) {
        orderList.innerHTML = "<p>No previous orders found.</p>";
    } else {
        orderList.innerHTML = "";
        orders.forEach((order, index) => {
            let orderBox = document.createElement("div");
            orderBox.classList.add("order-box");
            orderBox.innerHTML = `
                <h3>Order #${index + 1}</h3>
                <p><strong>Name:</strong> ${order.name}</p>
                <p><strong>Address:</strong> ${order.address}</p>
                <p><strong>Phone:</strong> ${order.phone}</p>
                <p><strong>Total Price:</strong> ₹${order.total}</p>
                <h4>Items Ordered:</h4>
                <ul>${order.items.map(item => `<li>${item.name} (x${item.quantity}) - ₹${item.price * item.quantity}</li>`).join("")}</ul>
            `;
            orderList.appendChild(orderBox);
        });
    }
};
