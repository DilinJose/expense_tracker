import React, { useContext, useEffect, useState } from 'react'
import TableComponent from '../../components/table/tableComponent';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../../context/AuthContext';
import { getTrackerData } from '../../redux/action/trackerAction';
import { useNavigate } from 'react-router-dom';
import { IoFilterOutline } from 'react-icons/io5';

const DetailedDataExpense = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { currentUser } = useContext(AuthContext)
    const { expenses, income } = useSelector((state) => state.tracker)
    const [popUp, showPopUp] = useState(false)
    const [type, setType] = useState('')
    const [incomeData, setIncomeData] = useState([])
    const [expenseData, setExpenseData] = useState([])

    useEffect(() => {
        dispatch(getTrackerData(currentUser?.uid))
    }, []);

    useEffect(() => {
        const fetchIncomeData = () => {
            const date = new Date()

            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();

            const filteredIncome = income.length && income.filter(exp => {
                const incomeDate = new Date(exp.date);
                return incomeDate.getMonth() + 1 === Number(month) && incomeDate.getFullYear() === Number(year);
            });
            console.log('filteredExpenses', filteredIncome)


            filteredIncome.length && setIncomeData(filteredIncome || [])
        }
        const fetchExpenseData = () => {
            const date = new Date()

            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();

            const filteredExpenses = expenses.length && expenses.filter(exp => {
                const expenseDate = new Date(exp.date);
                return expenseDate.getMonth() + 1 === Number(month) && expenseDate.getFullYear() === Number(year);
            });

            console.log('filteredExpenses', filteredExpenses)

            filteredExpenses.length && setExpenseData(filteredExpenses || [])
        }
        fetchIncomeData()
        fetchExpenseData()
    }, [income, expenses])

    const [nowDate, setnowDate] = useState(() => {
        // Get the current date and format it as YYYY-MM-DD
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        return `${year}-${month}`;
    });

    const [currentDay, setCurrentDay] = useState(() => {
        const newDate = new Date();
        return newDate.toISOString().split('T')[0];
    });

    const [currentWeek, setCurrentWeek] = useState(() => {
        const date = new Date();
        const startOfYear = new Date(date.getFullYear(), 0, 1);
        const days = Math.floor((date - startOfYear) / (24 * 60 * 60 * 1000));
        const weekNumber = Math.ceil((days + startOfYear.getDay() + 1) / 7);
        return `${date.getFullYear()}-W${String(weekNumber).padStart(2, '0')}`;
    });


    const handleMonthChange = (e) => {
        const date = new Date(e.target.value)

        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const selected = `${year}-${month}`;

        const filteredExpenses = expenses.length && expenses.filter(exp => {
            const expenseDate = new Date(exp.date);
            return expenseDate.getMonth() + 1 === Number(month) && expenseDate.getFullYear() === Number(year);
        });

        const filteredIncome = income.length && income.filter(exp => {
            const incomeDate = new Date(exp.date);
            return incomeDate.getMonth() + 1 === Number(month) && incomeDate.getFullYear() === Number(year);
        });
        setExpenseData(filteredExpenses)
        setIncomeData(filteredIncome)
        setnowDate(selected)
        showPopUp(false)
    };



    const handleweekChange = (e) => {
        const weekString = e.target.value;
        setCurrentWeek(weekString)
        const [year, week] = weekString.split('-W').map(Number);

        const firstDayOfWeek = getDateOfISOWeek(week, year);
        const startOfWeek = new Date(firstDayOfWeek.setHours(0, 0, 0, 0));
        const endOfWeek = new Date(firstDayOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);
        const filteredExpenses = expenses.filter((expense) => {
            const expenseDate = new Date(expense.date);
            expenseDate.setHours(0, 0, 0, 0);
            return expenseDate >= startOfWeek && expenseDate <= endOfWeek;
        });

        const filteredIncome = income.filter((income) => {
            const incomeDate = new Date(income.date);
            incomeDate.setHours(0, 0, 0, 0);
            return incomeDate >= startOfWeek && incomeDate <= endOfWeek;
        });

        setExpenseData(filteredExpenses)
        setIncomeData(filteredIncome)
        showPopUp(false)

    }

    const getDateOfISOWeek = (week, year) => {
        const simple = new Date(year, 0, 1 + (week - 1) * 7);
        const dayOfWeek = simple.getDay();
        let ISOWeekStart = simple;

        if (dayOfWeek <= 4) {
            ISOWeekStart.setDate(simple.getDate() - simple.getDay() + 1);

        } else {
            ISOWeekStart.setDate(simple.getDate() + 8 - simple.getDay());

        }

        return ISOWeekStart;
    }

    const handleDateChange = (e) => {
        const selectedDate = new Date(e.target.value);
        // selectedDate.setHours(0, 0, 0, 0);

        const filteredExpenses = expenses.filter((expense) => {
            const expenseDate = new Date(expense.date);
            // expenseDate.setHours(0, 0, 0, 0);
            return expenseDate.getTime() === selectedDate.getTime();
        });

        const filteredIncome = income.filter((income) => {
            const incomeDate = new Date(income.date);
            // incomeDate.setHours(0, 0, 0, 0);
            return incomeDate.getTime() === selectedDate.getTime();
        });

        setExpenseData(filteredExpenses);
        setIncomeData(filteredIncome);
        setCurrentDay(selectedDate.toISOString().split('T')[0]);
        showPopUp(false);
    };

    const expensesColumns = [
        {
            accessorKey: 'index',
            header: () => 'Index',
            footer: props => props.column.id,
            meta: {
                width: '100px',
            },
        },
        {
            accessorKey: 'date',
            header: () => 'Date',
            footer: props => props.column.id,
            meta: {
                width: '300px',
            },
            filterable: true,
        },
        {
            accessorKey: 'type',
            header: () => 'Type',
            footer: props => props.column.id,
            meta: {
                width: '300px',
            },
        },
        {
            accessorKey: 'expenseType',
            header: () => 'Expense Type',
            footer: props => props.column.id,
            meta: {
                width: '300px',
            },
            filterable: true,
        },
        {
            accessorKey: 'expenseAmount',
            header: () => 'Expense Amount',
            footer: props => props.column.id,
            meta: {
                width: '350px',
            },
        },

    ]

    const incomeColumns = [
        {
            accessorKey: 'index',
            header: () => 'Index',
            footer: props => props.column.id,
            meta: {
                width: '100px',
            },
        },
        {
            accessorKey: 'date',
            header: () => 'Date',
            footer: props => props.column.id,
            meta: {
                width: '300px',
            },
            filterable: true,
        },
        {
            accessorKey: 'type',
            header: () => 'Type',
            footer: props => props.column.id,
            meta: {
                width: '300px',
            },
        },
        {
            accessorKey: 'incomeType',
            header: () => 'Income Type',
            footer: props => props.column.id,
            meta: {
                width: '300px',
            },
            filterable: true,
        },

        {
            accessorKey: 'incomeAmount',
            header: () => 'Income Amount',
            footer: props => props.column.id,
            meta: {
                width: '350px',
            },
        },

    ]
    const renderCalender = (type) => {
        switch (type) {
            case "date":
                return (
                    <input
                        type="date"
                        style={{ border: '1px solid #bcbcbc', borderRadius: "2%", boxShadow: '0px 0px 5px 2px rgb(224 224 224)' }}
                        className="p-1"
                        value={currentDay}
                        onChange={(e) => handleDateChange(e)}
                    />
                );
            case "week":
                return (
                    <input
                        id="week"
                        type="week"
                        name="week"
                        value={currentWeek}
                        onChange={(e) => handleweekChange(e)}
                        style={{ border: '1px solid #bcbcbc', borderRadius: "2%", boxShadow: '0px 0px 5px 2px rgb(224 224 224)' }}
                    />
                );
            case "month":
                return (
                    <input
                        type="month"
                        style={{ border: '1px solid #bcbcbc', borderRadius: "2%", boxShadow: '0px 0px 5px 2px rgb(224 224 224)' }}
                        className="p-1"
                        value={nowDate}
                        onChange={(e) => handleMonthChange(e)}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <>
            <div className="container-fluid">
                <div className='d-flex justify-content-between align-items-center'>
                    <button className="btn btn-primary" onClick={() => navigate('/')}>&lt; Back</button>

                </div>
                <div className='p-3'>
                    <div className='ms-5 mb-2 d-flex flex-column justify-content-between align-items-start'>
                        <div className='border border-gray rounded-pill px-4 py-2'>

                            <div className="" onClick={() => showPopUp(!popUp)}>
                                <IoFilterOutline />
                                <select className="border-0" onChange={(e) => { setType(e.target.value) }}>
                                    <option value=''>Filter</option>
                                    <option value='date'>Date</option>
                                    <option value='week'>Week</option>
                                    <option value='month'>Month</option>
                                </select>
                            </div>
                        </div>
                        {
                            renderCalender(type)
                        }
                    </div>
                    <div className='m-2 container-fluid shadow-sm  rounded text-center border border-grey rounded '>
                        <h3 className='text-center'>Incomes</h3>
                        {incomeData && <TableComponent tableData={incomeData?.map((data, index) => ({ index: index + 1, ...data }))} columns={incomeColumns} />}
                    </div>
                    <div className='m-2 container-fluid shadow-sm rounded text-center border border-grey rounded '>
                        <h3 className='text-center'>Expenses</h3>
                        {expenseData && <TableComponent tableData={expenseData?.map((data, index) => ({ index: index + 1, ...data }))} columns={expensesColumns} />}
                    </div>

                </div>
            </div>
        </>
    )
}

export default DetailedDataExpense