import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import api from '../utils/api'

function TransactionForm(){
    const [formData,setFormData]= useState({
        title:'',
        amount:'',
        category:'Food',
        date:new Date().toISOString().split('T')[0],
        type:'expense'
    })
    const [error,setError]= useState('');
    const [success,setSuccess]=useState('')
    const navigate=useNavigate();

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const amount= formData.type==='expense'? -Math.abs(parseFloat(formData.amount)): Math.abs(parseFloat(formData.amount))
            await api.post('/transaction',{...formData,amount});
            setSuccess('Transaction added Successfully!');
            setTimeout(()=>{
                navigate('/');
            },2000)
        } catch (error) {
            setError(error.response?.data?.message || 'Error adding transaction');
        }
    }
return (
    <div className="container">
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ marginBottom: '30px' }}>Add New Transaction</h2>
        
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter transaction title"
            />
          </div>
          
          <div className="form-group">
            <label>Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              step="0.01"
              min="0"
              placeholder="Enter amount"
            />
          </div>
          
          <div className="form-group">
            <label>Type</label>
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Category</label>
            <select name="category" value={formData.category} onChange={handleChange}>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Shopping">Shopping</option>
              <option value="Bills">Bills</option>
              <option value="Salary">Salary</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" className="btn btn-primary">
              Add Transaction
            </button>
            <button 
              type="button" 
              className="btn btn-danger"
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TransactionForm;