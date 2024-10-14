import { createSlice } from "@reduxjs/toolkit";

const TrackerSlice = createSlice({
    name: 'tracker',
    initialState: {
        expenses: [],
        income: []

    },
    reducers: {
        setExpense: (state, action) => {
            const data = action?.payload || [];
            const incomeData = []
            const expenseData = []
            if (data) {
                data.forEach(element => {
                    if (element?.type === 'expense') {
                        const payload = {
                            date: element?.date,
                            expenseAmount: element?.expenseAmount,
                            expenseType: element?.expenseType,
                            type: element?.type
                        }
                        expenseData.push(payload)
                        state.expenses = expenseData;
                    } else if (element?.type === 'income') {
                        const payload = {
                            date: element?.date,
                            incomeAmount: element?.incomeAmount,
                            incomeType: element?.incomeType,
                            type: element?.type
                        }
                        incomeData.push(payload)
                        state.income = incomeData;
                    }
                });

            }
        },

    }
})

export const { setExpense } = TrackerSlice.actions;
export default TrackerSlice.reducer