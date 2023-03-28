import Logo from "../images/logo5.png"
import Home from "../images/home.png"
import Plus from "../images/plus.png"
import LReceita from "../images/list-receita.png"
import LGasto from "../images/list-gasto.png"
import Help from "../images/help.png"
import Settings from "../images/settings.png"
import { useState, createContext } from "react"
import '../style/navbar.css'
import "../style/modal.css"
import ModalAddRevenue from "./ModalAddRenevue"
import ModalAddExpense from "./ModalAddExpense"
import { VerticalModal } from "./modals/VerticalModal"
import { IRVerify } from "./IRVerify"
import { Link } from "react-router-dom"
import { EditProfile } from "./EditProfile"


function Navbar() {
    const [type, setType] = useState()
    const [showModalHelp, setShowModalHelp] = useState(false)
    const [showCreateModal, setShowCreateModal] = useState(false)
    // const [showModalWarning, setShowModalWarning] = useState(false) // warning modal
    const [showModal, setShowModal] = useState(false)
    const [showAddItem, setShowAddItem] = useState(false)
    const [showProfileModal, setShowProfileModal] = useState(false)



    const [showModalWarning, setShowModalWarning] = useState(false) // warning modal

    const handleModal = () => {
        setShowModalWarning(false)
        console.log('oi')
    }
    return (<div>

        <nav className="text-center navbar-dashboard" >

            <Link to='/dashboard' className="text-decoration-none text-dark"><img src={Logo} className="navbar-logo" /></Link>

            <ul className="nav flex-column mt-5 text-center ">
                <Link to='/dashboard' className="text-decoration-none text-dark"><li className="nav-item mb-2 ">
                    <img src={Home} className="navbar-icon" />
                    <p>Início</p>
                </li>
                </Link>
                <li className="nav-item my-2" >
                    <img src={Plus} className="navbar-icon" onClick={() => setShowCreateModal(true)} />
                    <p>Adicionar item</p>
                </li>
                <Link to='/dashboard/revenueslist' className="text-decoration-none text-dark"> <li className="nav-item my-2 ">
                    <img src={LReceita} className="navbar-icon" />
                    <p >Listar receitas</p>
                </li>
                </Link>
                <Link to='/dashboard/expenseslist' className="text-decoration-none text-dark"> <li className="nav-item my-2 ">
                    <img src={LGasto} className="navbar-icon" />
                    <p>Listar gastos</p></li> </Link>

                <li className="nav-item my-2" >
                    <img src={Help} className="navbar-icon" onClick={() => setShowModalHelp(true)} />
                    <p>Ajuda</p>
                </li>
                <li className="nav-item my-2 ">
                    <img src={Settings} className="navbar-icon" onClick={() => setShowModal(true)} />
                    <p>Configurar conta</p>
                </li>
                <li className="nav-item my-2" onClick={() => setShowModalWarning(true)}>
                    <IRVerify
                        show={showModalWarning}
                        onHide={handleModal}
                    />
                </li>

<EditProfile
showModal={showModal}
hideModal={() => setShowModal(false)}
/>

            </ul>
        </nav>
        <div>
            <VerticalModal
                show={showCreateModal}
                onHide={() => setShowCreateModal(false)}
                title={'Adicionar Item'}
                namebutton={"Fechar"}
                anotherbutton="true"
                classanotherbutton={"btn table-modal-btn btn-success"}
                anotherbuttonmessage={"Editar"}
                clickanotherbutton={() => handleEditRow()}
                message={(
                    <>
                        <div className="modal-body">
                            <div className="form-floating">
                                <select className="form-select" onChange={(e) => {
                                    setType(e.target.value)
                                    console.log(e.target.value)
                                }} id="floatingSelect" aria-label="Floating label select example">
                                    <option defaultValue="1">Selecione</option>
                                    <option defaultValue="1">Receita</option>
                                    <option defaultValue="2">Despesa</option>
                                </select>
                                <label htmlFor="floatingSelect">Escolha o tipo de item que deseja adicionar</label>
                            </div>

                            <ModalAddRevenue type={type} />
                            <ModalAddExpense type={type} />
                        </div>

                    </>
                )}
            />
        </div>




        <VerticalModal
            show={showModalHelp}
            onHide={() => setShowModalHelp(false)}
            title={'Sobre o SYM :)'}
            namebutton={"Fechar"}
            message={(
                <>

                    <p> Pensando nessa situação, nós criamos o SYM.</p>

                    <p> O SYM(Save Your Money) é uma aplicação de gerenciamento de despesas que lhe ajuda a simplificar esse processo e garantir que as finanças estejam sempre em ordem. Com essa ferramenta, é possível registrar todas as despesas, incluindo compras, contas, entre outros. </p>

                    <p>A aplicação também conta com um dashboard gráfico, que facilita a análise e compreensão dos gastos, além de permitir que os usuários identifiquem áreas de oportunidade para economizar dinheiro e reduzir os gastos desnecessários.</p>

                    <p>Outra vantagem do SYM é a possibilidade de acompanhar as despesas em tempo real. Com isso, é possível monitorar as finanças diariamente e tomar decisões financeiras mais informadas.
                    </p>

                </>
            )}
        />



    </div>)

}

export default Navbar