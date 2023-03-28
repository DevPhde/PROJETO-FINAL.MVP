import { useState } from 'react';
import { VerticalModal } from './modals/VerticalModal';

export function NewItem(props) {
    const [type, setType] = useState([]);

    console.log(type)

    return (
        <div>
            <VerticalModal
                show={props.showModal}
                onHide={props.hideModal}
                title={'Adicionar Item'}
                namebutton={"Fechar"}
                anotherbutton="true"
                classanotherbutton={"btn table-modal-btn btn-success"}
                anotherbuttonmessage={"Editar"}
                clickanotherbutton={() => handleEditRow()}
                message={(
                    <>
                        <div className="modal-body">
                            <div className="form-floating">
                                <select className="form-select" onChange={(e) => {
                                    setType(e.target.value)
                                    console.log(e.target.value)
                                }} id="floatingSelect" aria-label="Floating label select example">
                                    <option defaultValue="1">Selecione</option>
                                    <option defaultValue="1">Receita</option>
                                    <option defaultValue="2">Despesa</option>
                                </select>
                                <label htmlFor="floatingSelect">Escolha o tipo de item que deseja adicionar</label>
                            </div>
                        </div>
                        {type == "Receita" ?
                            <>

                            </> :
                            <>
                            </>}
                    </>
                )}
            />
        </div>
    )
}

