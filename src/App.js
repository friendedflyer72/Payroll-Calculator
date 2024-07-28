import React, { useState } from "react";
import Navbar from "./components/Navbar";
import InputForm from "./components/InputForm";
import PayrollDisplay from "./components/PayrollDisplay";

const App = () => {
  const [payDetails, setPayDetails] = useState([]);
  const [mode, setMode] = useState("light");

  const toggleMode = () => {
    if (mode === "dark") {
      document.body.style.backgroundColor = "#84BCDA";
      document.body.style.color = "black";
      setMode("light");
    } else {
      document.body.style.backgroundColor = "#252e49";
      document.body.style.color = "white";
      setMode("dark");
    }
  };
  return (
    <div className="App">
      <Navbar mode={mode} toggleMod={toggleMode} Title="Payroll Calculator" />
      <InputForm setPayDetails={setPayDetails} />
      <PayrollDisplay payDetails={payDetails} />
    </div>
  );
};

export default App;
