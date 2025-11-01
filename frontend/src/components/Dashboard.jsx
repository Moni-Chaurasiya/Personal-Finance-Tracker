import React, { useState, useEffect } from "react";
import TransactionList from "./TransactionList";
//import Charts from './chart';
import api from "../utils/api";

function Dashboard() {
  const [transaction, setTransactions] = useState([]);
  const [filters, setFilter] = useState({
    category: "",
    type: "",
    startDate: "",
    endDate: "",
  });
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });
  const calculateStats = (data) => {
    const income = data
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const expense = data
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    setStats({
      totalIncome: income,
      totalExpense: expense,
      balance: income - expense,
    });
  };
  useEffect(() => {
    fetchTransaction();
  }, [filters]);

  const fetchTransaction = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.category) params.append("category", filters.category);
      if (filters.type) params.append("type", filters.type);
      if (filters.startDate) params.append("startDate", filters.startDate);
      if (filters.endDate) params.append("endDate", filters.endDate);
      const response = await api.get(`/transaction?${params}`);
      setTransactions(response.data);
      calculateStats(response.data);
    } catch (error) {
      console.error("Error fetching transaction:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/transaction/${id}`);
      fetchTransaction();
    } catch (error) {
      console.error("Error deleting tranaction:", error);
    }
  };
  const handleFilterChange = (e) => {
    setFilter({ ...filters, [e.target.name]: e.target.value });
  };

  const clearFilters = () => {
    setFilter({
      category: "",
      type: "",
      startDate: "",
      endDate: "",
    });
  };

  return (
    <div className="container">
      <div className="card">
        <h2 style={{ marginBottom: "20px" }}>Dashboard</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              background: "#48bb78",
              color: "white",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <h3>Total Income</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>
              ₹{stats.totalIncome.toFixed(2)}
            </p>
          </div>

          <div
            style={{
              background: "#f56565",
              color: "white",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <h3>Total Expense</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>
              ₹{stats.totalExpense.toFixed(2)}
            </p>
          </div>

          <div
            style={{
              background: stats.balance >= 0 ? "#667eea" : "#ed8936",
              color: "white",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <h3>Balance</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>
              ₹{stats.balance.toFixed(2)}
            </p>
          </div>
        </div>

        <div style={{ marginBottom: "30px" }}>
          <h3>Filters</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "10px",
            }}
          >
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="form-control"
            >
              <option value="">All Categories</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Shopping">Shopping</option>
              <option value="Bills">Bills</option>
              <option value="Salary">Salary</option>
              <option value="Other">Other</option>
            </select>

            <select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              className="form-control"
            >
              <option value="">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>

            {/* <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
              className="form-control"
              placeholder="Start Date"
            />
            
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
              className="form-control"
              placeholder="End Date"
            /> */}
            <input
              type={filters.startDate ? "date" : "text"}
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
              placeholder="Start Date"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
              className="form-control"
            />

            <input
              type={filters.startDate ? "date" : "text"}
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
              placeholder="End Date"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
              className="form-control"
            />

            <button onClick={clearFilters} className="btn btn-warning">
              Clear Filters
            </button>
          </div>
        </div>

        {/* <Charts transactions={transaction} /> */}

        <TransactionList transactions={transaction} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default Dashboard;
