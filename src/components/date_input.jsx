import {useContext} from 'react';
import {FormContext} from "../App"

export const DateInput = (props) => {
    const {date, setDate} = useContext(FormContext)
    const handleInputChange = (e) => {
        // const validInputs = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "/"])
        // if (validInputs.has(e.currentTarget.value)) {
        //     setDate(e.currentTarget.value)
        // }
        setDate(e.currentTarget.value)
    }
    
    // only pulling key value name and set name
    
    return (
        
        <div>
            <p>today is {date}</p>
            <input onChange={handleInputChange} value={date} placeholder="2021-02-22"/>
            
        </div>
    )
}