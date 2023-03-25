import { useState } from "react";
import '../style/recoveryPassword.css'
import ImgRecovery from '../images/img2.png'
import { Link } from "react-router-dom";
import { VerticalModal } from "../components/modals/VerticalModal";
import { AxiosProvider } from "../providers/axiosProvider";

function RecoveryPasswordPage() {

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState({
    status: null,
    message: ''
  })
  console.log(email)

  const handleSubmit = async () => {
    if (email.length >= 1) {
      try {
        const response = await AxiosProvider.communication("POST", `user/recoverypassword`, null, { email: email })
        setMessage(prevState => ({ ...prevState, status: response.data.status, message: response.data.message }))
        if (response.data.status) {
          setModalShow(true)
        }
      } catch(err) {
        setMessage(prevState => ({ ...prevState, status: err.response.data.status, message: err.response.data.message }))
      }
      
    } else {
      setMessage(prevState => ({ ...prevState, status: false, message: "Preencha com um email válido." }))
    }

  }
  const [modalShow, setModalShow] = useState(false);
  return (
    <main className="main-recovery">
      <VerticalModal
        show={modalShow}
        anotherbutton={false}
        onHide={() => setModalShow(false)}
        title={'Recuperação de senha'}
        to={'/'}
        namebutton={'Fechar e ir para o Login'}
        message={<p>{message.message}</p>}
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
