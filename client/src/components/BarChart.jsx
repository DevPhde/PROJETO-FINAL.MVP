
import Lottie from "react-lottie"
import BCAnimation from "../assets/lottieJson/barchart.json"


function BarChart() {
    const defaultOptions ={
        loop: true,
        autoplay:true,
        animationData: BCAnimation

    }

    return <Lottie options ={defaultOptions} />

}

export default BarChart