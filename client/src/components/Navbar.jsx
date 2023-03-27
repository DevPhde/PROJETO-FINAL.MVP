import Logo from "../images/logo5.png"
import Home from "../images/home.png"
import Plus from "../images/plus.png"
import LReceita from "../images/list-receita.png"
import LGasto from "../images/list-gasto.png"
import Help from "../images/help.png"
import Settings from "../images/settings.png"
import { useState } from "react"
import '../style/navbar.css'
import ModalAddRevenue from "./ModalAddRenevue"
import ModalAddExpense from "./ModalAddExpense"
import { VerticalModal } from "./modals/VerticalModal"



function Navbar() {

    const [type, setType] = useState()
    const [showModal, setShowModal] = useState(false)



    return (<div>

        <nav className="text-center navbar-dashboard" >
            <img src={Logo} className="navbar-logo" />

            <ul className="nav flex-column mt-5 text-center ">
                <li className="nav-item mb-2 ">
                    <img src={Home} className="navbar-icon" />
                    <p>Início</p>
                </li>
                <li className="nav-item my-2" >
                    <img src={Plus} className="navbar-icon" />
                    <p>Adicionar item</p>
                </li>
                <li className="nav-item my-2 ">
                    <img src={LReceita} className="navbar-icon" />
                    <p>Listar receitas</p>
                </li>
                <li className="nav-item my-2 ">
                    <img src={LGasto} className="navbar-icon" />
                    <p>Listar gastos</p>
                </li>
                <li className="nav-item my-2" >
                    <img src={Help} className="navbar-icon" />
                    <p>Ajuda</p>
                </li>
                <li className="nav-item my-2 ">
                    <img src={Settings} className="navbar-icon" />
                    <p>Configurar conta</p>
                </li>

            </ul>
        </nav>

        {/* <div className="modal fade" id="addItem" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Adicionar Item</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">

                        <div className="form-floating">
                            <select className="form-select" onChange={(e) => {setType(e.target.value)
                            console.log(e.target.value)
                            }} id="floatingSelect" aria-label="Floating label select example">
                                <option defaultValue="1">Selecione</option>
                                <option defaultValue="1">Receita</option>
                                <option defaultValue="2">Despesa</option>
                            </select>
                            <label htmlFor="floatingSelect">Escolha o tipo de item que deseja adicionar</label>
                        </div>
                        <ModalAddRevenue type={type}/>
                        <ModalAddExpense type={type}/>



                    </div>
                </div>
            </div>


        </div> */}
        {/* <div className="modal fade" id="aboutApp" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Sobre o SYM :)</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>A gestão financeira é uma tarefa essencial para qualquer pessoa que deseja ter sucesso em suas finanças. No entanto, muitas vezes pode ser difícil manter o controle de todas as despesas que ocorrem diariamente.

                            Pensando nessa situação, nós criamos o SYM.</p>

                           <p> O SYM(Save Your Money) é uma aplicação de gerenciamento de despesas que lhe ajuda a simplificar esse processo e garantir que as finanças estejam sempre em ordem. Com essa ferramenta, é possível registrar todas as despesas, incluindo compras, contas, entre outros. </p>

                            <p>A aplicação também conta com um dashboard gráfico, que facilita a análise e compreensão dos gastos, além de permitir que os usuários identifiquem áreas de oportunidade para economizar dinheiro e reduzir os gastos desnecessários.</p>

                            <p>Outra vantagem do SYM é a possibilidade de acompanhar as despesas em tempo real. Com isso, é possível monitorar as finanças diariamente e tomar decisões financeiras mais informadas.
                        </p>


                        <div className="modal-footer">

                            <button type="button" className="btn btn-secondary close" data-bs-dismiss="modal">Fechar</button>

                        </div>
                    </div>
                </div>
            </div>


        </div> */}
        {/* <VerticalModal
            show={showModal}
            onHide={ setShowModal(false)}
            title={'Sobre o SYM :)'}
            namebutton={"Fechar"}
            message={(
                <>

                    <p>A gestão financeira é uma tarefa essencial para qualquer pessoa que deseja ter sucesso em suas finanças. No entanto, muitas vezes pode ser difícil manter o controle de todas as despesas que ocorrem diariamente.

                        Pensando nessa situação, nós criamos o SYM.</p>

                    <p> O SYM(Save Your Money) é uma aplicação de gerenciamento de despesas que lhe ajuda a simplificar esse processo e garantir que as finanças estejam sempre em ordem. Com essa ferramenta, é possível registrar todas as despesas, incluindo compras, contas, entre outros. </p>

                    <p>A aplicação também conta com um dashboard gráfico, que facilita a análise e compreensão dos gastos, além de permitir que os usuários identifiquem áreas de oportunidade para economizar dinheiro e reduzir os gastos desnecessários.</p>

                    <p>Outra vantagem do SYM é a possibilidade de acompanhar as despesas em tempo real. Com isso, é possível monitorar as finanças diariamente e tomar decisões financeiras mais informadas.
                    </p>

                </>
            )}
        /> */}

    </div>
    )
}

export default Navbar