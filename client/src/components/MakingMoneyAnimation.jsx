
import Lottie from "react-lottie"
import MMAnimation from "../assets/lottieJson/makingmoney.json"


function MakingMoney() {
    const defaultOptions ={
        loop: true,
        autoplay:true,
        animationData: MMAnimation

    }

    return <Lottie options ={defaultOptions}/>

}

export default MakingMoney