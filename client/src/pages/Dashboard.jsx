import User from "../images/user.png"
import Navbar from "../components/Navbar"
import Out from "../images/out.png"
import '../style/dashboard.css'
import Coin from "../images/coin.png"
import Gasto from "../images/gasto.png"
import Receita from "../images/receita.png"
import { useState, useEffect } from "react"
import { AxiosProvider } from "../providers/axiosProvider"
import { Chart } from "react-google-charts";
import { Loading } from "../components/Loading"
import JwtValidator from "../components/JwtValidator"


function Dashboard() {
    const hash = sessionStorage.getItem('authorization')
    const [totalValues, setTotalValues] = useState([])
    const [userInfo, setUserInfo] = useState([])
    const [chartDonut, setChartDonut] = useState([])

    const isValid = JwtValidator()
    if(!isValid){
        
    }

    const getTotal = async () => {
        try {
            const response = await AxiosProvider.communication('GET', 'user/informations/total/values', hash)
            setTotalValues(response.data.message)


        } catch (err) {
            console.log(err)
        }

    }

    const optionsChartPie = {
        title: "",
        is3D: false,
    };

    const getInfo = async () => {
        try {
            const res = await AxiosProvider.communication('GET', 'user/informations', hash)
            setUserInfo(res.data.message.name.split())

        } catch (err) {
            console.log(err)
        }

    }

    const getDataChart = async () => {
        try {
            const res = await AxiosProvider.communication('GET', 'user/informations/total/types', hash)
            const data = res.data.message
            const temp = [["Tipos de gastos", "Total"]]
            data.map(item => temp.push([item.name[0].toUpperCase() + item.name.substring(1), item.total]))
            setChartDonut(temp)

        } catch (err) {
            console.log(err)
        }

    }

    const formatValue = (value) =>{
        value = value
            .toString()
            .replace(/\D/g, "")
            .replace(/^0+/, "")
            .padStart(3, "0")
            .replace(/^(\d{1,})(\d{2})$/, "$1,$2")
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        
        if (value === "0") {
            value += ",";
        }
        return value
    }

    useEffect(() => {
        getDataChart();
        getInfo();
        getTotal();


    }, [])

    const total = totalValues.revenues - totalValues.expenses

    return (
        <>
        
            {isValid ? <>
                <div className="d-flex" style={{ backgroundColor: "#F5F5F5", height: "100vh" }}>
                    <Navbar />
                    {totalValues.length == 0 || userInfo.length == 0 || chartDonut.length == 0 ? (<Loading className="loader-position" />) : (
                        <main style={{ width: "100vw" }}>
                            <ul className="nav justify-content-end mt-3" style={{ marginTop: "1%" }} >
                                <li className="nav-item d-flex align-items-center flex-wrap" style={{ marginRight: "5%" }}>
                                    <img src={User} style={{ width: "32px", height: "32px", marginRight: "10px" }} />
                                    <h5 >Olá, {userInfo[0]}!</h5>
                                </li>
                                <li className="nav-item" style={{ marginRight: "5%" }}>
                                    <img src={Out} style={{ width: "32px", height: "32px" }} />
                                </li>
                            </ul>
                            <div className="card-field my-5 d-flex justify-content-around flex-wrap">
                                <div className="card card-dashboard d-flex flex-row">
                                    <div className="card-body">
                                        <h5 className="card-title">Saldo atual</h5>
                                        <h6 className="card-subtitle mb-2 card-value">R$ {formatValue(total)}</h6>

                                    </div>
                                    <div className="card-img">
                                        <img src={Coin} className="card-img-dashboard mt-3" />
                                    </div>

                                </div>

                                <div className="card card-dashboard d-flex flex-row">
                                    <div className="card-body">
                                        <h5 className="card-title">Total de gastos</h5>
                                        <h6 className="card-subtitle mb-2 card-value">R$ {totalValues.expenses.toFixed(2)}</h6>

                                    </div>
                                    <div className="card-img">
                                        <img src={Gasto} className="card-img-dashboard mt-3" />
                                    </div>

                                </div>
                                <div className="card card-dashboard d-flex flex-row">
                                    <div className="card-body">
                                        <h5 className="card-title">Total de Receitas</h5>
                                        <h6 className="card-subtitle mb-2 card-value">R$ {totalValues.revenues.toFixed(2)}</h6>

                                    </div>
                                    <div className="card-img">
                                        <img src={Receita} className="card-img-dashboard mt-3" />
                                    </div>

                                </div>
                            </div>
                            <div className="chart-field d-flex flex-row">
                                {chartDonut.length == 0 ? (<Loading />) :
                                    (<div className="chart-pie bg-white card card-dashboard" style={{ width: "40%", padding: "-150px" }}>
                                        <h5 className="my-3 text-center"> Porcentagem de Gasto por Tipo de Despesa</h5>
                                        <Chart
                                            chartType="PieChart"
                                            data={chartDonut}
                                            options={optionsChartPie}
                                            width={"100%"}
                                            height={"450px"}
                                        />
                                    </div>
                                    )}
                            </div>
                        </main>)}
                </div>
            </> : <main><Loading className="loader-position"/></main>}
            
        </>)

}

export default Dashboard