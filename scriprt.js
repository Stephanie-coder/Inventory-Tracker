// Grab elements
const itemForm = document.getElementById("itemForm");
const itemName = document.getElementById("itemName");
const itemQuantity = document.getElementById("itemQuantity");
const itemCategory = document.getElementById("itemCategory");
const inventoryList = document.getElementById("inventoryList");

// Store inventory in an array
let inventory = [];

// Handle form submission
itemForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const item = {
    id: Date.now(),
    name: itemName.value,
    quantity: itemQuantity.value,
    category: itemCategory.value || "Uncategorized"
  };

  inventory.push(item);
  displayItems();

  itemForm.reset();
});

// Function to display items
function displayItems() {
  inventoryList.innerHTML = "";

  inventory.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - Qty: ${item.quantity} [${item.category}]
      <button class="delete-btn" onclick="deleteItem(${item.id})">Delete</button>
    `;
    inventoryList.appendChild(li);
  });
}

// Function to delete item
function deleteItem(id) {
  inventory = inventory.filter((item) => item.id !== id);
  displayItems();
}
