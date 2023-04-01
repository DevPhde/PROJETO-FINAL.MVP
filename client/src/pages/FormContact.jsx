import { useState, useEffect } from 'react';
import { Loading } from '../components/Loading';
import { AxiosProvider } from '../providers/axiosProvider';
import "../style/contact.css";
import { BackdropModal } from '../components/modals/BackdropModal';
import { useNavigate } from 'react-router-dom';
import ilustContact from "../images/ilust3.png"

function FormContact() {
    const navigate = useNavigate();
    useEffect(() => {
        if(sessionStorage.getItem('authorization') && !sessionStorage.getItem('admin')){{
            navigate('/dashboard')
        }}
    })

    const [values, setValues] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    })
    const [loading, setLoading] = useState(false)

    const [isValid, setIsValid] = useState({
        name: true,
        email: true,
        subject: true,
        message: true
    })

    const [feedbackUser, setFeedbackUser] = useState({
        error: false,
        message: ''
    })
    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        if (!values.name || values.name.length < 3) {
            setIsValid(prevState => ({ ...prevState, name: false }))
        }
        if (!values.email || /\S+@\S+\.\S+/.test(values.email) == false) {
            setIsValid(prevState => ({ ...prevState, email: false }))
        }
        if (!values.subject) {
            setIsValid(prevState => ({ ...prevState, subject: false }))
        }
        if (!values.message) {
            setIsValid(prevState => ({ ...prevState, message: false }))

        } else if (Object.values(isValid).every(value => value == true)) {
            setFeedbackUser(prevState => ({ ...prevState, error: false, message: '' }))
            try {
                const response = await AxiosProvider.communication("POST", 'contact', null, values)
                setFeedbackUser(prevState => ({ ...prevState, error: true, message: response.data.message }))
            } catch (e) {
                setFeedbackUser(prevState => ({ ...prevState, error: true, message: e.response.data.message }))
            }
        }
        setLoading(false)
    }

    return (
        <main className="main-container-contact">





   

                {feedbackUser.message && <BackdropModal title={feedbackUser.error ? "Mensagem enviada!" : "Erro interno"} message={feedbackUser.message} namebutton="Fechar" />}

                <div className='border bg-white m-auto div-form-contact'>
                    <form onSubmit={handleSubmit} className="form-contact">
                        <h2 className='text-center my-4'>Fale conosco</h2>
                        <div className="form-floating mt-3 mb-3">
                            <input type="text" className="form-control input-contact" id="floatingInput" onFocus={() => setIsValid(prevState => ({ ...prevState, name: true }))} onChange={(event) => setValues((prevState) => ({ ...prevState, name: event.target.value }))} value={values.name} />
                            <label htmlFor="floatingInput">Nome</label>
                        </div>
                        {!isValid.name && <p className="text-danger">Preencha o campo nome com pelo menos 3 caracteres.</p>}
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control input-contact" id="floatingInput" onFocus={() => setIsValid(prevState => ({ ...prevState, email: true }))} onChange={(event) => setValues((prevState) => ({ ...prevState, email: event.target.value }))} value={values.email} />
                            <label htmlFor="floatingInput">email</label>
                        </div>
                        {!isValid.email && <p className="text-danger">Preencha com um email válido.</p>}
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control input-contact" id="floatingInput" onFocus={() => setIsValid(prevState => ({ ...prevState, subject: true }))} onChange={(event) => setValues((prevState) => ({ ...prevState, subject: event.target.value }))} value={values.subject} />
                            <label htmlFor="floatingInput">Assunto</label>
                        </div>
                        {!isValid.subject && <p className="text-danger">O campo assunto deve ser preenchido.</p>}
                        <div className="form-floating text-quality">
                            <textarea cols="40" rows="40" className="form-control textarea-quality h-25" onFocus={() => setIsValid(prevState => ({ ...prevState, message: true }))} onChange={(event) => setValues((prevState) => ({ ...prevState, message: event.target.value }))} value={values.message}></textarea>
                            <label htmlFor="floatingTextarea2">Mensagem</label>
                        </div>
                        {!isValid.message && <p className="text-danger">O campo mensagem deve ser preenchido.</p>}

                        <div className='mb-5 mt-5 text-center'>
                            {loading ? <Loading /> : <button type='submit' className='btn btn-contact fw-medium'>Enviar</button>}

                        </div>
                    </form>
                </div>


                <div className="div-img-contact"><img className="img-contact" src={ilustContact} /></div>






        </main >
    )
}

export default FormContact