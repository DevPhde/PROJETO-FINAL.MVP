import { useState, useEffect } from 'react'
import { AxiosProvider } from '../../providers/axiosProvider'
import { VerticalModal } from './VerticalModal'
import { BackdropModal } from './BackdropModal'

export function CreateArticleModal(props) {
    const hash = sessionStorage.getItem('authorization')
    const [feedbackUser, setFeedbackUser] = useState({
        error: false,
        message: ''
    })
    const [loadingReq, setLoadingReq] = useState(false)
    const [values, setValues] = useState({
        title: '',
        text: '',
        image: ''

    })

    const [isValid, setIsValid] = useState({
        title: true,
        text: true
    })

    const handleCreateArticle = async () => {
        setLoadingReq(true)
        setFeedbackUser(prevState => ({ ...prevState, error: false, message: "" }))
        if (!values.title) {
            setIsValid(prevState => ({ ...prevState, title: false }))
        }
        if (!values.text) {
            setIsValid(prevState => ({ ...prevState, text: false }))
        }
        else if (Object.values(isValid).every(value => value == true)) {
            try {
                const response = await AxiosProvider.communication('POST', 'admin/new/article', hash, values)
                setFeedbackUser(prevState => ({ ...prevState, message: response.data.message }))

            } catch (e) {
                setFeedbackUser(prevState => ({ ...prevState, error: true, message: e.response.data.message }))
            }
        }
        setLoadingReq(false)
    }

    useEffect(() => {
        setValues(prevState => ({...prevState, title: '', text: '', image: ''}))
        setIsValid(prevState => ({...prevState, title: true, text: true}))
    },[props.status])
    return (
        <div>
            {feedbackUser.message &&  <BackdropModal
            title={feedbackUser.error ? "Erro interno" : "Cadastro concluído"}
            message={feedbackUser.message}
            namebutton="Fechar"
            />}
           
            
            <VerticalModal
                show={props.showModal}
                onHide={props.hideModal}
                title={'Adicionar Artigo'}
                namebutton={"Fechar"}
                anotherbutton={loadingReq ? "loading" : "true"}
                classanotherbutton={"btn table-modal-btn btn-success"}
                anotherbuttonmessage={'Criar Artigo'}
                clickanotherbutton={() => handleCreateArticle()}
                message={(
                    <>
                        <div className="px-3">
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInput" onFocus={() => setIsValid(prevState => ({ ...prevState, title: true }))} onChange={(event) => setValues((prevState) => ({ ...prevState, title: event.target.value }))} value={values.title} />
                                <label htmlFor="floatingInput">Titulo</label>
                            </div>
                            {!isValid.title && <p className="text-danger">O campo título não pode estar vazio.</p>}
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInput" onFocus={() => setIsValid(prevState => ({ ...prevState, text: true }))} onChange={event => setValues((prevState) => ({ ...prevState, text: event.target.value }))} value={values.text} />
                                <label htmlFor="floatingInput">Texto</label>
                            </div>
                            {!isValid.text && <p className="text-danger">O campo texto não pode estar vazio.</p>}
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInput" onChange={event => setValues((prevState) => ({ ...prevState, image: event.target.value }))} value={values.image} />
                                <label htmlFor="floatingInput">Imagem</label>
                            </div>
                        </div>
                    </>
                )
                }
            />
        </div>
    )
}
