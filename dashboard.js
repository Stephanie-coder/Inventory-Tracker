const form = document.getElementById("itemForm");
const tableBody = document.querySelector("#inventoryTable tbody");

// Filter elements
const filterName = document.getElementById("filterName");
const filterCategory = document.getElementById("filterCategory");
const clearFilter = document.getElementById("clearFilter");

// Load items from localStorage
let inventory = JSON.parse(localStorage.getItem("inventoryData")) || [];

// Render the inventory
function renderInventory(items = inventory) {
  tableBody.innerHTML = "";

  items.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>${item.category || "—"}</td>
      <td>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </td>
    `;
    row.dataset.index = index;
    tableBody.appendChild(row);
  });
}

// Save to localStorage
function saveInventory() {
  localStorage.setItem("inventoryData", JSON.stringify(inventory));
}

// Add new item
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("itemName").value.trim();
  const quantity = document.getElementById("itemQuantity").value.trim();
  const category = document.getElementById("itemCategory").value.trim();

  if (!name || !quantity) {
    alert("Please fill in all required fields");
    return;
  }

  const newItem = { name, quantity, category };
  inventory.push(newItem);
  saveInventory();
  renderInventory();

  form.reset();
});

// Edit or delete items
tableBody.addEventListener("click", (e) => {
  const row = e.target.closest("tr");
  const index = row.dataset.index;

  // Delete item
  if (e.target.classList.contains("delete-btn")) {
    inventory.splice(index, 1);
    saveInventory();
    renderInventory();
    return;
  }

  // Edit quantity
  if (e.target.classList.contains("edit-btn")) {
    const quantityCell = row.children[1];
    const currentQuantity = quantityCell.textContent;
    const editButton = e.target;

    if (editButton.textContent === "Edit") {
      // Switch to edit mode
      quantityCell.innerHTML = `<input type="number" value="${currentQuantity}" min="0" class="edit-input">`;
      editButton.textContent = "Save";
      editButton.style.backgroundColor = "#43a047";
    } else {
      // Save changes
      const newQuantity = quantityCell.querySelector("input").value.trim();
      inventory[index].quantity = newQuantity || currentQuantity;
      saveInventory();
      renderInventory();
    }
  }
});

// Filtering
function filterInventory() {
  const nameFilter = filterName.value.toLowerCase();
  const categoryFilter = filterCategory.value.toLowerCase();

  const filteredItems = inventory.filter((item) => {
    const nameMatch = item.name.toLowerCase().includes(nameFilter);
    const categoryMatch = item.category.toLowerCase().includes(categoryFilter);
    return nameMatch && categoryMatch;
  });

  renderInventory(filteredItems);
}

filterName.addEventListener("input", filterInventory);
filterCategory.addEventListener("input", filterInventory);

// Clear filter button
clearFilter.addEventListener("click", () => {
  filterName.value = "";
  filterCategory.value = "";
  renderInventory();
});

// Initial load
renderInventory();

