import { useEffect, useState } from 'react'
import { AxiosProvider } from '../providers/axiosProvider'
import { VerticalModal } from './modals/VerticalModal'
import warningIr from "../images/warningIr.png"
import "../style/irWarning.css"
export function IRVerify(props) {
    const [warning, setWarning] = useState(true)
    const [modal, setModal] = useState(false)
    useEffect(() => {
        async function verifyIR(hash) {
            const response = await AxiosProvider.communication("GET", 'user/IR', hash)
            console.log(response.data.message)
            response.data.message.aliquot == 'Isento' ? setWarning(false) : setWarning(true);
        }

        verifyIR(sessionStorage.getItem('authorization'))
    }, [])

    console.log(props)
    return (
        <div>
            {warning &&
                <>
               <img width={'50px'} className="warning-position" src={warningIr}></img>
                    <VerticalModal
                        show={props.show}
                        onHide={props.onHide}
                        title={"Imposto de Renda"}
                        footer={'true'}
                        namebutton={'Fechar'}
                        message={
                        <>
                        <p>Mensagem!</p>
                        </>}
                    />
                </>}
        </div>
    )
}
