// Dummy Data (Replace with backend API calls later)
const salesData = [500, 1000, 750, 1250, 900, 1500, 1800];
const customerData = [5, 10, 8, 20, 15, 25, 30];
const topProducts = ["Red Dress", "Blue Gown", "Black T-Shirt", "Summer Skirt"];

// Sales Chart
const salesCtx = document.getElementById('salesChart').getContext('2d');
new Chart(salesCtx, {
  type: 'line',
  data: {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    datasets: [{
      label: 'Sales (in $)',
      data: salesData,
      backgroundColor: 'rgba(86, 28, 36, 0.2)',
      borderColor: '#561C24',
      borderWidth: 2,
    }]
  }
});

// Customers Chart
const customersCtx = document.getElementById('customersChart').getContext('2d');
new Chart(customersCtx, {
  type: 'bar',
  data: {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    datasets: [{
      label: 'New Customers',
      data: customerData,
      backgroundColor: '#A68B7B',
      borderColor: '#561C24',
      borderWidth: 1,
    }]
  }
});

// Top-Selling Products
const topProductsList = document.getElementById('topProducts');
topProducts.forEach(product => {
  const li = document.createElement('li');
  li.textContent = product;
  topProductsList.appendChild(li);
});
