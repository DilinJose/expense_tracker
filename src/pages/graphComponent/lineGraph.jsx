import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getExpensesByMonthAndYear, getIncomeByMonthAndYear } from '../../utils/datetime';


const LineGraph = ({ expenses, income, date }) => {
    const year = date.split("-").shift() || ""
    const month = date.split("-").pop() || ""

    const expenseData = expenses?.length && getExpensesByMonthAndYear(expenses, Number(month), Number(year));
    const incomeData = income?.length && getIncomeByMonthAndYear(income, Number(month), Number(year));

    const combinedData = [
        ...expenseData.map(expense => ({
            name: expense.expenseType,
            income: 0,
            expense: expense.expenseAmount
        })),
        ...incomeData.map(income => ({
            name: income.incomeType,
            income: income.incomeAmount,
            expense: 0
        }))
    ];

    return (
        <div className='' style={{  height: 250, border: "1px solid #f7f7f7", borderRadius: "20px", padding: "20px", backgroundColor: "#f7f4f4", boxShadow: "0 0 2px 2px #e6e6e6" }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={combinedData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="income" stroke="#90aead" />
                    <Line type="monotone" dataKey="expense" stroke="#e64833" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default LineGraph