window.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.expense-calculator__form');
    const nameInput = document.querySelector('.expense-calculator__input[type="text"]');
    const amountInput = document.querySelector('.expense-calculator__input[type="number"]');
    const list = document.querySelector('.expense-calculator__list');
    const totalValue = document.querySelector('.total-value');

    let expenses = [];
    let total = 0;

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = nameInput.value;
        const amount = parseFloat(amountInput.value);

        if (name && amount) {
            const expense = {
                name,
                amount
            };

            expenses.push(expense);
            renderExpenses();
            updateTotal();
            nameInput.value = '';
            amountInput.value = '';
        }
    });

    function deleteExpense(index) {
        expenses.splice(index, 1);
        renderExpenses();
        updateTotal();
    }

    function renderExpenses() {
        list.innerHTML = '';

        expenses.forEach((expense, index) => {
            const listItem = document.createElement('li');
            listItem.classList.add('expense-calculator__list-item');

            const expenseText = document.createTextNode(`${expense.name}: ${expense.amount}`);
            listItem.appendChild(expenseText);

            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Удалить';
            deleteButton.addEventListener('click', () => deleteExpense(index));
            listItem.appendChild(deleteButton);

            list.appendChild(listItem);
        });
    }

    function updateTotal() {
        total = expenses.reduce((total, expense) => total + expense.amount, 0);
        totalValue.textContent = total;
    }
});
