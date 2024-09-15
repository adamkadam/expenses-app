// Placeholder API URL (replace with your actual API Gateway URL)
const apiUrl = 'https://tbe4utd1vi.execute-api.us-east-1.amazonaws.com/dev/expenses';

document.getElementById('expense-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const amount = parseFloat(document.getElementById('amount').value);
    const currency = document.getElementById('currency').value;
    const info = document.getElementById('info').value;

    // Prepare data for submission
    const expenseData = {
        amount: amount,
        currency: currency,
        info: info,
    };

    try {
        // Send data to the backend (Lambda via API Gateway)
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(expenseData)
        });

        if (!response.ok) {
            throw new Error('Failed to add expense');
        }

        // Fetch updated total expenses
        const totalResponse = await fetch(`${apiUrl}/total`, {
            method: 'GET'
        });

        if (!totalResponse.ok) {
            throw new Error('Failed to fetch total expenses');
        }

        const totalData = await totalResponse.json();
        updateTotalExpenses(totalData);

    } catch (error) {
        console.error('Error:', error);
    }

    // Reset the form
    document.getElementById('expense-form').reset();
});

function updateTotalExpenses(totalData) {
    document.getElementById('total-amount').textContent = totalData.totalAmount.toFixed(2);
    document.getElementById('total-currency').textContent = totalData.currency;
}
