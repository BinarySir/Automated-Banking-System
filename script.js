// Transaction Management
let transactions = JSON.parse(localStorage.getItem('transactions')) || [
    { id: 1, date: '2023-06-15', description: 'Website Design', category: 'Services', amount: 1200.00, type: 'income', status: 'paid' },
    { id: 2, date: '2023-06-14', description: 'Office Rent', category: 'Rent', amount: 1500.00, type: 'expense', status: 'paid' },
    { id: 3, date: '2023-06-13', description: 'Marketing Campaign', category: 'Marketing', amount: 750.50, type: 'expense', status: 'pending' },
    { id: 4, date: '2023-06-12', description: 'Software Subscription', category: 'Software', amount: 99.00, type: 'expense', status: 'paid' },
    { id: 5, date: '2023-06-10', description: 'Office Supplies', category: 'Supplies', amount: 245.75, type: 'expense', status: 'paid' },
    { id: 6, date: '2023-06-08', description: 'Client Dinner', category: 'Entertainment', amount: 175.30, type: 'expense', status: 'failed' }
];

// DOM Elements
const addTransactionBtn = document.getElementById('addTransactionBtn');
const modal = document.getElementById('addTransactionModal');
const closeModal = document.querySelector('.close-modal');
const transactionForm = document.getElementById('transactionForm');

// Modal Functions
function openModal() {
    modal.style.display = 'block';
    document.getElementById('transactionDate').valueAsDate = new Date();
}

function closeModalFunc() {
    modal.style.display = 'none';
    transactionForm.reset();
}

// Event Listeners
addTransactionBtn.addEventListener('click', openModal);
closeModal.addEventListener('click', closeModalFunc);
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModalFunc();
    }
});

// Form Submission
transactionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newTransaction = {
        id: Date.now(),
        date: document.getElementById('transactionDate').value,
        description: document.getElementById('transactionDescription').value,
        category: document.getElementById('transactionCategory').value,
        amount: parseFloat(document.getElementById('transactionAmount').value),
        type: document.getElementById('transactionType').value,
        status: document.getElementById('transactionStatus').value
    };
    
    addTransaction(newTransaction);
    closeModalFunc();
    updateDashboard();
});

// Transaction Functions
function addTransaction(transaction) {
    transactions.unshift(transaction);
    saveTransactions();
    populateTransactions();
}

function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    saveTransactions();
    populateTransactions();
    updateDashboard();
}

function saveTransactions() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Populate Transactions Table
function populateTransactions() {
    const tableBody = document.getElementById('transactionsTable');
    tableBody.innerHTML = '';
    
    transactions.forEach(transaction => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${transaction.date}</td>
            <td>${transaction.description}</td>
            <td>${transaction.category}</td>
            <td>#${transaction.amount.toFixed(2)}</td>
            <td><span class="status ${transaction.status}">${transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}</span></td>
            <td class="actions">
                <i class="fas fa-edit" title="Edit"></i>
                <i class="fas fa-trash" title="Delete" data-id="${transaction.id}"></i>
                <i class="fas fa-receipt" title="View Receipt"></i>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Add event listeners to delete buttons
    document.querySelectorAll('.fa-trash').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            if (confirm('Are you sure you want to delete this transaction?')) {
                deleteTransaction(id);
            }
        });
    });
}

// Update Dashboard Stats
function updateDashboard() {
    const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const netProfit = totalIncome - totalExpenses;
    const activeClients = new Set(transactions.filter(t => t.type === 'income').map(t => t.description)).size;
    
    document.querySelector('.card:nth-child(1) p').textContent = `#${totalIncome.toFixed(2)}`;
    document.querySelector('.card:nth-child(2) p').textContent = `#${totalExpenses.toFixed(2)}`;
    document.querySelector('.card:nth-child(3) p').textContent = `#${netProfit.toFixed(2)}`;
    document.querySelector('.card:nth-child(4) p').textContent = activeClients;
    
    updateCharts();
}

// Hamburger Menu Functionality
const hamburger = document.getElementById('hamburger');
const sidebar = document.querySelector('.sidebar');
const lines = document.querySelectorAll('.hamburger .line');

hamburger.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    
    // Animate hamburger to X
    if (sidebar.classList.contains('active')) {
        lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        lines[1].style.opacity = '0';
        lines[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
        lines[0].style.transform = 'rotate(0) translate(0)';
        lines[1].style.opacity = '1';
        lines[2].style.transform = 'rotate(0) translate(0)';
    }
});

// Close sidebar when clicking outside
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 992 && 
        !sidebar.contains(e.target) && 
        !hamburger.contains(e.target) &&
        sidebar.classList.contains('active')) {
        
        sidebar.classList.remove('active');
        lines[0].style.transform = 'rotate(0) translate(0)';
        lines[1].style.opacity = '1';
        lines[2].style.transform = 'rotate(0) translate(0)';
    }
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    populateTransactions();
    updateDashboard();
});
