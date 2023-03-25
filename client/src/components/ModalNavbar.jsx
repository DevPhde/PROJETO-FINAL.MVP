import { useState } from "react"
import "../style/modalnav.css"
import { Validation } from "../useCases/validationUseCases"
import { AxiosProvider } from "../providers/axiosProvider"
import axios from "axios"

function ModalNavbar() {

    const [newRevenue, setNewRevenue] = useState({
        date: '',
        name: '',
        amount: 0
    })


    const [isValid, setIsValid] = useState({
        date: false,
        name: false,
        amount: false,
        local: null,
        TypeExpenseId: null
    })


    const [newExpense, setNewExpense] = useState({
        date: '',
        name: '',
        amount: 0,
        local: '',
        TypeExpenseId: ''
    })

    const [err, setErr] = useState({
        name: '',
        amount: '',
        date: '',
        local: '',
        TypeExpenseId: ''
    })


    async function createItem(addType) {
        const result = Object.values(isValid).every(value => value == true || value == null)
        console.log(result)

        if (result == true && addType == "Receita") {
            const data ={
                date: newRevenue.date,
                name: newRevenue.name,
                amount:  newRevenue.amount
            }
            const hash = sessionStorage.getItem('authorization')
            console.log(hash) 
            console.log(data)

            try{
            const response = await AxiosProvider.post(hash, "new/revenue", data)
            console.log(response)

            } catch(error){
                console.log(error)
            }
        }}


        const typeForm = "Receita"

        return (
            <form className="mt-3" onSubmit={(e) => {
                e.preventDefault()
    
    
    
                if (Validation.nameValidation(newRevenue.name == false)) {
    
                    setErr((prevState) => ({ ...prevState, name: "Digite o nome da receita" }))
                    setIsValid((prevState) => ({ ...prevState, name: false }))
    
                }
    
    
                if (Validation.amountValidation(newRevenue.amount) == false) {
    
                    setErr((prevState) => ({ ...prevState, amount: "Digite o nome da receita" }))
                    setIsValid((prevState) => ({ ...prevState, amount: false }))
    
                }
                if (Validation.dateValidation(newRevenue.date == false)) {
                    setErr((prevState) => ({ ...prevState, date: "Digite a data da receita" }))
                    setIsValid((prevState) => ({ ...prevState, date: false }))
    
                }
    
                createItem("Receita")
    
    
            }}
            >
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingInput" defaultValue="" placeholder="Nome" onChange={(e) => setNewRevenue((prevState) => ({ ...prevState, name: e.target.value }))}
                        onKeyUp={() => {
                            if (Validation.nameValidation(newRevenue.name)) {
                                setErr((prevState) => ({ ...prevState, name: "" }))
                                setIsValid((prevState) => ({ ...prevState, name: true }))
                            }
                        }}
                    />
                    <label htmlFor="floatingInput">Nome da Receita</label>
                    <div className="invalid" style={{ color: "red" }}>
                        {err.name}
                    </div>
                </div>
                <div className="form-floating">
                    <input type="number" min="0" step=".01" defaultValue="0" className="form-control" id="floatingPassword" placeholder="Valor da Receita" onChange={(e) => setNewRevenue((prevState) => ({ ...prevState, amount: e.target.value }))}
                        onKeyUp={() => {
                            if (Validation.amountValidation(newRevenue.amount)) {
                                setErr((prevState) => ({ ...prevState, amount: "" }))
                                setIsValid((prevState) => ({ ...prevState, amount: true }))
                            }
                        }}
                    />
                    <label htmlFor="floatingPassword">Valor da Receita</label>
                    <div className="invalid" style={{ color: "red" }}>
                        {err.amount}
                    </div>
                </div>
                <div className="my-3">
                    <label htmlFor="date" >Data:</label>
                    <input type="datetime-local" id="date" step="1" name="trip-start" className="mx-3" onChange={(e) => setNewRevenue((prevState) => ({ ...prevState, date: e.target.value }))}
                        onBlur={() => {
                            if (Validation.dateValidation(newRevenue.date)) {
                                setErr((prevState) => ({ ...prevState, date: "" }))
                                setIsValid((prevState) => ({ ...prevState, date: true }))
                            }
                        }}
                    />
                    <div className="invalid" style={{ color: "red" }}>
                        {err.date}
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="submit" className="btn btn-modal">Adicionar {typeForm}</button>
                    <button type="button" className="btn btn-secondary close" data-bs-dismiss="modal">Fechar</button>
    
                </div>
    
            </form>)





}

export default ModalNavbar