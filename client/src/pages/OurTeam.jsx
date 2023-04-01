import '../style/ourteam.css'
import React, { useState, useEffect } from 'react';
import Team from '../components/Team';
import { AxiosProvider } from '../providers/axiosProvider';
import { Loading } from '../components/Loading'
import Card from 'react-bootstrap/Card';
import Linkedin from '../images/linkedin.png'
import Github from '../images/github.png'
import Diego from '../images/diego.jpeg'
import Dani from '../images/dani.jpeg'
import Indiane from '../images/indiane.jpeg'
import Orlando from '../images/orlando.jpeg'
import Paloma from '../images/paloma.jpeg'
import BarChart from '../components/BarChart';
import { useNavigate } from 'react-router-dom';




function OurTeam() {

    const navigate = useNavigate();
    useEffect(() => {
        if(sessionStorage.getItem('authorization') && !sessionStorage.getItem('admin')){{
            navigate('/dashboard')
        }}
    })
    const [article, setArticle] = useState({})

    const getArticle = async () => {
        try {
            const response = await AxiosProvider.communication('GET', 'allArticles')
            setArticle(response.data.message[9])
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getArticle()
    }, [])

    return (article.length == 0 ? (<Loading />) : (

        <div className="background">

            <main className="main-home">
                <div className="about-first-part">

                    <div className="home-sp-text-field ">
                        <h2 className="mb-5 pb-2  fw-bolder title-about " >{article.title}</h2>
                        <p className=" text-about ">{article.text}</p>
                    </div>

                    <div className="img-about"><Team /></div>

                </div>

                <div className="ourteam-sp text-center">
                    <h2 className="mb-5 pb-2 text-center fw-bolder" style={{ color: "#29056B", fontSize: "clamp(35px,5vw,45px)" }} >Nossos integrantes</h2>
                    <div className="team-cards">

                        <Card style={{ width: '18rem' }} className="card-colab" >
                            <Card.Body>
                                <img src={Diego} className="team-colab" />
                                <Card.Title>Diego Baumbach</Card.Title>
                                <Card.Text>
                                    <a href="https://www.linkedin.com/in/diego-baumbach-a24444238/"><img className="ourteam-icon" src={Linkedin} /></a>
                                    <a href="https://github.com/DevPhde"><img className="ourteam-icon github" src={Github} /></a>
                                </Card.Text>

                            </Card.Body>
                        </Card>
                        <Card style={{ width: '18rem' }} className="card-colab">
                            <Card.Body>
                                <img src={Dani} className="team-colab" />
                                <Card.Title>Daniella Werneck</Card.Title>
                                <Card.Text>
                                    <a href="https://www.linkedin.com/in/daniella-werneck-bb5319196/"><img className="ourteam-icon" src={Linkedin} /></a>
                                    <a href="https://github.com/Daniellasqw"><img className="ourteam-icon github" src={Github} /></a>
                                </Card.Text>

                            </Card.Body>
                        </Card>


                        <Card style={{ width: '18rem' }} className="card-colab">
                            <Card.Body>
                                <img src={Indiane} className="team-colab" />
                                <Card.Title>Indiane Lopes</Card.Title>
                                <Card.Text>
                                    <a href="https://www.linkedin.com/in/indiane-lopes-da-silva-matos-5a5370218/"><img className="ourteam-icon" src={Linkedin} /></a>
                                    <a href="https://github.com/Indyllopes"><img className="ourteam-icon github" src={Github} /></a>
                                </Card.Text>

                            </Card.Body>
                        </Card>
                        <Card style={{ width: '18rem' }} className="card-colab">
                            <Card.Body>
                                <img src={Orlando} className="team-colab" />
                                <Card.Title>Orlando Júnior</Card.Title>
                                <Card.Text>
                                    <a href="https://www.linkedin.com/in/orlandoj%C3%BAnior/"><img className="ourteam-icon" src={Linkedin} /></a>
                                    <a href="https://github.com/Orl-andoJr"><img className="ourteam-icon github" src={Github} /></a>
                                </Card.Text>

                            </Card.Body>
                        </Card>


                        <Card style={{ width: '18rem' }} className="card-colab">
                            <Card.Body>
                                <img src={Paloma} className="team-colab" />
                                <Card.Title>Paloma Avelino</Card.Title>
                                <Card.Text>
                                    <a href="https://www.linkedin.com/in/palomaavelino/"><img className="ourteam-icon" src={Linkedin} /></a>
                                    <a href="https://github.com/ipami"><img className="ourteam-icon github" src={Github} /></a>
                                </Card.Text>

                            </Card.Body>
                        </Card>

                    </div>

                </div>

                <div className="ourteam-second-part">







                    <div className="home-sp-text-field ">

                        <h2 className="mb-5 pb-2  fw-bolder title-about " >Sobre o projeto</h2>
                       
                        <p className="text-about">
                            Este é o projeto final de conclusão do curso de Desenvolvimento Web Full Stack, um curso do programa Programadores Cariocas,
                            oferecido pela Prefeitura do Município do Rio de Janeiro, em parceria com o Senac e a Resília.<br/>
                            Na primeira parte deste projeto, foi criado um MVP que implementaria as funcionalidade básicas do CRUD. O tema escolhido pela equipe foi o
                            gerenciador de finanças, e assim nasceu o SYM!<br/>
                            Na segunda parte, já com um MVP préviamente criado e rodando, foi elaborado um site para o lançamento do MVP.<br/>
                            
                            


                        </p>

                    </div>


                    < div className="img-home-sp">

                        <BarChart />
                    </div>


                </div>













            </main >
        </div >

    )

    )

}

export default OurTeam