import React from 'react';

const TotalExpense = ({ data }) => {
  const total = data.length && data.reduce((acc, curr) => acc + curr.expenseAmount, 0);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Expense Summary</h2>
      <div style={styles.expenseList}>
        {data.length > 0 && data.map((item, index) => (
          <div key={index} style={styles.expenseItem}>
            <span style={styles.expenseType}>{item.expenseType}:</span>
            <span style={styles.expenseAmount}>{item.expenseAmount}</span>
          </div>
        ))}
      </div>
      <div style={styles.totalContainer}>
        <span style={styles.totalLabel}>Total:</span>
        <span style={styles.totalAmount}>{total}</span>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    maxWidth: '400px',
    margin: '20px auto',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
    color:"#e64833"
  },
  expenseList: {
    marginBottom: '20px',
  },
  expenseItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '5px 0',
  },
  expenseType: {
    fontWeight: 'bold',
    color: '#1B2F33',

  },
  expenseAmount: {
    color: '#1B2F33',
  },
  totalContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    borderTop: '1px solid #ccc',
    paddingTop: '10px',
  },
  totalLabel: {
    color: '#333',
  },
  totalAmount: {
    color: '#333',
  },
};

export default TotalExpense;

