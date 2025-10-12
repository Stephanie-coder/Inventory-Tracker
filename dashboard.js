const form = document.getElementById("itemForm");
const tableBody = document.querySelector("#inventoryTable tbody");
const filterInput = document.getElementById("filterInput"); // text search (optional)
const filterCategory = document.getElementById("filterCategory"); // dropdown filter (optional)

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

  const row = document.createElement("tr");
  row.innerHTML = `
    <td class="item-name">${name}</td>
    <td class="item-quantity">${quantity}</td>
    <td class="item-category">${category || "—"}</td>
    <td>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    </td>
  `;

  tableBody.appendChild(row);
  form.reset();
});

// Handle edit and delete
tableBody.addEventListener("click", (e) => {
  const row = e.target.closest("tr");

  // Delete item
  if (e.target.classList.contains("delete-btn")) {
    row.remove();
  }

  // Edit quantity
  if (e.target.classList.contains("edit-btn")) {
    const quantityCell = row.querySelector(".item-quantity");
    const currentQuantity = quantityCell.textContent;
    const editButton = e.target;

    if (editButton.textContent === "Edit") {
      quantityCell.innerHTML = `<input type="number" value="${currentQuantity}" min="0" class="edit-input">`;
      editButton.textContent = "Save";
      editButton.style.backgroundColor = "#4caf50";
    } else {
      const newQuantity = quantityCell.querySelector("input").value.trim();
      quantityCell.textContent = newQuantity || currentQuantity;
      editButton.textContent = "Edit";
      editButton.style.backgroundColor = "#1976d2";
    }
  }
});

// Filter items (by name and category)
function filterItems() {
  const filterText = filterInput ? filterInput.value.toLowerCase() : "";
  const selectedCategory = filterCategory ? filterCategory.value.toLowerCase() : "";

  const rows = tableBody.querySelectorAll("tr");
  rows.forEach(row => {
    const name = row.querySelector(".item-name").textContent.toLowerCase();
    const category = row.querySelector(".item-category").textContent.toLowerCase();

    const matchesText = name.includes(filterText);
    const matchesCategory = !selectedCategory || selectedCategory === "all" || category === selectedCategory;

    row.style.display = (matchesText && matchesCategory) ? "" : "none";
  });
}


// Listen for filter changes
if (filterInput) filterInput.addEventListener("input", filterItems);
if (filterCategory) filterCategory.addEventListener("change", filterItems);
