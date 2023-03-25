import { useState, useEffect } from "react";
import '../style/registerUser.css';
import ImgRecovery from '../images/img2.png';
import { UserUseCases } from "../useCases/UserUseCases";
import { useNavigate, Link } from "react-router-dom";

function registerUser() {
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
    useEffect(() => {
        console.log(user)
    }, [user])
    const navigate = useNavigate();

    function formataCPF(cpf) {
        //retira os caracteres indesejados...
        cpf = cpf.replace(/[^\d]/g, "");
        //realizar a formatação...
        cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
        setCpf(cpf);
    }
    async function validForm() {
        let re = /\S+@\S+\.\S+/;
        if (name.length < 3 || name == null) {
            setUser(prevState => ({ ...prevState, name: true }));
            console.log('name', user.name);
        }
        if (cpf.length < 11 || cpf == null) {
            setUser(prevState => ({ ...prevState, cpf: true }));
        }
        if (re.test(email) == false || email == undefined) {
            setUser(prevState => ({ ...prevState, email: true }));
        }
        if (password == "" || password == undefined) {
            setUser(prevState => ({ ...prevState, password: true }));

        } else if (password != "" || password != undefined) {
            try {
                const resp = await UserUseCases.CreateUser(name, cpf, email, password);
                if (resp.status === 201) {
                    navigate("/login");
                }
            } catch (e) {
                if (e.status === 409) {
                    alert("Email ou CPF já cadastrados")
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
                <h1 className="fw-bold title-recovery mb-5">Cadastre-se</h1>
                <div className="row mb-5 div-input-recovery">
                    <div>
                        <label>Nome</label>
                        <input type="text" className="form-control input-recovery" placeholder="Digite aqui o seu Nome" onChange={e => {
                            setName(e.target.value);
                        }} onFocus={() => setUser(prevState => ({ ...prevState, name: false }))} />
                        {user.name && <p className="errName" id="errName">nome inválido</p>}
                    </div>
                </div>
                <div className="row mb-5 div-input-recovery">
                    <label>CPF</label>
                    <div >
                        <input type="text" className="form-control input-recovery" placeholder="Digite aqui o seu CPF" onChange={e =>
                            formataCPF(e.target.value)
                        } value={cpf} onFocus={() => setUser(prevState => ({ ...prevState, cpf: false }))} />
                        {user.cpf && <p className="errCpf" id="errCpf">CPF inválido</p>}
                    </div>
                </div>
                <div className="row mb-5 div-input-recovery">
                    <label>Email</label>
                    <div >
                        <input type="email" className="form-control input-recovery" placeholder="Digite aqui o seu E-mail" onChange={e => {
                            setEmail(e.target.value);
                        }} value={email} onFocus={() => setUser(prevState => ({ ...prevState, email: false }))} />
                        {user.email && <p className="errEmail" id="errEmail">E-mail inválido</p>}
                    </div>
                </div>
                <div className="row mb-5 div-input-recovery">
                    <label>Senha</label>
                    <div >
                        <input type="password" className="form-control input-recovery" placeholder="Digite aqui a sua Senha" onChange={e => {
                            setPassword(e.target.value);
                        }} value={password} onFocus={() => setUser(prevState => ({ ...prevState, password: false }))} />
                        {user.password && <p className="errPassword" id="errPassword">Senha inválida</p>}
                    </div>
                </div>
                <div className="d-grid gap-2  div-btn-recovery">
                    <button className="btn btn-recovery fw-bold" type="button" onClick={validForm}>Entrar</button>
                </div>
                <Link
                    className='text-decoration-none text-blue'
                    to='https://mvp-backend-k5vq.onrender.com/login'>Já possui Cadastro? Entre
                </Link>
            </div>

        </main>
    )
}
export default registerUser