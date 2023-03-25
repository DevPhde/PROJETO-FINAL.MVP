import { useState, useEffect } from "react";
import '../style/Login.css';
import ImgRecovery from '../images/imagemLogin.png';
import { UserUseCases } from "../useCases/UserUseCases";
import { useNavigate, Link } from "react-router-dom";


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        let storageValue = localStorage.getItem('email');
        setEmail(storageValue);
        if(sessionStorage.getItem('authorization')){
            navigate("/home");
        }

    }, []);
    const [user, setUser] = useState(false)

    async function postLogin() {
        let check = document.getElementById("ipt1")
        if (check.checked) {
            localStorage.setItem('email', email)
        }
        let edit = /\S+@\S+\.\S+/;
        if (edit.test(email) == false || email == "") {
            setUser(true)

        }
        if (password == null) {
            setUser(true)
        }
        if (edit.test(email) == true && email !== "" && password !== undefined) {

            try {
                const resp = await UserUseCases.Login(email, password);
                if (resp.status == 200) {
                    const hash = resp.data.message;
                    sessionStorage.setItem('authorization', hash)
                    navigate("/home");
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

    return (
        <main className="main-recovery">
            <div className="div-img-recovery">
                <img className="img-recovery" src={ImgRecovery} />
            </div>
            <div className="div-info-recovery container text-center  align-items-center">
                <h1 className="fw-bold title-recovery mb-5">Login</h1>
                <div className="row mb-5 div-input-recovery">
                    {user && <p className="errInput">E-mail ou senha inválido.</p>}
                    {/* <p className="errInput" id="errInput2">E-mail ou Senha inválidos</p> */}
                    <div >
                        <input type="email" className="form-control input-recovery" placeholder="Digite aqui o seu E-mail" value={email} onChange={e => {
                            setEmail(e.target.value);
                        }}  onFocus={() => {setUser(false)}}/>
                       
                    </div>
                </div>
                <div className="row mb-5 div-input-recovery">
                    <div >
                        <input type="password" className="form-control input-recovery" placeholder="Digite aqui a sua Senha" onChange={e => {
                            setPassword(e.target.value);
                        }} onFocus={() => {setUser(false)}}/>
                       
                    </div>
                </div>
                <div className="form-check checkbox">
                    <input className="form-check-input checkbox2" type="checkbox" value="" id="ipt1" />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        Lembrar Email
                    </label>
                </div>
                <Link
                    className='text-decoration-none text-blue'
                    to='https://mvp-backend-k5vq.onrender.com/recovery'
                >Esqueceu a Senha?
                </Link>
                <div className="d-grid gap-2  div-btn-recovery">
                    <button className="btn btn-recovery fw-bold" type="button" onClick={postLogin}>Entrar</button>
                    <Link
                        className='text-decoration-none text-blue'
                        to='https://mvp-backend-k5vq.onrender.com/registerUser'
                    >Ainda não possui Cadastro?
                    </Link>
                </div>
            </div>

        </main>
    )
}
export default Login
