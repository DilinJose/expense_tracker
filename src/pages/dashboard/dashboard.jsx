import React, { useContext, useEffect, useState } from 'react'
import { IoFilterOutline } from "react-icons/io5";
import { getTrackerData } from '../../redux/action/trackerAction';
import { getExpensesByMonthAndYear, getIncomeByMonthAndYear } from '../../utils/datetime';
import { AuthContext } from '../../context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LineGraph from '../graphComponent/lineGraph';
import QuickAccess from '../quickAccess/QuickAccess';
import TotalExpense from '../total/totalExpense';
import TotalIncome from '../total/totalIncome';
const Dashboard = () => {
    const dispatch = useDispatch()
    const { currentUser } = useContext(AuthContext)
    const [popUp, showPopUp] = useState(false)
    const [nowDate, setnowDate] = useState(() => {
        // Get the current date and format it as YYYY-MM-DD
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        return `${year}-${month}`;
    });
    const { expenses, income } = useSelector((state) => state.tracker)

    useEffect(() => {
        dispatch(getTrackerData(currentUser?.uid))
    }, []);

    const handleDateChange = (e) => {
        const date = new Date(e.target.value)

        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const selected = `${year}-${month}`;
        setnowDate(selected)
        showPopUp(false)
    };
    const year = nowDate.split("-").shift() || ""
    const month = nowDate.split("-").pop() || ""

    const expenseData = expenses.length && getExpensesByMonthAndYear(expenses, Number(month), Number(year));
    const incomeData = income.length && getIncomeByMonthAndYear(income, Number(month), Number(year));

    const currentExpense = expenses.length && expenses?.filter(data => new Date(data?.date).getMonth() === new Date(nowDate).getMonth())?.map(data => data?.expenseAmount)
    const totalExpense = currentExpense.length > 0 && currentExpense.reduce((total, current) => total + current) || ""
    const currentIncome = income.length && income?.filter(data => new Date(data?.date).getMonth() === new Date(nowDate).getMonth()).map(data => data?.incomeAmount)
    const totalIncome = currentIncome.length > 0 && currentIncome?.reduce((total, current) => total + current) || ""

    const balance = totalIncome - totalExpense || 0

    return (
        <div className='container'>
            {/* {expenses.length || income.length ? */}
                <>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h1 className='fw-light'>Dashboard</h1>
                        <div className='d-flex flex-column justify-content-between align-items-center '>
                            <button onClick={() => showPopUp(!popUp)} className='border border-gray rounded-pill px-4'>
                                Filter<IoFilterOutline />
                            </button>
                            {popUp && <input
                                type="month"
                                style={{ border: '1px solid #bcbcbc', borderRadius: "2%", boxShadow: '0px 0px 5px 2px rgb(224 224 224)' }}
                                className="p-1"
                                value={nowDate}
                                onChange={(e) => handleDateChange(e)}
                            />}
                        </div>

                    </div>
                    <div>
                        <QuickAccess />
                    </div>

                    <div className='d-flex flex-wrap justify-content-between align-items-center '>
                        <div className='flex-grow-1  mx-2 my-2'>
                            <TotalIncome data={incomeData} />
                        </div>
                        <div className='flex-grow-1  mx-2 my-2'>
                            {expenses.length && income.length && <LineGraph expenses={expenses} income={income} date={nowDate} />}
                        </div>
                        <div className='flex-grow-1  mx-2 my-2'>
                            <TotalExpense data={expenseData} />
                        </div>
                    </div>

                    <div className='d-flex flex-wrap justify-content-between align-items-center'>
                        <div style={{ backgroundColor: "#ceefec", border: '1px solid #aedad5', height: "150px", borderRadius: "30px", boxShadow: "0 0 2px 2px #aedad5" }} className='flex-grow-1 mx-2 my-2' >
                            <h5 className='text-center mt-3'>Income</h5>
                            <h3 className='text-center mt-4'>&#8377;{totalIncome}</h3>
                        </div>
                        <div style={{ backgroundColor: "#ceefec", border: '1px solid #aedad5', height: "150px", borderRadius: "30px", boxShadow: "0 0 2px 2px #aedad5" }} className='flex-grow-1 mx-2 my-2'>
                            <h5 className='text-center mt-3'>Expense</h5>
                            <h3 className='text-center mt-4'>&#8377;{totalExpense}</h3>
                        </div>
                        <div style={{ backgroundColor: "#ceefec", border: '1px solid #aedad5', height: "150px", borderRadius: "30px", boxShadow: "0 0 2px 2px #aedad5" }} className='flex-grow-1 mx-2 my-2'>
                            <h5 className='text-center mt-3'>Balance</h5>
                            <h3 className='text-center mt-4'>&#8377;{balance}</h3>
                        </div>
                    </div>
                </> 
                {/* :
                <div className="d-flex justify-content-center align-items-center mt-5">
                    <div className="spinner-border text-secondary" role="status">
                        <span className="sr-only"></span>
                    </div>
                </div> */}
            }


        </div>

    )
}

export default Dashboard