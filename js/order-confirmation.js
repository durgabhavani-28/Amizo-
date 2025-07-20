// Load total price from localStorage
window.onload = function () {
    let storedTotal = localStorage.getItem("totalPrice");
    if (storedTotal) {
        document.getElementById("order-total").innerText = storedTotal;
    } else {
        document.getElementById("order-total").innerText = "0";
    }

    // Set estimated delivery time
    let now = new Date();
    let deliveryTime = new Date(now.getTime() + 30 * 60000); // 30 minutes from now
    document.getElementById("delivery-time").innerText = deliveryTime.toLocaleTimeString();

    // Clear stored data after confirmation
    localStorage.removeItem("totalPrice");
};
