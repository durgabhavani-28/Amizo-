const apiBaseUrl = "/.netlify/functions";

async function fetchUserProfile(email) {
    try {
        const response = await fetch(`${apiBaseUrl}/profile?email=${encodeURIComponent(email)}`);
        if (!response.ok) throw new Error("Failed to fetch profile");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function updateUserProfile(profile) {
    try {
        const response = await fetch(`${apiBaseUrl}/profile`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(profile),
        });
        if (!response.ok) throw new Error("Failed to update profile");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

window.onload = async function () {
    const storedEmail = localStorage.getItem("userEmail") || "john@example.com";
    const profile = await fetchUserProfile(storedEmail);
    if (profile) {
        document.getElementById("user-name").innerText = profile.fullName || "John Doe";
        document.getElementById("user-email").innerText = profile.email || storedEmail;
        document.getElementById("user-address").innerText = profile.address || "Peddapuram, AP";
    } else {
        document.getElementById("user-name").innerText = "John Doe";
        document.getElementById("user-email").innerText = storedEmail;
        document.getElementById("user-address").innerText = "Peddapuram, AP";
    }

    // TODO: Fetch and display order history from backend if needed
};

async function editProfile() {
    let newName = prompt("Enter your name:", document.getElementById("user-name").innerText);
    let newEmail = prompt("Enter your email:", document.getElementById("user-email").innerText);
    let newAddress = prompt("Enter your address:", document.getElementById("user-address").innerText);

    if (newName && newEmail) {
        const updatedProfile = { fullName: newName, email: newEmail, address: newAddress };
        const result = await updateUserProfile(updatedProfile);
        if (result) {
            document.getElementById("user-name").innerText = newName;
            document.getElementById("user-email").innerText = newEmail;
            document.getElementById("user-address").innerText = newAddress;
            localStorage.setItem("userName", newName);
            localStorage.setItem("userEmail", newEmail);
            localStorage.setItem("userAddress", newAddress);
            alert("Profile updated successfully");
        } else {
            alert("Failed to update profile");
        }
    }
}
