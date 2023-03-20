import { useState, useEffect } from "react";
import '../style/registerUser.css';
import ImgRecovery from '../images/create.png';
import { UserUseCases } from "../useCases/UserUseCases";
import { useNavigate } from "react-router-dom";

function registerUser() {
    
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    


    function formataCPF(cpf){
        //retira os caracteres indesejados...
        cpf = cpf.replace(/[^\d]/g, "");
        //realizar a formatação...
        cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
           setCpf(cpf)
           
      }



    
      async function validForm  (){
        let re = /\S+@\S+\.\S+/;
        if(name.length < 3 ){
            let errName = document.getElementById("errName")
            errName.style.display = "block";
        }
        if(cpf.length < 11 || cpf == null){
            let errCpf = document.getElementById("errCpf")
            errCpf.style.display = "block";

        }
         if(re.test(email) == false || email == ""){
            let errEmail = document.getElementById("errEmail")
            errEmail.style.display = "block";
        }
        if(password == ""){
            let errPassword = document.getElementById("errPassword")
            errPassword.style.display = "block";
            
        }else if(password != ""){
            const resp = await UserUseCases.CreateUser(name, cpf, email, password);
            console.log('rest funcionou',resp.status);
            if(resp.status == 201 ){
                console.log("direcionando..")
                navigate("/home");
               }
               if(resp.status == 401){
                let err = document.getElementById("errInput2")
                err.style.display = "block";
                let errEmail = document.getElementById("errEmail")
                errEmail.style.display = "none";
                let errPassword = document.getElementById("errPassword")
                errPassword.style.display = "none";
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
                    <div >
                        <label>Nome</label>
                        <input type="text" className="form-control input-recovery"  placeholder="Digite aqui o seu Nome" onChange={e => {
                            setName(e.target.value);
                        }} />
                       <p className="errName" id="errName">nome inválido</p>
                    </div>
                </div>
                <div className="row mb-5 div-input-recovery">
                <label>CPF</label>
                    <div >
                        <input type="text" className="form-control input-recovery"  placeholder="Digite aqui o seu CPF" onChange={e => {
                            formataCPF(e.target.value);
                        }}  value={cpf}/>
                       <p className="errCpf" id="errCpf">CPF inválido</p>
                    </div>
                </div>
                <div className="row mb-5 div-input-recovery">
                <label>Email</label>
                    <div >
                        <input type="email" className="form-control input-recovery"  placeholder="Digite aqui o seu E-mail" onChange={e => {
                            setEmail(e.target.value);
                        }} />
                       <p className="errEmail" id="errEmail">E-mail inválido</p>
                    </div>
                </div>
                
                <div className="row mb-5 div-input-recovery">
                <label>Senha</label>
                    <div >
                        <input type="password" className="form-control input-recovery"  placeholder="Digite aqui a sua Senha" onChange={e => {
                            setPassword(e.target.value);
                        }} />
                       <p className="errPassword" id="errPassword">Senha inválida</p>
                    </div>
                </div>
                <div className="d-grid gap-2  div-btn-recovery">
                    <button className="btn btn-recovery fw-bold" type="button" onClick={validForm}>Entrar</button>
                </div>

            </div>

        </main>
    )
}

export default registerUser