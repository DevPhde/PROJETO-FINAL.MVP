import { BrowserRouter, Routes, Route,Link } from "react-router-dom";
import Home from "./screans/pages/Home";
import Contato from "./screans/pages/Contato";
import QuemSomos from "./screans/pages/QuemSomos"
import NovoProjeto from "./screans/pages/NovoProjeto";

import Container from "./screans/layout/Container";



function App() {
  return (

    <BrowserRouter>
      <ul>
        <Link to="/">Home</Link>
        <Link to="/quemsomos">Quem Somos</Link>
        <Link to="/novoprojeto">Novo PROJETO</Link>
        <Link to="/contato">Contato</Link>
      </ul>
      <Container customClass="min-height">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/quemsomos" element={<QuemSomos />} />
        <Route exact path="/novoprojeto" element={<NovoProjeto />} />
        <Route exact path="/contato" element={<Contato />} />
      </Routes>
      </Container>
      <p>footer</p>
    </BrowserRouter>
    

  );
}

export default App;
