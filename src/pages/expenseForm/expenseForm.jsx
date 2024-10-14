import React, { useContext, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { AuthContext } from '../../context/AuthContext';
import { db } from '../../firebase/firebase';
import { toast } from 'react-toastify';

const ExpenseForm = () => {
    const navigate = useNavigate()
    const [type, setType] = useState('income')
    const { currentUser } = useContext(AuthContext)

    const formatDate = (date) => {
        return new Date(date).toISOString().split('T')[0]; // 'yyyy-MM-dd'
    };

    const initialValues = {
        date: formatDate(new Date()),
        incomeType: '',
        incomeAmount: '',
        expenseType: '',
        expenseAmount: '',
    };

    const incomeValidationSchema = Yup.object({
        date: Yup.string().required('Date is required'),
        incomeType: Yup.string().required('Please select an income type'),
        incomeAmount: Yup.number()
            .positive('Amount must be a positive number')
            .required('Income amount is required'),
    })

    const expenseValidationSchema = Yup.object({
        date: Yup.string().required('Date is required'),
        expenseType: Yup.string().required('Please select an expense type'),
        expenseAmount: Yup.number()
            .positive('Amount must be a positive number')
            .required('Expense amount is required'),
    })

    const validationSchema = type === 'income' ? incomeValidationSchema : expenseValidationSchema

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const userDocRef = doc(db, "tracker", currentUser?.uid);
            const userDocSnapshot = await getDoc(userDocRef);

            if (userDocSnapshot.exists()) {
                await updateDoc(userDocRef, {
                    data: arrayUnion({
                        date: values.date,
                        incomeType: values.incomeType,
                        incomeAmount: values.incomeAmount,
                        expenseType: values.expenseType,
                        expenseAmount: values.expenseAmount,
                        type
                    })
                });
            } else {
                await setDoc(userDocRef, {
                    data: [{
                        date: formatDate(new Date()),
                        incomeType: values.incomeType,
                        incomeAmount: values.incomeAmount,
                        expenseType: values.expenseType,
                        expenseAmount: values.expenseAmount,
                        type
                    }]
                });
            }
            resetForm();
            toast.success("Form submitted Succesfully")
        } catch (error) {
            console.error('Error adding document:', error);
            toast.error("Error submitted form")
        }

    }

    return (
        <div className="container-fluid">
            <div>
                <button className="btn btn-primary" onClick={() => navigate('/')}>&lt; Back</button>
            </div>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, setFieldValue }) => (
                    <Form className="container mt-4 border-dark bg-light d-flex justify-content-center align-items-center w-50 p-3 rounded">
                        <div>
                            <h1 className='text-center'>Transaction Form</h1>
                            <div className="mb-3">
                                <label htmlFor="date" className="form-label">Select Date</label>
                                <Field name="date" type="date" className="form-control" />
                                <ErrorMessage name="date" component="div" className="text-danger" />
                            </div>

                            <div className="d-flex m-2">
                                <label className="form-label me-3 mt-3 mb-3">Select Type</label>
                                <div className="m-3">
                                    <input
                                        type="radio"
                                        name="type"
                                        value="income"
                                        checked={type === 'income'}
                                        onChange={() => { setType('income'), setFieldValue('expenseType', ''), setFieldValue('expenseAmount', '') }}
                                    />
                                    <label htmlFor="income">Income</label>
                                </div>
                                <div className="m-3">
                                    <input
                                        type="radio"
                                        name="type"
                                        value="expense"
                                        checked={type === 'expense'}
                                        onChange={() => { setType('expense'), setFieldValue("incomeType", ''), setFieldValue("incomeAmount", '') }}
                                    />
                                    <label htmlFor="expense">Expense</label>
                                </div>
                            </div>
                            {
                                type === 'income' ? <>
                                    <div className="mb-3">
                                        <label htmlFor="incomeType" className="form-label">Income Type</label>
                                        <Field name="incomeType" as="select" className="form-select">
                                            <option value="" >Select income type</option>
                                            <option value="salary">Salary</option>
                                            <option value="bonus">Bonus</option>
                                            <option value="investment">Investment</option>
                                            <option value="rentalincome">Rental Income</option>
                                            <option value="others">Others</option>
                                        </Field>
                                        <ErrorMessage name="incomeType" component="div" className="text-danger" />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="incomeAmount" className="form-label">Income Amount</label>
                                        <Field name="incomeAmount" type="number" className="form-control" />
                                        <ErrorMessage name="incomeAmount" component="div" className="text-danger" />
                                    </div>
                                </> : <>
                                    <div className="mb-3">
                                        <label htmlFor="expenseType" className="form-label">Expense Type</label>
                                        <Field name="expenseType" as="select" className="form-select">
                                            <option value="" >Select expense type</option>
                                            <option value="rent">Rent</option>
                                            <option value="food">Food</option>
                                            <option value="travel">Travel</option>
                                            <option value="cosmetics">Cosmetics</option>
                                            <option value="bills">Bills</option>
                                            <option value="others">Others</option>
                                        </Field>
                                        <ErrorMessage name="expenseType" component="div" className="text-danger" />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="expenseAmount" className="form-label">Expense Amount</label>
                                        <Field name="expenseAmount" type="number" className="form-control" />
                                        <ErrorMessage name="expenseAmount" component="div" className="text-danger" />
                                    </div>
                                </>
                            }
                            <div className='d-grid gap-2 col-6 mx-auto'>
                                <button style={{
                                    backgroundColor: "#90aead", color: "#ffff"
                                }} type="submit" className="btn btn-sm " disabled={isSubmitting}>
                                    {isSubmitting ? 'Submitting...' : 'Submit'}
                                </button>
                            </div>


                        </div>

                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ExpenseForm