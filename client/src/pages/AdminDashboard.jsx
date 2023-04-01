import React, { useState, useEffect } from 'react'
import AdminTables from '../components/AdminTables'
import { CreateArticleModal } from '../components/modals/CreateArticleModal'
import '../style/admin.css'
import { NewTypeExpenseModal } from '../components/modals/NewTypeExpenseModal'
import TypeExpenseTable from '../components/TypeExpenseTable'

export default function AdminDashboard() {
  const [showCreateArticleModal, setShowCreateArticleModal] = useState(false)
  const [changeInfo, setChangeInfo] = useState('')
  const [showCreateTypeExpenseModal, setShowCreateTypeExpenseModal] = useState(false)

  return (
    <main className="main-admin">
      <div className="admin-field text-center">

        <h2 className="text-center mb-5">{`Olá, Administrador! Seja bem vindo!`}</h2>

        <div className="buttons-admin">
          <button className="btn btn-admin btn-one fw-medium mt-3" onClick={() => setChangeInfo('article')}> Gerenciar artigos </button>
          <button className="btn btn-admin btn-two fw-medium mt-3" onClick={() => setChangeInfo('user')}> Gerenciar usuários </button>
          <button className="btn btn-admin btn-three fw-medium mt-3" onClick={() => setChangeInfo('expenses')}> Gerenciar tipos de despesas </button>
        </div>

        {changeInfo == 'article' ? (<>

          <h3 className='mt-5'> Lista de artigos</h3>
          <CreateArticleModal
            showModal={showCreateArticleModal}
            hideModal={() => setShowCreateArticleModal(false)}
            status={showCreateArticleModal}
          />
          <AdminTables param="allArticles" /></>) :
          changeInfo == 'user' ? (<>
            <h3 className='mt-5'> Lista de usuários</h3>
            <AdminTables param="getUsers" /></>) : (<>

              <h3 className='mt-5'> Menu de tipo de despesas</h3>
              <h5> Adicione um tipo de despesa ou exclua um já existente!</h5>
              <h5> Para adicionar um tipo de despesa, <span className="span-admin" onClick={() => setShowCreateTypeExpenseModal(true)}> clique aqui </span>.</h5>
              <div className='mt-3'><TypeExpenseTable /></div>
            </>
          )}

        <NewTypeExpenseModal
          showModal={showCreateTypeExpenseModal}
          hideModal={() => setShowCreateTypeExpenseModal(false)}
          status={showCreateTypeExpenseModal}
        />

        {/* <TypeExpenseTable/> */}

        {/* <button onClick={() => setShowCreateTypeExpenseModal(true)}>Abrir modal</button> */}
        {/* <button onClick={() => setShowCreateArticleModal(true)}>Adicionar Artigo</button> */}
      </div>
    </main>
  )
}



//allArticles
//getUsers