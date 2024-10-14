import { useSelector } from 'react-redux'
import { json, useNavigate } from 'react-router-dom'
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getExpensesByMonthAndYear, getIncomeByMonthAndYear } from '../../utils/datetime';
import { useState } from 'react';



const GraphComponent = () => {
    const navigate = useNavigate()
    const [selectedMonth, setSelectedMonth] = useState(10); // October (10th month)
    const [selectedYear, setSelectedYear] = useState(2024); // Year 2024

    const { expenses, income } = useSelector((state) => state.tracker)

    const expenseData = getExpensesByMonthAndYear(expenses, selectedMonth, selectedYear);
    const incomeData = getIncomeByMonthAndYear(income, selectedMonth, selectedYear);

    return (
        <div className='my-5'>
            {/* <div>
                <button onClick={() => navigate('/expensetracker')}>&lt; Back</button>
            </div> */}
            <div className='d-flex justify-content-evenly align-items-center'>

                <div className='' style={{ width: '40%', height: 200, border:"1px solid #c9c7c7" , borderRadius:"20px", padding:"20px", backgroundColor:"#d9d9d9" , boxShadow:"0 0 2px 2px #e6e6e6"}}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={expenseData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="expenseType" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="expenseAmount" fill="#e64833" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className='' style={{ width: '40%', height: 200, border:"1px solid #c9c7c7" , borderRadius:"20px", padding:"20px", backgroundColor:"#d9d9d9" , boxShadow:"0 0 2px 2px #e6e6e6"}}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={incomeData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="incomeType" />
                            <YAxis tick={{ fontSize: 12,fill: '#333' }} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="incomeAmount" fill="#90aead" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

export default GraphComponent