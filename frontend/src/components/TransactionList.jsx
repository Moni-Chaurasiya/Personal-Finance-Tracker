// import React from 'react';
// import TransactionItem from './TransactionItem';

// function TransactionList({ transactions, onDelete }) {
//   return (
//     <div style={{ marginTop: '30px' }}>
//       <h3>Recent Transactions</h3>
      
//       {transactions.length === 0 ? (
//         <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
//           No transactions found. Add your first transaction!
//         </p>
//       ) : (
//         <div style={{ overflowX: 'auto' }}>
//           <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//             <thead>
//               <tr style={{ borderBottom: '2px solid #667eea' }}>
//                 <th style={{ padding: '10px', textAlign: 'left' }}>Date</th>
//                 <th style={{ padding: '10px', textAlign: 'left' }}>Title</th>
//                 <th style={{ padding: '10px', textAlign: 'left' }}>Category</th>
//                 <th style={{ padding: '10px', textAlign: 'left' }}>Type</th>
//                 <th style={{ padding: '10px', textAlign: 'right' }}>Amount</th>
//                 <th style={{ padding: '10px', textAlign: 'center' }}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {transactions.map((transaction) => (
//                 <TransactionItem 
//                   key={transaction._id} 
//                   transaction={transaction} 
//                   onDelete={onDelete} 
//                 />
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

// export default TransactionList;

import React from 'react';
import { Link } from 'react-router-dom';

function TransactionList({ transactions, onDelete }) {
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

  return (
    <div style={{ marginTop: '30px' }}>
      <h3>Recent Transactions</h3>
      
      {transactions.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
          No transactions found. Add your first transaction!
        </p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #667eea' }}>
                <th style={{ padding: '10px', textAlign: 'left' }}>Date</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Title</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Category</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Type</th>
                <th style={{ padding: '10px', textAlign: 'right' }}>Amount</th>
                <th style={{ padding: '10px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction._id} style={{ borderBottom: '1px solid #eee' }}>
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
                      color: transaction.type === 'income' ? '#48bb78' : '#f56565',
                      fontWeight: 'bold'
                    }}>
                      {transaction.type}
                    </span>
                  </td>
                  <td style={{ 
                    padding: '10px', 
                    textAlign: 'right',
                    fontWeight: 'bold',
                    color: transaction.type === 'income' ? '#48bb78' : '#f56565'
                  }}>
                    {transaction.type === 'income' ? '+' : '-'}₹{formatAmount(transaction.amount)}
                  </td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>
                    <Link 
                      to={`/${transaction._id}/edit`}
                      className="btn btn-warning"
                      style={{ fontSize: '14px', padding: '5px 10px' }}
                    >
                      Edit
                    </Link>
                    <button 
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this transaction?')) {
                          onDelete(transaction._id);
                        }
                      }}
                      className="btn btn-danger"
                      style={{ fontSize: '14px', padding: '5px 10px', marginLeft: '5px' }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TransactionList;