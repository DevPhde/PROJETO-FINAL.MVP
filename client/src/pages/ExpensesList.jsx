import User from "../images/user.png"
import Navbar from "../components/Navbar"
import Out from "../images/out.png"
import '../style/dashboard.css'
import Total from "../images/totale.png"
import CalendarE from "../images/calendar-e.png"
import Fly from "../images/moneyfly2.jpg"
import { useState, useEffect } from "react"
import { AxiosProvider } from "../providers/axiosProvider"
import { Loading } from "../components/Loading"
import JwtValidator from "../components/JwtValidator"
import { Tables } from "../components/Tables"

function ExpensesList() {
    const hash = sessionStorage.getItem('authorization')
    const [totalValues, setTotalValues] = useState([])
    const [monthValue, setMonthValues] = useState([])
    const [lastItem, setLastItem] = useState([])
    const [userInfo, setUserInfo] = useState([])

    const isValid = JwtValidator()
    if (!isValid) {

    }

    const getTotal = async () => {
        try {
            const response = await AxiosProvider.communication('GET', 'user/informations/total/values', hash)
            setTotalValues(response.data.message)
        } catch (err) {
            console.log(err)
        }
    }
    const getMonthValue = async () => {
        try {
            const response = await AxiosProvider.communication('GET', 'user/informations/getTotalByActualMonth/expenses', hash)
            setMonthValues(response.data.message)
        } catch (err) {
            console.log(err)
        }
    }
    const getLastItem = async () => {
        try {
            const response = await AxiosProvider.communication('GET', 'user/informations/getLastItem/expenses', hash)
            response.data.message !== null ? setLastItem(response.data.message) : setLastItem(0)
        } catch (err) {
            console.log(err)
        }
    }




    const getInfo = async () => {
        try {
            const res = await AxiosProvider.communication('GET', 'user/informations', hash)
            setUserInfo(res.data.message.name.split(' '))

        } catch (err) {
            console.log(err)
        }
    }



    const formatValue = (value) => {
        if (value) {
            let decimal = value
            decimal = decimal
                .toString()
                .replace(/\D/g, "")
                .replace(/^0+/, "")
                .padStart(3, "0")
                .replace(/^(\d{1,})(\d{2})$/, "$1,$2")
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");

            if (value < 0) {
                decimal = "-" + decimal
            }

            if (value === "0") {
                value += ",";
            }
            return decimal
        }
        return 0
    }

    const [update, setUpdate] = useState(0)

    setTimeout(() => {
        setUpdate(update + 1)
    }, 5000)

    useEffect(() => {
        getInfo();
        getTotal();
        getMonthValue();
        getLastItem();
    }, [update])


    return (
        <>
            {isValid ? <>
                <div className="d-flex" style={{ backgroundColor: "#F5F5F5", height: "100vh" }}>
                    <Navbar />
                    {totalValues == [] ? (<Loading className="loader-position" />) : (
                        <main style={{ width: "100vw" }}>
                            <ul className="nav justify-content-end mt-3" style={{ marginTop: "1%" }} >
                                <li className="nav-item d-flex align-items-center flex-wrap" style={{ marginRight: "5%" }}>
                                    <img src={User} style={{ width: "32px", height: "32px", marginRight: "10px" }} />
                                    <h5 className="text-capitalize">Olá, {userInfo[0]}!</h5>
                                </li>
                                <li className="nav-item" style={{ marginRight: "5%" }}
                                    onClick={() => {
                                        sessionStorage.clear()
                                        window.location.reload()
                                    }}
                                >
                                    <img src={Out} style={{ width: "32px", height: "32px" }} />
                                </li>
                            </ul>
                            <div className="card-field my-5 d-flex justify-content-around flex-wrap">
                                <div className="card card-dashboard ">
                                    <div className="card-body">
                                        <h5 className="card-title">Total de Despesas</h5>
                                        <h6 className="card-subtitle mb-2 card-value">R$ {formatValue(totalValues.expenses)} </h6>

                                    </div>
                                    <div className="card-img img-list" style={{ width: "40%" }}>
                                        <img src={Total} className="card-img-dashboard mt-3" />
                                    </div>

                                </div>

                                <div className="card card-dashboard ">
                                    <div className="card-body">
                                        <h5 className="card-title">Total de Despesas do Mês Vigente</h5>
                                        <h6 className="card-subtitle mb-2 card-value">R$ {formatValue(monthValue.totalValue)}</h6>

                                    </div>
                                    <div className="card-img img-list" style={{ width: "50%" }}>
                                        <img src={CalendarE} className="card-img-dashboard mt-3" />
                                    </div>

                                </div>
                                <div className="card card-dashboard ">
                                    <div className="card-body">
                                        <h5 className="card-title">Valor da Última Despesa</h5>
                                        <h6 className="card-subtitle mb-2 card-value">R$ {formatValue(lastItem.amount)}</h6>

                                    </div>
                                    <div className="card-img img-list" style={{ width: "60%" }}>
                                        <img src={Fly} className="card-img-dashboard mt-3" />
                                    </div>

                                </div>
                            </div>

                            <div className="table-revenues text-center" style={{ width: " 100%", marginTop: "5%" }}>
                                <h3 className="text-center mb-3 "> Lista de Despesas Adicionadas</h3>


                                <Tables param="expenses" />

                            </div>


                        </main>)}
                </div>
            </> : <main><Loading className="loader-position" /></main>}

        </>)

}

export default ExpensesList