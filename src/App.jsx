import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './pages/layout/header/header'
import LoginForm from './pages/login.jsx/loginForm'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'
import ExpenseForm from './pages/expenseForm/expenseForm'
import Report from './pages/report/report'
import GraphComponent from './pages/graphComponent/graphComponent'
import DetailedDataExpense from './pages/detailedData/detailedDataExpense'
import Dashboard from './pages/dashboard/dashboard'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignUp from './pages/signUp/signUp'

function App() {
  const { currentUser } = useContext(AuthContext)

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path='/signup' exact element={<SignUp />} />
        <Route path='/login' exact element={<LoginForm />} />
        <Route path='/' element={<RequireAuth>
          <Dashboard />
        </RequireAuth>} />
        <Route path='/expenseform' element={<RequireAuth>
          <ExpenseForm />
        </RequireAuth>} />
        <Route path='/report' element={<RequireAuth>
          <Report />
        </RequireAuth>} />
        <Route path='/graph' element={<RequireAuth>
          <GraphComponent />
        </RequireAuth>} />
        <Route path='/detailsdata' element={<RequireAuth>
          <DetailedDataExpense />
        </RequireAuth>} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
