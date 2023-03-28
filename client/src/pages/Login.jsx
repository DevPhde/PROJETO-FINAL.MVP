import { useState, useEffect } from "react";
import '../style/Login.css';
import { useNavigate, Link } from "react-router-dom";
import { AxiosProvider } from "../providers/axiosProvider";
import Logotipo from "../images/logo5.png"
import IlustLogin from "../images/ilust4.png"
import { BackdropModal } from "../components/modals/BackdropModal";

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
                    <BackdropModal title={"Erro Interno"} message={e.response.data.message} to={null} namebutton={"Fechar"}/>
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
        <main className="main-container">
            <div className="div-img-login position-relative">
                <img className="img-logo position-absolute top-0 start-0" src={Logotipo} />
                <img className="img-login" src={IlustLogin} />
            </div>
            <div className="div-info-recovery  text-center  align-items-center">
                <h1 className="fw-bold title-recovery mb-5">Faça o seu login</h1>

                    <div className="form-floating mb-4 div-input-register">
                        <input value={email} onChange={e => {
                            setEmail(e.target.value);
                        }} onFocus={() => { setUser(false) }} type = "email" className = "form-control input-recovery" />
                                <label htmlFor="floatingInput">Email</label>
                    </div>

                    <div className="form-floating mb-4 div-input-register">
                        <input onChange={e => {setPassword(e.target.value);
                        }} onFocus={() => { setUser(false) }} type = "password" className = "form-control input-recovery" />
                                <label htmlFor="floatingInput">Senha</label>
                    </div>


                <div className="d-flex flex-row flex-wrap justify-content-between" style={{ width: "80%" }}>
                    <div className="form-check checkbox">
                        <input type="checkbox" className="form-check-input checkbox2" checked={isChecked} onChange={handleCheckboxChange} />
                        <label className="form-check-label">Lembrar Email</label>
                    </div>
                    <Link
                        className='text-decoration-none text-blue'
                        to='/recovery'
                    >Esqueceu a Senha?
                    </Link>
                </div>
                {user && <p className="errInput">E-mail ou senha inválidos.</p>}

                <div className="d-grid gap-2  div-btn-recovery">
                    <button className="btn btn-login fw-bold" type="button" onClick={userAuthorization}>Entrar</button>
                    <Link
                        className='text-decoration-none text-blue mt-3'
                        to='/register'
                    >Ainda não tem uma conta? Cadastre-se aqui!
                    </Link>
                </div>
            </div>

        </main>
    )
}
export default Login
