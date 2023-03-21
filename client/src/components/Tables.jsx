import { useEffect, useState } from "react";
import { AxiosProvider } from "../providers/axiosProvider";
import Table from 'react-bootstrap/Table';
import { VerticalModal } from "./Modal";
import { Form } from "react-bootstrap";


export function Tables(props) {
    const [data, setData] = useState([])
    const [values, setValues] = useState({
        id: '',
        date: '',
        name: '',
        amount: 0,
        local: '',
        TypeExpenseId: 0,
        TypeExpense: null
    })

    const [editing, setEditing] = useState({
        edit: false,
        key: 0
    })
    const [deleting, setDeleting] = useState({
        delete: false,
        key: 0
    })
    const [loadingScreen, setLoadingScreen] = useState(true)
    const [update, setUpdate] = useState(0)



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
            TypeExpenseId: (i.TypeExpenseId ? i.TypeExpenseId : null),
            TypeExpense: (i.TypeExpense.name ? i.TypeExpense.name : null)
        }))
        if(i.TypeExpense) {
            setSelectedTypeExpense(i.TypeExpense.name)
        }
        console.log(i)
        setEditing(prevState => ({ ...prevState, edit: true, key: i.id }))

    }

    const handleDelete = (i) => {
        setDeleting(prevState => ({ ...prevState, delete: true, key: i }))
    }

    const handleEditRow = (obj) => {
        const data = {
            name: obj.name,
            amount: obj.amount,
            local: obj.local
        }
        if (obj.TypeExpenseId !== null) {
            data.TypeExpenseId = obj.TypeExpenseId
        }
        console.log('edit')
        setUpdate(update + 1)
        setEditing(false)
    }

    const handleDeleteRow = () => {
        setUpdate(update + 1)
        setDeleting(false)
    }

    useEffect(() => {
        console.log(sessionStorage.getItem('authorization'))
        async function getInfos(param) {
            const hash = sessionStorage.getItem('authorization')
            const response = await AxiosProvider.get(param, hash)
            setData(response.data)
            setLoadingScreen(false)
        }

        getInfos(props.param)
    }, [update])
    if (props.param == 'expenses') {
        useEffect(() => {
            async function getTypeExpenses() {
                const response = await AxiosProvider.get('expenses/types')
                setTypeExpenses(response.data.message)
                console.log(response)

            }
            getTypeExpenses()
        }, [update])

    }
console.log(values)
    return (
        <div>
            <VerticalModal
                show={editing.edit}
                onHide={() => setEditing(prevState => ({ ...prevState, edit: false, key: 0 }))}
                title={`Editar ${props.param == 'expenses' ? "Despesa" : "Receita"}`}
                buttonName={'Fechar'}
                message={props.param == 'expenses' ? (<div>
                    <input className="form-control input-recovery m-1 w-50" id="colFormLabel" value={values.date} disabled />
                    <input className="form-control input-recovery m-1 w-50" id="colFormLabel" value={values.name} />
                    <input className="form-control input-recovery m-1 w-50" id="colFormLabel" value={values.amount} />
                    <input className="form-control input-recovery m-1 w-50" id="colFormLabel" value={values.local} />
                    <section className="col-lg-5 row text-center">
                        <Form.Group controlId="ControlSelect1">
                            <Form.Label className="text-white">Tipo de Despesa</Form.Label>
                            <Form.Control
                                as="select"
                                value={selectedTypeExpense}
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
                    </section>
                    <button>Editar</button>

                </div>) : (<div>
                    <div>

                        <input className="form-control input-recovery m-1 w-50" id="colFormLabel" placeholder={editing.key} readOnly />
                        <input className="form-control input-recovery m-1 w-50" id="colFormLabel" placeholder={editData.name} readOnly />
                        <input className="form-control input-recovery m-1 w-50" id="colFormLabel" placeholder="2" />
                    </div>

                </div>)}
            // message={
            //     <>
            //         <div className="d-flex justify-content-center row">
            //             <input className="form-control input-recovery m-1 w-50" id="colFormLabel" placeholder="1" />
            //             <input className="form-control input-recovery m-1 w-50" id="colFormLabel" placeholder="2" />
            //             <input className="form-control input-recovery m-1 w-50" id="colFormLabel" placeholder="3" />
            //         </div>

            //     </>
            // }
            />
            <VerticalModal
                show={deleting.delete}
                onHide={() => setDeleting(prevState => ({ ...prevState, delete: false, key: 0 }))}
                title={`Deletar ${props.param == 'expenses' ? "Despesa" : "Receita"}`}
                to={'/'}
                buttonName={'Fechar'}
                message={
                    <>
                        <p>Tem certeza que deseja deletar a {props.param == 'expenses' ? "despesa" : "receita"}?</p>
                        <button className="btn btn-danger" onClick={handleDeleteRow}>Deletar</button>
                    </>
                }
            />
            <section className="p-5 tables">
                {data.status ? (
                    <div>
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
                                        <td>{info.date}</td>
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
                        </div>): (<div>
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
                                    <p className="mt-5 text-center">Carregando informações...</p>
                                </div>
                            ) : (
                                <div>
                                    <p className="mt-5 text-center">Erro Interno, Tente novamente mais tarde.(error code: 28L H)</p>
                                </div>
                            )}
                    </div>
                )}
            </section>
        </div>

    )
}