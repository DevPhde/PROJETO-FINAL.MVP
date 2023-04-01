
import Lottie from "react-lottie"
import SMAnimation from "../assets/lottieJson/savingmoney.json"


function SavingMoney() {
    const defaultOptions ={
        loop: true,
        autoplay:true,
        animationData: SMAnimation

    }

    return <Lottie options ={defaultOptions} />

}

export default SavingMoney