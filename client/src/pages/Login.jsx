import { useState, useEffect } from "react";
import '../style/Login.css';
import ImgRecovery from '../images/imagemLogin.png';
import { UserUseCases } from "../useCases/UserUseCases";
import { useNavigate } from "react-router-dom";

function Login() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    async function postLogin() {
        let edit = /\S+@\S+\.\S+/;
        if (edit.test(email) == false || email == "") {
            let err = document.getElementById("errEmail")
            err.style.display = "block";

        }
        if (password == null) {
            let err = document.getElementById("errPassword")
            err.style.display = "block";
        }
        if (edit.test(email) == true && email !== "" && password !== undefined) {

            try {
                const resp = await UserUseCases.Login(email, password);
                console.log('rest funcionou', resp.data.message);
    
                if (resp.status == 200) {
                    console.log("direcionando..")
                    const hash = resp.data.message;
                    console.log('hash',hash)
                    sessionStorage.setItem('authorization',hash)
                    // navigate("/home");
                }

            } catch (e) {
                 if (e.response.status == 500) {
                    alert('Erro interno no servidor')
                }
                if (e.response.status == 401) {
                    console.log('rest 401', e.response.status)
                    let err = document.getElementById("errInput2")
                    err.style.display = "block";
                    let errEmail = document.getElementById("errEmail")
                    errEmail.style.display = "none";
                    let errPassword = document.getElementById("errPassword")
                    errPassword.style.display = "none";
                }
                console.log('mensagem->',e)
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
                    <p className="errInput" id="errInput2">E-mail ou Senha inválidos</p>
                    <div >
                        <input type="email" className="form-control input-recovery" placeholder="Digite aqui o seu E-mail" onChange={e => {
                            setEmail(e.target.value);
                        }} />
                        <p className="errEmail" id="errEmail">E-mail inválido</p>
                    </div>
                </div>
                <div className="row mb-5 div-input-recovery">
                    <div >
                        <input type="password" className="form-control input-recovery" placeholder="Digite aqui a sua Senha" onChange={e => {
                            setPassword(e.target.value);
                        }} />
                        <p className="errPassword" id="errPassword">Senha inválida</p>
                    </div>
                </div>
                <div className="form-check checkbox">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        Lembra Senha
                    </label>
                </div>
                <div className="d-grid gap-2  div-btn-recovery">
                    <button className="btn btn-recovery fw-bold" type="button" onClick={postLogin}>Entrar</button>
                </div>

            </div>

        </main>
    )
}

export default Login
