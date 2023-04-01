import { useState, useEffect } from "react";
import { AxiosProvider } from "../providers/axiosProvider";
import { Table } from "react-bootstrap";
import { Loading } from "./Loading";
import { VerticalModal } from "./modals/VerticalModal";
import { BackdropModal } from "./modals/BackdropModal";

function AdminTables(props) {
  const hash = sessionStorage.getItem("authorization");
  const [data, setData] = useState([]);
  const [feedbackUser, setFeedbackUser] = useState({
    error: false,
    message: "",
  });
  const [update, setUpdate] = useState(0);
  const [loadingReq, setLoadingReq] = useState(false);

  const [editing, setEditing] = useState({
    edit: false,
    key: 0,
  });
  const [deleting, setDeleting] = useState({
    delete: false,
    key: 0,
  });

  const [values, setValues] = useState({
    id: 0,
    title: "",
    text: "",
    image: "",
  });
  const [isValid, setIsValid] = useState({
    title: true,
    text: true,
  });
  const [modalText, setModalText] = useState("");
  const [textModal, setTextModal] = useState(false);

  const [loadingScreen, setLoadingScreen] = useState(false);
  useEffect(() => {
    async function getArticles(param) {
      if(param != "allArticles"){
        param = "admin/getUsers"
      }
      setLoadingScreen(true);
      try {
        const response = await AxiosProvider.communication("GET", param, hash);
        setData(response.data);
        setLoadingScreen(false);
      } catch (e) {
        setLoadingScreen(false);
      }
    }
    getArticles(props.param);
  }, [update]);

  const handleDelete = (i) => {
    setDeleting((prevState) => ({ ...prevState, delete: true, key: i.id }));
  };

  const handleDeleteRow = async () => {
    let path;
    props.param == "allArticles"
      ? (path = `admin/delete/article/${deleting.key}`)
      : (path = `admin/deleteUser/${deleting.key}`);
    try {
      setLoadingReq(true);
      const response = await AxiosProvider.communication("DELETE", path, hash);
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

  const handleEdit = (i) => {
    setValues(() => ({
      id: i.id,
      title: i.title,
      text: i.text,
      image: i.image != "Sem Imagem" ? i.image : "",
    }));
    setEditing((prevState) => ({ ...prevState, edit: true, key: i.id }));
    setUpdate(update + 1);
  };

  const handleEditRow = async () => {
    if (Object.values(isValid).every((value) => value == true)) {
      try {
        const data = {
          title: values.title,
          text: values.text,
          image: values.image ? values.image : null,
        };
        setLoadingReq(true);
        const response = await AxiosProvider.communication(
          "PUT",
          `admin/edit/article/${values.id}`,
          hash,
          data
        );
        setFeedbackUser(prevState => ({...prevState, error: false, message: response.data.message}))
        setEditing((prevState) => ({ ...prevState, edit: false, key: 0 }));
        setLoadingReq(false);
      } catch (err) {
        console.log(err)
        setFeedbackUser(prevState => ({ ...prevState, error: true, message: err.response.data.message}));
        setEditing((prevState) => ({ ...prevState, edit: false, key: 0 }));
        setLoadingReq(false);
      }
      setUpdate(update + 1);
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
        title={`Deletar ${props.param == "allArticles" ? "Artigo" : "Usuário"}`}
        anotherbutton={loadingReq ? "loading" : "true"}
        classanotherbutton={"btn table-modal-btn btn-danger"}
        clickanotherbutton={() => handleDeleteRow()}
        anotherbuttonmessage={"Deletar"}
        namebutton={"Cancelar"}
        message={
          <>
            <p>
              Tem certeza que deseja deletar o
              {props.param == "allArticles" ? " artigo" : " cadastro do usuário"}
              ?
            </p>
          </>
        }
      />

      <VerticalModal
        show={textModal}
        onHide={() => setTextModal(false)}
        title="Texto"
        namebutton={"Fechar"}
        message={modalText}
      />

      <VerticalModal
        show={editing.edit}
        onHide={() => {
          setEditing((prevState) => ({ ...prevState, edit: false, key: 0 }));
          setIsValid((prevState) => ({
            ...prevState,
            title: true,
            text: true,
          }));
        }}
        title={`Editar ${props.param == "expenses" ? "Despesa" : "Receita"}`}
        anotherbutton={loadingReq ? "loading" : "true"}
        classanotherbutton={"btn table-modal-btn btn-success"}
        clickanotherbutton={() => handleEditRow()}
        anotherbuttonmessage={"Editar"}
        namebutton={"Cancelar"}
        message={
          <div>
            <div className="px-3">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  onBlur={(event) => {
                    event.target.value == ""
                      ? setIsValid((prevState) => ({
                          ...prevState,
                          title: false,
                        }))
                      : setIsValid((prevState) => ({
                          ...prevState,
                          title: true,
                        }));
                  }}
                  onFocus={() =>
                    setIsValid((prevState) => ({ ...prevState, title: true }))
                  }
                  onChange={(event) =>
                    setValues((prevState) => ({
                      ...prevState,
                      title: event.target.value,
                    }))
                  }
                  value={values.title}
                />
                <label htmlFor="floatingInput">Titulo</label>
              </div>
              {!isValid.title && (
                <p className="text-danger">
                  O campo título não pode estar vazio.
                </p>
              )}
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  onBlur={(event) => {
                    event.target.value == ""
                      ? setIsValid((prevState) => ({
                          ...prevState,
                          text: false,
                        }))
                      : setIsValid((prevState) => ({
                          ...prevState,
                          text: true,
                        }));
                  }}
                  onFocus={() =>
                    setIsValid((prevState) => ({ ...prevState, text: true }))
                  }
                  onChange={(event) =>
                    setValues((prevState) => ({
                      ...prevState,
                      text: event.target.value,
                    }))
                  }
                  value={values.text}
                />
                <label htmlFor="floatingInput">Texto</label>
              </div>
              {!isValid.text && (
                <p className="text-danger">
                  O campo texto não pode estar vazio.
                </p>
              )}
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  onChange={(event) =>
                    setValues((prevState) => ({
                      ...prevState,
                      image: event.target.value,
                    }))
                  }
                  value={values.image}
                />
                <label htmlFor="floatingInput">Imagem</label>
              </div>
            </div>
          </div>
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
                      {props.param == "allArticles" ? <th>Título</th> : <td>Nome Completo</td>}
                      {props.param == "allArticles" ? <th>Texto</th> : <td>Email</td>}
                      {props.param == "allArticles" ? <th>Imagem</th> : <td>CPF</td>}
                      <th>Opções</th>
                    </tr>
                  </thead>
                  {data.message.map((info) => (
                    <tbody key={info.id}>
                      <tr>
                      {props.param == "allArticles" ? <td>{info.title}</td> : <td>{info.name}</td>}
                        {props.param == "allArticles" ? (
                          <td>
                            <button
                              onClick={() => {
                                setTextModal(true);
                                setModalText(info.text);
                              }}
                              className="btn btn-success"
                            >
                              Texto
                            </button>
                          </td>
                        ) : (
                          <td>{info.email}</td>
                        )}
                        {props.param == "allArticles" ? <>{info.image ? (
                          <td>
                            <a href={info.image} target="_blank">
                              Imagem
                            </a>
                          </td>
                        ) : (
                          <td>Sem Imagem</td>
                        )}</> : <td>{info.cpf}</td>}
                        <td className="text-center">
                        {props.param == "allArticles" && <button
                            onClick={() => handleEdit(info)}
                            type="button"
                            className="btn ms-1 p-1 px-2 btn-success"
                          > 
                            Editar
                          </button>}
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
                      <th>Título</th>
                      <th>Texto</th>
                      <th>link da imagem</th>
                      <th>Opções</th>
                    </tr>
                  </thead>
                </Table>
                {props.param == "allArticles" ? (
                  <p className="text-center">Nenhum artigo cadastrado.</p>
                ) : (
                  <p className="text-center">Nenhum usuário cadastrado.</p>
                )}
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
                      <th>Título</th>
                      <th>Texto</th>
                      <th>link da imagem</th>
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

export default AdminTables;
