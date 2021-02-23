import {useContext} from 'react';
import {FormContext} from "../App"

export const DateInput = (props) => {
    const {date, setDate} = useContext(FormContext)
    const handleInputChange = (e) => {
        setDate(e.currentTarget.value)
    }

    return (
        <div>
            <p role="date-text">birthday is: {date}</p>
            <input onChange={handleInputChange} value={date} placeholder="2021-02-22" role="date-input"/>        
        </div>
    )
}