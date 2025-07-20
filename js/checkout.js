// Load total price from localStorage
window.onload = function () {
    let storedTotal = localStorage.getItem("totalPrice");
    if (storedTotal) {
        document.getElementById("checkout-total").innerText = storedTotal;
    } else {
        document.getElementById("checkout-total").innerText = "0";
    }
};

// Handle checkout form submission
document.getElementById("checkout-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let name = document.getElementById("name").value;
    let address = document.getElementById("address").value;
    let phone = document.getElementById("phone").value;
    
    if (name === "" || address === "" || phone === "") {
        alert("Please fill in all details.");
        return;
    }

    alert("Order placed successfully! Redirecting to payment...");
    window.location.href = "payment.html"; // Redirect to payment page
});
