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
    if(!isValid){
        
    }

    const getTotal = async () => {
        try {
            const response = await AxiosProvider.communication('GET', 'user/informations/total/values', hash)
            console.log(response.data.message)
            setTotalValues(response.data.message)


        } catch (err) {
            console.log(err)
        }

    }
    const getMonthValue = async () => {
        try {
            const response = await AxiosProvider.communication('GET', 'user/informations/getTotalByActualMonth/expenses', hash)
            console.log(response.data.message)
            setMonthValues(response.data.message)


        } catch (err) {
            console.log(err)
        }

    }
    const getLastItem = async () => {
        try {
            const response = await AxiosProvider.communication('GET', 'user/informations/getLastItem/expenses', hash)
            console.log(response.data.message)
            setLastItem(response.data.message)


        } catch (err) {
            console.log(err)
        }

    }

    


    const getInfo = async () => {
        try {
            const res = await AxiosProvider.communication('GET', 'user/informations', hash)
            console.log(res.data.message.name)
            setUserInfo(res.data.message.name.split())

        } catch (err) {
            console.log(err)
        }

    }

  

    const formatValue = (value) =>{
        let decimal = value.toFixed(2)
        decimal = decimal
            .toString()
            .replace(/\D/g, "")
            .replace(/^0+/, "")
            .padStart(3, "0")
            .replace(/^(\d{1,})(\d{2})$/, "$1,$2")
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    
            if(value <0) {
                decimal = "-"+decimal
            }
        
        if (value === "0") {
            value += ",";
        }

        return decimal
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
                    {totalValues == [] || userInfo.length == 0 || monthValue.length == 0 || lastItem.length == 0? (<Loading className="loader-position" />) : (
                        <main className="main-dashboard">
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
                                <div className="card card-dashboard ">
                                    <div className="card-body">
                                        <h5 className="card-title">Total de Despesas</h5>
                                        <h6 className="card-subtitle mb-2 card-value">R$ {formatValue(totalValues.expenses)} </h6>

                                    </div>
                                    <div className="card-img img-list"  style={{width:"40%"}}>
                                        <img src={Total} className="card-img-dashboard mt-3" />
                                    </div>

                                </div>

                                <div className="card card-dashboard ">
                                    <div className="card-body">
                                        <h5 className="card-title">Total de Despesas do Mês Vigente</h5>
                                        <h6 className="card-subtitle mb-2 card-value">R$ {formatValue(monthValue.totalValue)}</h6>

                                    </div>
                                    <div className="card-img img-list" style={{width:"50%"}}>
                                        <img src={CalendarE} className="card-img-dashboard mt-3" />
                                    </div>

                                </div>
                                <div className="card card-dashboard ">
                                    <div className="card-body">
                                        <h5 className="card-title">Valor da Última Despesa</h5>
                                        <h6 className="card-subtitle mb-2 card-value">R$ {formatValue(lastItem.amount)}</h6>

                                    </div>
                                    <div className="card-img img-list"  style={{width:"60%"}}>
                                        <img src={Fly} className="card-img-dashboard mt-3" />
                                    </div>

                                </div>
                            </div>

                            <div className="table-revenues text-center" style={{width:" 100%", marginTop:"5%"}}>
                                <h3 className="text-center mb-3 "> Lista de Despesas Adicionadas</h3>
                                
                                
                                <Tables param="expenses"/>
                                
                            </div>


                        </main>)}
                </div>
            </> : <main><Loading className="loader-position"/></main>}

        </>)

}

export default ExpensesList