import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AxiosProvider } from "../providers/axiosProvider"
function JwtValidator() {
    const navigate = useNavigate()
    if (sessionStorage.getItem('authorization')) {
        const hash = sessionStorage.getItem('authorization')
        useEffect(() => {
            async function jwtValidator() {
                try {
                    const response = await AxiosProvider.communication('GET', 'validate/user', hash)
                    console.log(response)
                    if (response.status != 200) {
                        navigate('/login')
                        sessionStorage.clear()
                    }
                } catch (err) {
                    navigate('/login')
                    sessionStorage.clear()
                }
            }
            jwtValidator()
        },[])
    } else {
        navigate('/login')
        sessionStorage.clear()
    }
}

export default JwtValidator