import { useEffect, useState } from "react";
import { RevenuesUseCases } from "../useCases/revenueUseCases";
import { AxiosProvider } from "../providers/axiosProvider";
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";


export function Tables(props) {
    const [data, setData] = useState([])
    // const []
    const [loadingScreen, setLoadingScreen] = useState(true)
    useEffect(() => {
        console.log(sessionStorage.getItem('authorization'))
        async function getInfos(param) {
            const hash = sessionStorage.getItem('authorization')
            const response = await AxiosProvider.get(param, hash)
            setData(response.data)
            setLoadingScreen(false)
            if (data && props.param == 'expenses') {
                const response = await AxiosProvider.get('expenses/types')
            }

        }

        getInfos(props.param)
    }, [])
    // console.log(data)
    // console.log(data.message['0'].local)
    return (
        <div>
            {data.status ? (
                <div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th>Nome</th>
                                <th>Valor</th>
                                {data.message['0'].local && <th>Local</th>}
                                {data.message['0'].TypeExpenseId && <th>Tipo de despesa</th>}
                                <th>Opções</th>
                            </tr>
                        </thead>
                        {data.message.map((info) => (
                                <tbody key={info.id}>
                                    <tr>
                                        <td>{info.date}</td>
                                        <td>{info.name}</td>
                                        <td>{info.amount}</td>
                                        {data.message['0'].local && <td>{info.local}</td>}
                                        {data.message['0'].TypeExpenseId && <td>{info.TypeExpenseId}</td>}
                                        <td><Link  className="btn ms-1 p-1 btn-success">Editar</Link>
                                        <Link className="btn ms-1 p-1 btn-danger">Deletar</Link></td>
                                    </tr>
                                    
                                </tbody>

                        ))}
                    </Table>

                </div>
            ) : (
            <div>
                {loadingScreen ?
                    (
                        <div>
                            <p className="mt-5 text-center">Carregando informações...</p>
                        </div>
                    ) : (
                        <div>
                            <p className="mt-5 text-center">Erro Interno, Tente novamente mais tarde.(error code: 28L H)</p>
                        </div>
                    )}
            </div>
                    )}
        </div>
    )
}