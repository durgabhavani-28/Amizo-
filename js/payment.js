// Load total price from localStorage
window.onload = function () {
    let storedTotal = localStorage.getItem("totalPrice");
    if (storedTotal) {
        document.getElementById("payment-total").innerText = storedTotal;
    } else {
        document.getElementById("payment-total").innerText = "0";
    }
};

// Handle payment form submission
document.getElementById("payment-form").addEventListener("submit", function(event) {
    event.preventDefault();

    let selectedPayment = document.querySelector('input[name="payment-method"]:checked').value;
    alert("Payment Successful! You chose: " + selectedPayment + ". Your order has been placed.");
    
    // Clear cart and total price after order
    localStorage.removeItem("totalPrice");
    window.location.href = "order-confirmation.html";
});
