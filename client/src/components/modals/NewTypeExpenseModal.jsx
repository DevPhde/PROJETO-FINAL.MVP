import { useState, useEffect } from 'react'
import { AxiosProvider } from '../../providers/axiosProvider'
import { VerticalModal } from './VerticalModal'
import { BackdropModal } from './BackdropModal'

export function NewTypeExpenseModal(props) {
    const [feedbackUser, setFeedbackUser] = useState({
        error: false,
        message: ''
    })
    const [loadingReq, setLoadingReq] = useState(false)
    const [values, setValues] = useState({
        name: '',
    })

    const [isValid, setIsValid] = useState({
        name: true,
    })

    const handleCreateTypeExpense = async () => {
        setLoadingReq(true)
        setFeedbackUser(prevState => ({ ...prevState, error: false, message: "" }))
        if (!values.name) {
            setIsValid(prevState => ({ ...prevState, name: false }))
        }
        else if (Object.values(isValid).every(value => value == true)) {
            try {
                const response = await AxiosProvider.communication('POST', 'expenses/types/new', null, values)
                setFeedbackUser(prevState => ({ ...prevState, message: response.data.message }))
            } catch (e) {
                setFeedbackUser(prevState => ({ ...prevState, error: true, message: e.response.data.message }))
            }
        }
        setLoadingReq(false)
    }

    useEffect(() => {
        setValues(prevState => ({ ...prevState, name: '' }))
        setIsValid(prevState => ({ ...prevState, name: true }))
    }, [props.status])

    return (
        <div>
            {feedbackUser.message && <BackdropModal
                title={feedbackUser.error ? "Erro interno" : "Cadastro concluído"}
                message={feedbackUser.message}
                namebutton="Fechar"
            />}

            <VerticalModal
                show={props.showModal}
                onHide={props.hideModal}
                title={'Adicionar Tipo de Despesa'}
                namebutton={"Fechar"}
                anotherbutton={loadingReq ? "loading" : "true"}
                classanotherbutton={"btn table-modal-btn btn-success"}
                anotherbuttonmessage={'Adicionar'}
                clickanotherbutton={() => handleCreateTypeExpense()}
                message={(
                    <>
                        <div className="px-3">
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInput" onFocus={() => setIsValid(prevState => ({ ...prevState, name: true }))} onChange={(event) => setValues((prevState) => ({ ...prevState, name: event.target.value }))} value={values.name} />
                                <label htmlFor="floatingInput">Tipo de despesa</label>
                            </div>
                            {!isValid.name && <p className="text-danger">O campo nome não pode estar vazio.</p>}
                        </div>
                    </>
                )
                }
            />
        </div>
    )
}
