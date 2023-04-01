import React from "react";
import '../style/footer.css';
import { Link } from "react-router-dom";
import Linkedin from "../images/linkedinfooter.png"
import Facebook from "../images/facebook.png"
import Instagram from "../images/instagram.png"
import Twitter from "../images/twitter.png"
import LogoFooter from "../images/logo5.png"


function Footer() {
    return (
        <footer className="Footer">
            <div className="Footersuperior">
                <img src={LogoFooter} className="Logo" />

                <div className="footer-top-center text-center">
                    <h4> Mapa do site</h4>
                    <ul>
                        <Link to="/" className="link-footer"><li>Início</li></Link>
                        <Link to="/about" className="link-footer"> <li>Sobre o SYM</li></Link>
                        <Link to="/ourteam" className="link-footer"> <li>Nossa Equipe</li></Link>                       
                        <Link to="/contact" className="link-footer"><li>Fale Conosco</li></Link>
                        <Link to="/login" className="link-footer"><li>Login</li></Link>
                    </ul>
                </div>
                <div className="text-center">
                    <h3 className="mb-4">Siga-nos em nossas redes sociais!</h3>
                    <div className="socialicons">
                        <a href="https://www.linkedin.com/"><img src={Linkedin} className="socialimages" /></a>
                        <a href="https://www.facebook.com/"><img src={Facebook} className="socialimages" /></a>
                        <a href="https://www.instagram.com/"><img src={Instagram} className="socialimages" /></a>
                        <a href="https://www.twitter.com/"><img src={Twitter} className="socialimages" /></a>
                    </div>
                </div>
            </div>
            <div className="Footerinferior">
                <p>© 2023 SYM - Save Your Money. Todos os direitos reservados.</p>
            </div>
        </footer>
    )
}

export default Footer;