import '../style/home.css'
import '../style/about.css'
import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Security from '../images/security.png'
import Acess from '../images/access.png'
import Analisys from '../images/analisys.png'
import Control from '../images/control.png'
import { Link } from "react-router-dom";
import WhatIsIt from '../components/WhatIsAnimation';
import Lion from '../images/leaodareceita.png'
import Simple from '../images/simples.png'
import Dinamic from '../images/dinamico.png'
import Intuitive from '../images/intuitivo.png'
import Practical from '../images/funcional.png'
import Versatile from '../images/versatil.png'
import Informative from '../images/Informativo.png'
import { AxiosProvider } from '../providers/axiosProvider';
import { Loading } from '../components/Loading';
import { useNavigate } from 'react-router-dom';



function About() {

    const navigate = useNavigate();
    useEffect(() => {
        if (sessionStorage.getItem('authorization') && !sessionStorage.getItem('admin')) {
            {
                navigate('/dashboard')
            }
        }
    })

    const [article, setArticle] = useState([])

    const getArticle = async () => {
        try {
            const response = await AxiosProvider.communication('GET', 'allArticles')

            setArticle(response.data.message)



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

                        <h2 className="mb-5 pb-2  title-about fw-bolder " >{article[0].title}</h2>

                        <p className=" text-about ">
                            {article[0].text}


                        </p>
                    </div>
                    <div className="img-about"><WhatIsIt /></div>
                </div>
                <div className="about-second-part">
                    < div className="img-home-sp">
                        <img src={Lion} className="img-lion" />
                    </div>
                    <div className="home-sp-text-field ">
                        <p className="text-about">
                            {article[1].text}
                        </p>
                    </div>
                </div>
                <div className="home-third-part">
                    <h1 className="text-center fw-bolder" style={{ color: "#048A78", fontSize: "clamp(35px,5vw,45px)" }}> Um pouco mais sobre o SYM</h1>
                    <h2 className="text-center fw-medium">Conheça um pouco de nossas principais características</h2>

                    <div className="cards-about-field text-center">
                        <div className="cards-one">
                            <Card className="mb-3 c-about two-line">
                                <Card.Body className="card-about">
                                    <img src={Simple} className="icon-about" />
                                    <div>
                                        <Card.Title className="text-card-about">{article[3].title}</Card.Title>
                                        <Card.Text className="text-card-about">
                                            {article[3].text}
                                        </Card.Text>
                                    </div>


                                </Card.Body>
                            </Card>
                            <Card className='mb-3 c-about'>
                                <Card.Body className="card-about">
                                    <img src={Dinamic} className="icon-about" />
                                    <div>
                                        <Card.Title className="text-card-about">{article[4].title}</Card.Title>
                                        <Card.Text className="text-card-about">
                                            {article[4].text}
                                        </Card.Text>
                                    </div>


                                </Card.Body>
                            </Card >
                            <Card className='mb-3 c-about three-line'>
                                <Card.Body className="card-about">
                                    <img src={Intuitive} className="icon-about" />
                                    <div>
                                        <Card.Title className="text-card-about">{article[5].title}</Card.Title>
                                        <Card.Text className="text-card-about">
                                            {article[5].text}
                                        </Card.Text>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="cards-two ">
                            <Card className='mb-3 c-about three-line'>
                                <Card.Body className="card-about">
                                    <img src={Practical} className="icon-about" />
                                    <div>
                                        <Card.Title className="text-card-about">{article[6].title}</Card.Title>
                                        <Card.Text className="text-card-about">
                                            {article[6].text}
                                        </Card.Text>
                                    </div>


                                </Card.Body>
                            </Card>
                            <Card className='mb-3 c-about three-line'>
                                <Card.Body className="card-about">
                                    <img src={Versatile} className="icon-about" />
                                    <div>
                                        <Card.Title className="text-card-about">{article[7].title}</Card.Title>
                                        <Card.Text className="text-card-about">
                                            {article[7].text}
                                        </Card.Text>
                                    </div>


                                </Card.Body>
                            </Card >
                            <Card className='mb-3 c-about two-line'>
                                <Card.Body className="card-about">
                                    <img src={Informative} className="icon-about" />
                                    <div>
                                        <Card.Title className="text-card-about">{article[8].title}</Card.Title>
                                        <Card.Text className="text-card-about">
                                            {article[8].text}
                                        </Card.Text>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>




                    </div>
                </div>
            </main>
        </div>

    )

    )
}

export default About