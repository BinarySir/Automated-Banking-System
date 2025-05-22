const form = document.getElementById('transaction-form');
const table = document.getElementById('transaction-table');
const balanceDisplay = document.getElementById('balance');
let balance = 0;

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const desc = document.getElementById('desc').value;
  const amount = parseFloat(document.getElementById('amount').value);
  if (desc && !isNaN(amount)) {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${desc}</td><td>$${amount.toFixed(2)}</td>`;
    table.appendChild(row);
    balance += amount;
    balanceDisplay.textContent = `$${balance.toFixed(2)}`;
    form.reset();
  }
});
