import {useContext} from 'react';
import {FormContext} from "../App"

/*
this component is responsible for the color dropdown
as well as the functionality to add colors to our dropdown
*/
export const ColorDropdown = (props) => {
    const {color, setColor, colorOptions, setColorOptions, newColor, setNewColor} = useContext(FormContext)
    
    // properly hides or opens dropdown when a selection is made
    const toggleDropdown = (e) => {
        if (document.getElementById("dropdown").style.display === "block") {
            document.getElementById("dropdown").style.display = "none"
        } else {
            document.getElementById("dropdown").style.display = "block"
        }
    }
    
    const selectColor = (e) => {
        setColor(e.currentTarget.getAttribute("data-value"))
        setNewColor("")
        document.getElementById("dropdown").style.display = "none"
    }

    const handleInputChange = (e) => {
        setNewColor(e.currentTarget.value)
    }

    const addNewColor = (e) => {
        e.preventDefault()
        setColor(newColor)
        colorOptions.push(newColor)
        setColorOptions(colorOptions)
        // resets the "Add Color" field after a color is succesfully added
        setNewColor("")
    }

    const colorSelects = colorOptions.map((color, i) => <div role={"color-select-" + color} data-value={color} key={i} onClick={selectColor}>{color}</div>)
    
    return (
        <div>
            <p role="color-text">favorite color: {color}</p>
            <button type="button" onClick={toggleDropdown}>{color || "please select a color"} <i className="fas fa-caret-down" role="color-dropdown-toggle"></i> </button>
            <div id="dropdown" style={{display: "none"}}>
                {colorSelects}
                <form onSubmit={addNewColor}>
                    <input id="color-input" value={newColor} onChange={handleInputChange} role="add-color-input"/>
                    <button type="submit">Add Color</button>
                </form>
            </div>  
        </div>
    )
}
