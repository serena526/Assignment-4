let form = document.querySelector('#dataForm');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    let formData = new FormData(form);
    let data = Object.fromEntries(formData.entries());  // Convert form data to object
    let jsonData = JSON.stringify(data);  // Convert to JSON string

    fetch('https://jsonplaceholder.typicode.com/posts', {  // POST URL to create a new resource
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
    .then(res => res.json())
    .then(result => {
        console.log(result);  // Log the response
        displayUserDetails(result);  // Call function to display the result
    })
    .catch(err => console.error('Error during POST:', err));
}

function displayUserDetails(user) {
    let userList = document.querySelector('#userList tbody');
    
    // Clear any previous content in the table body
    userList.innerHTML = '';

    // Create a new row with user details
    let row = document.createElement('tr');
    row.innerHTML = `
        <td>${user.id || 'N/A'}</td>
        <td>${user.rollno || 'N/A'}</td>
        <td>${user.name || 'N/A'}</td>
        <td>${user.age || 'N/A'}</td>
        <td>${user.email || 'N/A'}</td>
        <td><button id="deleteBtn" class="btn btn-danger">Delete</button></td>
    `;

    // Append the new row to the table body
    userList.appendChild(row);

    // Add event listener for the Delete button
    let deleteBtn = row.querySelector('#deleteBtn');
    deleteBtn.addEventListener('click', () => deleteUser(user.id));
}

function deleteUser(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {  // DELETE URL to remove a specific resource
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
        if (res.ok) {
            document.querySelector('#userList tbody').innerHTML = '';  // Clear user details on successful deletion
            console.log(`User with ID ${id} deleted.`);
        } else {
            console.error('Failed to delete user');
        }
    })
    .catch(err => console.error('Error during DELETE:', err));
}
