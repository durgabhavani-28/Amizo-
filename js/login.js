// Handle login form submission
const apiBaseUrl = "/.netlify/functions";

async function loginUser(email, password) {
    try {
        const response = await fetch(`${apiBaseUrl}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Login failed");
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

document.getElementById("login-form").addEventListener("submit", async function(event) {
    event.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }

    const result = await loginUser(email, password);
    if (result) {
        alert("Login successful. Welcome " + result.user.fullName);
        localStorage.setItem("userEmail", result.user.email);
        localStorage.setItem("userName", result.user.fullName);
        window.location.href = "index.html";
    } else {
        alert("Login failed. Please check your credentials.");
    }
});
