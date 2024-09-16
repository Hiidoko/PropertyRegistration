const properties = JSON.parse(localStorage.getItem('properties')) || [];

document.getElementById('propertyForm')?.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent page reload

    // Collect form data
    const property = {
        owner: document.getElementById('owner').value,
        rooms: document.querySelector('input[name="rooms"]:checked').value,
        bathrooms: document.querySelector('input[name="bathrooms"]:checked').value,
        garage: document.querySelector('input[name="garage"]:checked').value
    };

    // Add property to array
    properties.push(property);

    // Save to localStorage
    localStorage.setItem('properties', JSON.stringify(properties));

    // Update property list
    updatePropertyList();

    // Clear form
    document.getElementById('propertyForm').reset();
});

document.getElementById('deleteAllButton')?.addEventListener('click', function () {
    if (properties.length === 0) {
        alert("No properties to delete.");
        return;
    }

    // Confirm deletion of all properties
    const confirmation = confirm("Do you want to delete all properties?");
    if (confirmation) {
        properties.length = 0; // Clear the array
        localStorage.setItem('properties', JSON.stringify(properties));
        updatePropertyList();
    }
});

function updatePropertyList() {
    const propertyList = document.getElementById('propertyList');
    propertyList.innerHTML = ''; // Clear the list

    properties.forEach((property, index) => {
        const propertyItem = document.createElement('li');
        propertyItem.innerHTML = `
            Property ${index + 1}: Owner: ${property.owner}, Rooms: ${property.rooms}, Bathrooms: ${property.bathrooms}, Garage: ${property.garage}
            <button class="delete-button" data-index="${index}">Delete</button>
        `;
        propertyList.appendChild(propertyItem);
    });

    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', function () {
            const index = parseInt(this.getAttribute('data-index'), 10);
            properties.splice(index, 1);
            localStorage.setItem('properties', JSON.stringify(properties));
            updatePropertyList();
        });
    });
}

// Update property list on page load
if (document.getElementById('propertiesList')) {
    updatePropertyList();
}
