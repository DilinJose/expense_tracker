import { useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getTrackerData } from "../../redux/action/trackerAction"
import { AuthContext } from "../../context/AuthContext"

const Report = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { currentUser } = useContext(AuthContext)
    const [aiResp, setAiResp] = useState('')
    const [loading, setLoading] = useState(false)
    const [nowDate, setnowDate] = useState(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        return `${year}-${month}`;
    });
    const [search, setSearch] = useState(`Generate a concise report analysis of the user's income and expenses, pinpointing areas where expense management could be enhanced, and offering actionable recommendations.`)
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
    };

    const generateResult = (term) => {
        setLoading(true);
        const financialData = {
            expenses: expenses,
            income: income
        };
        fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${import.meta.env.VITE_GEMINI_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                // text: `Generate a concise report analysis of the user's income and expenses, pinpointing areas where expense management could be enhanced, and offering actionable recommendations.`
                                text: `${term} given is my data = ${JSON.stringify(financialData)}`
                            }
                        ]
                    }
                ]
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
                    const generatedText = data.candidates[0].content.parts[0].text;
                    setAiResp(generatedText);
                    setLoading(false);
                } else {
                    console.error('Unexpected response structure:', data);
                }
            }
            )
            .catch(error => console.error('Error:', error));
    }

    return (
        <>{
            loading ? <div className="d-flex justify-content-center align-items-center mt-5">
                <div className="spinner-border text-secondary" role="status">
                    <span className="sr-only"></span>
                </div>
            </div> : <div className="container-fluid">
                <div>
                    <button className="btn btn-primary" onClick={() => navigate('/')}>&lt; Back</button>
                </div>
                <div style={{ height: "80vh" }} className="d-flex justify-content-between flex-column">
                    <div className="d-flex justify-content-center align-items-center flex-column">
                        <label className="m-2">Review report based on selected month and year</label>
                        <input
                            type="month"
                            style={{ border: '1px solid #bcbcbc', borderRadius: "2%", boxShadow: '0px 0px 5px 2px rgb(224 224 224)' }}
                            className="p-1"
                            value={nowDate}
                            onChange={(e) => handleDateChange(e)}
                        />
                    </div>
                    <div className="d-flex justify-content-center align-items-center m-3">
                        <button onClick={() => { generateResult(search) }} style={style.button}>Generate AI Report</button>
                    </div>
                    <div className="m-3">
                        {
                            aiResp && <pre className="container-fluid shadow-sm p-3 mb-5 rounded text-center w-100 border border-grey rounded  ">{aiResp}</pre>
                        }
                    </div>
                </div>
            </div>
        }

        </>

    )
}

export default Report


const style = {
    form: {
        display: "flex",
        flexDirection: 'row',
        border: '1px solid #90aead',
        padding: '3px',
        borderRadius: "30px",
    },
    input: {
        flexGrow: 2,
        border: 'none',

    },

    button: {
        border: '1px solid #90aead',
        background: '#90aead',
        color: "white",
        borderRadius: "30px",
        padding: "10px 50px"

    }
}