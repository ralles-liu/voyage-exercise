import {useContext} from 'react';
import {FormContext} from "../App"

export const NameInput = (props) => {
    const {name, setName} = useContext(FormContext)
    const handleInputChange = (e) => {
        setName(e.currentTarget.value)
    }
        
    return (
        <div>
            <p role="name-text">name: {name}</p>
            <input value={name} onChange={handleInputChange} role="name-input" />    
        </div>
    )
}