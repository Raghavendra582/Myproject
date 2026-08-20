const apiURL = "http://localhost:5000/api/foods";

const foodForm = document.getElementById("foodForm");
const foodTable = document.getElementById("foodTable");

let editId = null;

// Load foods when page opens
window.onload = getFoods;

// =================== READ ===================
async function getFoods() {
    const response = await fetch(apiURL);
    const foods = await response.json();

    foodTable.innerHTML = "";

    foods.forEach(food => {
        foodTable.innerHTML += `
        <tr>
            <td>${food.foodName}</td>
            <td>${food.category}</td>
            <td>₹${food.price}</td>
            <td>${food.description}</td>
            <td>
                <button class="btn btn-warning btn-sm"
                    onclick="editFood('${food._id}',
                    '${food.foodName}',
                    '${food.category}',
                    '${food.price}',
                    '${food.description}')">
                    Edit
                </button>

                <button class="btn btn-danger btn-sm"
                    onclick="deleteFood('${food._id}')">
                    Delete
                </button>
            </td>
        </tr>
        `;
    });
}

// =================== CREATE & UPDATE ===================
foodForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const food = {
        foodName: document.getElementById("foodName").value,
        category: document.getElementById("category").value,
        price: document.getElementById("price").value,
        description: document.getElementById("description").value
    };

    if (editId == null) {

        await fetch(apiURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(food)
        });

    } else {

        await fetch(`${apiURL}/${editId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(food)
        });

        editId = null;
    }

    foodForm.reset();

    getFoods();

});

// =================== EDIT ===================
function editFood(id, name, category, price, description) {

    editId = id;

    document.getElementById("foodName").value = name;
    document.getElementById("category").value = category;
    document.getElementById("price").value = price;
    document.getElementById("description").value = description;

}

// =================== DELETE ===================
async function deleteFood(id) {

    if(confirm("Are you sure?")){

        await fetch(`${apiURL}/${id}`,{
            method:"DELETE"
        });

        getFoods();

    }

}