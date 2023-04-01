import { useEffect, useState } from 'react'
import { AxiosProvider } from '../providers/axiosProvider'
import { VerticalModal } from './modals/VerticalModal'
import warningIr from "../images/warningIr.png"
import tabelaIr from "../images/tabelair.png"
import "../style/irWarning.css"
export function IRVerify(props) {
    const [warning, setWarning] = useState(false)
    const [user, setUser] = useState([])
    const [data, setData] = useState([])
    useEffect(() => {
        async function verifyIR(hash) {
            const response = await AxiosProvider.communication("GET", 'user/IR', hash)
            const userInfo = await AxiosProvider.communication("GET", 'user/informations', hash)
            setData(response.data.message)
            setUser(userInfo.data.message)
            response.data.message.aliquot == 'Isento' ? setWarning(false) : setWarning(true);
        }
        verifyIR(sessionStorage.getItem('authorization'))
    })

    const formatValue = (value) => {
        if (value) {
            let decimal = value
            decimal = decimal
                .toString()
                .replace(/\D/g, "")
                .replace(/^0+/, "")
                .padStart(3, "0")
                .replace(/^(\d{1,})(\d{2})$/, "$1,$2")
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");

            if (value < 0) {
                decimal = "-" + decimal
            }
            if (value === "0") {
                value += ",";
            }

            return decimal
        }
        return 0
    }
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
                                <h4>Olá, {user.name}! </h4>
                                <p className='my-3'>Você está recebendo este aviso porque o nosso sistema detectou que a sua receita atual ultrapassou o valor mínimo de isenção do Imposto de Renda do ano vigente.

                                    Para a sua receita atual de <span className="text-danger fw-medium">R${formatValue(data.totalRevenues * 100)}</span>, a alíquota é de <span className="text-danger fw-medium">{data.aliquot}%</span>, com a dedução no valor de <span className="text-danger fw-medium">R${formatValue(data.deduct)}</span>.
                                </p>
                                <p>É possível ver mais informações na tabela abaixo. Não se esqueça de fazer a sua declaração, e evite estresses com o leão! </p>

                                <img className='m-5' width={'700px'} src={tabelaIr}></img>

                            </>}
                    />
                </>}
        </div>
    )
}
