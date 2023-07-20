import { UseContextType } from "../context/Context"
import { useContext } from 'react'
import ContextStateAPI from "../context/Context"

const UseItems = (): UseContextType => {
    return useContext(ContextStateAPI)
}

export default UseItems