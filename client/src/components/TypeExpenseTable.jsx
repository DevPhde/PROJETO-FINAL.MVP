import { useState, useEffect } from "react";
import { AxiosProvider } from "../providers/axiosProvider";
import { Table } from "react-bootstrap";
import { Loading } from "./Loading";
import { VerticalModal } from "./modals/VerticalModal";
import { BackdropModal } from "./modals/BackdropModal";

function TypeExpenseTable(props) {
  const [data, setData] = useState([]);
  const [feedbackUser, setFeedbackUser] = useState({
    error: false,
    message: "",
  });
  const [update, setUpdate] = useState(0);
  const [loadingReq, setLoadingReq] = useState(false);

  const [deleting, setDeleting] = useState({
    delete: false,
    key: 0,
  });

  const [loadingScreen, setLoadingScreen] = useState(false);
  useEffect(() => {
    async function getTypeExpenses() {
      setLoadingScreen(true);
      try {
        const response = await AxiosProvider.communication("GET", 'expenses/types');
        setData(response.data);
        setLoadingScreen(false);
      } catch (e) {
        setLoadingScreen(false);
      }
    }
    getTypeExpenses();
  }, [update]);

  const handleDelete = (i) => {
    setDeleting((prevState) => ({ ...prevState, delete: true, key: i.id }));
  };

  const handleDeleteRow = async () => {
    try {
      setLoadingReq(true);
      const response = await AxiosProvider.communication("DELETE", `expenses/types/DELETE/${deleting.key}`);
      setFeedbackUser((prevState) => ({
        ...prevState,
        error: false,
        message: response.data.message,
      }));
      setUpdate(update + 1);
      setDeleting(false);
      setLoadingReq(false);
    } catch (e) {
      console.log(e);
    }
  };

setTimeout(() => {
  setUpdate(update + 1);
},2000)

  return (
    <div>
      {feedbackUser.message && (
        <BackdropModal
          title={feedbackUser.error ? "Erro interno" : "Mensagem"}
          message={feedbackUser.message}
          namebutton="Fechar"
        />
      )}

      <VerticalModal
        show={deleting.delete}
        onHide={() =>
          setDeleting((prevState) => ({ ...prevState, delete: false, key: 0 }))
        }
        title={"Deletar Tipo de Despesa"}
        anotherbutton={loadingReq ? "loading" : "true"}
        classanotherbutton={"btn table-modal-btn btn-danger"}
        clickanotherbutton={() => handleDeleteRow()}
        anotherbuttonmessage={"Deletar"}
        namebutton={"Cancelar"}
        message={
          <>
            <p>
              Tem certeza que deseja deletar o tipo de despesa?
            </p>
          </>
        }
      />

      <section className="p-5 tables">
        {data.status ? (
          <div>
            {feedbackUser.message && (
              <p className="text-success">{feedbackUser.message}</p>
            )}
            {data.message.length != 0 ? (
              <div>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Tipo de despesa</th>
                      <th>Opções</th>
                    </tr>
                  </thead>
                  {data.message.map((info) => (
                    <tbody key={info.id}>
                      <tr>
                      <td className="text-capitalize">{info.name}</td>
                        <td className="text-center">
                          <button
                            onClick={() => handleDelete(info)}
                            type="button"
                            className="btn ms-1 p-1 btn-danger"
                          >
                            Deletar
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </Table>
              </div>
            ) : (
              <div>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Tipo de Despesa</th>
                      <th>Opções</th>
                    </tr>
                  </thead>
                </Table>
                  <p className="text-center">Nenhum tipo de despesa cadastrado.</p>
              </div>
            )}
          </div>
        ) : (
          <div>
            {loadingScreen ? (
              <div>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Tipo de Despesa</th>
                      <th>Opções</th>
                    </tr>
                  </thead>
                </Table>
                <Loading className="loader-position" />
              </div>
            ) : (
              <div>
                <p className="mt-5 text-center">{feedbackUser.message}</p>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default TypeExpenseTable;
