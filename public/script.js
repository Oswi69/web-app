const apiUrl = 'http://localhost:5000/api/items';
const itemModal = new bootstrap.Modal(document.getElementById('itemModal'));
const itemForm = document.getElementById('itemForm');
const itemsTableBody = document.getElementById('itemsTableBody');
let editingItemId = null;

async function fetchItems() {
  const response = await fetch(apiUrl);
  const items = await response.json();

  itemsTableBody.innerHTML = items.map(item => `
    <tr>
      <td>${item.id}</td>
      <td>${item.name}</td>
      <td>${item.description || '-'}</td>
      <td>${new Date(item.date_created).toLocaleString()}</td>
      <td>
        <button class="btn btn-sm btn-warning" onclick="editItem(${item.id})">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteItem(${item.id})">Delete</button>
      </td>
    </tr>
  `).join('');
}

itemForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('itemName').value;
  const description = document.getElementById('itemDescription').value;

  const payload = { name, description };

  if (editingItemId) {
    await fetch(`${apiUrl}/${editingItemId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } else {
    await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  }

  itemModal.hide();
  editingItemId = null;
  itemForm.reset();
  fetchItems();
});

document.getElementById('addItemBtn').addEventListener('click', () => {
  document.getElementById('modalTitle').innerText = 'Add Item';
  itemForm.reset();
  editingItemId = null;
  itemModal.show();
});

async function editItem(id) {
  const response = await fetch(`${apiUrl}/${id}`);
  const item = await response.json();

  document.getElementById('modalTitle').innerText = 'Edit Item';
  document.getElementById('itemName').value = item.name;
  document.getElementById('itemDescription').value = item.description || '';
  editingItemId = id;
  itemModal.show();
}

async function deleteItem(id) {
  if (confirm('Are you sure you want to delete this item?')) {
    await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
    fetchItems();
  }
}

fetchItems();
