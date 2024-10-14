export function convertToEndDate(dateString) {
    const [day, month, year] = dateString.split('-').map(Number);
  
    const date = new Date(Date.UTC(year, month - 1, day));
    date.setUTCHours(23, 59, 59, 999); // Set UTC time to 23:59:59.999
  
    return date.toISOString();
  }
  
  export function convertToStartDate(dateString) {
    const [day, month, year] = dateString.split('-').map(Number);
  
    const date = new Date(Date.UTC(year, month - 1, day));
    date.setUTCHours(0, 0, 0, 0); // Set UTC time to 00:00:00.000
  
    return date.toISOString();
  }


  export const getExpensesByMonthAndYear = (expenses, month, year) => {
    const filteredExpenses = expenses.filter(exp => {
      const expenseDate = new Date(exp.date);
      return expenseDate.getMonth() + 1 === month && expenseDate.getFullYear() === year;
    });
  
    const groupedExpenses = {};
  
    filteredExpenses.forEach(exp => {
      if (!groupedExpenses[exp.expenseType]) {
        groupedExpenses[exp.expenseType] = 0;
      }
      groupedExpenses[exp.expenseType] += exp.expenseAmount;
    });
 
    // Convert the grouped data into an array suitable for the bar chart
    return Object.keys(groupedExpenses).map(type => ({
      expenseType: type,
      expenseAmount: groupedExpenses[type]
    }));
  };
  export const getIncomeByMonthAndYear = (income, month, year) => {
    const filteredIncome = income.filter(exp => {
      const incomeDate = new Date(exp.date);
      return incomeDate.getMonth() + 1 === month && incomeDate.getFullYear() === year;
    });
  
    const groupedIncome = {};
  
    filteredIncome.forEach(exp => {
      if (!groupedIncome[exp.incomeType]) {
        groupedIncome[exp.incomeType] = 0;
      }
      groupedIncome[exp.incomeType] += exp.incomeAmount;
    });
  
    // Convert the grouped data into an array suitable for the bar chart
    return Object.keys(groupedIncome).map(type => ({
      incomeType: type,
      incomeAmount: groupedIncome[type]
    }));
  };
  