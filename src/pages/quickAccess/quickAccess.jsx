import { useNavigate } from "react-router-dom"

const QuickAccess = () => {
    const navigate = useNavigate()
    return (
        <div className="container rounded border mt-3 mb-3" style={{ backgroundColor: "#90aead" }}>
            <div className=" " style={{ borderBottom: "1px solid #d1cfcf" }}>
                <h5 className="ps-3 pt-1">Quick Access</h5>
            </div>
            <div className="d-flex  justify-content-between align-items-center flex-wrap p-3">
                <div>
                    <button style={{ backgroundColor: "#ceefec",border: '1px solid #aedad5',  boxShadow: "0 0 2px 2px #eefbed" }} className="rounded text-dark p-3" onClick={() => navigate('/expenseform')}>+ Create Transaction</button>
                </div>
                <div>
                    <button style={{ backgroundColor: "#ceefec",border: '1px solid #aedad5',  boxShadow: "0 0 2px 2px #eefbed" }} className="rounded  text-dark p-3" onClick={() => navigate('/detailsdata')}>+ View table</button>
                </div>
                <div>
                    <button style={{ backgroundColor: "#ceefec",border: '1px solid #aedad5',  boxShadow: "0 0 2px 2px #eefbed" }} className="rounded text-dark p-3" onClick={() => navigate('/report')}>+ View Reports</button>
                </div>
            </div>
        </div>
    )
}

export default QuickAccess