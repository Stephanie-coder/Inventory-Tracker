console.log("Script loaded!");

// Grab elements
const itemForm = document.getElementById("itemForm");
const itemName = document.getElementById("itemName");
const itemQuantity = document.getElementById("itemQuantity");
const itemCategory = document.getElementById("itemCategory");
const inventoryList = document.getElementById("inventoryList");

// Store inventory in an array
let inventory = [];

// Handle form submission
itemForm.addEventListener("submit", function (e) {
  e.preventDefault(); // Stop form from refreshing the page

  // Create new item
  const item = {
    id: Date.now(),
    name: itemName.value.trim(),
    quantity: itemQuantity.value.trim(),
    category: itemCategory.value.trim() || "Uncategorized",
  };

  // Add item to inventory array
  inventory.push(item);

  // Update the display
  displayItems();

  // Reset form inputs
  itemForm.reset();
});

// Display inventory items
function displayItems() {
  inventoryList.innerHTML = ""; // Clear the list first

  if (inventory.length === 0) {
    inventoryList.innerHTML = "<p>No items in inventory.</p>";
    return;
  }

  inventory.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} (${item.quantity}) - ${item.category}`;
    inventoryList.appendChild(li);
  });
}
