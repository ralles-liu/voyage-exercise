import React, { useState } from "react";
import './App.css';
import {NameInput} from "./components/name_input"
import {DateInput} from "./components/date_input"


// let formState = {
//   name: "",
//   birthday: "",
//   favoriteColor: "",
//   setName: () => {}
// };

export const FormContext = React.createContext({});

function App() {
  const [name, setName] = useState("");
  const [date, setDate] = useState(""); 
  const [color, setColor] = useState(""); 


  return (
    <FormContext.Provider value={{ 
      name, setName, 
      date, setDate, 
      color, setColor 
      }}>
      <NameInput/>
      <DateInput/>
    </FormContext.Provider>
  );
}

export default App;
