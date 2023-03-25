import { useState } from "react";
import '../style/registerUser.css';
import ImgRecovery from '../images/img2.png';
import { Link } from "react-router-dom";
import { AxiosProvider } from "../providers/axiosProvider";
import { BackdropModal } from "../components/modals/BackdropModal";
import { Loading } from "../components/Loading"
export function RegisterUser() {

    //CPF
    const handleChange = (event) => {
        let inputValue = event.target.value;
        inputValue = inputValue.replace(/\D/g, "");

        if (inputValue.length <= 11) {
            let formattedValue = "";

            for (let i = 0; i < inputValue.length; i++) {
                if (i === 3 || i === 6) {
                    formattedValue += ".";
                }
                if (i === 9) {
                    formattedValue += "-";
                }
                formattedValue += inputValue[i];
            }

            setCpf(formattedValue)
        }
    };
    const [feedbackUser, setFeedbackUser] = useState({
        error: false,
        message: ""
    })
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false)
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [user, setUser] = useState({
        name: false,
        cpf: false,
        password: false,
        email: false
    });

    async function validForm() {
        let re = /\S+@\S+\.\S+/;
        if (name.length < 3 || name == null) {
            setUser(prevState => ({ ...prevState, name: true }));
        }
        if (cpf.length != 14 || cpf == null) {
            setUser(prevState => ({ ...prevState, cpf: true }));
        }
        if (re.test(email) == false || email == undefined) {
            setUser(prevState => ({ ...prevState, email: true }));
        }
        if (password.length < 5) {
            setUser(prevState => ({ ...prevState, password: true }));

        }
        const result = Object.values(user).every(value => value === false)
        if (result) {
            try {
                const data = {
                    name: name,
                    cpf: cpf,
                    email: email,
                    password: password
                }
                setLoading(true)
                const response = await AxiosProvider.communication("POST", 'new/user', null, data)
                if (response.status == 201) {
                    setModal(true)
                    setFeedbackUser(prevState => ({ ...prevState, message: response.data.message }))


                }
            } catch (e) {
                setLoading(false)
                if (e.response.status == 409) {
                    if (email.length || cpf.length > 0) {
                        setFeedbackUser(prevState => ({ ...prevState, error: false, message: e.response.data.message }))
                    }
                }
                if (e.response.status == 500) {
                    setModal(true)
                    setFeedbackUser(prevState => ({ ...prevState, error: true, message: e.response.data.message }))
                }
            }
        }


    }
    return (
        <main className="main-recovery">
            <div className="div-img-recovery">
                <img className="img-recovery" src={ImgRecovery} />
            </div>
            <div>
                {modal && <BackdropModal title={feedbackUser.error ? "Erro Interno" : "Conta criada!"} message={feedbackUser.message} to={feedbackUser.error ? null : "/"} namebutton={feedbackUser.error ? "Fechar" : "Ir para login"} />}
            </div>
            <div className="div-info-recovery container text-center  align-items-center">
                <h1 className="fw-bold title-recovery mb-5">Cadastre-se</h1>
                <div className="row mb-5 div-input-recovery">
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control input-recovery" value={name} onChange={e => {
                            setName(e.target.value);
                        }} onFocus={() => setUser(prevState => ({ ...prevState, name: false }))} />
                        <label htmlFor="floatingInput">Nome Completo</label>
                    </div>
                    {user.name && <p className="text-danger">Preencha com seu nome completo</p>}
                </div>

                <div className="row mb-5 div-input-recovery">
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control input-recovery" value={cpf} onChange={handleChange} onFocus={() => setUser(prevState => ({ ...prevState, cpf: false }))} />
                        <label htmlFor="floatingInput">CPF</label>
                    </div>
                    {user.cpf && <p className="text-danger">CPF inválido</p>}
                </div>
                <div className="row mb-5 div-input-recovery">
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control input-recovery" value={email} onChange={e => {
                            setEmail(e.target.value);
                        }} onFocus={() => setUser(prevState => ({ ...prevState, email: false }))} />
                        <label htmlFor="floatingInput">E-mail</label>
                    </div>
                    {user.email && <p className="text-danger">E-mail inválido</p>}
                </div>

                <div className="row mb-5 div-input-recovery">
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control input-recovery" value={password} onChange={e => {
                            setPassword(e.target.value);
                        }} onFocus={() => setUser(prevState => ({ ...prevState, password: false }))} />
                        <label htmlFor="floatingInput">Senha</label>
                    </div>
                    {user.password && <p className="text-danger">Senha Inválida, a senha deve conter pelo menos 5 caracteres. </p>}
                </div>

                <div className="d-grid gap-2  div-btn-recovery">
                    {!loading ? <button className="btn btn-recovery fw-bold" type="button" onClick={validForm}>Entrar</button> : <Loading className="text-center" />}
                    {feedbackUser.message && <p className="text-danger">{feedbackUser.message}</p>}

                </div>
                <Link
                    className='text-decoration-none text-blue mb-5'
                    to='/'>Já possui Cadastro? Entre
                </Link>
            </div>
        </main >
    )
}