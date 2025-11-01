import React, { useState, useEffect } from "react";
import TransactionList from "./TransactionList";
import Charts from './chart';
import api from "../utils/api";
import { TrendingUp, TrendingDown, Wallet, Filter, X } from "lucide-react";

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
  const [showFilters, setShowFilters] = useState(false);

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

  const hasActiveFilters = filters.category || filters.type || filters.startDate || filters.endDate;

  return (
    <div className="container">
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ 
          fontSize: "32px", 
          fontWeight: "700", 
          color: "#e1e4ebff",
          marginBottom: "8px" 
        }}>
          Dashboard
        </h1>
        <p style={{ color: "#3ff284ff", fontSize: "16px" }}>
          Track your income and expenses
        </p>
      </div>

      {/* Stats Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
          marginBottom: "32px",
        }}
      >
        {/* Income Card */}
        <div
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            padding: "28px",
            borderRadius: "16px",
            boxShadow: "0 10px 40px rgba(102, 126, 234, 0.3)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "space-between",
              marginBottom: "12px" 
            }}>
              <h3 style={{ fontSize: "14px", fontWeight: "500", opacity: 0.9 }}>
                Total Income
              </h3>
              <TrendingUp size={24} style={{ opacity: 0.8 }} />
            </div>
            <p style={{ fontSize: "32px", fontWeight: "700", margin: 0 }}>
              ₹{stats.totalIncome.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
          <div style={{
            position: "absolute",
            top: "-50px",
            right: "-50px",
            width: "150px",
            height: "150px",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "50%",
          }} />
        </div>

        {/* Expense Card */}
        <div
          style={{
            background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            color: "white",
            padding: "28px",
            borderRadius: "16px",
            boxShadow: "0 10px 40px rgba(245, 87, 108, 0.3)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "space-between",
              marginBottom: "12px" 
            }}>
              <h3 style={{ fontSize: "14px", fontWeight: "500", opacity: 0.9 }}>
                Total Expense
              </h3>
              <TrendingDown size={24} style={{ opacity: 0.8 }} />
            </div>
            <p style={{ fontSize: "32px", fontWeight: "700", margin: 0 }}>
              ₹{stats.totalExpense.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
          <div style={{
            position: "absolute",
            top: "-50px",
            right: "-50px",
            width: "150px",
            height: "150px",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "50%",
          }} />
        </div>

        {/* Balance Card */}
        <div
          style={{
            background: stats.balance >= 0 
              ? "linear-gradient(135deg, #11902dff 0%, #d39d07ff 100%)"
              : "linear-gradient(135deg, #fa709a 0%, #f5e06aff 100%)",
            color: "white",
            padding: "28px",
            borderRadius: "16px",
            boxShadow: stats.balance >= 0
              ? "0 10px 40px rgba(79, 172, 254, 0.3)"
              : "0 10px 40px rgba(250, 112, 154, 0.3)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "space-between",
              marginBottom: "12px" 
            }}>
              <h3 style={{ fontSize: "14px", fontWeight: "500", opacity: 0.9 }}>
                Balance
              </h3>
              <Wallet size={24} style={{ opacity: 0.8 }} />
            </div>
            <p style={{ fontSize: "32px", fontWeight: "700", margin: 0 }}>
              ₹{stats.balance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
          <div style={{
            position: "absolute",
            top: "-50px",
            right: "-50px",
            width: "150px",
            height: "150px",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "50%",
          }} />
        </div>
      </div>

      {/* Filters Section */}
      <div className="card" style={{ marginBottom: "32px" }}>
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "space-between",
          marginBottom: showFilters ? "24px" : "0"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Filter size={20} style={{ color: "#071862ff" }} />
            <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "600", color: "#1a202c" }}>
              Filters
            </h3>
            {hasActiveFilters && (
              <span style={{
                background: "#02a920ff",
                color: "white",
                padding: "4px 12px",
                borderRadius: "12px",
                fontSize: "12px",
                fontWeight: "600"
              }}>
                Active
              </span>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            style={{
              background: "transparent",
              border: "none",
              color: "#051e90ff",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "600",
              padding: "8px 16px",
              borderRadius: "8px",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => e.target.style.background = "#f7fafc"}
            onMouseLeave={(e) => e.target.style.background = "transparent"}
          >
            {showFilters ? "Hide" : "Show"}
          </button>
        </div>

        {showFilters && (
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "16px",
              }}
            >
              <div>
                <label style={{ 
                  display: "block", 
                  marginBottom: "8px", 
                  fontSize: "14px", 
                  fontWeight: "500",
                  color: "#4a5568"
                }}>
                  Category
                </label>
                <select
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "2px solid #e2e8f0",
                    borderRadius: "10px",
                    fontSize: "14px",
                    background: "white",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#667eea"}
                  onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
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
              </div>

              <div>
                <label style={{ 
                  display: "block", 
                  marginBottom: "8px", 
                  fontSize: "14px", 
                  fontWeight: "500",
                  color: "#4a5568"
                }}>
                  Type
                </label>
                <select
                  name="type"
                  value={filters.type}
                  onChange={handleFilterChange}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "2px solid #e2e8f0",
                    borderRadius: "10px",
                    fontSize: "14px",
                    background: "white",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#667eea"}
                  onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
                >
                  <option value="">All Types</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>

              <div>
                <label style={{ 
                  display: "block", 
                  marginBottom: "8px", 
                  fontSize: "14px", 
                  fontWeight: "500",
                  color: "#4a5568"
                }}>
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={filters.startDate}
                  onChange={handleFilterChange}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "2px solid #e2e8f0",
                    borderRadius: "10px",
                    fontSize: "14px",
                    background: "white",
                    transition: "all 0.2s",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#667eea"}
                  onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
                />
              </div>

              <div>
                <label style={{ 
                  display: "block", 
                  marginBottom: "8px", 
                  fontSize: "14px", 
                  fontWeight: "500",
                  color: "#4a5568"
                }}>
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={filters.endDate}
                  onChange={handleFilterChange}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "2px solid #e2e8f0",
                    borderRadius: "10px",
                    fontSize: "14px",
                    background: "white",
                    transition: "all 0.2s",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#667eea"}
                  onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
                />
              </div>
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                style={{
                  marginTop: "16px",
                  padding: "10px 20px",
                  background: "white",
                  border: "2px solid #e2e8f0",
                  borderRadius: "10px",
                  color: "#718096",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#667eea";
                  e.target.style.color = "#667eea";
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#e2e8f0";
                  e.target.style.color = "#718096";
                }}
              >
                <X size={16} />
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Charts */}
      <div className="card" style={{ marginBottom: "32px" }}>
        <Charts transactions={transaction} />
      </div>

      {/* Transactions List */}
      <div className="card">
        <TransactionList transactions={transaction} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default Dashboard;