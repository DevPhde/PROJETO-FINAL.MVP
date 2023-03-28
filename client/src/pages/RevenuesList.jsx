import User from "../images/user.png"
import Navbar from "../components/Navbar"
import Out from "../images/out.png"
import '../style/dashboard.css'
import Coin from "../images/coin.png"
import Gasto from "../images/gasto.png"
import Receita from "../images/receita.png"
import { useState, useEffect } from "react"
import { AxiosProvider } from "../providers/axiosProvider"
import { Loading } from "../components/Loading"
import JwtValidator from "../components/JwtValidator"
import { Tables } from "../components/Tables"
import ImgPig from "../images/pig.png"
import CalendarR from "../images/calendar-r.png"
import Money from "../images/money.png"

function RevenuesList() {
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
            const response = await AxiosProvider.communication('GET', 'user/informations/getTotalByActualMonth/revenues', hash)
            setMonthValues(response.data.message)


        } catch (err) {
            console.log(err)
        }

    }
    const getLastItem = async () => {
        try {
            const response = await AxiosProvider.communication('GET', 'user/informations/getLastItem/revenues', hash)
            response.data.message !== null ? setLastItem(response.data.message) : setLastItem(0)



        } catch (err) {
            console.log(err)
        }

    }


    const getInfo = async () => {
        try {
            const res = await AxiosProvider.communication('GET', 'user/informations', hash)
            console.log(res.data.message.name)
            setUserInfo(res.data.message.name.split(' '))

        } catch (err) {
            console.log(err)
        }

    }



    const formatValue = (value) => {
        if (value) {
            let decimal = value.toFixed(2)
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

    useEffect(() => {
        getInfo();
        getTotal();
        getMonthValue();
        getLastItem();


    }, [])



    return (
        <>
            {isValid ? <>
                <div className="d-flex" style={{ backgroundColor: "#F5F5F5", height: "100vh" }}>
                    <Navbar />
                    {totalValues == [] ? (<Loading className="loader-position" />) : (
                        <main className="main-dashboard">
                            <ul className="nav justify-content-end mt-3" style={{ marginTop: "1%" }} >
                                <li className="nav-item-top d-flex align-items-center flex-wrap" style={{ marginRight: "5%" }}>
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
                                <div className="card card-dashboard">
                                    <div className="card-body">
                                        <h5 className="card-title">Total de Receita</h5>
                                        <h6 className="card-subtitle mb-2 card-value">R$ {formatValue(totalValues.revenues)} </h6>

                                    </div>
                                    <div className="card-img img-list" >
                                        <img src={Money} className="card-img-dashboard mt-3" />
                                    </div>

                                </div>

                                <div className="card card-dashboard">
                                    <div className="card-body">
                                        <h5 className="card-title">Total de Receita do Mês Vigente</h5>
                                        <h6 className="card-subtitle mb-2 card-value">R$ {formatValue(monthValue.totalValue)}</h6>

                                    </div>
                                    <div className="card-img mr-2 img-list"  >
                                        <img src={CalendarR} className="card-img-dashboard calendar mt-4 " />
                                    </div>

                                </div>
                                <div className="card card-dashboard">
                                    <div className="card-body ">
                                        <h5 className="card-title">Valor da Última Receita</h5>
                                        <h6 className="card-subtitle mb-2 card-value">R$ {formatValue(lastItem.amount)}</h6>

                                    </div>
                                    <div className="card-img img-list"  >
                                        <img src={ImgPig} className="card-img-dashboard mt-3" />
                                    </div>

                                </div>
                            </div>

                            <div className="table-revenues text-center" style={{ width: " 100%", marginTop: "5%" }}>
                                <h3 className="text-center mb-3 "> Lista de Receitas Adicionadas</h3>


                                <Tables param="revenues" />

                            </div>


                        </main>)}
                </div>
            </> : <main><Loading className="loader-position" /></main>}

        </>)

}

export default RevenuesList