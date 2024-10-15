import { useNavigate } from "react-router-dom"

const QuickAccess = () => {
    const navigate = useNavigate()
    return (
        <div className="container rounded border mt-3 mb-3" style={{ backgroundColor: "#1B2F33",color:"ffff" }}>
            <div className=" " style={{ borderBottom: "1px solid #d1cfcf" }}>
                <h5 className="ps-3 text-white pt-1">Quick Access</h5>
            </div>
            <div className="d-flex  justify-content-between align-items-center flex-wrap p-3">
                <div>
                    <button style={{ backgroundColor: "#28502E",border: '1px solid #152918',  boxShadow: "0 0 2px 2px #407848" }} className="rounded text-white p-3" onClick={() => navigate('/expenseform')}>+ Create Transaction</button>
                </div>
                <div>
                    <button style={{ backgroundColor: "#28502E",border: '1px solid #152918',  boxShadow: "0 0 2px 2px #407848" }} className="rounded  text-white p-3" onClick={() => navigate('/detailsdata')}>+ View table</button>
                </div>
                <div>
                    <button style={{ backgroundColor: "#28502E",border: '1px solid #152918',  boxShadow: "0 0 2px 2px #407848" }} className="rounded text-white p-3" onClick={() => navigate('/report')}>+ View Reports</button>
                </div>
            </div>
        </div>
    )
}

export default QuickAccess