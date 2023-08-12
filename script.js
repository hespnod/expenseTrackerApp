const amountInput = document.getElementById("amount");
const descriptionInput = document.getElementById("description");
const addExpenseButton = document.getElementById("addExpense");
const expenseList = document.getElementById("expenseList");

addExpenseButton.addEventListener("click", addExpense);

// Load expenses from local storage
const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Populate expense list with stored data
storedExpenses.forEach((expense) => {
    createExpenseElement(expense.description, expense.amount);
});

function addExpense() {
    const amount = parseFloat(amountInput.value);
    const description = descriptionInput.value;

    if (!isNaN(amount) && description.trim() !== "") {
        createExpenseElement(description, amount);

        // Save expenses to local storage
        const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
        expenses.push({ description, amount });
        localStorage.setItem("expenses", JSON.stringify(expenses));

        amountInput.value = "";
        descriptionInput.value = "";
    }
}

function createExpenseElement(description, amount) {
    const li = document.createElement("li");
    li.innerHTML = `
    <span>${description}</span>
    <span>$${amount.toFixed(2)}</span>
    <button class="editButton">Edit</button>
    <button class="deleteButton">Delete</button>
  `;
    expenseList.appendChild(li);

    const editButton = li.querySelector(".editButton");
    editButton.addEventListener("click", () => editExpense(li, description, amount));

    const deleteButton = li.querySelector(".deleteButton");
    deleteButton.addEventListener("click", () => deleteExpense(li, description, amount));
}

function editExpense(li, description, amount) {
    descriptionInput.value = description;
    amountInput.value = amount;

    expenseList.removeChild(li);
}

function deleteExpense(li, description, amount) {
    expenseList.removeChild(li);

    // Remove the expense from local storage
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    const updatedExpenses = expenses.filter(expense => expense.description !== description && expense.amount !== amount);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
}