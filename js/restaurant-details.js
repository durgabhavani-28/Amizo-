// Sample restaurant data
let restaurant = {
    name: "Spicy Hub",
    type: "Fast Food, Indian",
    rating: "⭐ 4.5",
    menu: [
        { name: "Chicken Biryani", price: "₹250" },
        { name: "Paneer Tikka", price: "₹180" },
        { name: "Masala Dosa", price: "₹120" }
    ]
};

// Load restaurant details
document.getElementById("restaurant-name").innerText = restaurant.name;
document.getElementById("restaurant-type").innerText = restaurant.type;
document.getElementById("restaurant-rating").innerText = restaurant.rating;

// Load menu items
let menuContainer = document.getElementById("menu-items");
restaurant.menu.forEach(item => {
    let menuItem = document.createElement("div");
    menuItem.classList.add("menu-item");
    menuItem.innerHTML = `<h4>${item.name}</h4><p>${item.price}</p>`;
    menuContainer.appendChild(menuItem);
});
