import React from 'react'
import { Tables } from '../components/Tables'
import { EditProfile } from '../components/EditProfile'
// import { ModalTeste } from '../components/modals/ModalTeste'
import JwtValidator from '../components/JwtValidator'
function Home() {
  return (
    <div>
      {/* <JwtValidator/> */}
      {/* <ModalTeste/> */}
      {/* <EditProfile /> */}
      <Tables param={'expenses'}/>
    </div>
  )
}

export default Home