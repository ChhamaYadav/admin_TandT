// Search Functionality
document.getElementById('searchInput').addEventListener('input', function () {
  const searchValue = this.value.toLowerCase();
  const rows = document.querySelectorAll('#productTableBody tr');
  rows.forEach(row => {
    const rowText = row.textContent.toLowerCase();
    row.style.display = rowText.includes(searchValue) ? '' : 'none';
  });
});

// Filter by Category
document.getElementById('categoryFilter').addEventListener('change', function () {
  const filterValue = this.value.toLowerCase();
  const rows = document.querySelectorAll('#productTableBody tr');
  rows.forEach(row => {
    const category = row.children[1].textContent.toLowerCase();
    row.style.display = !filterValue || category === filterValue ? '' : 'none';
  });
});

// Sorting by Columns
function sortTable(columnIndex) {
  const tableBody = document.getElementById('productTableBody');
  const rows = Array.from(tableBody.rows);
  const isAscending = tableBody.getAttribute('data-sort-dir') === 'asc';
  tableBody.setAttribute('data-sort-dir', isAscending ? 'desc' : 'asc');

  rows.sort((a, b) => {
    const aText = a.children[columnIndex].textContent.trim();
    const bText = b.children[columnIndex].textContent.trim();
    return isAscending
      ? aText.localeCompare(bText, undefined, { numeric: true })
      : bText.localeCompare(aText, undefined, { numeric: true });
  });

  rows.forEach(row => tableBody.appendChild(row));
}

// Pagination
let currentPage = 1;
const rowsPerPage = 5;

function paginateTable() {
  const rows = document.querySelectorAll('#productTableBody tr');
  const totalPages = Math.ceil(rows.length / rowsPerPage);
  document.getElementById('totalPages').textContent = totalPages;
  document.getElementById('currentPage').textContent = currentPage;

  rows.forEach((row, index) => {
    row.style.display =
      index >= (currentPage - 1) * rowsPerPage && index < currentPage * rowsPerPage
        ? ''
        : 'none';
  });
}

document.getElementById('prevPage').addEventListener('click', function () {
  if (currentPage > 1) {
    currentPage--;
    paginateTable();
  }
});

document.getElementById('nextPage').addEventListener('click', function () {
  const totalPages = Math.ceil(document.querySelectorAll('#productTableBody tr').length / rowsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    paginateTable();
  }
});

// Initialize pagination
paginateTable();

// Get modal and elements
const modal = document.getElementById("productModal");
const btn = document.getElementById("addNewProductBtn");
const span = document.getElementById("closeModal");
const form = document.getElementById("productForm");
const tableBody = document.getElementById("productTableBody");

// Open modal when the button is clicked
btn.onclick = function() {
  modal.style.display = "block";
}

// Close modal when the user clicks on the "x"
span.onclick = function() {
  modal.style.display = "none";
}

// Close modal if the user clicks anywhere outside of the modal
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
}

// Handle form submission
form.addEventListener("submit", function(e) {
  e.preventDefault(); // Prevent page refresh on submit

  // Get form data
  const productName = document.getElementById("productName").value;
  const category = document.getElementById("category").value;
  const price = document.getElementById("price").value;
  const sizes = {
    XS: document.getElementById("XS").value,
    S: document.getElementById("S").value,
    M: document.getElementById("M").value,
    L: document.getElementById("L").value,
    XL: document.getElementById("XL").value,
    XXL: document.getElementById("XXL").value
  };
  const productImage = document.getElementById("productImage").files[0];
  const productDescription = document.getElementById("productDescription").value;

  // Add product to table
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td>${productName}</td>
    <td>${category}</td>
    <td>#${Math.floor(Math.random() * 10000)}</td>
    <td>${price}</td>
    <td>
      XS: ${sizes.XS}, S: ${sizes.S}, M: ${sizes.M}, L: ${sizes.L}, XL: ${sizes.XL}, XXL: ${sizes.XXL}
    </td>
    <td class="actions">
      <button class="edit-btn"><i class="fas fa-edit"></i></button>
      <button class="delete-btn"><i class="fas fa-trash"></i></button>
    </td>
  `;

  tableBody.appendChild(newRow);

  // Close modal and reset form
  modal.style.display = "none";
  form.reset();
});

//confirmation modals for actions like deleting a product:
const confirmModal = document.getElementById("confirmModal");
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");

function showConfirmModal() {
    confirmModal.style.display = "block";
}

function hideConfirmModal() {
    confirmModal.style.display = "none";
}

cancelDeleteBtn.addEventListener("click", hideConfirmModal);