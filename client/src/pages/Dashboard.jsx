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
import { Navigate, useNavigate } from "react-router-dom"


function Dashboard() {
    const hash = sessionStorage.getItem('authorization')
    const [totalValues, setTotalValues] = useState([])
    const [userInfo, setUserInfo] = useState([])
    const [dataChartDonut, setDataChartDonut] = useState(false)
    const [chartDonut, setChartDonut] = useState([])
    const [barChartExpenses, setBarChartExpenses] = useState([])
    const [dataBarChartExpenses, setDataBarChartExpenses] = useState(false)
    const [barChartRevenues, setBarChartRevenues] = useState([])
    const [dataBarChartRevenues, setDataBarChartRevenues] = useState(false)
    const [dataLineChart, setDataLineChart] = useState(false)
    const [lineChart, setLineChart] = useState([])


    const navigate = useNavigate()

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

    const optionsChartPie = {
        title: "",
        is3D: false,
    };

    const optionsChartBar = {
        chart: {
            title: "",
            subtitle: "",
        },
    };

    const optionsChartLine = {
        chart: {
            title: "",
            subtitle: "",
        },
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

            let noValues = data.filter(function (item) {
                return (item.total != 0);
            });

            setDataChartDonut(noValues != '')

            data.map(item => temp.push([item.name[0].toUpperCase() + item.name.substring(1), item.total]))
            setChartDonut(temp)

        } catch (err) {
            console.log(err)
        }

    }

    const getDataBarChart = async () => {
        const date = new Date();
        const currentYear = date.getFullYear()


        const month = {
            1: "Janeiro",
            2: "Fevereiro",
            3: "Março",
            4: "Abril",
            5: "Maio",
            6: "Junho",
            7: "Julho",
            8: "Agosto",
            9: "Setembro",
            10: "Outubro",
            11: "Novembro",
            12: "Dezembro",
        }



        try {
            const response = await AxiosProvider.communication('GET', 'user/informations/getMonthlyTotal/revenues', hash)
            const data = response.data.message
            const temp = [["Mês", "Total de Receita"]]


            let noValues = data.filter(function (item) {
                return (item.total != 0);
            });

            setDataBarChartRevenues(noValues != '')


            for (let i = 0; i < data.length; i++) {
                if (data[i].year == currentYear) {
                    const numMonth = Number(data[i].month)
                    temp.push([month[numMonth], data[i].totalAmount])

                }
            }


            setBarChartRevenues(temp)



        } catch (err) {
            console.log(err)
        }

        try {
            const response = await AxiosProvider.communication('GET', 'user/informations/getMonthlyTotal/expenses', hash)
            const data = response.data.message

            let noValues = data.filter(function (item) {
                return (item.total != 0);
            });

            setDataBarChartExpenses(noValues != '')

            const temp = [["Mês", "Total de Receita"]]

            for (let i = 0; i < data.length; i++) {
                if (data[i].year == currentYear) {
                    const numMonth = Number(data[i].month)
                    temp.push([month[numMonth], data[i].totalAmount])

                }
            }


            setBarChartExpenses(temp)
            console.log(barChartExpenses)






        } catch (err) {
            console.log(err)
        }


        configLineChart()

    }





    async function configLineChart() {



        const date = new Date();
        const currentMonth = date.getMonth() + 1


        const temp = [[
            "Mês",
            "Receitas",
            "Despesas",
        ],]

        const month = {
            1: "Janeiro",
            2: "Fevereiro",
            3: "Março",
            4: "Abril",
            5: "Maio",
            6: "Junho",
            7: "Julho",
            8: "Agosto",
            9: "Setembro",
            10: "Outubro",
            11: "Novembro",
            12: "Dezembro",
        }

        for (let i = 1; i <= currentMonth; i++) {
            let searchMonth = month[i]

            console.log(searchMonth)
            let foundExpense = 0
            let foundRevenue = 0

            for (let e = 1; e < barChartExpenses.length; e++) {
                if (searchMonth == barChartExpenses[e][0]) {
                    foundExpense = e

                }
            }
            for (let r = 1; r < barChartRevenues.length; r++) {
                if (searchMonth == barChartRevenues[r][0]) {
                    foundRevenue = r

                }
            }
            console.log(foundExpense)
            let teste = [searchMonth, foundRevenue != 0 ? barChartRevenues[foundRevenue][1] : 0, foundExpense != 0 ? barChartExpenses[foundExpense][1] : 0]
            console.log(teste)
            temp.push([searchMonth, foundRevenue != 0 ? barChartRevenues[foundRevenue][1] : 0, foundExpense != 0 ? barChartExpenses[foundExpense][1] : 0])


        }
        console.log(temp)

        setLineChart(temp)

        setDataLineChart(lineChart != [])


    }






    const formatValue = (value) => {
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


    useEffect(() => {
        getDataChart();
        getInfo();
        getTotal();
        getDataBarChart();


    }, [])


 

    const total = totalValues.revenues - totalValues.expenses

    return (
        <>

            {isValid ? <>
                <div className="d-flex" style={{ backgroundColor: "#F5F5F5", height: "auto" }}>
                    <Navbar />
                    {totalValues.length == 0 || userInfo.length == 0 || chartDonut.length == 0 ? (<Loading className="loader-position" />) : (
                        <main className="main-dashboard" >
                            <ul className="nav justify-content-end mt-3" style={{ marginTop: "1%" }} >
                                <li className="nav-item-top d-flex align-items-center flex-wrap" style={{ marginRight: "5%" }}>
                                    <img src={User} style={{ width: "32px", height: "32px", marginRight: "10px" }} />
                                    <h5 >Olá, {userInfo[0]}!</h5>
                                </li>
                                <li className="nav-item" style={{ marginRight: "5%" }} 
                                onClick={() =>{ sessionStorage.clear()
                                window.location.reload()
                                }}
                                 >
                                    <img src={Out} style={{ width: "32px", height: "32px" }} />
                                </li>
                            </ul>
                            <div className="card-field my-5 d-flex justify-content-around flex-wrap">
                                <div className="card card-dashboard">
                                    <div className="card-body">
                                        <h5 className="card-title">Saldo atual</h5>
                                        <h6 className="card-subtitle mb-2 card-value">R$ {formatValue(total)}</h6>

                                    </div>
                                    <div className="card-img">
                                        <img src={Coin} className="card-img-dashboard mt-3" />
                                    </div>

                                </div>

                                <div className="card card-dashboard ">
                                    <div className="card-body">
                                        <h5 className="card-title">Total de gastos</h5>
                                        <h6 className="card-subtitle mb-2 card-value">R$ {formatValue(totalValues.expenses)}</h6>

                                    </div>
                                    <div className="card-img">
                                        <img src={Gasto} className="card-img-dashboard mt-3" />
                                    </div>

                                </div>
                                <div className="card card-dashboard ">
                                    <div className="card-body">
                                        <h5 className="card-title">Total de Receitas</h5>
                                        <h6 className="card-subtitle mb-2 card-value">R$ {formatValue(totalValues.revenues)}</h6>

                                    </div>
                                    <div className="card-img">
                                        <img src={Receita} className="card-img-dashboard mt-3" />
                                    </div>

                                </div>
                            </div>

                            <div className="chart-field ">

                                {chartDonut.length == 0 ? (<Loading />) : dataChartDonut ?




                                    (<div className="chart-pie bg-white card card-dashboard " >
                                        <h5 className="my-3 text-center"> Porcentagem de Gasto por Tipo de Despesa</h5>
                                        <Chart
                                            chartType="PieChart"
                                            data={chartDonut}
                                            options={optionsChartPie}
                                            width={"95%"}
                                            height={"550px"}
                                            className="chart"
                                        />
                                    </div>) : (
                                        <div className="chart-pie bg-white card card-dashboard ">
                                            <h5 className="my-3 text-center"> Porcentagem de Gasto por Tipo de Despesa</h5>
                                            <p>Dados insuficientes para gerar o gráfico!</p>
                                        </div>
                                    )}
                                <div className="chart-bar-line" >
                                    {barChartRevenues.length == 0 ? (<Loading />) : dataBarChartRevenues ?
                                        (<>
                                            <div className="chart-bar  bar bg-white card">
                                                <h5 className="my-2 text-center"> Total de Receita por Mês</h5>
                                                <Chart
                                                    chartType="Bar"
                                                    width="95%"
                                                    height="200px"
                                                    data={barChartRevenues}
                                                    options={optionsChartBar}
                                                    className="mb-3 "
                                                />
                                            </div>

                                        </>
                                        ) : <div className="chart-bar bg-white card" style={{ width: "100%", height: "300px" }}>
                                            <h5 className="my-2 text-center"> Total de Receita por Mês</h5>
                                            <p>Dados insuficientes para gerar o gráfico!</p>
                                        </div>}
                                    {barChartRevenues.length == 0 || barChartExpenses.length == 0 || lineChart.length == 0 ? (<Loading />) : dataLineChart && dataBarChartRevenues && dataBarChartExpenses ?
                                        // (console.log(lineChart)

                                        // ) 

                                        (<>
                                            <div className="chart-bar mt-3 bg-white card ">
                                                <h5 className="my-2 text-center"> Total de Receita e Despesa por Mês</h5>
                                                <Chart
                                                    chartType="Line"
                                                    width="95%"
                                                    height="230px"
                                                    data={lineChart}
                                                    options={optionsChartLine}
                                                />
                                            </div>

                                        </>
                                        )
                                        : (
                                            <div className="chart-bar mt-3 bg-white card card-dashboard d-flex flex-column justify-content-center align-items-center" style={{ width: "100%", height: "300px" }}>
                                                <h5 className="my-2 text-center"> Total de Receita e Despesa por Mês</h5>
                                                <p>Dados insuficientes para gerar o gráfico!</p>
                                            </div>
                                        )}

                                </div>

                            </div>


                        </main>)}
                </div>
            </> : <main><Loading className="loader-position" /></main>}

        </>)

}

export default Dashboard