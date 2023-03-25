import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"

function Index() {

  return (

    <div>

      <Outlet />
      <Footer />
    </div>
  )
}

export default Index
