
import Lottie from "react-lottie"
import WIAnimation from "../assets/lottieJson/whatis.json"


function WhatIsIt() {
    const defaultOptions ={
        loop: true,
        autoplay:true,
        animationData: WIAnimation

    }

    return <Lottie options ={defaultOptions} />

}

export default WhatIsIt