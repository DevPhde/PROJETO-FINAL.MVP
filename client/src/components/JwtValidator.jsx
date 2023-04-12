import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AxiosProvider } from "../providers/axiosProvider"

function JwtValidator() {
  const [isValid, setIsValid] = useState(undefined)
  const navigate = useNavigate()

  useEffect(() => {
    if (sessionStorage.getItem('authorization')) {
      const hash = sessionStorage.getItem('authorization')
      async function jwtValidator() {
        try {
          const response = await AxiosProvider.communication('GET', 'validate/user', hash)
          if (response.status !== 200) {
            setIsValid(false)
            sessionStorage.clear()
            navigate('/')
          } else {
            setIsValid(true)
          }
        } catch (err) {
          setIsValid(false)
          sessionStorage.clear()
          navigate('/')
        }
      }
      jwtValidator()
    } else {
      setIsValid(false)
      sessionStorage.clear()
      navigate('/')
    }
  }, [])

  return isValid
}

export default JwtValidator
