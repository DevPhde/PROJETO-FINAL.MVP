import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { AxiosProvider } from '../providers/axiosProvider'
import { VerticalModal } from './modals/VerticalModal'
import "../style/modal.css"
import { BackdropModal } from './modals/BackdropModal'
import { Loading } from './Loading'
export function EditProfile() {

    const hash = sessionStorage.getItem('authorization')
    const [showModal, setShowModal] = useState(true)
    const [error, setError] = useState({
        name: false,
        password: false
    })
    const [feedbackUser, setFeedbackUser] = useState({
        message: "",
        error: false
    })
    const [moreOptions, setMoreOptions] = useState(false)
    const [user, setUser] = useState("")
    const [deleteAccount, setDeleteAccount] = useState(false)
    const [loading, setLoading] = useState(true)
    const [password, setPassword] = useState({
        value: "abcdefg",
        modified: false
    })
    useEffect(() => {
        async function getProfile() {
            try {
                const response = await AxiosProvider.communication("GET", "user/informations", hash)
                setUser(response.data.message)
                setLoading(false)

                console.log(response)
            } catch (err) {
                console.log(err)
                console.log('oi')
                setFeedbackUser(prevState=> ({...prevState, error: true, message: err.response.data.message}))
                setUser(false)
                setLoading(false)
            }


        }
        getProfile()
    }, [])

    const hideModal = () => {
        setShowModal(false)
    }

    const handleEditUser = async () => {
        if (password.modified) {
            if (password.value == "") {
                setError(prevState => ({ ...prevState, password: true }))
            }
        }
        if (Object.values(error).every(value => value == false)) {
            const data = {
                name: user.name
            }
            if (password.modified) {
                data.password = password.value
            }
            try {
                const response = await AxiosProvider.communication('PUT', 'user/editprofile', hash, data)
                setFeedbackUser(prevState=> ({...prevState, error: false, message: response}))

            } catch (err) {
                setFeedbackUser(prevState=> ({...prevState, error: true, message: err.response.data.message}))
                setUser(false)
            }

            console.log(response)
            console.log(data)
        }
    }


    const handleDeleteAccount = async () => {
        try {
            const response = await AxiosProvider.communication('DELETE', 'user/deleteaccount', hash)
            setFeedbackUser(prevState=> ({...prevState, error: false, message: response.data.message}))
            setUser(false)

        } catch(err) {
            setFeedbackUser(prevState=> ({...prevState, error: true, message: err.response.data.message}))
            setUser(false)
        }
        
    }


console.log(feedbackUser)
    return (
        <>
            {!loading ? (<div> {!user ? (
                <div>
                    <BackdropModal title={feedbackUser.error ? "Erro Interno" : "Cadastro deletado com sucesso!"} message={feedbackUser.message} to={feedbackUser.error ? null : "/login"} namebutton={feedbackUser.error ? "Fechar" : "Ir para login"}/>
                </div>
            ) : (
                <div>

                    <VerticalModal
                        show={showModal}
                        onHide={deleteAccount ? () => { setDeleteAccount(false) } : moreOptions ? () => { setMoreOptions(false) } : hideModal}
                        title={'Configurações do usuário'}
                        anotherbutton={deleteAccount ? "true" : moreOptions ? "" : "true"}
                        classanotherbutton={deleteAccount ? "btn table-modal-btn btn-danger" : "btn table-modal-btn btn-success"}
                        clickanotherbutton={deleteAccount ? handleDeleteAccount : handleEditUser}
                        anotherbuttonmessage={deleteAccount ? "Deletar" : "Salvar"}
                        namebutton={deleteAccount ? "Voltar" : moreOptions ? "Voltar" : "Cancelar"}
                        message={(
                            <>
                                {!moreOptions ? (<div>
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" id="floatingInput" onBlur={(event) => { event.target.value == "" || event.target.value.length < 3 ? setError(prevState => ({ ...prevState, name: true })) : setError(prevState => ({ ...prevState, name: false })) }} onChange={(event) => setUser((prevState) => ({ ...prevState, name: event.target.value }))} value={user.name} />
                                        <label htmlFor="floatingInput">Nome Completo</label>
                                    </div>
                                    {error.name && <p className='text-danger'>Campo deve ser preenchido com seu nome completo.</p>}
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" id="floatingInput" value={user.email} disabled />
                                        <label htmlFor="floatingInput">Email</label>
                                    </div>
                                    <div className="form-floating mb-5">
                                        <input type="text" className="form-control" id="floatingInput" value={user.cpf} disabled />
                                        <label htmlFor="floatingInput">CPF</label>
                                    </div>

                                    <div className="form-floating mb-3">
                                        <input type="password" className="form-control" onFocus={() => { if (!password.modified) setPassword(prevState => ({ ...prevState, value: "", modified: true })) }} onBlur={(event) => { event.target.value == "" ? setError(prevState => ({ ...prevState, password: true })) : setError(prevState => ({ ...prevState, password: false })) }} id="floatingInput" onChange={(event) => setPassword((prevState) => ({ ...prevState, value: event.target.value }))} value={password.value} />
                                        <label htmlFor="floatingInput">Nova Senha</label>
                                    </div>
                                    {error.password && <p className='text-danger'>Campo senha obrigatório.</p>}
                                    <button className='btn btn-link my-2' onClick={() => {
                                        setMoreOptions(true)
                                    }}>Opções avançadas</button>
                                    {feedbackUser.message && <p className='text-success'>{feedbackUser.message}</p>}
                                </div>
                                ) : (
                                    <>{deleteAccount ? (<div>
                                        <h5>Tem certeza que deseja exlcuir seu cadastro?</h5>
                                    </div>) : (<div>
                                        <h5>Opções avançadas</h5>
                                        <button className='btn btn-danger my-5 text-center' onClick={() => {
                                            setDeleteAccount(true)
                                        }}>Deletar Conta</button>
                                    </div>)}


                                    </>
                                )}
                            </>
                        )}
                    />

                </div>
            )}</div>) : (<div><Loading className="loader-position" /></div>)}

        </>
    )
}
