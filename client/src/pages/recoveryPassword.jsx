import { useState, useEffect } from "react";
import '../style/recoveryPassword.css'
import { Link, useNavigate } from "react-router-dom";
import { VerticalModal } from "../components/modals/VerticalModal";
import { AxiosProvider } from "../providers/axiosProvider";
import Logotipo from "../images/logo5.png"
import IlustRecovery from "../images/ilust6.png"
import { Loading } from "../components/Loading";

function RecoveryPasswordPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (sessionStorage.getItem('authorization')) {
      navigate("/dashboard");
    }

  }, []);

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState({
    status: null,
    message: ''
  })

  const handleSubmit = async () => {
    setLoading(true)
    if (email.length >= 1) {
      try {
        const response = await AxiosProvider.communication("POST", `user/recoverypassword`, null, { email: email })
        setMessage(prevState => ({ ...prevState, status: response.data.status, message: response.data.message }))
        if (response.data.status) {
          setModalShow(true)
          setLoading(false)
        }
      } catch (err) {
        setMessage(prevState => ({ ...prevState, status: err.response.data.status, message: err.response.data.message }))
        setLoading(false)
      }

    } else {
      setMessage(prevState => ({ ...prevState, status: false, message: "Preencha com um email válido." }))
      setLoading(false)
    }

  }
  const [modalShow, setModalShow] = useState(false);
  return (
    <main className="main-container">
      <VerticalModal
        show={modalShow}
        anotherbutton={false}
        onHide={() => setModalShow(false)}
        title={'Recuperação de senha'}
        to={'/'}
        namebutton={'Fechar e ir para o Login'}
        message={<p>{message.message}</p>}
      />
      <div className="div-img-login position-relative">
        <img className="img-logo position-absolute top-0 start-0" src={Logotipo} />
        <img className="img-login" src={IlustRecovery} />
      </div>
      <div className="div-info-recovery container text-center  align-items-center">
        <h1 className="fw-bold title-recovery mb-5">Esqueceu a senha?</h1>

        <p className=" text-recovery mb-5">Não se preocupe! Digite o seu email no campo abaixo, que nós enviaremos uma nova senha para você!</p>

        <div className="form-floating mb-4 div-input-register">
          <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control input-recovery" />
          <label htmlFor="floatingInput">Email</label>
        </div>
        {!message.status && <p className="text-danger">{message.message}</p>}


        <div className="d-grid gap-2  div-btn-recovery">
          {!loading ? <button className="btn btn-login fw-bold" type="button" onClick={handleSubmit} >Enviar</button> : <Loading />}
          <Link to="/" className="btn text-decoration-none tn btn-recovery fw-bold text-white">Voltar</Link>
        </div>

      </div>

    </main>
  )
}

export default RecoveryPasswordPage
