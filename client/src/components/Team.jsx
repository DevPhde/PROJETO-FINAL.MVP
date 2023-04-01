
import Lottie from "react-lottie"
import TeamAnimation from "../assets/lottieJson/team.json"


function Team() {
    const defaultOptions ={
        loop: true,
        autoplay:true,
        animationData: TeamAnimation

    }

    return <Lottie options ={defaultOptions} />

}

export default Team