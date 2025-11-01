import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarController,
  PieController,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarController,  
  PieController 
);

function Charts({ transactions }) {
  // Create references for our charts
  const pieChartRef = useRef(null);
  const barChartRef = useRef(null);

  useEffect(() => {
    // Only create charts if we have transactions
    if (transactions.length > 0) {
      createPieChart();
      createBarChart();
    }

    // Cleanup function to destroy charts when component unmounts
    return () => {
      if (pieChartRef.current) {
        pieChartRef.current.destroy();
      }
      if (barChartRef.current) {
        barChartRef.current.destroy();
      }
    };
  }, [transactions]); // Re-run when transactions change

  // Create pie chart showing expenses by category
  const createPieChart = () => {
    const canvas = document.getElementById('expensePieChart');
    if (!canvas) return;

    // Destroy existing chart if it exists
    if (pieChartRef.current) {
      pieChartRef.current.destroy();
    }

    // Get only expense transactions
    const expenses = transactions.filter(t => t.type === 'expense');
    
    // Group expenses by category
    const categoryTotals = {};
    expenses.forEach(transaction => {
      const category = transaction.category;
      const amount = Math.abs(transaction.amount);
      categoryTotals[category] = (categoryTotals[category] || 0) + amount;
    });

    // Prepare data for the chart
    const categories = Object.keys(categoryTotals);
    const amounts = Object.values(categoryTotals);

    // Colors for different categories
    const colors = [
      '#f56565', '#48bb78', '#667eea', '#ed8936', 
      '#9f7aea', '#38b2ac', '#ed64a6', '#4299e1'
    ];

    // Create the pie chart
    pieChartRef.current = new ChartJS(canvas, {
      type: 'pie',
      data: {
        labels: categories,
        datasets: [{
          label: 'Expenses',
          data: amounts,
          backgroundColor: colors.slice(0, categories.length),
          borderWidth: 2,
          borderColor: '#fff'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Expenses by Category'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.label + ': ₹' + context.raw.toFixed(2);
              }
            }
          }
        }
      }
    });
  };

  // Create bar chart showing income vs expenses
  const createBarChart = () => {
    const canvas = document.getElementById('incomeExpenseChart');
    if (!canvas) return;

    // Destroy existing chart if it exists
    if (barChartRef.current) {
      barChartRef.current.destroy();
    }

    // Calculate totals
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        totalIncome += transaction.amount;
      } else {
        totalExpense += Math.abs(transaction.amount);
      }
    });

    // Create the bar chart
    barChartRef.current = new ChartJS(canvas, {
      type: 'bar',
      data: {
        labels: ['Income', 'Expenses'],
        datasets: [{
          label: 'Amount (₹)',
          data: [totalIncome, totalExpense],
          backgroundColor: ['#48bb78', '#f56565'],
          borderColor: ['#38a169', '#e53e3e'],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Income vs Expenses'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.label + ': ₹' + context.raw.toFixed(2);
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return '₹' + value;
              }
            }
          }
        }
      }
    });
  };

  // Show message if no transactions
  if (transactions.length === 0) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '40px',
        backgroundColor: '#f7fafc',
        borderRadius: '8px',
        margin: '20px 0'
      }}>
        <h3>📊 No Data to Display</h3>
        <p>Add some transactions to see your charts!</p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: '30px' }}>
      <h3 style={{ marginBottom: '20px' }}>📈 Your Financial Charts</h3>
      
      {/* Charts Container */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        
        {/* Pie Chart */}
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <canvas 
            id="expensePieChart" 
            style={{ maxHeight: '300px' }}
          ></canvas>
        </div>

        {/* Bar Chart */}
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <canvas 
            id="incomeExpenseChart" 
            style={{ maxHeight: '300px' }}
          ></canvas>
        </div>
      </div>

      {/* Quick Stats */}
      <div style={{
        backgroundColor: '#f7fafc',
        padding: '20px',
        borderRadius: '8px',
        marginTop: '20px'
      }}>
        <h4>📊 Quick Summary</h4>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '15px',
          marginTop: '15px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#48bb78' }}>
              ₹{transactions
                .filter(t => t.type === 'income')
                .reduce((sum, t) => sum + t.amount, 0)
                .toFixed(2)}
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>Total Income</div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f56565' }}>
              ₹{transactions
                .filter(t => t.type === 'expense')
                .reduce((sum, t) => sum + Math.abs(t.amount), 0)
                .toFixed(2)}
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>Total Expenses</div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#667eea' }}>
              {transactions.length}
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>Total Transactions</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Charts;