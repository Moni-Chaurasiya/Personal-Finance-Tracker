import React from 'react';
import { Link } from 'react-router-dom';

function TransactionItem({ transaction, onDelete }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatAmount = (amount) => {
    return Math.abs(amount).toFixed(2);
  };
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      onDelete(transaction._id);
    }
  };

  const isIncome = transaction.type === 'income';
  const typeText = transaction.type.toUpperCase();
  const amountPrefix = isIncome ? '+' : '-';
  const amountText = `${amountPrefix}₹${formatAmount(transaction.amount)}`;

  return (
    <tr style={{ borderBottom: '1px solid #eee' }}>
      <td style={{ padding: '10px' }}>{formatDate(transaction.date)}</td>
      <td style={{ padding: '10px', fontWeight: '500' }}>{transaction.title}</td>
      <td style={{ padding: '10px' }}>
        <span style={{
          background: '#f0f0f0',
          padding: '3px 8px',
          borderRadius: '3px',
          fontSize: '12px'
        }}>
          {transaction.category}
        </span>
      </td>
      <td style={{ padding: '10px' }}>
        <span style={{
          color: isIncome ? '#48bb78' : '#f56565',
          fontWeight: 'bold'
        }}>
          {typeText}
        </span>
      </td>
      <td style={{ 
        padding: '10px', 
        textAlign: 'right',
        fontWeight: 'bold',
        color: isIncome ? '#48bb78' : '#f56565'
      }}>
        {amountText}
      </td>
      <td style={{ padding: '10px', textAlign: 'center' }}>
        <Link 
          to={`/${transaction._id}/edit`}
          style={{ fontSize: '14px', padding: '5px 10px' }}
        >
          Edit
        </Link>
        <button 
          onClick={handleDelete}
          style={{ fontSize: '14px', padding: '5px 10px', marginLeft: '5px' }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default TransactionItem;