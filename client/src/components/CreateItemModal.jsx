import { useEffect, useState } from "react"
import { AxiosProvider } from "../providers/axiosProvider";
import { VerticalModal } from './modals/VerticalModal';
import { Form } from "react-bootstrap";
import { BackdropModal } from "./modals/BackdropModal";
function CreateItemModal(props) {
    const hash = sessionStorage.getItem('authorization')
    const [type, setType] = useState([])
    const [creatingItem, setCreatingItem] = useState(false)
    const [typeExpenses, setTypeExpenses] = useState([])
    const [selectedOption, setSelectedOption] = useState('')
    const [values, setValues] = useState({
        date: '',
        name: '',
        amount: '',
        local: '',
        TypeExpenseId: ''
    })

    const [reqError, setReqError] = useState(false)

    const [isValid, setIsValid] = useState({
        date: true,
        name: true,
        amount: true,
        local: true,
        TypeExpenseId: true
    })

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



    console.log(isValid)

    const handleCreateItem = async () => {


        if (!values.name || values.name.length < 3) {
            setIsValid(prevState => ({ ...prevState, name: false }))
        }
        if (!values.amount || values.amount < 0.01) {
            setIsValid(prevState => ({ ...prevState, amount: false }))
        }
        if (type == "expense") {
            if (!values.local) {
                setIsValid(prevState => ({ ...prevState, local: false }))
            }
        }

        if (!values.date) {
            return setIsValid(prevState => ({ ...prevState, date: false }))
        }
        const result = Object.values(isValid).every(value => value == true)
        if (result) {
            try {
                const data = {
                    date: values.date,
                    name: values.name,
                    amount: values.amount
                }
                if (type == "expense") {
                    data.local = values.local,
                    data.TypeExpenseId = selectedOption.id
                }
                const response = await AxiosProvider.communication("POST", `new/${type}`, hash)
                console.log(response)
            } catch (e) {
                setReqError(e.response.data.message)
            }
        }
    }
    useEffect(() => {
        setType('')
        setCreatingItem(false)
        setReqError(false)
        async function getTypeExpenses() {
            const response = await AxiosProvider.communication('GET', 'expenses/types')
            setTypeExpenses(response.data.message)
        }
        getTypeExpenses()

    }, [props.showModal])


    const handleChangeTypeExpense = (event) => {
        const selectedOption = typeExpenses.find(
            (typeExpense) => typeExpense.name === event.target.value
        );
        setSelectedOption(selectedOption)
    };
    console.log(type)
    console.log(selectedOption)
    return (
        <div>
            <VerticalModal
                show={props.showModal}
                onHide={props.hideModal}
                title={'Adicionar Item'}
                namebutton={"Fechar"}
                anotherbutton={creatingItem ? "true" : ""}
                classanotherbutton={"btn table-modal-btn btn-success"}
                anotherbuttonmessage={type == "expense" ? "Adicionar Despesa" : "Adicionar Receita"}
                clickanotherbutton={() => handleCreateItem()}
                message={(
                    <>
                    {reqError && <BackdropModal
                        title={"Erro interno"}
                        namebutton={"Fechar"}
                        message={reqError}
                    />}
                        <div className="modal-body">
                            <div className="form-floating">
                                <select className="form-select" onChange={(e) => {
                                    e.target.value == "Despesa" ? setType('expense') : e.target.value == "Receita" ? setType('revenue') : setType("")

                                    e.target.value != "Selecione" ? setCreatingItem(true) : setCreatingItem(false)
                                    console.log(e.target.value)
                                }} id="floatingSelect" aria-label="Floating label select example">
                                    <option defaultValue="1">Selecione</option>
                                    <option defaultValue="2">Receita</option>
                                    <option defaultValue="2">Despesa</option>
                                </select>
                                <label htmlFor="floatingSelect">Escolha o tipo de item que deseja adicionar</label>
                            </div>
                        </div>
                        {type == "revenue" ?
                            <>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingInput" onBlur={(event) => { event.target.value == "" || event.target.value.length < 3 ? setIsValid(prevState => ({ ...prevState, name: false })) : setIsValid(prevState => ({ ...prevState, name: true })) }} onChange={(event) => setValues((prevState) => ({ ...prevState, name: event.target.value }))} value={values.name} />
                                    <label htmlFor="floatingInput">Nome</label>
                                </div>
                                {!isValid.name && <p className="text-danger">Preencha o campo nome com pelo menos 3 caracteres.</p>}
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingInput" onBlur={(event) => { event.target.value < .01 ? setIsValid(prevState => ({ ...prevState, amount: false })) : setIsValid(prevState => ({ ...prevState, amount: true })) }} onChange={event => setValues((prevState) => ({ ...prevState, amount: event.target.value }))} value={values.amount} />
                                    <label htmlFor="floatingInput">Valor</label>
                                </div>
                                {!isValid.amount && <p className="text-danger">O campo valor não pode estar vazio.</p>}
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingInput" onBlur={(event) => { event.target.value == "" ? setIsValid(prevState => ({ ...prevState, local: false })) : setIsValid(prevState => ({ ...prevState, local: true })) }} onChange={(event) => setValues((prevState) => ({ ...prevState, local: event.target.value }))} value={values.local} />
                                    <label htmlFor="floatingInput">Local</label>
                                </div>
                                {!isValid.local && <p className="text-danger">O campo local não pode estar vazio.</p>}
                                <label htmlFor="date" >Data:</label>
                                <input type="datetime-local" id="date" step="1" name="trip-start" className="mx-3" onChange={(e) => { setValues((prevState) => ({ ...prevState, date: e.target.value })) }}
                                    onBlur={() => {
                                        values.date ? setIsValid((prevState) => ({ ...prevState, date: true })) : setIsValid((prevState) => ({ ...prevState, date: false }))

                                    }}
                                />
                                {!isValid.date && <p className="text-danger">O campo local não pode estar vazio.</p>}
                            </> : type == "expense" ? 
                            <>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingInput" onBlur={(event) => { event.target.value == "" || event.target.value.length < 3 ? setIsValid(prevState => ({ ...prevState, name: false })) : setIsValid(prevState => ({ ...prevState, name: true })) }} onChange={(event) => setValues((prevState) => ({ ...prevState, name: event.target.value }))} value={values.name} />
                                    <label htmlFor="floatingInput">Nome</label>
                                </div>
                                {!isValid.name && <p className="text-danger">Preencha o campo nome com pelo menos 3 caracteres.</p>}
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingInput" onBlur={(event) => { event.target.value < .01 ? setIsValid(prevState => ({ ...prevState, amount: false })) : setIsValid(prevState => ({ ...prevState, amount: true })) }} onChange={event => setValues((prevState) => ({ ...prevState, amount: event.target.value }))} value={values.amount} />
                                    <label htmlFor="floatingInput">Valor</label>
                                </div>
                                {!isValid.amount && <p className="text-danger">O campo valor não pode estar vazio.</p>}
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingInput" onBlur={(event) => { event.target.value == "" ? setIsValid(prevState => ({ ...prevState, local: false })) : setIsValid(prevState => ({ ...prevState, local: true })) }} onChange={(event) => setValues((prevState) => ({ ...prevState, local: event.target.value }))} value={values.local} />
                                    <label htmlFor="floatingInput">Local</label>
                                </div>
                                {!isValid.local && <p className="text-danger">O campo local não pode estar vazio.</p>}


                                    {typeExpenses ? (
                                        <section className="col-lg-5 row text-center">
                                            <Form.Group controlId="ControlSelect1">
                                                <Form.Label className="text-white">Tipo de Despesa</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    value={selectedOption.name}
                                                    onChange={handleChangeTypeExpense}
                                                >
                                                    <option value="" disabled>
                                                        Selecionar tipo de despesa
                                                    </option>
                                                    {typeExpenses.map((typeExpense) => (
                                                        <option key={typeExpense.id}>{typeExpense.name}</option>
                                                    ))}
                                                </Form.Control>
                                            </Form.Group>
                                        </section>) : (<div><Loading /></div>)
                                    }


                                <label htmlFor="date" >Data:</label>
                                <input type="datetime-local" id="date" step="1" name="trip-start" className="mx-3" onChange={(e) => { setValues((prevState) => ({ ...prevState, date: e.target.value })) }}
                                    onBlur={() => {
                                        values.date ? setIsValid((prevState) => ({ ...prevState, date: true })) : setIsValid((prevState) => ({ ...prevState, date: false }))

                                    }}
                                />
                                {!isValid.date && <p className="text-danger">O campo local não pode estar vazio.</p>}
                            </> : <> <p>Nenhuma alternativa selecionada.</p></>}
                    </>
                )
                }
            />
        </div >
    )
}

export default CreateItemModal