import {useContext} from 'react';
import {FormContext} from "../App"

export const NameInput = (props) => {
    const {name, setName} = useContext(FormContext)
    const handleInputChange = (e) => {
        setName(e.currentTarget.value)
        
    }
    
    // only pulling key value name and set name
    
    return (
        
        <div>
            <p>hi {name}</p>
            <input onChange={handleInputChange}>
            </input>
        </div>
    )

}