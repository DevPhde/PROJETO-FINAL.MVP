import { useState, useEffect } from "react";
import '../style/Login.css';
import ImgRecovery from '../images/imagemLogin.png';
import { useNavigate, Link } from "react-router-dom";
import { AxiosProvider } from "../providers/axiosProvider";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState();
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let emailRemember = localStorage.getItem('email');
        if (emailRemember) {
            setEmail(emailRemember);
            setIsChecked(true)
        }
        if (sessionStorage.getItem('authorization')) {
            navigate("/dashboard");
        }

    }, []);
    const [user, setUser] = useState(false)

    async function userAuthorization() {
        isChecked ? localStorage.setItem('email', email) : localStorage.setItem('email', "")
           

        if (isChecked) {
            localStorage.setItem('email', email)
        } else
            if (/\S+@\S+\.\S+/.test(email) == false || email == "") {
                setUser(true)
            }
        if (password == null) {
            setUser(true)
        }
        if (/\S+@\S+\.\S+/.test(email) == true && email !== "" && password !== undefined) {

            try {
                const response = await AxiosProvider.communication('POST', 'user/authorization', null, { email: email, password: password })

                if (response.status == 200) {
                    const hash = response.data.message;
                    sessionStorage.setItem('authorization', hash)
                    navigate("/dashboard");
                }
            } catch (e) {
                if (e.response.status == 500) {
                    alert('Erro interno no servidor')
                }
                if (e.response.status == 401) {
                    setUser(true);
                }
            }
        }
    }
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };
    return (
        <main className="main-recovery">
            <div className="div-img-recovery">
                <img className="img-recovery" src={ImgRecovery} />
            </div>
            <div className="div-info-recovery container text-center  align-items-center">
                <h1 className="fw-bold title-recovery mb-5">Login</h1>
                <div className="row mb-5 div-input-recovery">
                    <div >
                        <input type="email" className="form-control input-recovery" placeholder="Digite aqui o seu E-mail" value={email} onChange={e => {
                            setEmail(e.target.value);
                        }} onFocus={() => { setUser(false) }} />

                    </div>
                </div>
                <div className="row mb-5 div-input-recovery">
                    <div >
                        <input type="password" className="form-control input-recovery" placeholder="Digite aqui a sua Senha" onChange={e => {
                            setPassword(e.target.value);
                        }} onFocus={() => { setUser(false) }} />
                    </div>
                    {user && <p className="errInput">E-mail ou senha inválido.</p>}

                </div>
                <div className="form-check checkbox">
                    <input type="checkbox" className="form-check-input checkbox2" checked={isChecked} onChange={handleCheckboxChange} />
                    <label className="form-check-label">Lembrar Email</label>
                </div>
                <Link
                    className='text-decoration-none text-blue'
                    to='/recovery'
                >Esqueceu a Senha?
                </Link>
                <div className="d-grid gap-2  div-btn-recovery">
                    <button className="btn btn-recovery fw-bold" type="button" onClick={userAuthorization}>Entrar</button>
                    <Link
                        className='text-decoration-none text-blue'
                        to='/register'
                    >Ainda não possui Cadastro?
                    </Link>
                </div>
            </div>

        </main>
    )
}
export default Login
