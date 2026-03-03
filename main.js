const form = document.getElementById('recordForm');
const insertBtn = document.getElementById('insertBtn');
const updateBtn = document.getElementById('updateBtn');
const clearBtn = document.getElementById('clearBtn');
const clearRecordsBtn = document.getElementById('clearRecordsBtn');
const tableBody = document.getElementById('recordsTable').querySelector('tbody');

let records = [];
let editIndex = -1;

insertBtn.addEventListener('click', () => {
    const firstName = document.getElementById('firstName').value.trim();
    const middleName = document.getElementById('middleName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const age = document.getElementById('age').value.trim();

    if (!firstName || !lastName || !age) {
        alert("Please fill in all required fields.");
        return;
    }

    records.push({ firstName, middleName, lastName, age });
    renderTable();
    form.reset();
});

updateBtn.addEventListener('click', () => {
    if (editIndex === -1) return;

    const firstName = document.getElementById('firstName').value.trim();
    const middleName = document.getElementById('middleName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const age = document.getElementById('age').value.trim();

    if (!firstName || !lastName || !age) {
        alert("Please fill in all required fields.");
        return;
    }

    records[editIndex] = { firstName, middleName, lastName, age };
    editIndex = -1;
    insertBtn.style.display = "inline-block";
    updateBtn.style.display = "none";
    renderTable();
    form.reset();
});

clearBtn.addEventListener('click', () => {
    form.reset();
    editIndex = -1;
    insertBtn.style.display = "inline-block";
    updateBtn.style.display = "none";
});

clearRecordsBtn.addEventListener('click', () => {
    if (records.length === 0) return;
    if (confirm("Are you sure you want to delete all records?")) {
        records = [];
        renderTable();
    }
});

function renderTable() {
    tableBody.innerHTML = "";

    records.forEach((rec, index) => {
        const row = tableBody.insertRow();
        row.insertCell(0).innerText = rec.firstName;
        row.insertCell(1).innerText = rec.middleName;
        row.insertCell(2).innerText = rec.lastName;
        row.insertCell(3).innerText = rec.age;

        const actionsCell = row.insertCell(4);

        const editBtn = document.createElement('button');
        editBtn.textContent = "Edit";
        editBtn.style.marginRight = "5px";
        editBtn.addEventListener('click', () => editRecord(index));

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener('click', () => deleteRecord(index));

        actionsCell.appendChild(editBtn);
        actionsCell.appendChild(deleteBtn);
    });
}

function editRecord(index) {
    const rec = records[index];
    document.getElementById('firstName').value = rec.firstName;
    document.getElementById('middleName').value = rec.middleName;
    document.getElementById('lastName').value = rec.lastName;
    document.getElementById('age').value = rec.age;

    editIndex = index;
    insertBtn.style.display = "none";
    updateBtn.style.display = "inline-block";
}

function deleteRecord(index) {
    if (confirm("Are you sure you want to delete this record?")) {
        records.splice(index, 1);
        renderTable();
    }
}