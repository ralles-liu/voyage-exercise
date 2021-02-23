import React, { useState } from "react";
import './App.css';
import {NameInput} from "./components/name_input"
import {DateInput} from "./components/date_input"
import {ColorDropdown} from "./components/color_dropdown"
import {sendForm} from "./util/api_util"

export const FormContext = React.createContext({});

/*
App is the main component for our form. All state properties are originated here 
and passed down to the children
*/
function App() {
  const [name, setName] = useState("");
  const [date, setDate] = useState(""); 
  const [color, setColor] = useState("");
  const [newColor, setNewColor] = useState("");
  const [colorOptions, setColorOptions] = useState(["Blue", "Yellow", "Red"])
  const [status, setStatus] = useState("not submitted")

  const submitForm = (e) => {
    e.preventDefault()
    const data = {name, date, color}
    sendForm(data)
    .then(res => setStatus(res.data.status))
    .catch(err => setStatus("" + err))
  }

  return (
    <FormContext.Provider value={{ 
      name, setName, 
      date, setDate, 
      color, setColor,
      status, setStatus,
      colorOptions, setColorOptions,
      newColor, setNewColor
    }}>
      <NameInput/>
      <DateInput/>
      <ColorDropdown/>
      <button onClick={submitForm} role="submit-user-form">Submit</button>
      <p role="status-text">Status: {status}</p>
    </FormContext.Provider>
  );
}

export default App;
