import React from 'react'
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { getExpensesByMonthAndYear, getIncomeByMonthAndYear } from '../../utils/datetime';


const PieChartComponent = ({ expenses, income, date }) => {
    const year = date.split("-").shift() || ""
    const month = date.split("-").pop() || ""

    const expenseData = expenses?.length && getExpensesByMonthAndYear(expenses, Number(month), Number(year)).map(data => ({ name: data.expenseType, value: data.expenseAmount }));
    const incomeData = income?.length && getIncomeByMonthAndYear(income, Number(month), Number(year)).map(data => ({ name: data.incomeType, value: data.incomeAmount }));

    return (
        <div className='' style={{ height: 250, border: "1px solid #f7f7f7", borderRadius: "20px", padding: "20px", backgroundColor: "#f7f4f4", boxShadow: "0 0 2px 2px #e6e6e6" }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart width={200} height={200}>
                    <Pie
                        dataKey="value"
                        isAnimationActive={true}
                        data={expenseData}
                        cx="20%"
                        cy="50%"
                        outerRadius={80}
                        fill="#90aead"
                        label
                    />
                    <Pie
                        dataKey="value"
                        isAnimationActive={false}
                        data={incomeData}
                        cx={"80%"}
                        cy={"50%"}
                        outerRadius={80}
                        fill="#e64833"
                        label
                    />
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default PieChartComponent 
