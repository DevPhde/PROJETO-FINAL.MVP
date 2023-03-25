import { useEffect, useState } from "react";
import { AxiosProvider } from "../providers/axiosProvider";
import Table from 'react-bootstrap/Table';
import { VerticalModal } from "./modals/VerticalModal";
import { Form } from "react-bootstrap";
import "../style/tables.css"
import { Loading } from "./Loading";


export function Tables(props) {
    const hash = sessionStorage.getItem('authorization');
    const [data, setData] = useState([]);
    const [values, setValues] = useState({
        id: '',
        date: '',
        name: '',
        amount: 0,
        local: '',
        TypeExpenseId: 0,
        TypeExpense: null
    });

    const [message, setMessage] = useState('');

    const [isValid, setIsValid] = useState({
        date: true,
        name: true,
        amount: true,
        local: true
    });

    const [editing, setEditing] = useState({
        edit: false,
        key: 0
    });
    const [deleting, setDeleting] = useState({
        delete: false,
        key: 0
    });
    const [loadingScreen, setLoadingScreen] = useState(true);
    const [update, setUpdate] = useState(0);
    const [feedbackUser, setFeedbackUser] = useState('');
    const [typeExpenses, setTypeExpenses] = useState([]);
    const [selectedTypeExpense, setSelectedTypeExpense] = useState([]);

    const handleChangeTypeExpense = (event) => {
        const selectedOption = typeExpenses.find(
            (typeExpense) => typeExpense.name === event.target.value
        );
        setSelectedTypeExpense(selectedOption);
    };

    const handleEdit = (i) => {
        setValues(() => ({
            id: i.id,
            date: i.date,
            name: i.name,
            amount: i.amount,
            local: (i.local ? i.local : null),
            TypeExpenseId: (i.TypeExpenseId ? i.TypeExpenseId : null)
        }));
        setEditing(prevState => ({ ...prevState, edit: true, key: i.id }));
        setUpdate(update + 1);
    }

    const handleDelete = (i) => {
        setDeleting(prevState => ({ ...prevState, delete: true, key: i.id }));
    }

    const handleEditRow = async () => {
        if (Object.values(isValid).every(value => value == true)) {
            const data = {
                name: values.name,
                amount: Number(values.amount),
                local: values.local
            }
            if (values.TypeExpenseId !== null) {
                data.TypeExpenseId = selectedTypeExpense.id;
            }
            const response = await AxiosProvider.communication("PUT", `${props.param}/edit/${values.id}`, hash, data);
            setMessage(response.data.message);
            setUpdate(update + 1);
            setEditing(prevState => ({ ...prevState, edit: false, key: 0 }));
        }
    }

    const handleDeleteRow = async () => {
        const response = await AxiosProvider.communication("DELETE", `${props.param}/delete/${deleting.key}`, hash)
        setMessage(response.data.message)
        setUpdate(update + 1)
        setDeleting(false)
    }

    const handleAmount = (event) => {
        let inputValue = event.target.value;

        inputValue = inputValue
            .replace(/\D/g, "")
            .replace(/^0+/, "")
            .padStart(3, "0")
            .replace(/^(\d{1,})(\d{2})$/, "$1.$2") // coloca ponto nas casas decimais ("$1.$2") <- pode trocar por virgula
        //   .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."); // coloca ponto (mas buga na hora de converter pra number)

        if (inputValue === "0") {
            inputValue += ",";
        }

        setValues((prevState) => ({ ...prevState, amount: inputValue }))
    };

    useEffect(() => {
        async function getInfos(param) {
            try {
                const response = await AxiosProvider.communication('GET', param, hash)
                setData(response.data)
                setLoadingScreen(false)
            } catch (err) {
                console.log(err)
                setFeedbackUser(err.response.data.message)
            }

        }

        getInfos(props.param)
    }, [update])
    if (props.param == 'expenses') {
        useEffect(() => {
            async function getTypeExpenses() {
                const response = await AxiosProvider.communication('GET', 'expenses/types', hash)
                setTypeExpenses(response.data.message)
                const res = typeExpenses.find(i => {
                    if (i.id == values.TypeExpenseId) {
                        return i
                    }
                })
                setSelectedTypeExpense(res)
            }
            getTypeExpenses()
        }, [update])

    }
    return (
        <div>
            <VerticalModal
                show={editing.edit}
                onHide={() => {
                    setEditing(prevState => ({ ...prevState, edit: false, key: 0 }))
                    setSelectedTypeExpense(false)
                }}
                title={`Editar ${props.param == 'expenses' ? "Despesa" : "Receita"}`}
                anotherbutton="true"
                classanotherbutton={"btn table-modal-btn btn-success"}
                clickanotherbutton={() => handleEditRow()}
                anotherbuttonmessage={"Editar"}
                namebutton={"Cancelar"}
                message={props.param == 'expenses' ? (<div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" value={values.date} disabled />
                        <label htmlFor="floatingInput">Data</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" onBlur={(event) => { event.target.value == "" || event.target.value.length < 3 ? setIsValid(prevState => ({ ...prevState, name: false })) : setIsValid(prevState => ({ ...prevState, name: true })) }} onChange={(event) => setValues((prevState) => ({ ...prevState, name: event.target.value }))} value={values.name} />
                        <label htmlFor="floatingInput">Nome</label>
                    </div>
                    {!isValid.name && <p className="text-danger">Preencha o campo nome com pelo menos 3 caracteres.</p>}
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" onBlur={(event) => { event.target.value < .01 ? setIsValid(prevState => ({ ...prevState, amount: false })) : setIsValid(prevState => ({ ...prevState, amount: true })) }} onChange={handleAmount} value={values.amount} />
                        <label htmlFor="floatingInput">Valor</label>
                    </div>
                    {!isValid.amount && <p className="text-danger">O campo valor não pode estar vazio.</p>}
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" onBlur={(event) => { event.target.value == "" ? setIsValid(prevState => ({ ...prevState, local: false })) : setIsValid(prevState => ({ ...prevState, local: true })) }} onChange={(event) => setValues((prevState) => ({ ...prevState, local: event.target.value }))} value={values.local} />
                        <label htmlFor="floatingInput">Local</label>
                    </div>
                    {!isValid.local && <p className="text-danger">O campo local não pode estar vazio.</p>}
                    {selectedTypeExpense ? (
                        <section className="col-lg-5 row text-center">
                            <Form.Group controlId="ControlSelect1">
                                <Form.Label className="text-white">Tipo de Despesa</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={selectedTypeExpense.name}
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

                </div>) : (<div>
                    <div>

                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingInput" value={values.date} disabled />
                            <label htmlFor="floatingInput">Data</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingInput" onBlur={(event) => { event.target.value == "" || event.target.value.length < 3 ? setIsValid(prevState => ({ ...prevState, name: false })) : setIsValid(prevState => ({ ...prevState, name: true })) }} onChange={(event) => setValues((prevState) => ({ ...prevState, name: event.target.value }))} value={values.name} />
                            <label htmlFor="floatingInput">Nome</label>
                        </div>
                        {!isValid.name && <p className="text-danger">Preencha o campo nome com pelo menos 3 caracteres.</p>}
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingInput" onBlur={(event) => { event.target.value == "" ? setIsValid(prevState => ({ ...prevState, amount: false })) : setIsValid(prevState => ({ ...prevState, amount: true })) }} onChange={(event) => setValues((prevState) => ({ ...prevState, amount: event.target.value }))} value={values.amount} />
                            <label htmlFor="floatingInput">Valor</label>
                        </div>
                        {!isValid.amount && <p className="text-danger">O campo valor não pode estar vazio.</p>}
                    </div>

                </div>)}
            />

            <VerticalModal
                show={deleting.delete}
                onHide={() => setDeleting(prevState => ({ ...prevState, delete: false, key: 0 }))}
                title={`Deletar ${props.param == 'expenses' ? "Despesa" : "Receita"}`}
                change={() => handleDeleteRow()}
                to={'/'}
                anotherbutton={true}
                classanotherbutton={"btn table-modal-btn btn-danger"}
                clickanotherbutton={() => handleDeleteRow()}
                anotherbuttonmessage={"Deletar"}
                namebutton={"Cancelar"}
                message={
                    <>
                        <p>Tem certeza que deseja deletar a {props.param == 'expenses' ? "despesa" : "receita"}?</p>
                    </>
                }
            />
            <section className="p-5 tables">
                {data.status ? (
                    <div>
                        {message && <p className="text-success">{message}</p>}
                        {data.message.length != 0 ? (<div>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Data</th>
                                        <th>Nome</th>
                                        <th>Valor</th>
                                        {props.param == 'expenses' && <th>Local</th>}
                                        {props.param == 'expenses' && <th>Tipo de despesa</th>}
                                        <th>Opções</th>
                                    </tr>
                                </thead>
                                {data.message.map((info) => (
                                    <tbody key={info.id}>
                                        <tr>
                                            <td>{info.date.split('T')[0]}</td>
                                            <td>{info.name}</td>
                                            <td>{info.amount}</td>
                                            {props.param == 'expenses' && <td>{info.local}</td>}
                                            {props.param == 'expenses' && <td>{info.TypeExpense.name}</td>}
                                            <td className="text-center"><button onClick={() => handleEdit(info)} type="button" className="btn ms-1 p-1 px-2 btn-success">Editar</button>
                                                <button onClick={() => handleDelete(info)} type="button" className="btn ms-1 p-1 btn-danger">Deletar</button></td>
                                        </tr>

                                    </tbody>

                                ))}
                            </Table>
                        </div>) : (<div>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Data</th>
                                        <th>Nome</th>
                                        <th>Valor</th>
                                        {props.param == 'expenses' && <th>Local</th>}
                                        {props.param == 'expenses' && <th>Tipo de despesa</th>}
                                        <th>Opções</th>
                                    </tr>
                                </thead>
                            </Table>
                            {props.param == 'expenses' ? <p className="text-center">Nenhuma despesa cadastrada.</p> : <p className="text-center">Nenhuma receita cadastrada.</p>}


                        </div>)}


                    </div>
                ) : (
                    <div>
                        {loadingScreen ?
                            (
                                <div>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Data</th>
                                                <th>Nome</th>
                                                <th>Valor</th>
                                                {props.param == 'expenses' && <th>Local</th>}
                                                {props.param == 'expenses' && <th>Tipo de despesa</th>}
                                                <th>Opções</th>
                                            </tr>
                                        </thead>
                                    </Table>
                                    <Loading className="loader-position" />
                                </div>
                            ) : (
                                <div>
                                    <p className="mt-5 text-center">{feedbackUser}</p>
                                </div>
                            )}
                    </div>
                )}
            </section>
        </div>

    )
}