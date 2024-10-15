import React from 'react'

const TotalIncome = ({ data }) => {
    const total = data.length && data.reduce((acc, curr) => acc + curr.incomeAmount, 0);

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Income Summary</h2>
            <div style={styles.incomeList}>
                {data.length > 0 && data.map((item, index) => (
                    <div key={index} style={styles.incomeItem}>
                        <span style={styles.incomeType}>{item.incomeType}:</span>
                        <span style={styles.incomeAmount}>{item.incomeAmount}</span>
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

// Styles
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
        color: "#90aead",
        textAlign: 'center',
        marginBottom: '20px',
    },
    incomeList: {
        marginBottom: '20px',
    },
    incomeItem: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '5px 0',
    },
    incomeType: {
        fontWeight: 'bold',
        color: '#1B2F33',
    },
    incomeAmount: {
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

export default TotalIncome