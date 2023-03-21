import { useState } from "react";
import '../style/recoveryPassword.css'
import ImgRecovery from '../images/img2.png'
import { UserUseCases } from "../useCases/userUseCases";
import { Link } from "react-router-dom";
import { VerticalModal } from "../components/Modal";

function RecoveryPasswordPage() {

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState({
    status: null,
    message: ''
  })

  const handleSubmit = async () => {
    const data = await UserUseCases.recoveryUser(email)
    setMessage(prevState => ({ ...prevState, status: data.status, message: data.message }))
    if(data.status) {
      setModalShow(true)
    }
  }
  const [modalShow, setModalShow] = useState(false);
  return (
    <main className="main-recovery">
      <VerticalModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        title={'Recuperação de senha'}
      to={'/'}
        buttonName={'Fechar e ir para o Login'}
        message={message.message}
      />
      <div className="div-img-recovery">
        <img className="img-recovery" src={ImgRecovery} />
      </div>
      <div className="div-info-recovery container text-center  align-items-center">
        <h1 className="fw-bold title-recovery mb-5">Esqueceu a senha?</h1>

        <p className=" text-recovery mb-5">Não se preocupe! Digite o seu email no campo abaixo, que nós enviaremos uma nova senha para você!</p>
        <div className="row mb-5 div-input-recovery">
          <div>
            <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control input-recovery" id="colFormLabel" placeholder="Digite aqui o seu email" />
            {!message.status && <p className="text-danger">{message.message}</p>}
          </div>
        </div>
        <div className="d-grid gap-2  div-btn-recovery">
          <button className="btn btn-recovery fw-bold" type="button" onClick={handleSubmit} >Enviar</button>
          <button className="btn btn-recovery back fw-bold" type="button"><Link to="/" className="text-decoration-none text-white">Voltar</Link></button>
        </div>

      </div>

    </main>
  )
}

export default RecoveryPasswordPage
