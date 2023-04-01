import { useEffect, useState } from 'react'
import { AxiosProvider } from '../providers/axiosProvider'
import { VerticalModal } from './modals/VerticalModal'
import warningIr from "../images/warningIr.png"
import tabelaIr from "../images/tabelair.png"
import "../style/irWarning.css"
export function IRVerify(props) {
    const [warning, setWarning] = useState(false)
    const [user, setUser] = useState([])
    useEffect(() => {
        async function verifyIR(hash) {
            const response = await AxiosProvider.communication("GET", 'user/IR', hash)
            const userInfo = await AxiosProvider.communication("GET", 'user/informations', hash)
            setUser(userInfo.data.message)
            response.data.message.aliquot == 'Isento' ? setWarning(false) : setWarning(true);
        }
        verifyIR(sessionStorage.getItem('authorization'))
    }, [])

    return (
        <div>
            {warning &&
                <>
                    <img width={'50px'} className="warning-position nav-item" src={warningIr} onClick={props.imgClick}></img>
                    <VerticalModal
                        show={props.show}
                        onHide={props.onHide}
                        title={"Imposto de Renda"}
                        footer={'true'}
                        namebutton={'Fechar'}
                        message={
                            <>
                                <h3>Olá, {user.name}! </h3>
                                <p className='m-3'>Caro usuário, a Save Your Money conta com um sistema integrado que realiza a checagem da sua receita anual e </p>

                                <img className='m-5' width={'700px'} src={tabelaIr}></img>

                            </>}
                    />
                </>}
        </div>
    )
}
