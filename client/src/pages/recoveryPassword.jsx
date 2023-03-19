import { useState, useEffect } from "react";
import '../style/recoveryPassword.css'
import ImgRecovery from '../images/img2.png'
import { UserUseCases } from "../useCases/UserUseCases";

function RecoveryPasswordPage() {

  const [email, setEmail] = useState ([]);

  const recovery = () =>{
    UserUseCases.recoveryUser(email)

  }

  return (
    <main className="main-recovery">
      <div className="div-img-recovery">
      <img className="img-recovery" src={ImgRecovery} />
      </div>
      <div className="div-info-recovery container text-center  align-items-center">
        <h1 className="fw-bold title-recovery mb-5">Esqueceu a senha?</h1>

        <p className=" text-recovery mb-5">Não se preocupe! Digite o seu email no campo abaixo, que nós enviaremos uma nova senha para você!</p>

        <div className="row mb-5 div-input-recovery">
          <div >
            <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control input-recovery" id="colFormLabel" placeholder="Digite aqui o seu email" />
          </div>
        </div>
        <div className="d-grid gap-2  div-btn-recovery">
          <button className="btn btn-recovery fw-bold" type="button" onClick={recovery} >Enviar</button>
          <button className="btn btn-recovery back fw-bold" type="button" onClick={recovery} >Voltar</button>
        </div>

      </div>

    </main>
  )
}

export default RecoveryPasswordPage
