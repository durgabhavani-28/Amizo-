// Handle signup form submission
const apiBaseUrl = "/.netlify/functions";

async function signupUser(fullName, email, password) {
    try {
        const response = await fetch(`${apiBaseUrl}/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fullName, email, password }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Signup failed");
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

document.getElementById("signup-form").addEventListener("submit", async function(event) {
    event.preventDefault();
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!fullName || !email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    const result = await signupUser(fullName, email, password);
    if (result) {
        alert("Signup successful. Please login.");
        window.location.href = "login.html";
    } else {
        alert("Signup failed. Please try again.");
    }
});
