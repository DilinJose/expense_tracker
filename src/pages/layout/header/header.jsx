import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../../context/AuthContext"
import logo from "../../../assets/react.svg"

const Header = () => {
    const navigate = useNavigate()
    const { currentUser } = useContext(AuthContext)
    const handleSignout = () => {
        localStorage.removeItem("user")
        navigate('/login')
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <div className="navbar-brand d-flex align-items-center">
                        <img src={logo} alt="" width="30" height="24" />
                        <Link className="text-decoration-none text-dark fw-normal fs-3 mx-2" to='/'>
                            Expense Tracker
                        </Link>
                    </div>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="text-decoration-none text-dark mx-2" to='/'>
                                    Dashboard
                                </Link>
                                <Link className="text-decoration-none text-dark mx-2" to='/expenseform'>
                                    Transaction Form
                                </Link>
                                <Link className="text-decoration-none text-dark mx-2" to='/detailsdata'>
                                    Transaction Details
                                </Link>
                                <Link className="text-decoration-none text-dark mx-2" to='/report'>
                                    Transaction Report
                                </Link>

                            </li>
                        </ul>
                        <div className="d-flex justify-content-center align-items-center">
                            <p className="m-0">{currentUser?.displayName || "User"}</p>
                            {
                                !currentUser ?
                                    <button type="button" className="btn btn-outline-primary m-1">Login/Register</button>
                                    : <button type="button" className="btn btn-outline-danger m-1" onClick={() => handleSignout()}>SignOut</button>
                            }

                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header