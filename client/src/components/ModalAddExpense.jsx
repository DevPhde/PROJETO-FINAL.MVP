import { useState, useEffect } from "react"
import "../style/modalnav.css"
import { Validation } from "../useCases/validationUseCases"
import { AxiosProvider } from "../providers/axiosProvider"




function ModalAddExpense(props) {


    const [getTypes, setGetTypes] = useState([])



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

    const [res, setRes] = useState('')


    async function createItem(addType) {
        const result = Object.values(isValid).every(value => value == true || value == null)


if (result == true && addType == "Despesa") {
            const matchType = getTypes.filter(function (item) {
                return (item.name == newExpense.TypeExpenseId)
            })

            const data = {
                date: newExpense.date+"T00:00:00Z",
                name: newExpense.name,
                amount: Number(newExpense.amount),
                local: newExpense.local,
                TypeExpenseId: matchType[0].id
            }

            const hash = sessionStorage.getItem('authorization')


            try {
                const response = await AxiosProvider.communication("POST","new/expenses", hash, data)
                setRes(response.data.message)

            } catch (err) {
                console.log(err)
            }



        }
    }

    const getTypeExpense = async () => {
        try {
            const response = await AxiosProvider.communication("GET", 'expenses/types')
            const data = response.data.message
            setGetTypes(data)


        } catch (err) {
            console.log(err)
        }

    }


    useEffect(() => {

        getTypeExpense();

    }, [])


    const typeForm = props.type

    if (typeForm == "Despesa") {

        return (


            <form className="mt-3"
                onSubmit={(e) => {
                    e.preventDefault()


                    if (Validation.nameValidation(newExpense.name == false)) {

                        setErr((prevState) => ({ ...prevState, name: "Digite o nome da despesa" }))
                        setIsValid((prevState) => ({ ...prevState, name: false }))

                    }


                    if (Validation.amountValidation(newExpense.amount) == false) {

                        setErr((prevState) => ({ ...prevState, amount: "Digite o valor da despesa" }))
                        setIsValid((prevState) => ({ ...prevState, amount: false }))

                    }
                    if (Validation.dateValidation(newExpense.date == false)) {
                        setErr((prevState) => ({ ...prevState, date: "Digite a data da despesa" }))
                        setIsValid((prevState) => ({ ...prevState, date: false }))

                    }
                    if (Validation.dateValidation(newExpense.local == false)) {
                        setErr((prevState) => ({ ...prevState, local: "Digite o local da despesa" }))
                        setIsValid((prevState) => ({ ...prevState, local: false }))

                    }
                    if (Validation.typeValidation(newExpense.TypeExpenseId == false)) {
                        setErr((prevState) => ({ ...prevState, TypeExpenseId: "Selecione um tipo de despesa" }))
                        setIsValid((prevState) => ({ ...prevState, TypeExpenseId: false }))

                    }




                    createItem("Despesa")


                }}

            >
                <p className="text-success text-center">{res}</p>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingInput" defaultValue="" placeholder="Nome da despesa" onChange={(e) => setNewExpense((prevState) => ({ ...prevState, name: e.target.value }))}
                        onKeyUp={() => {
                            if (Validation.nameValidation(newExpense.name)) {
                                setErr((prevState) => ({ ...prevState, name: "" }))
                                setIsValid((prevState) => ({ ...prevState, name: true }))
                            }
                        }}
                    />
                    <label htmlFor="floatingInput">Nome da Despesa</label>
                    <div className="invalid" style={{ color: "red" }}>
                        {err.name}
                    </div>
                </div>
                <div className="form-floating mb-3">
                    <input type="number" min="0" step=".01" defaultValue="0" className="form-control" id="floatingPassword" placeholder="Valor da despesa" onChange={(e) => setNewExpense((prevState) => ({ ...prevState, amount: e.target.value }))}
                        onKeyUp={() => {

                            if (Validation.amountValidation(newExpense.amount)) {
                                setErr((prevState) => ({ ...prevState, amount: "" }))
                                setIsValid((prevState) => ({ ...prevState, amount: true }))
                            }
                        }}
                    />
                    <label htmlFor="floatingPassword">Valor da Despesa</label>
                    <div className="invalid" style={{ color: "red" }}>
                        {err.amount}
                    </div>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingPassword" defaultValue="" placeholder="Local da despesa" onChange={(e) => setNewExpense((prevState) => ({ ...prevState, local: e.target.value }))}
                        onKeyUp={() => {
                            if (Validation.dateValidation(newExpense.local)) {
                                setErr((prevState) => ({ ...prevState, local: "" }))
                                setIsValid((prevState) => ({ ...prevState, local: true }))
                            }
                        }}
                    />
                    <label htmlFor="floatingPassword">Local da Despesa</label>
                    <div className="invalid" style={{ color: "red" }}>
                        {err.local}
                    </div>
                </div>
                <div className="form-floating">

                    <select className="form-select mb-3" id="floatingSelect" aria-label="Floating label select example" onChange={(e) => setNewExpense((prevState) => ({ ...prevState, TypeExpenseId: e.target.value.toLowerCase() }))}
                                            onClick={() => {
                                                if (Validation.typeValidation(newExpense.TypeExpenseId)) {
                                                    setErr((prevState) => ({ ...prevState, TypeExpenseId: "" }))
                                                    setIsValid((prevState) => ({ ...prevState, TypeExpenseId: true }))
                                                }}}
                    >
                        <option>Selecione</option>
                        {getTypes.length === 0 ? (<option>Carregando...</option>) : (

                            getTypes.map((item) => (
                                <option key={item.id} >{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</option>
                            )
                            ))}


                    </select>

                    <label htmlFor="floatingSelect">Escolha o tipo de despesa</label>
                    <div className="invalid" style={{ color: "red" }}>
                        {err.TypeExpenseId}
                    </div>
                </div>
                <div className="my-3">
                    <label htmlFor="date" >Data:</label>
                    <input type="date" id="date" step="1" name="trip-start" className="mx-3" onChange={(e) => setNewExpense((prevState) => ({ ...prevState, date: e.target.value.split('-').reverse().join('-') }))}
                        onBlur={() => {
                            if (Validation.dateValidation(newExpense.date)) {
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
                    <button type="submit" className="btn btn-modal btnexpense">Adicionar {typeForm}</button>
                    <button type="button" className="btn btn-secondary close" data-bs-dismiss="modal">Fechar</button>

                </div>

            </form >)

    } else if (typeForm == "Selecione"){
        return (
            <div className="mt-3">

                <p className="mb-3">Nenhuma alternativa selecionada</p>
                <div className="modal-footer">

                    <button type="button" className="btn btn-secondary close" data-bs-dismiss="modal">Fechar</button>

                </div>
            </div>
        )
    }
}



export default ModalAddExpense;