// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or use preferred color scheme
const savedTheme = localStorage.getItem('theme') || 
                   (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

if (savedTheme === 'dark') {
    body.setAttribute('data-theme', 'dark');
    themeToggle.checked = true;
}

themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    }
});

// Sample Transaction Data
const transactions = [
    { id: 1, date: '2023-06-15', description: 'Website Design', category: 'Services', amount: 1200.00, status: 'paid' },
    { id: 2, date: '2023-06-14', description: 'Office Rent', category: 'Rent', amount: 1500.00, status: 'paid' },
    { id: 3, date: '2023-06-13', description: 'Marketing Campaign', category: 'Marketing', amount: 750.50, status: 'pending' },
    { id: 4, date: '2023-06-12', description: 'Software Subscription', category: 'Software', amount: 99.00, status: 'paid' },
    { id: 5, date: '2023-06-10', description: 'Office Supplies', category: 'Supplies', amount: 245.75, status: 'paid' },
    { id: 6, date: '2023-06-08', description: 'Client Dinner', category: 'Entertainment', amount: 175.30, status: 'failed' }
];

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
            <td>$${transaction.amount.toFixed(2)}</td>
            <td><span class="status ${transaction.status}">${transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}</span></td>
            <td class="actions">
                <i class="fas fa-edit" title="Edit"></i>
                <i class="fas fa-trash" title="Delete"></i>
                <i class="fas fa-receipt" title="View Receipt"></i>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Initialize Charts
function initCharts() {
    // Income vs Expense Chart
    const incomeExpenseCtx = document.getElementById('incomeExpenseChart').getContext('2d');
    const incomeExpenseChart = new Chart(incomeExpenseCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    label: 'Income',
                    data: [12000, 15000, 18000, 21000, 19000, 24000],
                    backgroundColor: '#4cc9f0',
                    borderRadius: 5
                },
                {
                    label: 'Expenses',
                    data: [8000, 9500, 7000, 11000, 12000, 8500],
                    backgroundColor: '#f8961e',
                    borderRadius: 5
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
    
    // Expense Breakdown Chart
    const expenseBreakdownCtx = document.getElementById('expenseBreakdownChart').getContext('2d');
    const expenseBreakdownChart = new Chart(expenseBreakdownCtx, {
        type: 'doughnut',
        data: {
            labels: ['Rent', 'Salaries', 'Marketing', 'Software', 'Supplies', 'Other'],
            datasets: [{
                data: [30, 40, 15, 5, 7, 3],
                backgroundColor: [
                    '#4361ee',
                    '#3f37c9',
                    '#4895ef',
                    '#4cc9f0',
                    '#f8961e',
                    '#f72585'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.raw}%`;
                        }
                    }
                }
            }
        }
    });
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
    initCharts();
});