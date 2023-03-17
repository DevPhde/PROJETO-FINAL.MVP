import { useState, useEffect } from "react";
import '../style/recoveryPassword.css'
import ImgRecovery from '../images/img2.png'
import { UserUseCases } from "../useCases/UserUseCases";

function RecoveryPasswordPage() {



  return (
    <main className="main-recovery">
      <div className="div-img-recovery">
      <img className="img-recovery" src={ImgRecovery} />
      </div>
      <div className="div-info-recovery container text-center  align-items-center">
        <h1 className="fw-bold title-recovery mb-5">Esqueceu a senha?</h1>

        <p className=" text-recovery mb-5">Não se preocupe! Digite o seu email no campo abaixo, que nós enviaremos uma nova senha para você!</p>

        <div class="row mb-5 div-input-recovery">
          <div >
            <input type="email" class="form-control input-recovery" id="colFormLabel" placeholder="Digite aqui o seu email" />
          </div>
        </div>
        <div class="d-grid gap-2  div-btn-recovery">
          <button class="btn btn-recovery fw-bold" type="button" onClick={UserUseCases.recoveryUser()}>Enviar</button>
        </div>

      </div>

    </main>
  )
}

export default RecoveryPasswordPage
