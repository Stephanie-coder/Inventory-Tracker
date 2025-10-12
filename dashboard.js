const form = document.getElementById("itemForm");
const tableBody = document.querySelector("#inventoryTable tbody");

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
    <td>${name}</td>
    <td>${quantity}</td>
    <td>${category || "—"}</td>
    <td>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    </td>
  `;

  tableBody.appendChild(row);
  form.reset();
});

tableBody.addEventListener("click", (e) => {
  const row = e.target.closest("tr");

  // Delete item
  if (e.target.classList.contains("delete-btn")) {
    row.remove();
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
      editButton.style.backgroundColor = "#4caf50"; // green for save
    } else {
      // Save changes
      const newQuantity = quantityCell.querySelector("input").value.trim();
      quantityCell.textContent = newQuantity || currentQuantity;
      editButton.textContent = "Edit";
      editButton.style.backgroundColor = "#1976d2"; // back to blue
    }
  }
});
